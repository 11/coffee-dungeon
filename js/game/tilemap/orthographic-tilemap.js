import ShapeRenderer from '../../engine/gfx/shape-renderer.js'
import { InternalError } from '../../engine/errors.js'
import { Vector2 } from '../../engine/threejs-math/index.js'
import OrthographicCamera from '../../engine/gfx/orthographic-camera.js'
import Color from '../../engine/gfx/color.js'

import OrthographicTile from './orthographic-tile.js'
import Wizard from '../actors/wizard.js'
import Skull from '../actors/skull.js'
import Town from '../actors/town.js'

export default class OrthographicTilemap {
  debug = false

  dimensions = null
  map = null
  camera = null
  shapeRenderer = null

  players = null
  enemies = null
  objectives = null

  static GameObjects = {
    skull: (tilemap, attributes) => new Skull(tilemap, attributes),
    wizard: (tilemap, attributes) => new Wizard(tilemap, attributes),
    town: (tilemap, attributes) => new Town(tilemap, attributes),
  }

  get Dimensions() {
    return this.dimensions
  }

  get Map() {
    return this.map
  }

  get Players() {
    return this.players
  }

  get Enemies() {
    return this.enemies
  }

  get Objectives() {
    return this.objectives
  }

  /**
   *
   * @param {Vector2} screenCoordinates
   * @return {Vector2} tilemapCoordinate
   */
  static mapToLocal(screenCoordinates) {
    const x = Math.floor(screenCoordinates.x / OrthographicTile.TILE_SIZE)
    const y = Math.floor(screenCoordinates.y / OrthographicTile.TILE_SIZE)
    return new Vector2(x, y)
  }

  /**
   * This is going to return the center point of a tile in screen coordinates
   * @param {Vector2} tilemapCoordinate
   * @return {Vector2} screenCoordinate
   */
  static mapToGlobal(tilemapCoordinate) {
    const x = (tilemapCoordinate.x * OrthographicTile.TILE_SIZE) + (OrthographicTile.TILE_SIZE / 2)
    const y = (tilemapCoordinate.y * OrthographicTile.TILE_SIZE) + (OrthographicTile.TILE_SIZE / 2)
    return new Vector2(x, y)
  }

  /**
   *
   * @param {Vector2} dimensions
   * @param {JSON} levelJson
   * @param {OrthographicCamera} camera
   */
  constructor( levelJson, camera = null, debug = false) {
    this.players = []
    this.enemies = []
    this.objectives = []
    this.map = this.#loadLevel(levelJson)

    this.camera = camera
    this.shapeRenderer = new ShapeRenderer()
    this.debug = debug
  }

  /**
   *
   * @param {Vector2} gridPosition
   * @return {OrthographicTile}
   */
  getTile(gridPosition) {
    if (
      gridPosition.x >= this.dimensions.x ||
      gridPosition.y >= this.dimensions.y ||
      gridPosition.x < 0 ||
      gridPosition.y < 0
    ) {
      return null
    }

    return this.map[gridPosition.x][gridPosition.y]
  }

  /**
   *
   * @param {Vector2} levelJson
   * @return {Tile[][]}
   */
  #loadLevel(levelJson) {
    this.dimensions = new Vector2().copy(levelJson.dimensions)

    const grid = []
    for (let i = 0; i < this.dimensions.x; i++) {
      grid[i] = []

      for (let j = 0; j < this.dimensions.y; j++) {
        const x = i
        const y = j
        grid[i][j] = new OrthographicTile(null, new Vector2(x, y), this.debug)
      }
    }

    const map = levelJson.map
    for (const tile of map) {
      const { cell, actor: actorAttributes } = tile
      const pos = new Vector2().copy(cell)

      const newActor = OrthographicTilemap.GameObjects[actorAttributes.class]
      const actor = newActor(this, actorAttributes)
      if (actor.IsPlayer) {
        this.players.push(actor)
      } else if (actor.IsEnemy) {
        this.enemies.push(actor)
      } else {
        this.objectives.push(actor)
      }

      grid[pos.x][pos.y].Actor = actor
    }

    return grid
  }

  #drawGrid() {
    for (let i = 0; i < this.dimensions.x; i++) {
      for ( let j = 0; j < this.dimensions.y; j++) {
        this.shapeRenderer.begin()
        let color = Color.GREEN
        if ((i + j) % 2 === 0) {
          color = Color.WHITE
        }

        if (this.actor?.Selected && this.actor?.isPlayer) {
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

  /**
   *
   * @param {SpriteRenderer} spriteRenderer
   */
  #drawActors(spriteRenderer) {
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

  /**
   *
   * @param {SpriteRenderer} spriteRenderer
   */
  draw(spriteRenderer) {
    this.#drawGrid()
    this.#drawActors(spriteRenderer)
  }

  /**
   *
   * @return {JSON}
   */
  toJSON() {
    const isValidTilemap =
      !tilemap ||
      !(tilemap instanceof OrthographicTilemap || tilemap instanceof IsometricTilemap)

    if (isValidTilemap) {
      throw new InternalError('Attempted to save invalid tilemap')
    }

    const tiles = []
    const map = tilemap.Map
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        const tile = map[i][j]
        const actor = tile.Actor
        tiles.push = {
          tile: { x: i, y: j, },
          actor: actor?.toJSON() ?? null
        }
      }
    }

    return {
      dimensions: this.dimensions.toJSON(),
      tiles
    }
  }
}
