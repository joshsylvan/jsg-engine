export function Input(canvas) {
  const _canvas = canvas;
  const _keyDown = {};
  const _keyPressed = {};
  const _keyUpDelay = 100;
  const _scrollTimeout = 100;
  let _mouseDown = false;
  let _mouseUp = false;
  let _mouseData = null;

  let _scrollingDebounce = null;
  let _scrollData = null;

  const _onKeyDown = function (e) {
    e.preventDefault();
    _keyDown[e.keyCode] = true;
  }

  const _onKeyUp = function (e) {
    e.preventDefault();
    _keyDown[e.keyCode] = false;
    _keyPressed[e.keyCode] = true;
    setTimeout(() => _keyPressed[e.keyCode] = false, _keyUpDelay);
  }

  const _onMouseDown = function (e) {
    _mouseDown = true;
  }

  const _onMouseUp = function (e) {
    _mouseUp = true;
    _mouseDown = false;
    setTimeout(() => _mouseUp = false, _keyUpDelay);
  }

  const _onMouseMove = function (e) {
    _mouseData = e;
  }

  const isMouseDown = function () {
    return _mouseDown;
  }

  const isMouseUp = function () {
    if (_mouseUp) {
      _mouseUp = false;
      return true;
    }
    return false;
  }

  const _onScroll = function (e) {
    e.preventDefault();
    clearTimeout(_scrollingDebounce);
    _scrollingDebounce = setTimeout(() => {
      _scrollData = null;
    }, _scrollTimeout);
    _scrollData = e;
  }

  const isScrolling = () => _scrollData !== null;
  const getScrollData = () => _scrollData;

  const getMouseData = function () {
    return _mouseData;
  }

  const getMousePosition = function () {
    if (!_mouseData) return { x: -1, y: -1 };
    const { x, y } = _mouseData;
    const { clientWidth, clientHeight, width, height } = _canvas;
    return {
      x: (x / clientWidth) * width,
      y: ((y / clientHeight) * height)
    }
  }

  const isKeyUp = function (keyCode) {
    if (_keyPressed[keyCode]) {
      _keyPressed[keyCode] = false;
      return true;
    }
    return false;
  }

  const isKeyHeld = function (keyCode) {
    return _keyDown[keyCode] ? _keyDown[keyCode] : false;
  }

  window.addEventListener('keydown', _onKeyDown);
  window.addEventListener('keyup', _onKeyUp);
  canvas.addEventListener('wheel', _onScroll);
  canvas.onmousedown = _onMouseDown;
  canvas.onmouseup = _onMouseUp;
  canvas.addEventListener('mousemove', _onMouseMove);

  return {
    getMousePosition,
    isMouseUp,
    isMouseDown,
    isKeyHeld,
    isKeyUp,
    getMouseData,
    isScrolling,
    getScrollData,
  }
};