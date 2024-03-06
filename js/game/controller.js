import { Vector2 } from '../engine/threejs-math/index.js'
import InputManager from '../engine/io/input-manager.js'
import OrthographicCamera from '../engine/gfx/orthographic-camera.js'
import ShapeRenderer from '../engine/gfx/shape-renderer.js'
import Color from '../engine/gfx/color.js'
import { isInsideTriangleArea } from '../engine/math.js'

import Tile from './tile.js'
import Grid from './grid.js'

export default class Controller extends InputManager {
  camera = null
  shapeRenderer = new ShapeRenderer()

  mouseHtml = document.querySelector('#mouse-screen code')
  cameraHtml = document.querySelector('#camera-screen code')

  origin = new Vector2()
  originHtml = document.querySelector('#origin-screen code')

  cell = new Vector2()
  cellHtml = document.querySelector('#cell-screen code')

  offset = new Vector2()
  offsetHtml = document.querySelector('#offset-screen code')

  selected = new Vector2()
  selectedHtml = document.querySelector('#selected-world code')

  /**
   * 
   * @param {OrthographicCamera} camera 
   */
  constructor(camera) {
    super()

    this.camera = camera
  }

  /**
   * 
   * @param {Number} x 
   * @param {Number} y 
   */
  #renderDebugText(x, y) {
    // screen space
    this.mouseHtml.textContent = `${x}, ${y}`
    this.cameraHtml.textContent = `${this.camera.Position.x}, ${this.camera.Position.y}`

    this.origin.set(5, 1)
    this.originHtml.textContent = `${this.origin.x}, ${this.origin.y}`

    this.cell.set(Math.floor(x / Tile.SCREEN_SIZE_X), Math.floor(y / Tile.SCREEN_SIZE_Y))
    this.cellHtml.textContent = `${this.cell.x}, ${this.cell.y}`

    this.offset.set(x % Tile.SCREEN_SIZE_X, y % Tile.SCREEN_SIZE_Y)
    this.offsetHtml.textContent = `${this.offset.x}, ${this.offset.y}`

    // world space
    this.#toWorldSpace()
    this.selectedHtml.textContent = `${this.selected.x}, ${this.selected.y}`
  }

  #renderDebugWorldTile(x, y) {
    const cellX = this.cell.x * Tile.SCREEN_SIZE_X
    const cellY = this.cell.y * Tile.SCREEN_SIZE_Y

    this.shapeRenderer.StrokeStyle = Color.ORANGE
    this.shapeRenderer.begin()
    this.shapeRenderer.drawRectangle(cellX, cellY, Tile.SCREEN_SIZE_X, Tile.SCREEN_SIZE_Y)
    this.shapeRenderer.end()
  }

  #toWorldSpace() {
    this.selected.set(
      (this.cell.y - this.origin.y) + (this.cell.x - this.origin.x) - 1,
      (this.cell.y - this.origin.y) - (this.cell.x - this.origin.x) - 1
    )

    if (
      this.selected.x > Grid.Size + 1 || 
      this.selected.y > Grid.Size + 1 || 
      this.selected.x < Grid.Size - 1 ||
      this.selected.y < Grid.Size - 1
    ) {
      return
    }

    const topLeftTriangle= [
      Tile.SCREEN_SIZE_X / 2, 0,                  // top mid point
      0, Tile.SCREEN_SIZE_Y / 2,                  // left mid point
      0, 0,                                       // top left point
    ]

    const topRightTriangle = [
      Tile.SCREEN_SIZE_X / 2, 0,                  // top mid point
      Tile.SCREEN_SIZE_X, Tile.SCREEN_SIZE_Y / 2, // right mid point
      Tile.SCREEN_SIZE_X, 0                       // top right corner
    ]

    const bottomLeftTriangle = [
      Tile.SCREEN_SIZE_X / 2, Tile.SCREEN_SIZE_Y, // bottom mid point
      0, Tile.SCREEN_SIZE_Y / 2,                  // left mid point
      0, Tile.SCREEN_SIZE_Y                       // bottom left point
    ]

    const bottomRightTriangle = [
      Tile.SCREEN_SIZE_X / 2, Tile.SCREEN_SIZE_Y, // bottom mid point
      Tile.SCREEN_SIZE_X, Tile.SCREEN_SIZE_Y / 2, // right mid point
      Tile.SCREEN_SIZE_X, Tile.SCREEN_SIZE_Y      // bottom right point
    ]
    
    const isInTopLeftTriangle = isInsideTriangleArea(this.offset.x, this.offset.y, topLeftTriangle[0], topLeftTriangle[1], topLeftTriangle[2], topLeftTriangle[3], topLeftTriangle[4], topLeftTriangle[5])
    const isInTopRightTriangle = isInsideTriangleArea(this.offset.x, this.offset.y, topRightTriangle[0], topRightTriangle[1], topRightTriangle[2], topRightTriangle[3], topRightTriangle[4], topRightTriangle[5])
    const isInBottomLeftTriangle = isInsideTriangleArea(this.offset.x, this.offset.y, bottomLeftTriangle[0], bottomLeftTriangle[1], bottomLeftTriangle[2], bottomLeftTriangle[3], bottomLeftTriangle[4], bottomLeftTriangle[5])
    const isInBottomRightTriangle = isInsideTriangleArea(this.offset.x, this.offset.y, bottomRightTriangle[0], bottomRightTriangle[1], bottomRightTriangle[2], bottomRightTriangle[3], bottomRightTriangle[4], bottomRightTriangle[5])

    if (isInTopLeftTriangle) {
      this.selected.x--
    } else if (isInTopRightTriangle) {
      this.selected.y--
    } else if (isInBottomLeftTriangle) {
      this.selected.y++
    } else if (isInBottomRightTriangle) {
      this.selected.x++
    }
  }

  mouseMoved(x, y) {
    this.#renderDebugText(x, y)
    // this.#renderDebugWorldTile(x, y)
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