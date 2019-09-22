import { Input } from './core/input';
import { SoundManager } from './core/sounds';
import { Manager } from './core/manager';
import { defaultScene } from './scenes/default.scene';

// TODO: Look at lazy loading in scenes
// import('./scenes/menu.scene').then(({ menuScene })=> {
// do something with modules.
// })

// canvas, ctx, deltaTime, Input, GameManager, Camera 

export const createGame = (canvas) => {
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  let isPaused = false;
  let last = 0;
  const InputManager = new Input(canvas);
  const GameManager = new Manager(
    [defaultScene],
    {},
    canvas
  );
  const Sounds = SoundManager();
  // Sounds.addSounds([
  //   ['menu.mp3', 'menu'],   
  // ]);
  GameManager.pauseGame = () => isPaused = true;
  GameManager.resumeGame = () => isPaused = false;
  GameManager.togglePause = () => isPaused = !isPaused;
  GameManager.isPaused = () => isPaused;
  GameManager.Sounds = Sounds;
  let Camera;

  const input = (deltaTime) => {
    if (!isPaused) {
      GameManager.getCurrentScene().getGameObjects().forEach(obj => {
        obj.input({ canvas, ctx, deltaTime, InputManager, GameManager, Camera });
      });
    }
    GameManager.getCurrentScene().getUiObjects().forEach(obj => {
      obj.input({ canvas, ctx, deltaTime, InputManager, GameManager, Camera });
    });
    Camera.input({ canvas, ctx, deltaTime, InputManager, GameManager, Camera });
  }

  const update = (deltaTime) => {
    if (!isPaused) {
      GameManager.getCurrentScene().getGameObjects().forEach(obj => {
        obj.update({ canvas, ctx, deltaTime, InputManager, GameManager, Camera });
      });
    }
    GameManager.getCurrentScene().getUiObjects().forEach(obj => {
      obj.update({ canvas, ctx, deltaTime, InputManager, GameManager, Camera });
    });
    Camera.update({ canvas, ctx, deltaTime, InputManager, GameManager, Camera });
  }

  const render = (deltaTime) => {
    if (!isPaused) {
      const { x, y } = Camera.getPosition();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.beginPath();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.closePath();
      ctx.translate(Math.round(x), Math.round(y));
      GameManager.getCurrentScene().getGameObjects().forEach(obj => {
        obj.render({ canvas, ctx, deltaTime, InputManager, GameManager, Camera });
      });
    }
    GameManager.getCurrentScene().getUiObjects().forEach(obj => {
      obj.render({ canvas, ctx, deltaTime, InputManager, GameManager, Camera });
    });
  }

  const main = () => {
    const now = performance.now();
    Camera = GameManager.getCurrentScene().getCamera();
    const deltaTime = (now - last) / 1000;
    input(deltaTime);
    update(deltaTime);
    render(deltaTime);

    GameManager.update({ canvas, ctx, deltaTime, InputManager, GameManager, Camera });
    last = now;
    requestAnimationFrame(main);
  }

  GameManager.initScene(GameManager);
  last = performance.now();
  requestAnimationFrame(main);
}