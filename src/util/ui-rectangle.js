import { GameObject } from '../gameObject';

export class UiRectangle extends GameObject {
  constructor(x, y, width, height, scale, color) {
    super(x, y, width, height, scale, 'rect');
    this.color = color;
  }

  render({ ctx, Camera }) {
    const { x, y, scale, color, width, height } = this;
    const cameraPos = Camera.getPosition();
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.rect(x - cameraPos.x, y - cameraPos.y, width * scale, height * scale);
    ctx.fill();
    ctx.closePath();
  }
}