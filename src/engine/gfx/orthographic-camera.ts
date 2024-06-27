import { Vector2 } from '../math/Vector2'

export default class OrthographicCamera {
  private position: Vector2

  get Position(): Vector2 {
    return this.position
  }

  public constructor() {
    this.position = new Vector2(0, 0)
  }

  /**
   * it is important to flip the sign of the cameras x and y, we want to logically think about moving a camera as
   * if it' panning all the content on screen into focus
   */
  public translate(x: number, y: number): void {
    // EX: if a camera moves left, it should push everything to the right
    x = -x

    // EX: if a camera moves up, it should push everythihng down
    y = -y

    this.position.set(x, y)
  }
}
