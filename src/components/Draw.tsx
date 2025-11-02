import { useRef, useState } from 'react'
import CanvasArea from './CanvasArea'
import { ShapeType } from '../types';
import { useSimpleShapes } from '../hooks/useSimpleShapes';

export default function Draw() {
  const [tool, setTool] = useState<ShapeType>(ShapeType.LINE);
  const canvasRef = useRef<HTMLDivElement>(null);
  const { clearShapes, renderShapes } = useSimpleShapes(canvasRef, tool);
  return (
    <div className={'container'}>
      <CanvasArea canvasRef={canvasRef}>
        {renderShapes()}
      </CanvasArea>
      <div className='toolbar' style={{ marginTop: '20px', gap: '8p' }}>
        <button
          className={'btn generate'}
          style={tool === ShapeType.RECT ? { backgroundColor: 'rgba(250, 100, 10, 0.7)', borderRadius: '4px', color: 'white' } : undefined}
          onClick={() => setTool(ShapeType.RECT)}
        >
          Rect
        </button>
        <button
          className={'btn generate'}
          style={tool === ShapeType.LINE ? { backgroundColor: 'rgba(250, 100, 10, 0.7)', borderRadius: '4px', color: 'white' } : undefined}
          onClick={() => setTool(ShapeType.LINE)}
        >
          Line
        </button>
        <button
          className={'btn generate'}
          style={tool === ShapeType.CIR ? { backgroundColor: 'rgba(250, 100, 10, 0.7)', borderRadius: '4px', color: 'white' } : undefined}
          onClick={() => setTool(ShapeType.CIR)}
        >
          Circle
        </button>
        <button className={'btn clear'} onClick={clearShapes}>Clear</button>
      </div>
    </div >
  )
}