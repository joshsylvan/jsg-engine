// TODO: NOT SURE ON THE IMPLEMENTATION YET CLIPPING IS HARD TO DO
import { GameObject } from '../core/gameObject';

export class UiScrollable extends GameObject {
  constructor(x, y, width, height, scale, color) {
    super(100, 100, 150, 300, 1, ['rect']);
    this.color = color;


    this.currentY = 0;
    this.scrollPaneHeight = 600; // if this is the same as height infinity


    this.scrollPanePadding = 2;
    this.scrollBarWidth = 10;

    this.scrollPaneInnerWidth = width * scale - this.scrollPanePadding * 2;
    this.scrollPaneInnerHeight = height * scale - this.scrollPanePadding * 2;
  }

  input({ InputManager }) {
    if (InputManager.isScrolling()) {
      const { deltaX, deltaY } = InputManager.getScrollData();
      this.currentY += deltaY;
      if (this.currentY <= 0) this.currentY = 0;
      if (this.currentY >= this.scrollClamp) this.currentY = this.scrollClamp;
    }
  }

  render({ canvas, ctx, deltaTime, InputManager, GameManager, Camera }) {
    const {
      x,
      y,
      scale,
      width,
      height,
      scrollPanePadding,
      scrollBarWidth,
    } = this;
    const cameraPos = Camera.getPosition();

    const renderX = x - cameraPos.x;
    const renderY = y - cameraPos.y;

    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.rect(renderX, renderY, width * scale, height * scale);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = 'green';
    ctx.rect(
      renderX + scrollPanePadding * scale,
      renderY + scrollPanePadding * scale,
      width * scale - scrollPanePadding * scale * 2,
      height * scale - scrollPanePadding * scale * 2,
    );
    ctx.fill();
    ctx.closePath();

    const scrollBarX = renderX + scrollPanePadding * scale + (width - scrollBarWidth - scrollPanePadding * 2) * scale;
    const scrollBarY = renderY + scrollPanePadding * scale;
    const scrollBarHeight = height - scrollPanePadding * 2;
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.rect(
      scrollBarX,
      scrollBarY,
      scrollBarWidth * scale,
      scrollBarHeight * scale,
    );
    ctx.fill();
    ctx.closePath();


    const knobHeight = this.totalScrollAmount / this.scrollPaneHeight;
    ctx.beginPath();
    ctx.fillStyle = 'yellow';
    ctx.rect(
      scrollBarX,
      scrollBarY + (this.currentY) * scale,
      (scrollBarWidth) * scale,
      ((scrollBarHeight) * scale) * knobHeight,
    );
    ctx.fill();
    ctx.closePath();

    this.totalScrollAmount = (this.scrollPaneHeight - this.height);
    this.scrollClamp = this.totalScrollAmount * knobHeight - scrollPanePadding;
    // console.log(this.currentY / this.scrollClamp);

    // Content
    ctx.font = `20px Avenir`;
    ctx.fillStyle = 'black';
    ctx.textAlign = "left";
    ctx.fillText(
      '_text',
      renderX,
      renderY - this.currentY + 20,
    );

    // ctx.beginPath();
    // ctx.save();
    // ctx.rect(
    //   renderX + scrollPanePadding * scale,
    //   renderY + scrollPanePadding * scale,
    //   width * scale - scrollPanePadding * scale * 2,
    //   height * scale - scrollPanePadding * scale * 2,
    // );
    // ctx.clip();
    // ctx.restore();
    // ctx.closePath();

  }
}