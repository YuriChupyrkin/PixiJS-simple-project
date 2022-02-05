import { Ease, ease } from 'pixi-ease'
import { GameSprite } from './gameSprite.js'
import { SpritePositions, getPositionByName } from './spritePositions';
import * as AnimationHelper from './animationHelper';

export class Game {
  constructor(app) {
    this.app = app;
    this.resources = this.app.loader.resources;
    this.background;
    this.hammer;
    this.austin;
    this.stair;
    this.newStair1;
    this.newStair2;
    this.newStair3;

    this.selectedStair;
  }

  getTexture(name) {
    return this.resources[name].texture;
  }

  createAndAddSprite(position, textureName, visibility = true) {
    const sprite = new GameSprite(position.x, position.y, this.getTexture(textureName));
    sprite.visible = visibility;
    this.app.stage.addChild(sprite);
    return sprite;
  }

  createAndAddStairIconSprite(position, textureName, visibility = true) {
    const stairContainer = new GameSprite(position.x, position.y, this.getTexture('stairIconContainer'));
    const stairIcon = new GameSprite(28, 0, this.getTexture(textureName));
    stairContainer.visible = visibility;

    stairContainer.addChild(stairIcon);
    this.app.stage.addChild(stairContainer);
    return stairContainer;
  }

  setup() {
    const appearedNewStairPos = getPositionByName('appearedNewStair');

    this.background = this.createAndAddSprite(getPositionByName('background'), 'background');
    this.austin = this.createAndAddSprite(getPositionByName('austin'), 'austin');
    this.stair = this.createAndAddSprite(getPositionByName('stair'), 'stair');
    this.newStair1 = this.createAndAddSprite(appearedNewStairPos, 'newStair1', false);
    this.newStair2 = this.createAndAddSprite(appearedNewStairPos, 'newStair2', false);
    this.newStair3 = this.createAndAddSprite(appearedNewStairPos, 'newStair3', false);
    this.stairIcon1 = this.createAndAddStairIconSprite(getPositionByName('stairIcon1'), 'stairIcon1', false);
    this.stairIcon2 = this.createAndAddStairIconSprite(getPositionByName('stairIcon2'), 'stairIcon2', false);
    this.stairIcon3 = this.createAndAddStairIconSprite(getPositionByName('stairIcon3'), 'stairIcon3', false);

    this.selectedStair = this.stair;

    this.hammer = this.createAndAddSprite(getPositionByName('hammer'), 'hammer');


    this.stairIcon1.onPointerDown(() => this.selectStairAsync(this.newStair1));
    this.stairIcon2.onPointerDown(() => this.selectStairAsync(this.newStair2));
    this.stairIcon3.onPointerDown(() => this.selectStairAsync(this.newStair3));

    this.hammer.onPointerDown(async () => {
      await AnimationHelper.fadeOutAsync(this.hammer, 500);
      await AnimationHelper.fadeInAsync(this.stairIcon1, 300);
      await AnimationHelper.fadeInAsync(this.stairIcon2, 300);
      await AnimationHelper.fadeInAsync(this.stairIcon3, 300);

      // await AnimationHelper.fadeOutAsync(this.stair, 3000);
      // await AnimationHelper.fadeInAsync(this.newStair1, 1000);

      // const newStairPos = getPositionByName('newStair');
      // await AnimationHelper.changePositionAsync(this.newStair1, newStairPos, 500);
    });
  }

  async selectStairAsync(selectedStair) {
      const preStair = this.selectedStair;
      this.selectedStair = selectedStair;
      await AnimationHelper.fadeOutAsync(preStair, 200);
      await AnimationHelper.fadeInAsync(selectedStair, 200);

      const newStairPos = getPositionByName('newStair');
      await AnimationHelper.changePositionAsync(selectedStair, newStairPos, 200);
  }


  hideOptions() {
    this.changeVisibility(this.optionA, false);
    this.changeVisibility(this.optionB, false);
    this.changeVisibility(this.optionC, false);
  }

  changeVisibility(sprite, visibility) {
    sprite.visible = visibility;
  }

}