import { GameObject } from '../core/gameObject';
import { Collider, isPointInBox } from '../core/collisions';

// TODO: fix the mouse scaling issue
// TODO: somthing to do with css scaling when the canvas does not start on the left of the screen (if entered may not work)
export class UiButton extends GameObject {
  constructor(x, y, width, height, scale, tags) {
    super(x, y, width, height, scale, tags);

    this._text = null;
    this._image = null;

    this._clickCooldown = 100;
    this._isCoolingDown = false;
    this._cooldownTimeout = null;

    const defaultProps = {
      textSize: 13,
      textColor: '#ffffff',
      backgroundColor: 'blue',
      dx: 0,
      dy: 0,
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

  setImage(img) {
    const image = new Image();
    image.src = img;
    this._image = image;
  }

  setButtonState(stateKey) {
    if (!this._buttonStates[stateKey]) throw new Error('Invalid button state');
    this._buttonProps = this._buttonStates[stateKey];
  }

  setButtonProps(stateKey, { text, textSize, textColor, backgroundColor, dx = 0, dy = 0 }) {
    if (!this._buttonStates[stateKey]) throw new Error('Invalid button state');
    this._buttonStates[stateKey] = { text, textSize, textColor, backgroundColor, dx, dy };
  }

  addEvent(eventKey, eventFunction) {
    this._events[eventKey] = eventFunction;
  }

  onClick() {
    if (this._isCoolingDown) return;
    this._isCoolingDown = true;
    if (this._events['onclick']) this._events['onclick']();
    clearTimeout(this._cooldownTimeout);
    this._cooldownTimeout = setTimeout(() => this._isCoolingDown = false, this._clickCooldown);
  }

  onHover() {
    if (this._events['onhover']) this._events['onhover']();
  }

  onIdle() {
    if (this._events['onidle']) this._events['onidle']();
  }

  input({ canvas, ctx, deltaTime, InputManager, GameManager, Camera }) {
    if (this._isCoolingDown) return;
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
    const { x, y, width, height, scale, _buttonProps, _text, _image } = this;
    const { textSize, textColor, backgroundColor, dx, dy } = _buttonProps;

    const cameraPos = Camera.getPosition();
    ctx.beginPath();
    if (_image) {
      ctx.drawImage(
        _image,
        dx,
        dy,
        width,
        height,
        x - cameraPos.x,
        y - cameraPos.y,
        width * scale,
        height * scale,
      );
    } else {
      ctx.fillStyle = backgroundColor;
      ctx.rect(x - cameraPos.x, y - cameraPos.y, width * scale, height * scale);
      ctx.fill();
    }

    if (_text) {
      ctx.font = `${textSize}px Avenir`;
      ctx.fillStyle = textColor;
      ctx.textAlign = "center";
      ctx.fillText(
        _text,
        x - cameraPos.x + (width * scale) / 2,
        y - cameraPos.y + (height * scale) / 2 + textSize / 3,
      );
    }
    ctx.closePath();
  }

}