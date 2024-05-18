import { Vector2 } from '../threejs-math/index.js'

export default class InputManager {
  /**
   *
   * @param {Number} keycode
   * @param {Vector2} mouseCoordinates
   */
  mouseUp(keycode, mouseCoordinates) {
    console.log('Mouse Up', keycode, mouseCoordinates)
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
    console.log('Mouse Pressed', keycode, mouseCoordinates)
  }

  /**
   *
   * @param {Vector2} mouseCoordinates
   */
  mouseMoved(mouseCoordinates) {
    console.log('Mouse Moved', mouseCoordinates)
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
