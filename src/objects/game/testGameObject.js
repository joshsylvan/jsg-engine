import { GameObject } from '../../core/gameObject';

export class TestGameObject extends GameObject {
  constructor(x, y) {
    super(x, y, 10, 10, 2, 'test');
  }

  init(GameManager) {
  }

  awake(props) {
  }

  input({ InputManager, GameManager }) {
    if (InputManager.isKeyUp(87)) {
      GameManager.getCurrentScene().addGameObject(new TestGameObject(this.x + 10, this.x + 10));
      GameManager.getCurrentScene().removeGameObject(this);
    }
  }

  render({ ctx }) {
    const { x, y, width, height, scale } = this;
    ctx.rect(x, y, width * scale, height * scale);
    ctx.stroke();
  }
}