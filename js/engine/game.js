import Keyboard from './input/keyboard.js'
import Mouse from './input/Mouse.js'
import InputManager from './input/input-manager.js'
import ScreenManager from './screens/screen-manager.js'
import AssetManager from './collections/asset-manager.js'

export default class Game {
  canvas = null
  ctx = null

  keyboard = null
  mouse = null
  inputProcessor = null
  inputManager = null
  screenManager = null
  assetManager = null

  set InputProcessor(newInputProcesor) {
    if (!newInputProcesor) {
      console.error('Input Processor cannot be null')
    }

    this.inputProcessor = newInputProcesor
    this.inputManager.InputProcessor = newInputProcesor
  }

  get ScreenManager() {
    return this.screenManager
  }

  get AssetManager() {
    return this.assetManager
  }

  constructor(canvasId = 'canvas') {
    try {
      this.canvas = document.querySelector(canvasId)
      this.ctx = this.canvas.getContext('2d')
    } catch (error) {
      console.error(`Could not find canvas with id: ${canvasId}`)
    }

    // managing inputs
    this.keyboard = new Keyboard(this.canvas)
    this.keyboard.create()

    this.mouse = new Mouse(this.canvas)
    this.mouse.create()

    this.inputProcessor = null
    this.inputManager = new InputManager(this.mouse, this.keyboard, this.inputProcessor)

    this.screenManager = new ScreenManager()
    this.assetManager = new AssetManager()
  }

  addImage(id, image) {
    this.assetManager.add(id, image)
  }

  addScreen(id, screen) {
    if (typeof id !== 'string') {
      console.error('Screen id must be a string')
    }

    this.screenManager.addScreen(id, screen)
  }

  setScreen(id) {
    if (!this.screenManager.hasScreen(id)) {
      console.error(`Screen with id ${id} does not exist`)
    }

    this.screenManager.setScreen(id)
    this.screenManager.initialize()
  }

  #input() {
    if (!this.inputProcessor || !this.inputManager) {
      return
    }

    // this.inputManager.poll()
  }

  #update() {
    this.screenManager.update()
  }

  #draw() {
    this.screenManager.draw(this.ctx)
  }

  start() {
    this.#input()
    this.#update()
    this.#draw()

    requestAnimationFrame(this.start.bind(this))
  }

  end() {
    this.keyboard.destroy()
    this.mouse.destroy()
  }
}
