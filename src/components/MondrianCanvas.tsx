
import React, { useRef } from 'react'
import { useShapeRender } from '../hooks/useShapeRender';
import CanvasArea from './CanvasArea';

export default function MondrianCanvas() {
  const {
    lines,
    boxes,
    render,
    clearAll
  } = useShapeRender();
  const canvasRef = useRef<HTMLDivElement>(null);
  return (
    <div className={'container'}>
      <CanvasArea canvasRef={canvasRef}>
        {lines.map(x => x.renderLine())}
        {boxes.map(x => x.renderBox())}
      </CanvasArea>
      <div className='toolbar'>
        <button className={'btn generate'} onClick={render}>Generate</button>
        <button className={'btn clear'} onClick={clearAll}>Clear</button>
      </div>
    </div >
  )
}
