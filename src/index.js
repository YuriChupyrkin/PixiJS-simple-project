import * as PIXI from 'pixi.js';
import { Game } from './game';
import Constants from './constants';

let app;

function runPixiApp() {
  app = new PIXI.Application({
    width: 1390,
    height: 640,
    backgroundColor: 0xAAAAAA
  });

  document.body.appendChild(app.view);

  app.loader.baseUrl = 'assets';
  app.loader
    .add(Constants.HAMMER, 'icon_hammer.png')
    .add(Constants.BACKGROUND, 'back.png')
    .add(Constants.AUSTIN, 'Austin.png')
    .add(Constants.STAIR, 'stair.png')
    .add(Constants.LOGO, 'logo.png')
    .add(Constants.GLOBE, 'globe.png')
    .add(Constants.PLANT, 'plant.png')
    .add(Constants.BOOK_STAND, 'book_stand.png')
    .add(Constants.TABLE, 'table.png')
    .add(Constants.OK_BUTTON, 'ok.png')
    .add(Constants.STAIR_ICON_1, 'stair_icon_01.png')
    .add(Constants.STAIR_ICON_2, 'stair_icon_02.png')
    .add(Constants.STAIR_ICON_3, 'stair_icon_03.png')
    .add(Constants.STAIR_ICON_BACKGROUND, 'stair_icon_background.png')
    .add(Constants.ACTIVE_STAIR_ICON_BACKGROUND, 'active_stair_icon_background.png')
    .add(Constants.NEW_STAIR_1, 'new_stair_01.png')
    .add(Constants.NEW_STAIR_2, 'new_stair_02.png')
    .add(Constants.NEW_STAIR_3, 'new_stair_03.png');
  app.loader.onComplete.add(onLoadingCompleted);
  app.loader.load();
}

function onLoadingCompleted() {
  var game = new Game(app);
  game.run();
}

runPixiApp();
