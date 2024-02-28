export default class Mouse {
  static BUTTON_LEFT = 0
  static BUTTON_RIGHT = 1
  static BUTTON_MIDDLE = 2

  canvas = null
  canvasRect = null
  inputProcessor = null

  constructor(canvas, inputProcessor) {
    this.canvas = canvas
    this.canvasRect = canvas.getBoundingClientRect()
    this.inputProcessor = inputProcessor
  }

  #onMouseMove(event) {
    const x = Math.floor(event.clientX - this.canvasRect.x)
    const y = Math.floor(event.clientY - this.canvasRect.y)
    this.inputProcessor.mouseMoved(x, y)
  }

  #onMouseUp(event) {
    const button = event.button
    const x = Math.floor(event.clientX - this.canvasRect.x)
    const y = Math.floor(event.clientY - this.canvasRect.y)
    this.inputProcessor.mouseUp(button, x, y)
  }

  #onMouseDown(event) {
    const button = event.button
    const x = Math.floor(event.clientX - this.canvasRect.x)
    const y = Math.floor(event.clientY - this.canvasRect.y)
    this.inputProcessor.mouseDown(button, x, y)
  }

  #onMouseClick(event) {
    const button = event.button
    const x = Math.floor(event.clientX - this.canvasRect.x)
    const y = Math.floor(event.clientY - this.canvasRect.y)
    this.inputProcessor.mousePressed(button, x, y)
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

  set InputProcessor(value) {
    if (!value) {
      console.error('Input Processor cannot be null')
    }

    this.inputProcessor = value  
  }
  

  // TODO:
  // onScroll(_event) { }
}
