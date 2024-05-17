import { Vector2 } from '../threejs-math/math/Vector2.js'

export default class Viewport {
  static get Width() {
    return window.game.Canvas.clientWidth
  }

  static get Height() {

    return window.game.Canvas.clientHeight
  }

  static get Top() {
    return 0
  }

  static get Bottom() {
    return window.game.Canvas.clientHeight
  }

  static get Left() {
    return 0
  }

  static get Right() {
    return window.game.Canvas.clientWidth
  }

  static get Center() {
    return new Vector2(
      window.game.Canvas.clientWidth / 2,
      window.game.clientHeight / 2
    )
  }
}