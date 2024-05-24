import Keyboard from './io/keyboard.js'
import Mouse from './io/mouse.js'
import SceneManager from './scenes/scene-manager.js'
import AssetManager from './assets/asset-manager.js'
import Viewport from './gfx/viewport.js'

const MILLIS_PER_SEC = 1000

export default class Game {
  debug = true
  canvas = null
  ctx = null
  viewport = null

  inputManager = null
  mouse = null
  keyboard = null

  sceneManager = null
  assetManager = null

  targetFPS = 0
  lastFrame = null

  fps = 0

  /**
   * @param {InputProcessor} value
   */
  set InputManager(value) {
    if (!value) {
      console.error('Input Processor cannot be null')
    }

    this.inputManager = value
    this.mouse.InputManager = value
  }

  get SceneManager() {
    return this.sceneManager
  }

  get AssetManager() {
    return this.assetManager
  }

  get Canvas() {
    return this.canvas
  }

  get RenderContext() {
    return this.ctx
  }

  get Debug() {
    return this.debug
  }

  get FPS() {
    return this.fps
  }

  /**
   * @param {Boolean} value
   */
  set Debug(value) {
    this.debug = value
  }

  /**
   *
   * @param {String} canvasId
   */
  constructor(canvasId = 'canvas', targetFPS = 30) {
    try {
      this.canvas = document.querySelector(canvasId)
      this.ctx = this.canvas.getContext('2d')
    } catch (error) {
      console.error(`Could not find canvas with id: ${canvasId}`)
    }

    // managing inputs
    this.inputManager = null
    this.keyboard = new Keyboard(this.canvas)
    this.keyboard.create()
    this.mouse = new Mouse(this.canvas, null)
    this.mouse.create()

    // manage different screens
    this.sceneManager = new SceneManager()

    // manage game
    this.assetManager = new AssetManager()

    this.targetFPS = targetFPS

    this.fps = 0
  }

  /**
   *
   * @param {String} id
   * @param {String} image
   */
  addImage(id, image) {
    this.assetManager.add(id, image)
  }

  /**
   *
   * @param {String} id
   * @param {String} screen
   */
  addScene(id, screen) {
    if (typeof id !== 'string') {
      console.error('Scene id must be a string')
    }

    this.sceneManager.addScreen(id, screen)
  }

  setScene(id) {
    if (!this.sceneManager.hasScreen(id)) {
      console.error(`Scene with id ${id} does not exist`)
    }

    this.sceneManager.setScreen(id)
    this.sceneManager.initialize()
  }

  /**
   *
   * @param {Number} deltaTime - time between previous frame and now
   */
  #update(deltaTime) {
    this.sceneManager.update(deltaTime)
  }

  #draw() {
    this.sceneManager.draw(this.ctx)
  }

  start() {
    if (this.debug) {
      console.log(window.game.AssetManager.toString())
    }

    this.lastFrame = performance.now()
    requestAnimationFrame(this.#run.bind(this))
  }

  #run() {
    const now = performance.now()

    // it's possible for detla time to be 0ms, so to correct this,
    // we set deltaTime to 0.1 if it comes back as 0
    const elapsedMs = Math.abs(this.lastFrame - now)
    const deltaTime = Math.max(0.1, elapsedMs)

    // check if enough time has passed to render next frame
    if (deltaTime >= this.fps) {

      // performance.now() returns time elapsed in miliseconds, but it's normalized to not have any decimals
      // So as an example:
      //   if 1 second has elapsed (1 second === 1000 miliseconds)
      //   - performance.now() of 1 second => 1000
      //   - performance.now() of 0.5 seconds => 500
      //   - performance.now() of 5.2 seconds => 5200
      //
      // This normalized value is useful for checking how much time has elapsed,
      // but it's not useful for the other part of our game logic
      //
      // Since we want to multiply a game actor's velocity by detlaTime as a way to slowing down animations/movement,
      // we need deltaTime in the decimal format. this line of code converts the deltaTime to the decimal format we need
      const normalizedDeltaTime = deltaTime / MILLIS_PER_SEC

      this.#update(normalizedDeltaTime)
      this.#draw()

      this.lastFrame = now
      this.fps = Math.floor(MILLIS_PER_SEC / deltaTime)
    }

    requestAnimationFrame(this.#run.bind(this))
  }

  end() {
    this.keyboard.destroy()
    this.mouse.destroy()
  }
}
