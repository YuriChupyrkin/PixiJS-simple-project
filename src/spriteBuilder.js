import { getPositionByName } from './spritePositions';
import StairIconContainer from './stairIconContainer';
import GameSprite from './gameSprite.js'
import Constants from './constants';
import TableItemsContainer from './tableItemsContainer';

export default class SpriteBuilder {
  constructor(app) {
    this.app = app;
  }

  createSprite(name, visibility = true, anchor = 0) {
    const position = getPositionByName(name);
    const sprite = new GameSprite(position.x, position.y, this.getTexture(name), name);
    sprite.visible = visibility;
    sprite.anchor.set(anchor);
    return sprite;
  };

  createTableContainer() {
    const tablePos = getPositionByName(Constants.TABLE);
    const tableTexture = this.getTexture(Constants.TABLE);
    const globeTexture = this.getTexture(Constants.GLOBE);
    const bookStandTexture = this.getTexture(Constants.BOOK_STAND);
    const plantTexture = this.getTexture(Constants.PLANT);
    return new TableItemsContainer(tablePos.x, tablePos.y, tableTexture, bookStandTexture, globeTexture, plantTexture);
  }

  createNewStair(name, visibility = true) {
    const newStairPos = getPositionByName(Constants.NEW_STAIR);
    const newStair = this.createSprite(name, visibility);
    newStair.x = newStairPos.x;
    newStair.y = newStairPos.y;
    return newStair;
  }

  createStairIconSprite(name, visibility = true) {
    const position = getPositionByName(name);
    const background = this.getTexture(Constants.STAIR_ICON_BACKGROUND);
    const activeBackground = this.getTexture(Constants.ACTIVE_STAIR_ICON_BACKGROUND);
    const container = new StairIconContainer(
      position.x,
      position.y,
      this.getTexture(name),
      background,
      activeBackground,
      name);

    container.visible = visibility;

    return container;
  }

  getTexture(name) {
    return this.app.loader.resources[name].texture;
  }
}


