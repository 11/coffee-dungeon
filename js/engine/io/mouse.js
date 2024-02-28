export default class Mouse {
  static BUTTON_LEFT = 0
  static BUTTON_RIGHT = 1
  static BUTTON_MIDDLE = 2

  canvas = null
  canvasRect = null
  inputManager = null

  constructor(canvas, inputManager) {
    this.canvas = canvas
    this.canvasRect = canvas.getBoundingClientRect()
    this.inputManager = inputManager
  }

  #onMouseMove(event) {
    const x = Math.floor(event.clientX - this.canvasRect.x)
    const y = Math.floor(event.clientY - this.canvasRect.y)
    this.inputManager.mouseMoved(x, y)
  }

  #onMouseUp(event) {
    const button = event.button
    const x = Math.floor(event.clientX - this.canvasRect.x)
    const y = Math.floor(event.clientY - this.canvasRect.y)
    this.inputManager.mouseUp(button, x, y)
  }

  #onMouseDown(event) {
    const button = event.button
    const x = Math.floor(event.clientX - this.canvasRect.x)
    const y = Math.floor(event.clientY - this.canvasRect.y)
    this.inputManager.mouseDown(button, x, y)
  }

  #onMouseClick(event) {
    const button = event.button
    const x = Math.floor(event.clientX - this.canvasRect.x)
    const y = Math.floor(event.clientY - this.canvasRect.y)
    this.inputManager.mousePressed(button, x, y)
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

  set InputManager(value) {
    if (!value) {
      console.error('Input Manager cannot be null')
    }
    this.inputManager = value  
  }
  

  // TODO:
  // onScroll(_event) { }
}
