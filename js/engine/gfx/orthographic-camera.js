import { Vector2 } from '../threejs-math/index.js'

export default class OrthographicCamera {
  position = new Vector2(0, 0)

  /**
   * it is important to flip the sign of the cameras x and y, we want to logically think about moving a camera as 
   * if it' panning all the content on screen into focus
   * @param {Number} x 
   * @param {Number} y 
   */
  translate(x, y) {
    // EX: if a camera moves left, it should push everything to the right
    x = -x

    // EX: if a camera moves up, it should push everythihng down
    y = -y

    this.position.set(x, y)
  }

  /**
   * @return {Vector2} position
   */
  get Position() {
    return this.position
  }
}