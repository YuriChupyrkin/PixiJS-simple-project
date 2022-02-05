import { ease } from 'pixi-ease'

export function fadeInAsync(sprite, duration, animation = 'easeInOutQuad') {
  sprite.alpha = 0;
  sprite.visible = true;

  const fadeInAnmation = ease.add(
    sprite,
    {
      alpha: 1
    },
    {
      repeat: false,
      duration: duration,
      ease: animation 
    }
  );

  return new Promise((resolve, reject) => {
    fadeInAnmation.once('complete', () => {
      resolve();
    });
  });
}

export function fadeOutAsync(sprite, duration, animation = 'easeInOutQuad') {
  const fadeOutAnmation = ease.add(
    sprite,
    {
      alpha: 0
    },
    {
      repeat: false,
      duration: duration,
      ease: animation
    }
  );

  return new Promise((resolve, reject) => {
    fadeOutAnmation.once('complete', () => {
      sprite.visible = false;
      resolve();
    });
  });
}

export function changePositionAsync(sprite, newPosition, duration, animation = 'easeInOutQuad') {
  const changePositionAnimation = ease.add(
    sprite,
    {
      position: {
        x: newPosition.x,
        y: newPosition.y
      }
    },
    {
      repeat: false,
      duration: duration,
      ease: animation
    }
  );

  return new Promise((resolve, reject) => {
    changePositionAnimation.once('complete', () => {
      resolve();
    });
  });
}

export function pulseAsync(sprite, duration, animation = 'easeInOutQuad') {
  const pulseAnimation = ease.add(
    sprite,
    {
      height: sprite.height * 0.9,
      width: sprite.width * 0.9,
    },
    {
      repeat: true,
      reverse: true,
      duration: duration,
      ease: animation
    }
  );

  return new Promise((resolve, reject) => {
    pulseAnimation.once('complete', () => {
      resolve();
    });
  });
}

export function pushAwayAsync(sprite, newPosition, duration, animation = 'easeInOutQuad') {
  const pushAwayAnimation = ease.add(
    sprite,
    {
      position: {
        x: newPosition.x,
        y: newPosition.y
      },
      rotation: Math.PI * 2
    },
    {
      repeat: false,
      duration: duration,
      ease: animation
    }
  );

  return new Promise((resolve, reject) => {
    pushAwayAnimation.once('complete', () => {
      resolve();
    });
  });
}