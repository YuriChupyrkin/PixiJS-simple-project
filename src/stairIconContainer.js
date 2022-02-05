import { Container } from '@pixi/display';
import { GameSprite } from "./gameSprite";

export class StairIconContainer extends Container {
  constructor(x, y, texture, backgroundTexture, activeBackgroundTexture, name) {
    super();

    this.iconX = x;
    this.iconY = y;
    this.name = name;


    const bgX = x - 24;
    const bgY = y;
    const activeBgX = x - 15;
    const activeBgY = y + 4;

    this.icon = new GameSprite(x, y, texture, name);
    this.background = new GameSprite(bgX, bgY, backgroundTexture, 'background');
    this.activeBackground = new GameSprite(activeBgX, activeBgY, activeBackgroundTexture, 'activeBackground');
    this.activeBackground.visible = false;

    this.addChild(this.background);
    this.addChild(this.activeBackground);
    this.addChild(this.icon);
  }

  activate() {
    this.activeBackground.visible = true;
  }

  deactivate() {
    this.activeBackground.visible = false;
  }

  onPointerDown(handler) {
    this.icon.interactive = true;
    this.icon.on('pointerdown', handler);
  }
}