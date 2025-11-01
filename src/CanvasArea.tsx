import { useRef } from "react";
import { VIEW_HEIGHT, VIEW_WIDTH } from "./constants";

const CANVAS_BACKGROUND = 'rgba(200,200,200, 0.4)'

export default function CanvasArea({ children }: React.PropsWithChildren) {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  return (
    <div
      ref={canvasRef}
      style={{
        position: 'relative',
        background: CANVAS_BACKGROUND,
        height: `${VIEW_HEIGHT}px`, width: `${VIEW_WIDTH}px`
      }}
    >
      {children}
    </div>
  )
}