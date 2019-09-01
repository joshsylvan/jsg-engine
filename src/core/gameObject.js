export class GameObject {
  constructor(x, y, width, height, scale, tags) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.scale = scale;
    this.collider = null;
    this.animator = null;
    this.tags = tags;
    this.layer = 0;
  }
  init(GameManager) { }
  onDestroy(GameManager) { }
  awake({ canvas, ctx, deltaTime, InputManager, GameManager, Camera }) { }
  input({ canvas, ctx, deltaTime, InputManager, GameManager, Camera }) { }
  update({ canvas, ctx, deltaTime, InputManager, GameManager, Camera }) { }
  render({ canvas, ctx, deltaTime, InputManager, GameManager, Camera }) { }
};
