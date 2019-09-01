import { GameObject } from '../core/gameObject';
import { Collider, isPointInBox } from '../core/collisions';

// TODO: fix the mouse scaling issue
// TODO: somthing to do with css scaling when the canvas does not start on the left of the screen (if entered may not work)
export class UiButton extends GameObject {
  constructor(x, y, width, height, scale, tags) {
    super(x, y, width, height, scale, tags);

    this._text = 'button';

    this._hoverBackgroundColor = 'red';

    const defaultProps = {
      textSize: 13,
      textColor: '#ffffff',
      backgroundColor: 'blue',
    };
    this._buttonStates = {
      'idle': { ...defaultProps },
      'hover': { ...defaultProps },
      'click': { ...defaultProps },
      'disabled': { ...defaultProps },
    };
    this._buttonProps = this._buttonStates['idle'];

    this.collider = new Collider(0, 0, this.width, this.height, this.scale);
    this._events = {
      'onclick': null,
      'onhover': null,
      'onidle': null,
    };
  }

  setText(text) {
    this._text = text;
  }

  setButtonState(stateKey) {
    if (!this._buttonStates[stateKey]) throw new Error('Invalid button state');
    this._buttonProps = this._buttonStates[stateKey];
  }

  setButtonProps(stateKey, { text, textSize, textColor, backgroundColor }) {
    if (!this._buttonStates[stateKey]) throw new Error('Invalid button state');
    this._buttonStates[stateKey] = { text, textSize, textColor, backgroundColor };
  }

  addEvent(eventKey, eventFunction) {
    this._events[eventKey] = eventFunction;
  }

  onClick() {
    if (this._events['onclick']) this._events['onclick']();
  }

  onHover() {
    if (this._events['onhover']) this._events['onhover']();
  }

  onIdle() {
    if (this._events['onidle']) this._events['onidle']();
  }

  input({ canvas, ctx, deltaTime, InputManager, GameManager, Camera }) {
    const mousePosition = InputManager.getMousePosition();
    if (isPointInBox(mousePosition.x, mousePosition.y, this)) {
      if (InputManager.isMouseUp()) {
        this.onClick();
      } else {
        this.onHover();
      }
    } else {
      this.onIdle();
    }
  }

  update({ canvas, ctx, deltaTime, InputManager, GameManager, Camera }) {

  }

  render({ canvas, ctx, deltaTime, InputManager, GameManager, Camera }) {
    const { x, y, width, height, scale, _buttonProps, _text } = this;
    const { textSize, textColor, backgroundColor } = _buttonProps;
    const cameraPos = Camera.getPosition();
    ctx.beginPath();
    ctx.fillStyle = backgroundColor;
    ctx.rect(x - cameraPos.x, y - cameraPos.y, width * scale, height * scale);
    ctx.fill();

    ctx.font = `${textSize}px Avenir`;
    ctx.fillStyle = textColor;
    ctx.textAlign = "center";
    ctx.fillText(
      _text,
      x - cameraPos.x + (width * scale) / 2,
      y - cameraPos.y + (height * scale) / 2 + textSize / 3,
    );
    ctx.closePath();
  }

}