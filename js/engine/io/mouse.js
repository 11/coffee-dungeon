import { Vector2 } from '../threejs-math/index.js'

export default class Mouse {
  static BUTTON_LEFT = 0
  static BUTTON_RIGHT = 1
  static BUTTON_MIDDLE = 2

  canvas = null
  canvasRect = null
  inputManager = null
  mouseCoordinates = null

  set InputManager(value) {
    if (!value) {
      console.error('Input Manager cannot be null')
    }
    this.inputManager = value
  }

  constructor(canvas, inputManager) {
    this.canvas = canvas
    this.canvasRect = canvas.getBoundingClientRect()
    this.inputManager = inputManager

    this.mouseCoordinates = new Vector2(0,0)
  }

  /**
   *
   * @param {MouseEvent} event
   */
  #onMouseMove(event) {
    const x = Math.floor(event.clientX - this.canvasRect.x)
    const y = Math.floor(event.clientY - this.canvasRect.y)
    this.mouseCoordinates.set(x, y)

    this.inputManager.mouseMoved(this.mouseCoordinates)
  }

  /**
   *
   * @param {MouseEvent} event
   */
  #onMouseUp(event) {
    const button = event.button

    const x = Math.floor(event.clientX - this.canvasRect.x)
    const y = Math.floor(event.clientY - this.canvasRect.y)
    this.mouseCoordinates.set(x, y)

    this.inputManager.mouseUp(button, this.mouseCoordinates)
  }

  /**
   *
   * @param {MouseEvent} event
   */
  #onMouseDown(event) {
    const button = event.button

    const x = Math.floor(event.clientX - this.canvasRect.x)
    const y = Math.floor(event.clientY - this.canvasRect.y)
    this.mouseCoordinates.set(x, y)

    this.inputManager.mouseDown(button, this.mouseCoordinates)
  }

  /**
   *
   * @param {MouseEvent} event
   */
  #onMouseClick(event) {
    const button = event.button

    const x = Math.floor(event.clientX - this.canvasRect.x)
    const y = Math.floor(event.clientY - this.canvasRect.y)
    this.mouseCoordinates.set(x, y)

    this.inputManager.mousePressed(button, this.mouseCoordinates)
  }

  /**
   *
   * @param {MouseEvent} event
   */
  #onScroll(event) {
    // TODO: implement feature
    throw new NotImplementedError('On scroll is not implemented')
  }

  create() {
    this.canvas.addEventListener('mousemove', this.#onMouseMove.bind(this))
    this.canvas.addEventListener('mouseup', this.#onMouseUp.bind(this))
    this.canvas.addEventListener('mousedown', this.#onMouseDown.bind(this))
    this.canvas.addEventListener('click', this.#onMouseClick.bind(this))
  }

  destroy() {
    this.canvas.removeEventListener('mousemove', this.#onMouseMove.bind(this))
    this.canvas.removeEventListener('mouseup', this.#onMouseUp.bind(this))
    this.canvas.removeEventListener('mousedown', this.#onMouseDown.bind(this))
    this.canvas.removeEventListener('click', this.#onMouseClick.bind(this))
  }
}
