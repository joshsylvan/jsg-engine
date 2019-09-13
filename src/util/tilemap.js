import { GameObject } from '../core/gameObject';

export class TileMap extends GameObject {
  constructor(id = ['tile-map']) {
    super(0, 0, 0, 0, 1, id);
    this._map = [];
    this._tiles = {};
    this._spriteSheet = null;
  }

  setPosition(x, y) {
    this._x = x;
    this._y = y;
  }

  setSize(width, height) {
    this.width = width;
    this.height = height;
  }

  setScale(scale) {
    this.scale = scale;
  }

  setSpriteSheet(spriteSheet) {
    const img = new Image();
    img.src = spriteSheet;
    this._spriteSheet = img;
  }

  addTile(tile) {
    this._tiles[tile.tileId] = tile;
  }

  addTiles(tiles) {
    tiles.forEach(tile => this.addTile(tile));
  }

  setMap(map) {
    this._map = map;
  }

  render({ canvas, ctx, deltaTime, InputManager, GameManager, Camera }) {
    const { x, y, width, height, scale, _spriteSheet, _tiles, _map } = this;
    if (!_spriteSheet) throw new Error('No sprite sheet');

    _map.forEach((tile, index) => {
      const { dx, dy, tileWidth, tileHeight, tileId } = _tiles[tile];
      const col = Math.floor(index % width);
      const row = Math.floor(index / width);
      const xPos = x + col * tileWidth * scale;
      const yPos = y + row * tileHeight * scale;
      ctx.drawImage(
        _spriteSheet,
        dx,
        dy,
        tileWidth,
        tileHeight,
        xPos,
        yPos,
        tileWidth * scale,
        tileHeight * scale,
      );
    });

  }

}

export function Tile(dx, dy, tileWidth, tileHeight, tileId) {
  return {
    dx,
    dy,
    tileWidth,
    tileHeight,
    tileId,
  };
}
