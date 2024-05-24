import { Vector2 } from '../../engine/threejs-math/index.js'
import Color from '../../engine/gfx/color.js'
import IsometricTilemap from '../../engine/tilemap/isometric-tilemap.js'
import OrthographicTilemap from '../../engine/tilemap/orthographic-tilemap.js'
import OrthographicTile from '../../engine/tilemap/orthographic-tile.js'
import ShapeRenderer from '../../engine/gfx/shape-renderer.js'
import SpriteRenderer from '../../engine/gfx/sprite-renderer.js'

import HealthComponent from '../components/health-component.js'
import GridPositionComponent from '../components/grid-position-component.js'
import EnergyComponent from '../components/energy-component.js'

export default class GridActor {
  imageId = null
  healthComponent = null
  gridPositionComponent = null
  energyComponent = null
  selected = false

  shapeRenderer = null

  get GridPosition() {
    return this.gridPositionComponent.GridPosition
  }

  /**
   *
   * @return {Boolean} selected
   */
  get Selected() {
    return this.selected
  }

  /**
   *
   * @param {Boolean} value
   */
  set Selected(value) {
    this.selected = value
  }

  /**
   *
   * @param {String} imageId
   * @param {Vector2} startPosition
   * @param {IsometricTilemap | OrthographicTilemap} tilemap
   * @param {Number} health
   * @param {Number} energy
   */
  constructor(imageId, startPosition, tilemap, health = 3, energy = 3) {
    this.imageId = imageId
    this.healthComponent = new HealthComponent(health)
    this.gridPositionComponent = new GridPositionComponent(startPosition, tilemap)
    this.energyComponent = new EnergyComponent(energy)

    this.shapeRenderer = new ShapeRenderer()
  }

  update() {

  }

  #drawHealthBar() {
    const gridCellPosition = this.gridPositionComponent.ScreenPosition

    const maxHealth = this.healthComponent.MaxHealth
    const currentHealth = this.healthComponent.Health

    // draw container box
    const healthBarSize = new Vector2(80, 47) // golden ration size
    const healthBarOffset = new Vector2(
      gridCellPosition.x,
      gridCellPosition.y - healthBarSize.y - 30
    )
    const healthBarPosition = new Vector2(
      healthBarOffset.x - (healthBarSize.x / 2),
      healthBarOffset.y
    )

    this.shapeRenderer.FillStyle = Color.BLACK
    this.shapeRenderer.begin()
    this.shapeRenderer.drawRectangle(healthBarPosition.x, healthBarPosition.y, healthBarSize.x, healthBarSize.y)
    this.shapeRenderer.end()

    // draw eaech health point
    const healthPointOffset = new Vector2(2, 30)
    const healthPointSize = new Vector2((healthBarSize.x / maxHealth), healthBarSize.y)

    this.shapeRenderer.FillStyle = Color.OLIVE
    this.shapeRenderer.begin()
    for (let i = 0; i < maxHealth; i++) {
      const healthPointPosition = new Vector2(
        healthBarPosition.x + (i * (healthPointSize.x + healthPointOffset.x)),
        healthBarPosition.y
      )
      this.shapeRenderer.drawRectangle( healthPointPosition.x, healthPointPosition.y, healthPointSize.x, healthPointSize.y)
    }
    this.shapeRenderer.end()
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

    if (this.selected) {
      this.#drawHealthBar()
    }
  }
}
