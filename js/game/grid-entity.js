import { Vector2 } from '../engine/threejs-math/index.js'
import IsometricTilemap from '../engine/tilemap/isometric-tilemap.js'
import OrthographicTilemap from '../engine/tilemap/orthographic-tilemap.js'
import OrthographicTile from '../engine/tilemap/orthographic-tile.js'

import HealthComponent from './components/health-component.js'
import GridPositionComponent from './components/grid-position-component.js'
import SpriteRenderer from '../engine/gfx/sprite-renderer.js'

export default class GridEntity {
  healthComponent = null
  gridPositionComponent = null

  imageId = null

  /** * @param {String} imageId
   * @param {Vector2} startPosition
   * @param {IsometricTilemap | OrthographicTilemap} tilemap
   */
  constructor(imageId, startPosition, tilemap) {
    this.imageId = imageId
    this.healthComponent = new HealthComponent(5)
    this.gridPositionComponent = new GridPositionComponent(startPosition, tilemap)
  }

  update() {

  }

  /**
   *
   * @param {SpriteRenderer} spriteRenderer
   */
  draw(spriteRenderer) {
    const position = this.gridPositionComponent.ScreenPosition
    position.subScalar(OrthographicTile.TILE_SIZE / 4)


    spriteRenderer.begin()
    spriteRenderer.drawImage(this.imageId, position, OrthographicTile.TILE_SIZE / 2, OrthographicTile.TILE_SIZE / 2)
    spriteRenderer.end()
  }
}
