import { Vector2 } from '../engine/threejs-math/index.js'
import Tile from './tile.js'
import InputManager from '../engine/io/input-manager.js'

export default class Controller extends InputManager {
  iHat = new Vector2(1, 0.5).multiplyScalar(Tile.SIZE)
  jHat = new Vector2(-1, 0.5).multiplyScalar(Tile.SIZE)

  mousePosition = new Vector2(0, 0)
  
  constructor() {
    super()
  }

  #toIsometric(x, y) {
    const i = this.iHat.clone()
    i.multiplyScalar(x / Tile.SIZE)

    const j = this.jHat.clone()
    j.multiplyScalar(y / Tile.SIZE)

    this.mousePosition.x = i.x + j.x
    this.mousePosition.y = i.y + j.y
  }

  mouseUp(keycode, x, y) {
    console.log('Mouse Up', keycode, x, y)
  }

  mouseDown(keycode, x, y) {
    console.log('Mouse Down', keycode, x, y)
  }

  mousePressed(keycode, x, y) {
    console.log('Mouse Clicked', keycode, x, y)
  }

  mouseMoved(x, y) {
    this.#toIsometric(x, y)
    console.log('Mouse Moved: ', x, y)
    console.log('Moused Moved Isometric: ', this.mousePosition.x, this.mousePosition.y)
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