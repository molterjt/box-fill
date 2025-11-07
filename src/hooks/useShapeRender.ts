import { useEffect, useState } from 'react';
import Line from '../components/Mondrian/Line';
import BoxShape from '../components/Mondrian/Box';
import { VIEW_HEIGHT, VIEW_WIDTH } from '../constants';
import { LineOrientation } from '../types';
import { getRandomIntInclusive } from '../utils';

export const useShapeRender = () => {
  const [hLines, setHLines] = useState<Line[]>([]);
  const [vLines, setVLines] = useState<Line[]>([]);
  const [boxes, setBoxes] = useState<BoxShape[]>([]);

  useEffect(() => {
    generateLines();
  }, []);

  useEffect(() => {
    generateBoxex()
  }, [vLines]);


  function clearAll() {
    setHLines([]);
    setVLines([]);
    setBoxes([])
  }

  function render() {
    clearAll()
    generateLines();
  }

  function generateLines(): void {
    let numLines = Math.floor(Math.random() * 15);
    if (numLines < 6) {
      numLines = 10;
    }
    const newHLines: Line[] = []
    const newVLines: Line[] = []
    for (let i: number = 0; i < numLines; i++) {
      let offset = Math.floor(Math.random() * 100) / 100;
      const hL = new Line(
        i,
        { x: 0, y: VIEW_HEIGHT * offset },
        { x: VIEW_WIDTH, y: VIEW_HEIGHT / 1 },
        LineOrientation.H
      );
      newHLines.push(hL);
      offset = Math.floor(Math.random() * 100) / 100;
      const vL = new Line(
        i,
        { x: VIEW_WIDTH * offset, y: 0 },
        { x: VIEW_WIDTH * offset, y: VIEW_HEIGHT },
        LineOrientation.V
      );
      newVLines.push(vL)
    }
    setHLines(newHLines)
    setVLines(newVLines)
  }

  function getXAxisBoxLines(n: number): { left: number, right: number } {
    let left = 0;
    let right = 0;
    while (left >= right) {
      let startX = getRandomIntInclusive(0, n - 1);
      let endX = getRandomIntInclusive(0, n - 1)
      let startVLine = vLines[startX]
      let endVLine = vLines[endX]
      left = startVLine.start.x;
      right = endVLine.start.x;
    }
    return { left: left, right: right }
  }

  function getYAxisBoxLines(n: number): { top: number, bottom: number } {
    let top = 0;
    let bottom = 0;
    while (top >= bottom) {
      let startY = getRandomIntInclusive(0, n - 1);
      let endY = getRandomIntInclusive(0, n - 1);
      let startVLine = hLines[startY];
      let endVLine = hLines[endY];
      top = startVLine.start.y;
      bottom = endVLine.start.y;
    }
    return { top: top, bottom: bottom }
  }

  function createBox(fill: string): BoxShape {
    const { left, right } = getXAxisBoxLines(vLines.length);
    const { top, bottom } = getYAxisBoxLines(hLines.length);
    let box = new BoxShape(
      getRandomIntInclusive(1, 10000),
      {
        tL: { x: left, y: top },
        tR: { x: right, y: top },
        bL: { x: left, y: bottom },
        bR: { x: right, y: bottom },
      },
      fill,
    );
    return box;
  }

  function generateBoxex(): void {
    if (vLines.length > 0) {
      let n = getRandomIntInclusive(3, 8);
      const bs: BoxShape[] = []
      let fill: string = 'black';
      for (let i = 0; i < n; i++) {
        let fn = getRandomIntInclusive(0, 3);
        switch (fn) {
          case 0:
            fill = 'rgba(250, 0, 0, 0.65'
            break;
          case 1:
            fill = 'rgba(0, 240, 40, 0.92)'
            break;
          case 2:
            fill = 'rgba(0, 240, 240, 0.82)'
            break;
          case 3:
            fill = 'rgba(190, 190, 40, 0.92)'
            break;
        }
        let b = buildAndValidateBox(bs, fill);
        if (b) bs.push(b);
      }
      setBoxes(bs);
    }
  }

  function buildAndValidateBox(bs: BoxShape[], fill: any): BoxShape | null {
    const maxAttempts = 20000;
    let attempt = 0;
    while (true) {
      attempt++;
      let newBox = createBox(fill);
      if (bs.length === 0) {
        return newBox;
      }
      // Check for collisions against existing boxes
      let isColliding = false;
      for (let i = 0; i < bs.length; i++) {
        const existingBoxPoints = bs[i].getPoints();
        if (newBox.checkBoxCollision(existingBoxPoints)) {
          isColliding = true;
          break;
        }
      }
      if (!isColliding) {
        return newBox;
      }
      console.log('Collision detected, retrying...');
      if (maxAttempts === attempt) {
        console.warn('There were too many collisions, redraw and try again.')
        return null;
      }
    }
  }

  return {
    lines: [...hLines, ...vLines],
    boxes: boxes,
    render: render,
    clearAll: clearAll
  }
}