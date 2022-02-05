import { GameSprite } from './gameSprite.js'
import { getPositionByName } from './spritePositions';
import { StairIconContainer } from './stairIconContainer';
import * as AnimationHelper from './animationHelper';

export class Game {
  constructor(app) {
    this.app = app;
    this.background;
    this.hammer;
    this.austin;
    this.stair;
    this.okButton;

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
    return this.app.loader.resources[name].texture;
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

    this.hammer = this.createAndAddSprite('hammer');
    this.okButton = this.createAndAddSprite('okButton', false);

    this.okButton.onPointerDown(() => this.selectStair());

    this.starIconContainers.forEach(stairContainer => {
      stairContainer.onPointerDown(() => {
        this.onStairIconSelectedAsync(stairContainer);
      });
    });

    this.hammer.onPointerDown(async () => {
      await AnimationHelper.fadeOutAsync(this.hammer, 500);
      this.starIconContainers.forEach(async (stairContainer) => {
        await AnimationHelper.fadeInAsync(stairContainer, 300);
      });
    });
  }

  async onStairIconSelectedAsync(selectedIconContainer) {
    const appearedStairY = -100;
    const animationDuration = 200;

    this.starIconContainers.forEach(iconContainer => iconContainer.deactivate());
    selectedIconContainer.activate();

    this.showOkButton(selectedIconContainer);

    const prevStair = this.selectedStair;
    const selectedNewStair = this.getNewStair(selectedIconContainer);
    selectedNewStair.y = appearedStairY;
    this.selectedStair = selectedNewStair;

    await AnimationHelper.fadeOutAsync(prevStair, animationDuration);
    await AnimationHelper.fadeInAsync(selectedNewStair, animationDuration);

    const newStairPos = getPositionByName('newStair');
    await AnimationHelper.changePositionAsync(selectedNewStair, newStairPos, animationDuration);
  }

  showOkButton(selectedIconContainer) {
    this.okButton.x = selectedIconContainer.iconX - 30;
    this.okButton.y = selectedIconContainer.iconY + 120;
    this.okButton.visible = true;
  }

  getNewStair(selectedIconContainer) {
    const selectedStairName = this.stairIconMap[selectedIconContainer.name];
    return this.newStairs.filter(stair => stair.name == selectedStairName)[0];
  }

  selectStair() {
    this.starIconContainers.forEach(stairContainer => stairContainer.visible = false);
    this.okButton.visible = false;
    alert("Good Job!");
  }
}