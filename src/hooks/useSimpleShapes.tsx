import { useEffect, useRef, useState } from "react";
import { ShapeType, type Point, type Shape } from "../types";

export const useSimpleShapes = (
  canvasRef: React.RefObject<HTMLDivElement | null>,
  tool: ShapeType
) => {
  const [shapes, setShapes] = useState<Shape[]>([]);

  const isDrawing = useRef(false);
  const startRef = useRef<Point | null>(null);

  function getPoint(e: MouseEvent): Point {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  function start(e: MouseEvent) {
    isDrawing.current = true;
    const startPoint = getPoint(e);
    startRef.current = startPoint;
    setShapes(prev => [
      ...prev,
      { type: tool, start: startPoint, end: startPoint }
    ]);
  }

  function move(e: MouseEvent) {
    if (!isDrawing.current || !startRef.current) return;
    const currentEnd = getPoint(e);
    setShapes(prev => {
      if (prev.length === 0) return prev;
      const lastIndex = prev.length - 1;
      const updatedShape = {
        ...prev[lastIndex],
        end: currentEnd
      };
      return [...prev.slice(0, lastIndex), updatedShape];
    });
  }

  function end(e: MouseEvent) {
    if (isDrawing.current) {
      const finalEnd = getPoint(e);
      setShapes(prev => {
        if (prev.length === 0) return prev;
        const lastIndex = prev.length - 1;
        const finalShape = { ...prev[lastIndex], end: finalEnd };
        return [...prev.slice(0, lastIndex), finalShape];
      });
    }
    isDrawing.current = false;
    startRef.current = null;
  }

  function cancelDrawing() {
    if (isDrawing.current && startRef.current) {
      setShapes(prev => {
        // Remove the last element (the temporary shape)
        return prev.slice(0, -1);
      });
    }
    isDrawing.current = false;
    startRef.current = null;
  }

  useEffect(() => {
    const el = canvasRef.current!;
    const down = (e: MouseEvent) => {
      e.preventDefault();
      start(e);
    };
    const mv = (e: MouseEvent) => {
      e.preventDefault();
      move(e);
    };
    const up = (e: MouseEvent) => {
      end(e);
    };

    el.addEventListener('mousedown', down);
    el.addEventListener('mousemove', mv);
    el.addEventListener('mouseup', up);
    el.addEventListener('mouseleave', up);
    // el.addEventListener('mouseleave', cancelDrawing);

    return () => {
      el.removeEventListener('mousedown', down);
      el.removeEventListener('mousemove', mv);
      el.removeEventListener('mouseup', up);
      // el.removeEventListener('mouseleave', cancelDrawing);
      el.removeEventListener('mouseleave', up);
    };
  }, [tool]);

  function clearShapes() {
    setShapes([])
  }

  const renderShapes = () => {
    return shapes.map((s, i) => {
      if (!s.start || !s.end) return null;
      if (s.type === ShapeType.RECT) {
        const x = Math.min(s.start.x, s.end.x);
        const y = Math.min(s.start.y, s.end.y);
        const w = Math.abs(s.end.x - s.start.x);
        const h = Math.abs(s.end.y - s.start.y);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: w,
              height: h,
              border: '2px solid red',
              background: 'rgba(255, 200, 0, 0.4',
              pointerEvents: 'none',
            }}
          />
        )
      }
      else if (s.type === ShapeType.CIR) {
        // const center = s.start;
        const x = Math.min(s.start.x, s.end.x);
        const y = Math.min(s.start.y, s.end.y);
        const w = Math.abs(s.end.x - s.start.x);
        const h = Math.abs(s.end.y - s.start.y);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: w,
              height: h,
              borderRadius: '50%',
              border: '2px solid darkblue',
              background: 'rgba(55, 200, 200, 0.4',
              pointerEvents: 'none',
            }}
          />
        )

      } else {
        const dx = s.end.x - s.start.x;
        const dy = s.end.y - s.start.y;
        const len = Math.hypot(dx, dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: s.start.x,
              top: s.start.y,
              width: len,
              height: 2, // The line thickness
              background: 'green',
              pointerEvents: 'none',
              transformOrigin: '0% 50%',
              transform: `rotate(${angle}deg)`,
            }}
          />
        )
      }
    })
  }

  return {
    clearShapes: clearShapes,
    renderShapes: renderShapes,
  };
}
