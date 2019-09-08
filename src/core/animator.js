export function Animator(img) {
  const _img = img;
  const _animations = {};
  let _currentAnimation = null;
  let _currentTime = 0;
  let _currentFrame = 0;
  let _isActive = false;

  const addAnimation = (name, animation) => _animations[name] = animation;
  const setActive = (isActive) => _isActive = isActive;
  const setCurrentTime = (currentTime) => _currentTime = currentTime;
  const getCurrentAnimation = () => _currentAnimation;
  const hasAnimationFinished = () => {
    const anim = _animations[_currentAnimation];
    if (anim.isLoop) return false;
    return _currentFrame === anim.frameCount;
  }
  const setAnimation = (name) => {
    if (name === _currentAnimation) return;
    _currentAnimation = name;
    _currentTime = 0;
    _currentFrame = 0;
  }
  const render = (deltaTime, ctx, xPos, yPos, scale) => {
    const anim = _animations[_currentAnimation];
    if (!_isActive) return;
    if (anim.isStatic()) {
      ctx.drawImage(
        _img,
        anim.getX(),
        anim.getY(),
        anim.getTileWidth(),
        anim.getTileHeight(),
        xPos,
        yPos,
        anim.getTileWidth() * scale,
        anim.getTileHeight() * scale,
      );
    } else {
      _currentTime += deltaTime;
      if (_currentTime >= anim.getFrameDuration()) {
        const leftOverTime = _currentTime - anim.getFrameDuration();
        _currentTime = leftOverTime;
        _currentFrame++;
        if (_currentFrame > anim.getFrameCount()) _currentFrame = 0;
      }
      ctx.drawImage(
        _img,
        anim.getX() + (_currentFrame * anim.getTileWidth()),
        anim.getY(),
        anim.getTileWidth(),
        anim.getTileHeight(),
        xPos,
        yPos,
        anim.getTileWidth() * scale,
        anim.getTileHeight() * scale,
      );
    }
  }

  return {
    addAnimation,
    setActive,
    setCurrentTime,
    getCurrentAnimation,
    hasAnimationFinished,
    setAnimation,
    render,
  };
}

export function StaticAnimation(x, y, tileWidth, tileHeight) {
  const _x = x;
  const _y = y;
  const _tileWidth = tileWidth;
  const _tileHeight = tileHeight;

  return {
    getX: () => _x,
    getY: () => _y,
    getTileWidth: () => _tileWidth,
    getTileHeight: () => _tileHeight,
    isStatic: () => true,
  }
}

export function Animation(x, y, tileWidth, tileHeight, frameCount, frameDuration, isLoop) {
  const _x = x;
  const _y = y;
  const _tileWidth = tileWidth;
  const _tileHeight = tileHeight;
  const _frameCount = frameCount;
  const _frameDuration = frameDuration;
  const _isLoop = isLoop;

  return {
    getX: () => _x,
    getY: () => _y,
    getTileWidth: () => _tileWidth,
    getTileHeight: () => _tileHeight,
    getFrameDuration: () => _frameDuration,
    getFrameCount: () => _frameCount,
    isLoop: () => _isLoop,
    isStatic: () => false,
  }
}