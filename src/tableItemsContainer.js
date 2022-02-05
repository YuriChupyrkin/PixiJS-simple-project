import { Container } from '@pixi/display';
import { GameSprite } from './gameSprite';
import * as AnimationHelper from './animationHelper';
import Constants from './constants';

export class TableItemsContainer extends Container {
  constructor(x, y, tableTexture, bookStandTexture, globeTexture, plantTexture) {
    super();

    this.tableX = x;
    this.tableY = y;

    const table = new GameSprite(x, y, tableTexture, Constants.TABLE);
    this.globe = new GameSprite(x + 110, y - 90, globeTexture, Constants.GLOBE);
    this.bookStand = new GameSprite(x, y - 70, bookStandTexture, Constants.BOOK_STAND);
    this.plant = new GameSprite(x + 60, y - 25, plantTexture, Constants.PLANT);

    this.addChild(table);
    this.addChild(this.globe);
    this.addChild(this.bookStand);
    this.addChild(this.plant);
  }

  pushPlantAsync(duration) {
    return Promise.all([
      AnimationHelper.pushAwayAsync(this.plant, {x: -100, y: -300}, duration),
      AnimationHelper.pushAwayAsync(this.bookStand, {x: 2000, y: -300}, duration),
      AnimationHelper.pushAwayAsync(this.globe, {x: -100, y: 900}, duration),
    ]);
  }
}