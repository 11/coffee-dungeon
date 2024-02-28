export default class InputProcessor {
  mouseUp(keycode, x, y) {
    console.log('Mouse Up', keycode, x, y)
  }

  mouseDown(keycode, x, y) {
    console.log('Mouse Down', keycode, x, y)
  }

  mousePressed(keycode, x, y) {
    console.log('Mouse Pressed', keycode, x, y)
  }

  mouseMoved(x, y) {
    console.log('Mouse Moved', x, y)
  }

  keyUp(keycode) {
    console.log('Key Up', keycode)
  }

  keyDown(keycode) {
    console.log('Key Down', keycode)
  }

  keyPressed(keycode) {
    console.log('Key Pressed', keycode)
  }
}
