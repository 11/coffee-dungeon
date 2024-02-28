import RotatingQueue from '../collections/rotating-queue.js'

export default class Keybaord {
  static KEY_A = 65
  static KEY_B = 66
  static KEY_C = 67
  static KEY_D = 68
  static KEY_E = 69
  static KEY_F = 70
  static KEY_G = 71
  static KEY_H = 72
  static KEY_I = 73
  static KEY_J = 74
  static KEY_K = 75
  static KEY_L = 76
  static KEY_M = 77
  static KEY_N = 78
  static KEY_O = 79
  static KEY_P = 80
  static KEY_Q = 81
  static KEY_R = 82
  static KEY_S = 83
  static KEY_T = 84
  static KEY_U = 85
  static KEY_V = 86
  static KEY_W = 87
  static KEY_X = 88
  static KEY_Y = 89
  static KEY_Z = 90

  static KEY_SPACE = 32
  static KEY_ENTER = 13
  static KEY_LEFT = 37
  static KEY_UP = 38
  static KEY_RIGHT = 39
  static KEY_DOWN = 40
  static KEY_LEFT_SHIFT = 16
  static KEY_LEFT_CTRL = 17
  static KEY_LEFT_ALT = 18
  static KEY_RIGHT_SHIFT = 16
  static KEY_RIGHT_CTRL = 17

  get events() {
    return this.keyEvents
  }

  constructor(canvas) {
    this.canvas = canvas
    this.keyEvents = new RotatingQueue(this.bufferSize)
  }

  create() {
    window.addEventListener('keydown', this.onKeyDown.bind(this), true)
    window.addEventListener('keyup', this.onKeyUp.bind(this), false)
  }

  destroy() {
    window.removeEventListener('keydown', this.onKeyDown.bind(this))
    window.removeEventListener('keyup', this.onKeyUp.bind(this))
  }

  onKeyDown(event) {
    this.keyEvents.push({
      type: 'down',
      keyCode: event.keyCode,
      key: event.key
    })
  }

  onKeyUp(event) {
    this.keyEvents.push({
      type: 'up',
      keyCode: event.keyCode,
      key: event.key
    })
  }
}
