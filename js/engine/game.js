import Keyboard from './input/keyboard.js'
import Mouse from './input/mouse.js'
import SceneManager from './scenes/scene-manager.js'
import AssetManager from './collections/asset-manager.js'
import Viewport from './graphics/viewport.js'

export default class Game {
  canvas = null
  ctx = null
  viewport = null

  inputProcessor = null
  mouse = null
  keyboard = null

  sceneManager = null
  assetManager = null

  constructor(canvasId = 'canvas') {
    try {
      this.canvas = document.querySelector(canvasId)
      this.ctx = this.canvas.getContext('2d')
    } catch (error) {
      console.error(`Could not find canvas with id: ${canvasId}`)
    }

    // screen details
    this.viewport = new Viewport(this.canvas)

    // managing inputs
    this.inputProcessor = null 
    this.keyboard = new Keyboard(this.canvas)
    this.keyboard.create()
    this.mouse = new Mouse(this.canvas, null)
    this.mouse.create()

    // manage different screens
    this.sceneManager = new SceneManager()

    // manage game
    this.assetManager = new AssetManager()
  }

  addImage(id, image) {
    this.assetManager.add(id, image)
  }

  addScreen(id, screen) {
    if (typeof id !== 'string') {
      console.error('Scene id must be a string')
    }

    this.sceneManager.addScreen(id, screen)
  }

  setScreen(id) {
    if (!this.sceneManager.hasScreen(id)) {
      console.error(`Scene with id ${id} does not exist`)
    }

    this.sceneManager.setScreen(id)
    this.sceneManager.initialize()
  }

  #input() {
    if (!this.inputProcessor || !this.inputManager) {
      return
    }

    this.inputManager.poll()
  }

  #update() {
    this.sceneManager.update()
  }

  #draw() {
    this.sceneManager.draw(this.ctx)
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

  set InputProcessor(value) {
    if (!value) {
      console.error('Input Processor cannot be null')
    }

    this.inputProcessor = value  
    this.mouse.InputProcessor = value
  }

  get SceneManager() {
    return this.sceneManager
  }
  
  get AssetManager() {
    return this.assetManager
  }

  get RenderContext() {
    return this.ctx
  }

  get Viewport() {
    return this.viewport
  }
}
