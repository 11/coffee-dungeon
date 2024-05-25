import InputManager from '../../engine/io/input-manager.js'
import OrthographicCamera from '../../engine/gfx/orthographic-camera.js'
import OrthographicTilemap from '../tilemap/orthographic-tilemap.js'
import IsometricTilemap from '../tilemap/isometric-tilemap.js'
import ShapeRenderer from '../../engine/gfx/shape-renderer.js'
import Color from '../../engine/gfx/color.js'
import { Vector2 } from '../../engine/threejs-math/index.js'

export default class Controller extends InputManager {
  debug = false

  camera = null
  tilemap = null
  shapeRenderer = new ShapeRenderer()

  mouseHtml = document.querySelector('#mouse-screen code')
  selectedHtml = document.querySelector('#selected-world code')
  selectedTileHtml = document.querySelector('#selected-tile-world code')

  /**
   *
   * @param {OrthographicCamera} camera
   * @param {OrthographicTilemap | IsometricTilemap} tilemap
   * @param {Boolean} debug
   */
  constructor(camera, tilemap, debug = true) {
    super()

    this.tilemap = tilemap
    this.camera = camera
    this.debug = debug
  }

  /**
   *
   * @param {Vector2} mouseCoordinates
   */
  #renderDebugText(mouseCoordinates) {
    // screen space
    this.mouseHtml.textContent = `${mouseCoordinates.x}, ${mouseCoordinates.y}`

    let tileIndex
    let tileIndexInScreen
    if (this.tilemap instanceof OrthographicTilemap) {
      tileIndex = OrthographicTilemap.mapToLocal(mouseCoordinates)
      tileIndexInScreen = OrthographicTilemap.mapToGlobal(tileIndex)
    } else if (this.tilemap instanceof IsometricTilemap) {
      tileIndex = IsometricTilemap.mapToLocal(x, y)
      tileIndexInScreen = IsometricTilemap.mapToGlobal(tileIndex)
    }

    this.selectedHtml.textContent = `${tileIndex.x}, ${tileIndex.y}`
    this.selectedTileHtml.textContent = `${tileIndexInScreen.x} ${tileIndexInScreen.y}`
  }

  #renderDebugWorldTile(x, y) {
    const cellX = this.cell.x * Tile.SCREEN_SIZE_X
    const cellY = this.cell.y * Tile.SCREEN_SIZE_Y

    this.shapeRenderer.StrokeStyle = Color.ORANGE
    this.shapeRenderer.begin()
    this.shapeRenderer.drawRectangle(cellX, cellY, Tile.SCREEN_SIZE_X, Tile.SCREEN_SIZE_Y)
    this.shapeRenderer.end()
  }

  /**
   *
   * @param {Vector2} mouseCoordinates
   */
  mouseMoved(mouseCoordinates) {
    if (debug) {
      this.#renderDebugText(mouseCoordinates)
    }
  }

  /**
   *
   * @param {Number} keycode
   * @param {Vector2} mouseCoordinates
   */
  mouseUp(keycode, mouseCoordinates) {
    console.log('Mouse Up')
  }

  /**
   *
   * @param {Number} keycode
   * @param {Vector2} mouseCoordinates
   */
  mouseDown(keycode, mouseCoordinates) {
    console.log('Mouse Down', keycode, mouseCoordinates)
  }

  /**
   *
   * @param {Number} keycode
   * @param {Vector2} mouseCoordinates
   */
  mousePressed(keycode, mouseCoordinates) {
    console.log('Mouse Clicked', keycode, mouseCoordinates)
  }

  /**
   *
   * @param {Number} keycode
   */
  keyUp(keycode) {
    console.log('Key Up', keycode)
  }

  /**
   *
   * @param {Number} keycode
   */
  keyDown(keycode) {
    console.log('Key Down', keycode)
  }

  /**
   *
   * @param {Number} keycode
   */
  keyPressed(keycode) {
    console.log('Key Pressed', keycode)
  }
}
