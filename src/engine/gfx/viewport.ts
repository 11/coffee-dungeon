import { Vector2 } from '../math/Vector2'

export default class Viewport {
  public static get Width() {
    return window.game.Canvas.clientWidth
  }

  public static get Height() {
    return window.game.Canvas.clientHeight
  }

  public static get Top() {
    return 0
  }

  public static get Bottom() {
    return window.game.Canvas.clientHeight
  }

  public static get Left() {
    return 0
  }

  public static get Right() {
    return window.game.Canvas.clientWidth
  }

  public static get Center() {
    return new Vector2(
      window.game.Canvas.clientWidth / 2,
      window.game.Canvas.clientHeight / 2
    )
  }
}
