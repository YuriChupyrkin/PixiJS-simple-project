import * as PIXI from 'pixi.js'

console.log(PIXI);

export class GameSprite extends PIXI.Sprite {
  constructor(x, y, texture, name) {
    super(texture);
    this.name = name;
    this.x = x;
    this.y = y;
  }

  onPointerDown(handler) {
    this.interactive = true;
    this.on('pointerdown', handler);
  }
}
