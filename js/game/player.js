import Actor from '../engine/scenes/actor.js'
import SpriteRenderer  from '../engine//gfx/sprite-renderer.js'
import OrthographicCamera from '../engine/gfx/orthographic-camera.js'

export default class Player extends Actor {
  constructor(x, y, width, height, imageId) {
    super(x, y, width, height, imageId)
  }

  initialize() {
    
  }

  update() {

  }

  /**
   * 
   * @param {SpriteRenderer} spriteRenderer 
   * @param {OrthographicCamera} camera 
   */
  draw(spriteRenderer, camera) {

  }
}