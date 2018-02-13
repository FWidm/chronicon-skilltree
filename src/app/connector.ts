import {Tile} from './tile';


export class Connector {
  constructor(private from: Tile, private  to: Tile) {
  }

  public getCenterX() {
    return (this.from.x + this.to.x) / 2;
  }

  public getCenterY() {
    return (this.from.y + this.to.y) / 2;
  }

  getAngleRad() {
    return Math.atan2(this.to.y - this.from.y, this.to.x - this.from.x);
  }

  getWidth() {
    const baseSize = 80;
    return Math.max(Math.abs(baseSize * (this.to.x - this.from.x)), Math.abs(baseSize * (this.to.y - this.from.y)));
  }

}
