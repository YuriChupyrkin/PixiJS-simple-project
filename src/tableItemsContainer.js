import { Container } from '@pixi/display';
import * as AnimationHelper from './animationHelper';
import Constants from './constants';
import GameSprite from './gameSprite.js'

export default class TableItemsContainer extends Container {
  constructor(x, y, tableTexture, bookStandTexture, globeTexture, plantTexture) {
    super();

    this.tableX = x;
    this.tableY = y;

    const globeX = x + 110;
    const globeY = y - 90;
    const bookStandY = y - 70;
    const plantX = x + 60;
    const plantY = y - 25;

    const table = new GameSprite(x, y, tableTexture, Constants.TABLE);
    this.globe = new GameSprite(globeX, globeY, globeTexture, Constants.GLOBE);
    this.bookStand = new GameSprite(x, bookStandY, bookStandTexture, Constants.BOOK_STAND);
    this.plant = new GameSprite(plantX, plantY, plantTexture, Constants.PLANT);

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