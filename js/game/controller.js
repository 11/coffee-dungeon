import InputManager from '../engine/io/input-manager.js'
import OrthographicCamera from '../engine/gfx/orthographic-camera.js'
import ShapeRenderer from '../engine/gfx/shape-renderer.js'
import Color from '../engine/gfx/color.js'

import IsometricGrid from '../engine/tilemap/isometric-tilemap.js'
import Tile from '../engine/tilemap/isometric-tile.js'

export default class Controller extends InputManager {
  debug = false

  camera = null
  shapeRenderer = new ShapeRenderer()

  mouseHtml = document.querySelector('#mouse-screen code')
  selectedHtml = document.querySelector('#selected-world code')
  selectedTileHtml = document.querySelector('#selected-tile-world code')

  /**
   *
   * @param {OrthographicCamera} camera
   */
  constructor(camera, debug = true) {
    super()

    this.camera = camera
    this.debug = debug
  }

  /**
   *
   * @param {Number} x
   * @param {Number} y
   */
  #renderDebugText(x, y) {
    // screen space
    this.mouseHtml.textContent = `${x}, ${y}`

    const tileIndex = IsometricGrid.mapToLocal(x, y)
    this.selectedHtml.textContent = `${tileIndex.x}, ${tileIndex.y}`

    const tileIndexInScreen = IsometricGrid.mapToGlobal(tileIndex)
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

  mouseMoved(x, y) {
    if (debug) {
      this.#renderDebugText(x, y)
    }
  }

  mouseUp(keycode, x, y) {
    console.log('Mouse Up')
  }

  mouseDown(keycode, x, y) {
    console.log('Mouse Down', keycode, x, y)
  }

  mousePressed(keycode, x, y) {
    console.log('Mouse Clicked', keycode, x, y)
  }

  keyUp(keycode) {
    console.log('Key Up', keycode)
  }

  keyDown(keycode) {
    console.log('Key Down', keycode)
  }

  keyPressed(keycode) {
    console.log('Key Pressed', keycode)
  }
}
