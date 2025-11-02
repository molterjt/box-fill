import { VIEW_HEIGHT, VIEW_WIDTH } from "../constants";

const CANVAS_BACKGROUND = 'rgba(220, 215, 200, 0.75)'

interface CanvasAreaProps extends React.PropsWithChildren {
  canvasRef: React.RefObject<HTMLDivElement | null>;
}
export default function CanvasArea({ children, canvasRef }: CanvasAreaProps) {
  return (
    <div
      ref={canvasRef}
      style={{
        position: 'relative',
        background: CANVAS_BACKGROUND,
        cursor: 'crosshair',
        height: `${VIEW_HEIGHT}px`, width: `${VIEW_WIDTH}px`
      }}
    >
      {children}
    </div>
  )
}