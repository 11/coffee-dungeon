import ShapeRenderer from '../../engine/gfx/shape-renderer'
import { Vector2 } from '../../engine/math/Vector2'
import OrthographicCamera from '../../engine/gfx/orthographic-camera'
import Color from '../../engine/gfx/color'

import OrthographicTile from './orthographic-tile'
import Wizard from '../actors/wizard'
import Skull from '../actors/skull'
import Town from '../actors/town'
import GridActor, { GridActorAttributes } from '../actors/grid-actor'
import SpriteRenderer from '../../engine/gfx/sprite-renderer'
import { Level } from '../test-level'

interface GridCellData {
  cell: {
    x: number,
    y: number
  },
  actor: GridActorAttributes
}

export default class OrthographicTilemap {
  private camera: OrthographicCamera
  private shapeRenderer: ShapeRenderer

  private debug: boolean = false
  private dimensions: Vector2
  private map: OrthographicTile[][]

  private players: Wizard[]
  private enemies: GridActor[]
  private objectives: GridActor[]

  public static GameObjects: Record<string, Function> = {
    skull: (tilemap: OrthographicTilemap, attributes: GridActorAttributes) => new Skull(tilemap, attributes),
    wizard: (tilemap: OrthographicTilemap, attributes: GridActorAttributes) => new Wizard(tilemap, attributes),
    town: (tilemap: OrthographicTilemap, attributes: GridActorAttributes) => new Town(tilemap, attributes),
  }

  public get Dimensions() {
    return this.dimensions
  }

  public get Map() {
    return this.map
  }

  public get Players() {
    return this.players
  }

  public get Enemies() {
    return this.enemies
  }

  public get Objectives() {
    return this.objectives
  }

  /**
   *
   * @param {Vector2} screenCoordinates
   * @return {Vector2} tilemapCoordinate
   */
  public static mapToLocal(screenCoordinates: Vector2): Vector2 {
    const x = Math.floor(screenCoordinates.x / OrthographicTile.TILE_SIZE)
    const y = Math.floor(screenCoordinates.y / OrthographicTile.TILE_SIZE)
    return new Vector2(x, y)
  }

  /**
   * This is going to return the center point of a tile in screen coordinates
   * @param {Vector2} tilemapCoordinate
   * @return {Vector2} screenCoordinate
   */
  static mapToGlobal(tilemapCoordinate: Vector2): Vector2{
    const x = (tilemapCoordinate.x * OrthographicTile.TILE_SIZE) + (OrthographicTile.TILE_SIZE / 2)
    const y = (tilemapCoordinate.y * OrthographicTile.TILE_SIZE) + (OrthographicTile.TILE_SIZE / 2)
    return new Vector2(x, y)
  }

  public constructor(level: Level, camera: OrthographicCamera | null, debug: boolean = false) {
    this.players = []
    this.enemies = []
    this.objectives = []
    this.map = this.loadLevel(level)

    this.camera = camera
    this.shapeRenderer = new ShapeRenderer()
    this.debug = debug
  }

  public getTile(gridPosition: Vector2): OrthographicTile {
    if (
      gridPosition.x >= this.dimensions.x ||
      gridPosition.y >= this.dimensions.y ||
      gridPosition.x < 0 ||
      gridPosition.y < 0
    ) {
      throw new Error('Tried to get tile outside of map bounds')
    }

    return this.map[gridPosition.x][gridPosition.y]
  }

  private loadLevel(level: Level): OrthographicTile[][] {
    this.dimensions = level.dimensions

    // load tiles
    const levelMap = []
    for (let i = 0; i < this.dimensions.x; i++) {
      levelMap[i] = []

      for (let j = 0; j < this.dimensions.y; j++) {
        const x = i
        const y = j
        levelMap[i][j] = new OrthographicTile(null, new Vector2(x, y), this.debug)
      }
    }

    //
    // TODO: Load cell terrain information into map
    //

    // load the data for each actor into each cell
    for (const attrs of level.actors) {
      const actor = OrthographicTilemap.GameObjects[attrs.class](this, attrs)
      if (actor.IsPlayer) {
        this.players.push(actor)
      } else if (actor.IsEnemy) {
        this.enemies.push(actor)
      } else {
        this.objectives.push(actor)
      }

      const pos = attrs.gridPosition
      levelMap[pos.x][pos.y].Actor = actor
    }

    return levelMap
  }

  private drawGrid(): void {
    for (let i = 0; i < this.dimensions.x; i++) {
      for ( let j = 0; j < this.dimensions.y; j++) {
        this.shapeRenderer.begin()
        let color = Color.GREEN
        if ((i + j) % 2 === 0) {
          color = Color.WHITE
        }

        const actor = this.map[i][j].Actor
        if (actor?.Selected && actor?.IsPlayer) {
          color = Color.YELLOW
        }

        const pos = OrthographicTilemap.mapToGlobal(new Vector2(i, j))

        this.shapeRenderer.FillStyle = color
        this.shapeRenderer.drawRectangle(
          pos.x - OrthographicTile.TILE_SIZE / 2,
          pos.y - OrthographicTile.TILE_SIZE / 2,
          OrthographicTile.TILE_SIZE,
          OrthographicTile.TILE_SIZE
        )
        this.shapeRenderer.end()
      }
    }
  }

  private drawActors(spriteRenderer: SpriteRenderer): void {
    for (const p of this.players) {
      p.draw(spriteRenderer)
    }

    for (const e of this.enemies) {
      e.draw(spriteRenderer)
    }

    for (const o of this.objectives) {
      o.draw(spriteRenderer)
    }
  }

  public draw(spriteRenderer: SpriteRenderer, camera?: OrthographicCamera): void {
    this.drawGrid()
    this.drawActors(spriteRenderer)
  }

  // TODO: move this into a new file called level.ts
  // The eventual goal of this level.ts file will be to have a zod parser to load level JSON files
  // and transform the data into a valid level
  // public toJSON(): object {
  //   const isValidTilemap = !this.map ||
  //     !(this.map instanceof OrthographicTilemap || this.map instanceof IsometricTilemap)

  //   if (isValidTilemap) {
  //     throw new InternalError('Attempted to save invalid tilemap')
  //   }

  //   const tiles: Record<any, GridCellData>[] = []
  //   for (let i = 0; i < this.map.length; i++) {
  //     for (let j = 0; j < this.map[i].length; j++) {
  //       const tile = this.map[i][j]
  //       const actor = tile.Actor
  //       tiles.push = {
  //         tile: { x: i, y: j, },
  //         actor: actor?.toJSON() ?? null
  //       }
  //     }
  //   }

  //   return {
  //     dimensions: this.dimensions.toJSON(),
  //     tiles
  //   }
  // }
}
