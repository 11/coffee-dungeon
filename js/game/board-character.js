import Vector2 from '../engine/threejs-math/math/Vector2.js'
import TextureRegion from '../engine/assets/texture-region.js'
import Actor from '../engine/scenes/actor.js'

export default class BoardCharacter extends Actor {
  gridCell = null
  position = null

  /**
   * 
   * @param {Vector2} gridCell 
   * @param {Vector2} position 
   * @param {TextureRegion} texture 
   */
  constructor(gridCell, position, texture) {
    this.gridCell = gridCell
    this.position = position
    this.texture = texture
  }

  update() {

  }

  /**
   * 
   * @param {SpriteRenderer} spriteRenderer 
   * @param {OrthographicCamera} camera 
   */
  draw(spriteRenderer, camera) {
    console.log('Actor draw')
  }
}