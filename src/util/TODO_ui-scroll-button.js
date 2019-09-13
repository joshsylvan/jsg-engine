import { GameObject } from '../core/gameObject';

export class UiScrollButton extends GameObject {
  constructor(x, y, width, height, buttons = []) {
    super(x, y, width, height, 1);
    this._buttons = buttons;
    this._up = 33;
    this._down = 34;
  }

  input({ InputManager }) {
    if (InputManager.isKeyPressed(this._up)) {
      console.log('up');
    } else if (InputManager.isKeyPressed(this._down)) {
      console.log('down');
    }
  }

}