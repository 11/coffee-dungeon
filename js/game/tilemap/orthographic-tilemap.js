import ShapeRenderer from '../../engine/gfx/shape-renderer.js'
import { InternalError } from '../../engine/errors.js'
import { Vector2 } from '../../engine/threejs-math/index.js'
import OrthographicCamera from '../../engine/gfx/orthographic-camera.js'

import OrthographicTile from './orthographic-tile.js'
import Wizard from '../actors/player/wizard.js'
import Skull from '../actors/enemies/skull.js'

export default class OrthographicTilemap {
  debug = false

  dimensions = null
  map = null
  camera = null
  shapeRenderer = null

  players = null
  enemies = null

  static GameObjects = {
    skull: (tilemap, attributes) => new Skull(tilemap, attributes),
    wizard: (tilemap, attributes) => new Wizard(tilemap, attributes)
  }

  get Dimensions() {
    return this.dimensions
  }

  get map() {
    return this.map
  }

  get Players() {
    return this.players
  }

  get Enemies() {
    return this.enemies
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
  constructor(
    levelJson,
    camera = null,
    debug = false
  ) {
    this.players = []
    this.enemies = []
    this.map = this.#loadLevel(levelJson)

    this.camera = camera
    this.shapeRenderer = new ShapeRenderer()
    this.debug = debug
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
      if (actor.isPlayer) {
        this.players.push(actor)
      } if (actor.isEnemy) {
        this.enemies.push(actor)
      }

      grid[pos.x][pos.y].Actor = actor
    }

    return grid
  }

  /**
   *
   * @param {SpriteRenderer} spriteRenderer
   */
  #drawGrid(spriteRenderer) {
    for (let i = 0; i < this.map.length; i++) {
      for (let j = 0; j < this.map[i].length; j++) {
        const tile = this.map[i][j]
        tile.draw(spriteRenderer)
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
  }

  /**
   *
   * @param {SpriteRenderer} spriteRenderer
   */
  draw(spriteRenderer) {
    this.#drawGrid(spriteRenderer)
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
