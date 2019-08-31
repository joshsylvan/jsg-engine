export function Manager(scenes, state, canvas) {
  const _canvas = canvas;
  let _nextScene = null;
  const _state = state;
  if (!scenes || scenes.length === 0) throw new Error('No scenes in scene manager');
  const _scenes = {};
  scenes.forEach(scene => _scenes[scene.name] = scene);
  let _currentScene = scenes[0];
  let _sleep = true;

  const getCurrentScene = () => _currentScene;
  const getState = () => _state;
  const setState = (newState) => _state = { ..._state, ...newState };

  const loadScene = (name) => {
    const scene = _scenes[name];
    if (!scene) throw new Error('Scene');
    _nextScene = name;
  }

  const initScene = (GameManager) => {
    _currentScene.loadScene();
    _currentScene.init(_canvas, GameManager);
    _sleep = true;
  }

  const update = ({ canvas, ctx, deltaTime, InputManager, GameManager, Camera }) => {
    if (_sleep) {
      _currentScene.getGameObjects().forEach(obj => {
        obj.awake({ canvas, ctx, deltaTime, InputManager, GameManager, Camera });
      });
      _currentScene.getUiObjects().forEach(obj => {
        obj.awake({ canvas, ctx, deltaTime, InputManager, GameManager, Camera });
      });
      _sleep = false;
    }

    _currentScene.updateScene({ canvas, ctx, deltaTime, InputManager, GameManager, Camera });
    if (_nextScene) {
      _currentScene.onDestroy(GameManager);
      const scene = _scenes[_nextScene];
      _currentScene = scene;
      _nextScene = null;
      initScene(GameManager);
    };
  }

  return {
    initScene,
    update,
    getCurrentScene,
    getState,
    setState,
    loadScene,
  }
}