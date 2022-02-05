import * as PIXI from 'pixi.js';
import Constants from './constants';
import Game from './game';

const gameSceneWidth = 1390;
const gameSceneHeight = 640;

class GameInitialize {
  init() {
    this.app = new PIXI.Application({
      width: gameSceneWidth,
      height: gameSceneHeight,
      backgroundColor: 0xAAAAAA,
    });

    document.body.appendChild(this.app.view);

    this.app.loader.baseUrl = 'assets';

    this.app.loader
      .add(Constants.HAMMER, 'icon_hammer.png')
      .add(Constants.BACKGROUND, 'back.png')
      .add(Constants.AUSTIN, 'Austin.png')
      .add(Constants.STAIR, 'stair.png')
      .add(Constants.LOGO, 'logo.png')
      .add(Constants.CONTINUE_BUTTON, 'btn.png')
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

    this.app.loader.onComplete.add(() => this.onLoadingCompleted());
    this.app.loader.load();
  }

  onLoadingCompleted() {
    const game = new Game(this.app);
    game.run();
  }

  // Solution has taken from https://www.html5gamedevs.com/topic/42955-solved-how-to-scale-the-pixijs-view-without-making-the-game-blurry/
  resize() {
    const canvas = this.app.view;
    let scaleX = window.innerWidth / canvas.offsetWidth;
    let scaleY = window.innerHeight / canvas.offsetHeight;
    let scale = Math.min(scaleX, scaleY);
    canvas.style.transformOrigin = "0 0";
    canvas.style.transform = "scale(" + scale + ")";

    let center;
    if (canvas.offsetWidth > canvas.offsetHeight) {
      center = canvas.offsetWidth * scale < window.innerWidth ? 'horizontally' : 'vertically';
    } else {
      center = canvas.offsetHeight * scale < window.innerHeight ? 'vertically' : 'horizontally';
    }

    let margin;
    if (center === "horizontally") {
      margin = (window.innerWidth - canvas.offsetWidth * scale) / 2;
      canvas.style.marginTop = 0 + "px";
      canvas.style.marginBottom = 0 + "px";
      canvas.style.marginLeft = margin + "px";
      canvas.style.marginRight = margin + "px";
    }

    if (center === "vertically") {
      margin = (window.innerHeight - canvas.offsetHeight * scale) / 2;
      canvas.style.marginTop = margin + "px";
      canvas.style.marginBottom = margin + "px";
      canvas.style.marginLeft = 0 + "px";
      canvas.style.marginRight  = 0 + "px";
    }

    canvas.style.paddingLeft = 0 + "px";
    canvas.style.paddingRight  = 0 + "px";
    canvas.style.paddingTop  = 0 + "px";
    canvas.style.paddingBottom = 0 + "px";
    canvas.style.display = "-webkit-inline-box";
  }
}

const gameInitialize = new GameInitialize();
gameInitialize.init();
gameInitialize.resize();

window.onresize = () => gameInitialize.resize();
