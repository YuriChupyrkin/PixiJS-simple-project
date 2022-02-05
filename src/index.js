import * as PIXI from 'pixi.js';
import { log } from './logger';
import { Game } from './game';

let app;

function runPixiApp() {
  log("start...");
  app = new PIXI.Application({
    width: 1390,
    height: 640,
    backgroundColor: 0xAAAAAA
  });

  document.body.appendChild(app.view);

  app.loader.baseUrl = 'assets';
  app.loader
    .add('hammer', 'icon_hammer.png')
    .add('background', 'back.png')
    .add('austin', 'Austin.png')
    .add('stair', 'stair.png')
    .add('stairIcon1', 'stair_icon_01.png')
    .add('stairIcon2', 'stair_icon_02.png')
    .add('stairIcon3', 'stair_icon_03.png')
    .add('stairIconBackground', 'stair_icon_background.png')
    .add('activeStairIconBackground', 'active_stair_icon_background.png')
    .add('newStair1', 'new_stair_01.png')
    .add('newStair2', 'new_stair_02.png')
    .add('newStair3', 'new_stair_03.png');
  app.loader.onComplete.add(onLoadingCompleted);
  app.loader.load();
}

function onLoadingCompleted() {
  log('assets loaded');
  var game = new Game(app);
  game.setup();
}

runPixiApp();
