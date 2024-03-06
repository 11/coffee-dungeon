import { Vector2 } from '../engine/threejs-math/index.js'
import Color from '../engine/gfx/color.js'
import TextureRegion from '../engine/assets/texture-region.js'
import SpriteRenderer from '../engine/gfx/sprite-renderer.js'
import ShapeRenderer from '../engine/gfx/shape-renderer.js'
import OrthographicCamera from '../engine/gfx/orthographic-camera.js'

export default class Tile {
  static SCREEN_SIZE_X = 128
  static SCREEN_SIZE_Y = 64

  static WORLD_SIZE = 64

  textureRegion = null

  debug = true
  shapeRenderer = new ShapeRenderer()

  gridX = null
  gridY = null

  position = null // position is the origin of the tile
  iHat = new Vector2(1, 0.5).multiplyScalar(Tile.WORLD_SIZE)
  jHat = new Vector2(-1, 0.5).multiplyScalar(Tile.WORLD_SIZE)

  /**
   *
   * @param {imageId} string
   * @param {Number} gridX
   * @param {Number} gridY
   * @param {String} color
   * @param {Boolean} debug
   */
  constructor(imageId, gridX, gridY, debug = true) {
    this.gridX = gridX
    this.gridY = gridY
    this.position = this.#gridCoordinateToIsometricCoordinate(gridX, gridY)

    this.textureRegion = new TextureRegion(
      imageId,
      102, 0, // spritesheet dx and dy
      102, 101, // spritesheet dw and dh
    )

    this.debug = debug
  }

  /**
   * 
   * @param {Number} gridX 
   * @param {Number} gridY 
   * @returns {Vector2} screen space x and y position for top corner of isometric grid cell
   */
  #gridCoordinateToIsometricCoordinate(gridX, gridY) {
    const i = this.iHat.clone()
    i.multiplyScalar(gridX)

    const j = this.jHat.clone()
    j.multiplyScalar(gridY)

    return new Vector2(
      i.x + j.x,
      i.y + j.y
    )
  }

  /**
   * 
   * @param {OrthographicCamera} camera 
   */
  #drawIsometricDebugLines(camera) {
    const half = Tile.WORLD_SIZE / 2
    const topCorner = new Vector2(this.position.x, this.position.y)
    const rightCorner = new Vector2(this.position.x + Tile.WORLD_SIZE, this.position.y + half)
    const bottomCorner = new Vector2(this.position.x, this.position.y + Tile.WORLD_SIZE)
    const leftCorner = new Vector2(this.position.x - Tile.WORLD_SIZE, this.position.y + half)

    this.shapeRenderer.StrokeStyle = Color.RED
    this.shapeRenderer.LineWidth = 4
    this.shapeRenderer.begin(camera)
    this.shapeRenderer.drawCircle(this.position.x, this.position.y, 5)
    this.shapeRenderer.drawPolygon(
      topCorner.x, topCorner.y, 
      rightCorner.x, rightCorner.y,
      bottomCorner.x, bottomCorner.y,
      leftCorner.x, leftCorner.y,
    )
    this.shapeRenderer.end()
  }

  /**
   * 
   * @param {OrthographicCamera} camera 
   */
  #drawMouseTileDebugLines(camera) {
    // just so hapens that the gridX and gridY, when added together 
    // is the forumla for the mouse grid 
    if ((this.gridX + this.gridY) % 2 !== 0) {
      return
    }

    const topLeftCorner = new Vector2(this.position.x - Tile.WORLD_SIZE, this.position.y)
    const topRightCorner = new Vector2(this.position.x + Tile.WORLD_SIZE, this.position.y)
    const bottomLeftCorner = new Vector2(this.position.x - Tile.WORLD_SIZE, this.position.y + Tile.WORLD_SIZE)
    const bottomRightCorner = new Vector2(this.position.x + Tile.WORLD_SIZE, this.position.y + Tile.WORLD_SIZE)

    this.shapeRenderer.StrokeStyle = Color.WHITE
    this.shapeRenderer.LineWidth = 4
    this.shapeRenderer.begin(camera)
    this.shapeRenderer.drawPolygon(
      topLeftCorner.x, topLeftCorner.y, 
      topRightCorner.x, topRightCorner.y,
      bottomRightCorner.x, bottomRightCorner.y,
      bottomLeftCorner.x, bottomLeftCorner.y,
    )
    this.shapeRenderer.end()
  }

  /**
   *
   * @param {SpriteRenderer} spriteRenderer
   */
  #drawImage(spriteRenderer, camera) {
    const textureX = this.position.x - Tile.WORLD_SIZE // subtract 1 tile's size to render image based on the center of a tile
    const textureY = this.position.y// same logic applies for a tile's height, but need to half the height to force the isometric perspective
    const textureW = Tile.WORLD_SIZE * 2 // double the size of the image to fill the grid cell
    const textureH = Tile.WORLD_SIZE * 2 // double the size of the image to file the grid cell

    const alpha = this.debug 
      ? 0.5
      : 1

    spriteRenderer.begin(camera)
    spriteRenderer.drawTextureRegion(this.textureRegion, textureX, textureY, textureW, textureH, alpha)
    spriteRenderer.end()
  }

  /**
   *
   * @param {SpriteRenderer} spriteRenderer 
   * @param {Camera} camera
   */
  draw(spriteRenderer, camera) {
    this.#drawImage(spriteRenderer, camera)

    if (this.debug) {
      this.#drawIsometricDebugLines(camera)
      this.#drawMouseTileDebugLines(camera)
    }
  }

  insert() {

  }

  remove() {

  }
}
