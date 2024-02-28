export default class Viewport {
  canvas = null

  constructor(canvas) {
    this.canvas = canvas
  }

  get Width() {
    return this.canvas.clientWidth
  }

  get Height() {
    return this.canvas.clientHeight
  }
}