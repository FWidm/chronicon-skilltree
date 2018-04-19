export class Tile {
  x: number;
  y: number;
  image: string;

  constructor(x: number|string, y: number|string, image = '.') {
    this.x = +x;
    this.y = +y;
    this.image = image;
  }
}
