import InputManager from '../../engine/io/input-manager'
import type OrthographicCamera from '../../engine/gfx/orthographic-camera'
import OrthographicTilemap from '../tilemap/orthographic-tilemap'
// import IsometricTilemap from '../tilemap/isometric-tilemap'
import ShapeRenderer from '../../engine/gfx/shape-renderer'
import { Vector2 } from '../../engine/math/Vector2'

export default class Controller implements InputManager {
  private camera: OrthographicCamera
  private shapeRenderer: ShapeRenderer

  private tilemap: OrthographicTilemap
  private debug: boolean

  private mouseHtml = document.querySelector('#mouse-screen code')
  private selectedHtml = document.querySelector('#selected-world code')
  private selectedTileHtml = document.querySelector('#selected-tile-world code')

  public constructor(tilemap: OrthographicTilemap, camera: OrthographicCamera, debug: boolean = false) {
    this.shapeRenderer = new ShapeRenderer()
    this.camera = camera

    this.tilemap = tilemap
    this.debug = debug
  }

  private renderDebugText(mouseCoordinates: Vector2): void  {
    // screen space
    this.mouseHtml.textContent = `${mouseCoordinates.x}, ${mouseCoordinates.y}`

    let tileIndex
    let tileIndexInScreen
    if (this.tilemap instanceof OrthographicTilemap) {
      tileIndex = OrthographicTilemap.mapToLocal(mouseCoordinates)
      tileIndexInScreen = OrthographicTilemap.mapToGlobal(tileIndex)
    }
    // TODO: eventually this check won't be needed and converted to isometric tilemap
    // else if (this.tilemap instanceof IsometricTilemap) {
    //   tileIndex = IsometricTilemap.mapToLocal(x, y)
    //   tileIndexInScreen = IsometricTilemap.mapToGlobal(tileIndex)
    // }

    this.selectedHtml.textContent = `${tileIndex.x}, ${tileIndex.y}`
    this.selectedTileHtml.textContent = `${tileIndexInScreen.x} ${tileIndexInScreen.y}`
  }

  // TODO: this use to draw debug lines over grid, but the concep of cellX and cellY has been removed after a large refactor
  // we'll need to remap those later
  // private renderDebugWorldTile(x: number, y: number): void {
  //   const cellX = this.cell.x * Tile.SCREEN_SIZE_X
  //   const cellY = this.cell.y * Tile.SCREEN_SIZE_Y

  //   this.shapeRenderer.StrokeStyle = Color.ORANGE
  //   this.shapeRenderer.begin()
  //   this.shapeRenderer.drawRectangle(cellX, cellY, Tile.SCREEN_SIZE_X, Tile.SCREEN_SIZE_Y)
  //   this.shapeRenderer.end()
  // }

  public mouseMoved(mouseCoordinates: Vector2): void {
    if (this.debug) {
      this.renderDebugText(mouseCoordinates)
    }
  }

  public mouseUp(keycode: number, mouseCoordinates: Vector2): void {
    console.log('Mouse Up')
  }

  public mouseDown(keycode: number, mouseCoordinates: Vector2): void {
    console.log('Mouse Down', keycode, mouseCoordinates)
  }

  public mousePressed(keycode: number, mouseCoordinates: Vector2): void {
    console.log('Mouse Clicked', keycode, mouseCoordinates)
  }

  public keyUp(keycode: string): void {
    console.log('Key Up', keycode)
  }

  public keyDown(keycode: string): void {
    console.log('Key Down', keycode)
  }

  public keyPressed(keycode: string): void  {
    console.log('Key Pressed', keycode)
  }
}
