import RotatingQueue from '../collections/rotating-queue.js'

export default class Keybaord {
  public static KEY_A = 'KeyA'
  public static KEY_B = 'KeyB'
  public static KEY_C = 'KeyC'
  public static KEY_D = 'KeyD'
  public static KEY_E = 'KeyE'
  public static KEY_F = 'KeyF'
  public static KEY_G = 'KeyG'
  public static KEY_H = 'KeyH'
  public static KEY_I = 'KeyI'
  public static KEY_J = 'KeyJ'
  public static KEY_K = 'KeyK'
  public static KEY_L = 'KeyL'
  public static KEY_M = 'KeyM'
  public static KEY_N = 'KeyN'
  public static KEY_O = 'KeyO'
  public static KEY_P = 'KeyP'
  public static KEY_Q = 'KeyQ'
  public static KEY_R = 'KeyR'
  public static KEY_S = 'KeyS'
  public static KEY_T = 'KeyT'
  public static KEY_U = 'KeyU'
  public static KEY_V = 'KeyV'
  public static KEY_W = 'KeyW'
  public static KEY_X = 'KeyX'
  public static KEY_Y = 'KeyY'
  public static KEY_Z = 'KeyZ'

  public static KEY_SPACE = ''
  public static KEY_ENTER = ''
  public static KEY_LEFT = 'ArrowLeft'
  public static KEY_UP = 'ArrowUp'
  public static KEY_RIGHT = 'ArrowRight'
  public static KEY_DOWN = 'ArrowDown'
  public static KEY_LEFT_SHIFT = 'ShiftLeft'
  public static KEY_LEFT_CTRL = 'ControlLeft'
  public static KEY_LEFT_ALT = 'AltLeft'
  public static KEY_RIGHT_SHIFT = 'ShiftRight'
  public static KEY_RIGHT_CTRL = 'ControlRight'

  private canvas: HTMLCanvasElement
  private keyEvents: RotatingQueue

  public get events() {
    return this.keyEvents
  }

  public constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.keyEvents = new RotatingQueue()
  }

  public create(): void {
    window.addEventListener('keydown', this.onKeyDown.bind(this), true)
    window.addEventListener('keyup', this.onKeyUp.bind(this), false)
  }

  public destroy(): void {
    window.removeEventListener('keydown', this.onKeyDown.bind(this))
    window.removeEventListener('keyup', this.onKeyUp.bind(this))
  }

  public onKeyDown(event: KeyboardEvent): void {
    this.keyEvents.push({
      type: 'down',
      keyCode: event.code,
      key: event.key
    })
  }

  public onKeyUp(event: KeyboardEvent): void {
    this.keyEvents.push({
      type: 'up',
      keyCode: event.code,
      key: event.key
    })
  }
}
