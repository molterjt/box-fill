import { LINE_WIDTH } from "../../constants"
import { LineOrientation, type LineType, type Point } from "../../types"


export default class Line {
  public id: number;
  public start: Point;
  public end: Point;
  public orientation: LineOrientation;

  constructor(
    id: number,
    start: Point,
    end: Point,
    orientation: LineOrientation
  ) {
    this.id = id;
    this.start = start;
    this.end = end;
    this.orientation = orientation;
  }

  public renderLine() {
    return (
      <div
        key={`${this.id}-${this.orientation}`}
        style={this.getLineStyle(this)}
      />
    )
  }

  public getLineStyle(line: LineType): React.CSSProperties {
    if (line.orientation === LineOrientation.V) {
      return {
        background: 'black',
        position: 'absolute',
        width: LINE_WIDTH,
        height: line.end.y - line.start.y,
        left: line.start.x,
        top: line.start.y
      }
    } else {
      return {
        background: 'black',
        position: 'absolute',
        width: line.end.x - line.start.x,
        height: LINE_WIDTH,
        left: line.start.x,
        top: line.start.y
      }
    }
  }
}