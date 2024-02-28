import Keyboard from './input/keyboard.js'
import Mouse from './input/mouse.js'
import ScreenManager from './screens/screen-manager.js'
import AssetManager from './collections/asset-manager.js'

export default class Game {
  canvas = null
  ctx = null

  camera = null
  keyboard = null
  mouse = null
  inputProcessor = null
  inputManager = null
  screenManager = null
  assetManager = null

  set InputProcessor(value) {
    if (!value) {
      console.error('Input Processor cannot be null')
    }

    this.inputProcessor = value  
    this.mouse.InputProcessor = value
  }

  get ScreenManager() {
    return this.screenManager
  }

  
  get AssetManager() {
    return this.assetManager
  }

  get RenderContext() {
    return this.ctx
  }

  constructor(canvasId = 'canvas') {
    try {
      this.canvas = document.querySelector(canvasId)
      this.ctx = this.canvas.getContext('2d')
    } catch (error) {
      console.error(`Could not find canvas with id: ${canvasId}`)
    }

    // managing inputs
    this.inputProcessor = null 

    this.keyboard = new Keyboard(this.canvas)
    this.keyboard.create()

    this.mouse = new Mouse(this.canvas, null)
    this.mouse.create()


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

    this.inputManager.poll()
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
