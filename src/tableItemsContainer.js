import { Container } from '@pixi/display';
import { GameSprite } from './gameSprite';
import Constants from './constants';

export class TableItemsContainer extends Container {
  constructor(x, y, tableTexture, bookStandTexture, globeTexture, plantTexture) {
    super();

    this.tableX = x;
    this.tableY = y;

    const table = new GameSprite(x, y, tableTexture, Constants.TABLE);
    const globe = new GameSprite(x + 110, y - 90, globeTexture, Constants.GLOBE);
    const bookStand = new GameSprite(x, y - 70, bookStandTexture, Constants.BOOK_STAND);
    const plant = new GameSprite(x + 60, y - 25, plantTexture, Constants.PLANT);

    this.addChild(table);
    this.addChild(globe);
    this.addChild(bookStand);
    this.addChild(plant);
  }
}