import { LINE_WIDTH } from "../../constants";
import type { BoxType } from "../../types";

export default class BoxShape {
  public id: number;
  public points: BoxType;
  public fill: string = 'red';

  constructor(id: number, b: BoxType, fill: string) {
    this.points = b;
    this.fill = fill;
    this.id = id;
  }

  public getPoints() {
    return this.points;
  }

  public checkBoxCollision(boxB: BoxType): boolean {
    const a_minX = this.points.tL.x;
    const a_maxX = this.points.tR.x;
    const a_minY = this.points.tL.y;
    const a_maxY = this.points.bL.y;

    const b_minX = boxB.tL.x;
    const b_maxX = boxB.tR.x;
    const b_minY = boxB.tL.y;
    const b_maxY = boxB.bL.y;
    if (a_maxX <= b_minX || a_minX >= b_maxX) {
      // The boxes are separated horizontally. No collision.
      return false;
    }
    if (a_maxY <= b_minY || a_minY >= b_maxY) {
      // The boxes are separated vertically. No collision.
      return false;
    }
    return true;
  }
  public renderBox() {
    return (
      <div
        key={this.id}
        style={{
          position: 'absolute',
          left: this.points.tL.x + LINE_WIDTH,
          top: this.points.tL.y + LINE_WIDTH,
          width: this.points.tR.x - this.points.tL.x - LINE_WIDTH,
          height: this.points.bL.y - this.points.tL.y - LINE_WIDTH,
          background: this.fill,
        }
        }
      />
    )
  }
}