import Actor from '../engine/scenes/actor.js'

export default class Card extends Actor {
  description = null

  constructor(cardId, cardTexture, ) {

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