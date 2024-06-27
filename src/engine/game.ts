import Keyboard from './io/keyboard.js'
import Mouse from './io/mouse.js'
import SceneManager from './scenes/scene-manager.js'
import AssetManager from './assets/asset-manager.js'
import Viewport from './gfx/viewport.js'
import InputManager from './io/input-manager.js'
import Keybaord from './io/keyboard.js'
import Scene from './scenes/scene.js'

const MILLIS_PER_SEC = 1000

export default class Game {
  private debug: boolean
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private viewport: Viewport

  private inputManager: InputManager
  private mouse: Mouse
  private keyboard: Keybaord

  private sceneManager: SceneManager
  private assetManager: AssetManager

  private targetFPS: number
  private targetDeltaTime: number
  private lastFrame: number
  private fps: number

  public set InputManager(value: InputManager) {
    if (!value) {
      console.error('Input Processor cannot be null')
    }

    this.inputManager = value
    this.mouse.InputManager = value
  }

  public get SceneManager() {
    return this.sceneManager
  }

  public get AssetManager() {
    return this.assetManager
  }

  public get Canvas() {
    return this.canvas
  }

  public get RenderContext() {
    return this.ctx
  }

  public get Debug() {
    return this.debug
  }

  public get FPS(): number {
    return this.fps
  }

  public set Debug(value: boolean) {
    this.debug = value
  }


  public constructor(canvasId: string = 'canvas', targetFPS: number = 60) {
    try {
      this.canvas = document.querySelector(canvasId)
      this.ctx = this.canvas.getContext('2d')!
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
    this.targetDeltaTime = MILLIS_PER_SEC / this.targetFPS
    this.fps = 0
  }

  public addImage(id: string, image: string): void {
    this.assetManager.add(id, image)
  }

  public addScene(id: string, scene: Scene): void  {
    if (typeof id !== 'string') {
      console.error('Scene id must be a string')
    }

    this.sceneManager.addScene(id, scene)
  }

  public setScene(id: string): void {
    if (!this.sceneManager.hasScene(id)) {
      console.error(`Scene with id ${id} does not exist`)
    }

    this.sceneManager.setScene(id)
    this.sceneManager.initialize()
  }

  private update(deltaTime: number): void  {
    this.sceneManager.update(deltaTime)
  }

  private draw(): void  {
    this.sceneManager.draw(this.ctx)
  }

  public start(): void {
    if (this.debug) {
      console.log(window.game.AssetManager.toString())
    }

    this.lastFrame = performance.now()
    requestAnimationFrame(this.run.bind(this))
  }

  private run(): void {
    // it's possible for elapsedTime to be 0ms, so to correct this,
    // we set elpasedTime to 0.1 if it comes back as 0
    const now = performance.now()
    const elapsedMs = Math.abs(this.lastFrame - now)
    const deltaTime = Math.max(0.1, elapsedMs)

    // check if enough time has passed to render next frame
    if (deltaTime >= this.targetDeltaTime) {
      // performance.now() returns time elapsed in miliseconds, but it's normalized to not have any decimals
      // So as an example: (NOTE Remember 1 second === 1000 miliseconds)
      //   - if 1.0s has elapsed, performance.now() returns 1000
      //   - if 0.5s has elapsed, performance.now() returns 500
      //   - if 5.2s has elapsed, performance.now() returns 5200
      //
      // This normalized value is useful for checking how much time has elapsed,
      // but it's not useful for the other part of our game logic
      //
      // Since we want to multiply a game actor's velocity by detlaTime as a way to normalize animations/movement,
      // we need deltaTime in the decimal format. this line of code converts the deltaTime to the decimal format we need
      const normalizedDeltaTime = deltaTime / MILLIS_PER_SEC

      this.update(normalizedDeltaTime)
      this.draw()

      this.lastFrame = now
      this.fps = Math.floor(MILLIS_PER_SEC / deltaTime)
    }

    requestAnimationFrame(this.run.bind(this))
  }

  public end(): void {
    this.keyboard.destroy()
    this.mouse.destroy()
  }
}
