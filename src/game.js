import { getPositionByName } from './spritePositions';

import * as AnimationHelper from './animationHelper';
import SpriteBuilder from './spriteBuilder';
import Constants from './constants';

export default class Game {
  constructor(app) {
    this.app = app;
    this.hammer;
    this.austin;
    this.okButton;
    this.continueButton;

    this.selectedStair;

    this.starIconContainers = [];
    this.newStairs = [];

    this.spriteBuilder = new SpriteBuilder(app);

    this.stairIconMap = {
      [Constants.STAIR_ICON_1]: Constants.NEW_STAIR_1,
      [Constants.STAIR_ICON_2]: Constants.NEW_STAIR_2,
      [Constants.STAIR_ICON_3]: Constants.NEW_STAIR_3,
    };
  }

  run() {
    this.drawScene();
    this.subsribe();
    this.runAnimations();
  }

  addStageChild(sprite) {
    this.app.stage.addChild(sprite);
  }

  drawScene() {
    this.addStageChild(this.spriteBuilder.createSprite(Constants.BACKGROUND));

    this.tableContainer = this.spriteBuilder.createTableContainer();
    this.addStageChild(this.tableContainer);

    this.addStageChild(this.spriteBuilder.createSprite(Constants.LOGO));

    const stair = this.spriteBuilder.createSprite(Constants.STAIR);
    this.selectedStair = stair;
    this.addStageChild(stair);

    this.newStairs = Object.values(this.stairIconMap).map(newStairName => {
      const newStair = this.spriteBuilder.createNewStair(newStairName, false);
      this.addStageChild(newStair);
      return newStair;
    });

    this.austin = this.spriteBuilder.createSprite(Constants.AUSTIN);
    this.addStageChild(this.austin);

    this.starIconContainers = Object.keys(this.stairIconMap).map(starIconName => {
      const stairIconContainer = this.spriteBuilder.createStairIconSprite(starIconName, false);
      this.addStageChild(stairIconContainer);
      return stairIconContainer;
    });
  
    this.hammer = this.spriteBuilder.createSprite(Constants.HAMMER);
    this.hammer.visible = false;
    this.addStageChild(this.hammer);

    this.okButton = this.spriteBuilder.createSprite(Constants.OK_BUTTON, false);
    this.addStageChild(this.okButton);

    this.continueButton = this.spriteBuilder.createSprite(Constants.CONTINUE_BUTTON, true, 0.5);
    this.addStageChild(this.continueButton);
  }

  subsribe() {
    this.okButton.onPointerDown(() => this.onSelectStairAsync());
    this.hammer.onPointerDown(async () => this.onHammerClickAsync());
    this.continueButton.onPointerDown(() => this.onContinueClickAsync());

    this.starIconContainers.forEach(stairContainer => {
      stairContainer.onPointerDown(() => {
        this.onStairIconSelectedAsync(stairContainer);
      });
    });
  }

  runAnimations() {
    setTimeout(() => {
      AnimationHelper.fadeInAsync(this.hammer, 500);
    }, 1500);
    
    AnimationHelper.pulseAsync(this.continueButton, 700);
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

    const newStairPos = getPositionByName(Constants.NEW_STAIR);
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

  async onHammerClickAsync() {
    await AnimationHelper.fadeOutAsync(this.hammer, 500);
    this.starIconContainers.forEach((stairContainer) => {
      AnimationHelper.fadeInAsync(stairContainer, 300);
    });
  }

  async onSelectStairAsync() {
    this.hideButtons();

    await AnimationHelper.changePositionAsync(this.austin, {x: 1500, y: -250}, 1000, 'easeInExpo');
    await this.tableContainer.pushPlantAsync(1000);
    alert('Good Job!');
  }

  async onContinueClickAsync() {
    this.hideButtons();
    await AnimationHelper.changePositionAsync(this.austin, {x: -100, y: this.austin.y }, 1000, 'easeOutSine');
    await this.tableContainer.pushPlantAsync(1000);

    alert('Wasted!');
  }

  hideButtons() {
    this.starIconContainers.forEach(stairContainer => stairContainer.visible = false);
    this.okButton.visible = false;
    this.hammer.visible = false;
    this.continueButton.visible = false;
  }
}