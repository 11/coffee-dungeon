import InputManager from '../../engine/io/input-manager.js'
import OrthographicTilemap from '../tilemap/orthographic-tilemap.js'
// import IsometricTilemap from '../tilemap/isometric-tilemap.js'
import { Vector2 } from '../../engine/math/Vector2.js'
import type Wizard from '../actors/wizard.js'

export default class PlayerTurnController implements InputManager {
  private tilemap: OrthographicTilemap

  // TEMP FIX: this type should eventually become all the valid characters that a character can be
  private selectedPlayer: Wizard | null

  constructor(tilemap: OrthographicTilemap) {
    this.tilemap = tilemap
    this.selectedPlayer = null
  }

  private mousePressedPlayer(mouseCoordinates): void {
    const tilePosition = OrthographicTilemap.mapToLocal(mouseCoordinates)

    const players = this.tilemap.Players
    for (const character of players) {
      if (tilePosition.equals(character.GridPosition)) {
        character.Selected = !character.Selected
        this.selectedPlayer = character
      } else {
        character.Selected = false
        this.selectedPlayer = null
      }
    }
  }

  private mousePressedEnemy(mouseCoordinates): void {
    const tilePosition = OrthographicTilemap.mapToLocal(mouseCoordinates)
    const enemies = this.tilemap.Enemies
    for (const enemey of enemies) {
      if (tilePosition.equals(enemey.GridPosition)) {
        enemey.Selected = !enemey.Selected
      } else {
        enemey.Selected = false
      }
    }
  }

  public mouseUp(keycode: number, mouseCoordinates: Vector2): void {
    if (!!this.selectedPlayer) {
      this.selectedPlayer.Held = false
    }
  }

  public mouseDown(keycode: number, mouseCoordinates: Vector2): void {
    const selectedTile = OrthographicTilemap.mapToLocal(mouseCoordinates)
    if (!!this.selectedPlayer && selectedTile.equals(this.selectedPlayer.GridPosition)) {
      this.selectedPlayer.Held = true
    }
  }

  public mousePressed(keycode: number, mouseCoordinates: Vector2): void {
    this.mousePressedPlayer(mouseCoordinates)
    this.mousePressedEnemy(mouseCoordinates)
  }

  public mouseMoved(mouseCoordinates: Vector2): void {
    const selectedTile = OrthographicTilemap.mapToLocal(mouseCoordinates)
    if (!!this.selectedPlayer && this.selectedPlayer.Held) {
      this.selectedPlayer.move(selectedTile)
    }
  }

  public keyUp(keycode: string): void{
    console.log('Key Up', keycode)
  }

  public keyDown(keycode: string): void {
    console.log('Key Down', keycode)
  }

  public keyPressed(keycode: string): void {
    console.log('Key Pressed', keycode)
  }
}
