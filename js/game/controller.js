import { Vector2 } from '../engine/threejs-math/index.js'
import InputManager from '../engine/io/input-manager.js'
import OrthographicCamera from '../engine/gfx/orthographic-camera.js'
import Tile from './tile.js'

export default class Controller extends InputManager {
  camera = null

  /**
   * 
   * @param {OrthographicCamera} camera 
   */
  constructor(camera) {
    super()

    this.camera = camera
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

  mouseMoved(x, y) {
    const mouseGrid = new Vector2(Math.floor(x / 128), Math.floor(y / 64))
    const mouseGridCellOffset = new Vector2(x % 128, y % 64) 
    console.log('Mouse Move', mouseGrid)
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