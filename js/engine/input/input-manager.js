export default class InputManager {
  set InputProcessor(value) {
    this.inputProcessor = value
  }

  constructor(mouse, keyboard, inputProcessor) {
    this.mouse = mouse
    this.keyboard = keyboard
    this.inputProcessor = inputProcessor
  }

  processMouseEvents() {
    if (this.inputProcessor === null) {
      return
    }

    if (this.mouse.events.size <= 1) {
      return
    }

    const head = this.mouse.events.get(0)
    const prev = this.mouse.events.get(1)
    if (
      head.type === 'up' &&
      prev.type === 'down' &&
      head.keyCode === prev.keyCode
    ) {
      this.inputProcessor.mousePressed(head.keyCode, head.x, head.y)
    } else if (head.type === 'up') {
      this.inputProcessor.mouseUp(head.keyCode, head.x, head.y)
    } else if (head.type === 'down') {
      this.inputProcessor.mouseDown(head.keyCode, head.x, head.y)
    }
    // else if (head.type === 'move' && head.x !== prev.x && head.y !== prev.y) {
    //   this.inputProcessor.mouseMoved(head.x, head.y)
    // }
  }

  processKeyboardEvents() {
    if (this.inputProcessor === null) {
      return
    }

    if (this.keyboard.events.size <= 1) {
      return
    }

    const head = this.keyboard.events.get(0)
    const prev = this.keyboard.events.get(1)

    if (
      head.type === 'up' &&
      prev.type === 'down' &&
      head.keyCode === prev.keyCode
    ) {
      this.inputProcessor.keyPressed(head.keyCode)
    } else if (head.type === 'up') {
      this.inputProcessor.keyUp(head.keyCode)
    } else if (head.type === 'down') {
      this.inputProcessor.keyDown(head.keyCode)
    }
  }

  // poll() {
  //   this.processMouseEvents()
  //   this.processKeyboardEvents()
  // }
}
