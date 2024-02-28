import RotatingQueue from '../collections/rotating-queue.js'

export default class Mouse {
  static LEFT = 0
  static RIGHT = 1
  static MIDDLE = 2

  get X() {
    return this.x
  }

  get Y() {
    return this.y
  }

  get events() {
    return this.mouseEvents
  }

  constructor(canvas) {
    this.canvas = canvas
    this.mouseEvents = new RotatingQueue()

    this.canvasRect = canvas.getBoundingClientRect()
    this.x = 0
    this.y = 0
  }

  create() {
    this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this))
    this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this))
    this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this))
  }

  destroy() {
    this.canvas.removeEventListener('mousemove', this.onMouseMove.bind(this))
    this.canvas.removeEventListener('mouseup', this.onMouseUp.bind(this))
    this.canvas.removeEventListener('mousedown', this.onMouseDown.bind(this))
  }

  onMouseMove(event) {
    this.x = Math.floor(event.clientX - this.canvasRect.x)
    this.y = Math.floor(event.clientY - this.canvasRect.y)

    this.mouseEvents.push({
      type: 'move',
      x: this.x,
      y: this.y,
    })
  }

  onMouseUp(event) {
    this.mouseEvents.push({
      type: 'up',
      keyCode: event.button,
      x: this.x,
      y: this.y,
    })
  }

  onMouseDown(event) {
    this.mouseEvents.push({
      type: 'down',
      keyCode: event.button,
      x: this.x,
      y: this.y,
    })
  }

  // TODO:
  // onScroll(_event) { }
}
