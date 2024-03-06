export default class Scene {
  debug = window.game.Debug

  /**
   * 
   * @param {Boolean} debug 
   */
  constructor(debug = null) {
    if (debug) {
      this.debug = debug
    }
  }

  initialize() {
    console.log('initialize')
  }

  update() {
    console.log('update')
  }

  draw(ctx) {
    console.log('draw')
  }
}
