import { getPositionByName } from './spritePositions';

import * as AnimationHelper from './animationHelper';
import { SpriteBuilder } from './spriteBuilder';
import Constants from './constants';

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
      [Constants.STAIR_ICON_1]: Constants.NEW_STAIR_1,
      [Constants.STAIR_ICON_2]: Constants.NEW_STAIR_2,
      [Constants.STAIR_ICON_3]: Constants.NEW_STAIR_3,
    };

    this.starIconContainers = [];
    this.newStairs = [];

    this.spriteBuilder = new SpriteBuilder(app);
  }

  addStageChild(sprite) {
    this.app.stage.addChild(sprite);
  }

  run() {
    this.addStageChild(this.spriteBuilder.createSprite(Constants.BACKGROUND));
    this.addStageChild(this.spriteBuilder.createTableContainer());

    this.addStageChild(this.spriteBuilder.createSprite(Constants.AUSTIN));
    this.addStageChild(this.spriteBuilder.createSprite(Constants.LOGO));

    this.stair = this.spriteBuilder.createSprite(Constants.STAIR);
    this.selectedStair = this.stair;
    this.addStageChild(this.stair);

    this.newStairs = Object.values(this.stairIconMap).map(newStairName => {
      var newStair = this.spriteBuilder.createNewStair(newStairName, false);
      this.addStageChild(newStair);
      return newStair;
    });

    this.starIconContainers = Object.keys(this.stairIconMap).map(starIconName => {
      var stairIconContainer = this.spriteBuilder.createStairIconSprite(starIconName, false);
      this.addStageChild(stairIconContainer);
      return stairIconContainer;
    });
  
    this.hammer = this.spriteBuilder.createSprite(Constants.HAMMER);
    this.addStageChild(this.hammer);

    this.okButton = this.spriteBuilder.createSprite(Constants.OK_BUTTON, false);
    this.addStageChild(this.okButton);

    this.handleEvents();
  }

  handleEvents() {
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

  selectStair() {
    this.starIconContainers.forEach(stairContainer => stairContainer.visible = false);
    this.okButton.visible = false;
    alert('Good Job!');
  }
}