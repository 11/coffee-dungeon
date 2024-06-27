import { NotImplementedError } from '../errors'
import { Vector2 } from '../math/Vector2'
import InputManager from './input-manager'

export default class Mouse {
  public static BUTTON_LEFT = 0
  public static BUTTON_RIGHT = 1
  public static BUTTON_MIDDLE = 2

  public canvas: HTMLElement
  public canvasRect: DOMRect
  public inputManager: InputManager
  public mouseCoordinates: Vector2

  public set InputManager(value) {
    if (!value) {
      console.error('Input Manager cannot be null')
    }
    this.inputManager = value
  }

  public constructor(canvas: HTMLElement, inputManager: InputManager) {
    this.canvas = canvas
    this.canvasRect = canvas.getBoundingClientRect()
    this.inputManager = inputManager

    this.mouseCoordinates = new Vector2(0,0)
  }

  private onMouseMove(event: MouseEvent): void {
    const x = Math.floor(event.clientX - this.canvasRect.x)
    const y = Math.floor(event.clientY - this.canvasRect.y)
    this.mouseCoordinates.set(x, y)

    this.inputManager.mouseMoved(this.mouseCoordinates)
  }

  private onMouseUp(event: MouseEvent): void {
    const button = event.button

    const x = Math.floor(event.clientX - this.canvasRect.x)
    const y = Math.floor(event.clientY - this.canvasRect.y)
    this.mouseCoordinates.set(x, y)

    this.inputManager.mouseUp(button, this.mouseCoordinates)
  }

  private onMouseDown(event: MouseEvent): void {
    const button = event.button

    const x = Math.floor(event.clientX - this.canvasRect.x)
    const y = Math.floor(event.clientY - this.canvasRect.y)
    this.mouseCoordinates.set(x, y)

    this.inputManager.mouseDown(button, this.mouseCoordinates)
  }

  private onMouseClick(event: MouseEvent): void {
    const button = event.button

    const x = Math.floor(event.clientX - this.canvasRect.x)
    const y = Math.floor(event.clientY - this.canvasRect.y)
    this.mouseCoordinates.set(x, y)

    this.inputManager.mousePressed(button, this.mouseCoordinates)
  }

  private onScroll(event: MouseEvent): void {
    // TODO: implement feature
    throw new NotImplementedError('On scroll is not implemented')
  }

  public create():void {
    this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this))
    this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this))
    this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this))
    this.canvas.addEventListener('click', this.onMouseClick.bind(this))
  }

  public destroy(): void {
    this.canvas.removeEventListener('mousemove', this.onMouseMove.bind(this))
    this.canvas.removeEventListener('mouseup', this.onMouseUp.bind(this))
    this.canvas.removeEventListener('mousedown', this.onMouseDown.bind(this))
    this.canvas.removeEventListener('click', this.onMouseClick.bind(this))
  }
}
