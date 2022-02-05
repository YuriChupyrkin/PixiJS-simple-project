import { Ease, ease } from 'pixi-ease'
import { settings } from '@pixi/settings';
import { GameSprite } from './gameSprite.js'
import { Container } from '@pixi/display';
import { SpritePositions, getPositionByName } from './spritePositions';
import { StairIconContainer } from './stairIconContainer';
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


    this.stairIconMap = {
      'stairIcon1': 'newStair1',
      'stairIcon2': 'newStair2',
      'stairIcon3': 'newStair3',
    };

    this.starIconContainers = [];
    this.newStairs = [];
  }

  getTexture(name) {
    return this.resources[name].texture;
  }

  createAndAddNewStair(name, visibility = true) {
    const newStairPos = getPositionByName('newStair');
    const newStair = this.createAndAddSprite(name, visibility);
    newStair.x = newStairPos.x;
    newStair.y = newStairPos.y;
    return newStair;
  }

  createAndAddSprite(name, visibility = true) {
    const position = getPositionByName(name);
    const sprite = new GameSprite(position.x, position.y, this.getTexture(name), name);
    sprite.visible = visibility;
    this.app.stage.addChild(sprite);
    return sprite;
  }

  createAndAddStairIconSprite(name, visibility = true) {
    const position = getPositionByName(name);
    const background = this.getTexture('stairIconBackground');
    const activeBackground = this.getTexture('activeStairIconBackground');
    const container = new StairIconContainer(
      position.x,
      position.y,
      this.getTexture(name),
      background,
      activeBackground,
      name);

    container.visible = visibility;
    this.app.stage.addChild(container);

    return container;
  }

  setup() {
    this.background = this.createAndAddSprite('background');
    this.austin = this.createAndAddSprite('austin');
    this.stair = this.createAndAddSprite('stair');
    this.selectedStair = this.stair;

    this.newStairs = Object.values(this.stairIconMap).map(newStairName =>
      this.createAndAddNewStair(newStairName, false));

    this.starIconContainers = Object.keys(this.stairIconMap).map(starIconName =>
      this.createAndAddStairIconSprite(starIconName, false));

    this.starIconContainers.forEach(stairContainer => {
      stairContainer.onPointerDown(() => {
        this.onStairIconSelectedAsync(stairContainer);
      });
    });

    this.hammer = this.createAndAddSprite('hammer');

    this.hammer.onPointerDown(async () => {
      await AnimationHelper.fadeOutAsync(this.hammer, 500);
      this.starIconContainers.forEach(async (stairContainer) => {
        await AnimationHelper.fadeInAsync(stairContainer, 300);
      });
    });
  }

  async onStairIconSelectedAsync(selectedIconContainer) {
    this.starIconContainers.forEach(iconContainer => iconContainer.deactivate());
    selectedIconContainer.activate();

    const prevStair = this.selectedStair;
    const selectedStairName = this.stairIconMap[selectedIconContainer.name];
    const selectedStair = this.newStairs.filter(stair => stair.name == selectedStairName)[0];
    selectedStair.y = -100;
    this.selectedStair = selectedStair;

    await AnimationHelper.fadeOutAsync(prevStair, 200);
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