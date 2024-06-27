import type { Vector2 } from '../math/Vector2'

export default interface InputManager {
  mouseUp(keycode: number, mouseCoordinates: Vector2)
  mouseDown(keycode: number, mouseCoordinates: Vector2)
  mousePressed(keycode: number, mouseCoordinates: Vector2)
  mouseMoved(mouseCoordinates: Vector2)
  keyUp(keycode: string)
  keyDown(keycode: string)
  keyPressed(keycode: string)
}
