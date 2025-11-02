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

export type CircleType = {
  center: Point,
  radius: Point,
}

export enum TAB {
  ART = 'Mondrian',
  DRAW = 'FreeDraw',
  UN = 'Unknown'
}

export enum ShapeType {
  LINE = "line",
  RECT = "rect",
  CIR = 'circle',
}

export type Shape = {
  type: ShapeType;
  start: Point;
  end: Point
};

