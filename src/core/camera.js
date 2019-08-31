export function Camera(x, y, canvas) {
  let _x = x, _y = y;
  let _canvas = canvas;
  let _target = null;

  let _debugMode = true;
  let _debugX = 0, _debugY = 0;
  let _debugCameraSpeed = 100;

  const toggleDebugMode = () => _debugMode = !_debugMode;

  const setTarget = (gameObject) => _target = gameObject;

  const getPosition = () => ({ x: _x, y: _y });

  const setPosition = (x, y) => {
    _x = x;
    _y = y;
  }

  const update = ({ canvas, ctx, deltaTime, InputManager, GameManager, Camera }) => {
    if (_debugMode) {
      if (InputManager.isKeyHeld(37)) _debugX -= _debugCameraSpeed * deltaTime;
      if (InputManager.isKeyHeld(38)) _debugY -= _debugCameraSpeed * deltaTime;
      if (InputManager.isKeyHeld(39)) _debugX += _debugCameraSpeed * deltaTime;
      if (InputManager.isKeyHeld(40)) _debugY += _debugCameraSpeed * deltaTime;
      _x = -_debugX + _canvas.width / 2;
      _y = -_debugY + _canvas.height / 2;
      return;
    }
    if (_target) {
      _x = -_target.x + _canvas.width / 2;
      _y = -_target.y + _canvas.height / 2;
    } else {
      _x = _canvas.width / 2;
      _y = _canvas.height / 2;
    }
  }

  return {
    update,
    setTarget,
    setPosition,
    getPosition,
  };
};