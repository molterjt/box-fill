export enum LineOrientation {
  H = 'horizontal',
  V = 'vertical'
}
export type Point = { x: number, y: number, };
export type LineType = { start: Point, end: Point, orientation: LineOrientation; id: number };
export type BoxType = {
  tL: Point;
  tR: Point;
  bL: Point;
  bR: Point;
}
