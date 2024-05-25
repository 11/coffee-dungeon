import { Vector2 } from '../../engine/threejs-math/index.js'
import Color from '../../engine/gfx/color.js'
import ShapeRenderer from '../../engine/gfx/shape-renderer.js'
import SpriteRenderer from '../../engine/gfx/sprite-renderer.js'

import IsometricTilemap from '../tilemap/isometric-tilemap.js'
import OrthographicTilemap from '../tilemap/orthographic-tilemap.js'
import OrthographicTile from '../tilemap/orthographic-tile.js'
import HealthComponent from '../components/health-component.js'
import PositionComponent from '../components/position-component.js'
import EnergyComponent from '../components/energy-component.js'

export default class GridActor {
  /**
   * Engine objects
   * @summary engine objects are tools you need do some kind of fundemental operation
   */
  shapeRenderer = null
  tilemap = null

  /**
   * Attributes
   * @summary attributes object stores all the inital values for a grid actor
   */
  attributes = null

  /**
   * Compoents
   * @summay Components store a specific set of info and some helper functions that are coupled with that variable
   */
  healthComponent = null
  positionComponent = null
  energyComponent = null

  /**
   * Properties
   * @summary properties are variables that are game related and don't belong in a component
   */
  selected = false

  get GridPosition() {
    return this.positionComponent.GridPosition
  }

  get Selected() {
    return this.selected
  }

  set Selected(value) {
    this.selected = value
  }

  /**
   *
   * @param {IsometricTilemap | OrthographicTilemap} tilemap
   * @param {Object} attributes
   */
  constructor(
    tilemap,
    attributes = {
      // String
      class: null,
      // String | null
      imageId: null,
      // Number
      energy: 3,
      // Number
      maxEnergy: 3,
      // Number
      health: 3,
      // Number
      maxHelath: 3,
      // Number
      range: 1,
      // Vector2
      gridPosition: new Vector2(0, 0),
    }
  ) {
    this.shapeRenderer = new ShapeRenderer()
    this.tilemap = tilemap

    this.attributes = this.#normalizeAttributes(attributes)

    this.healthComponent = new HealthComponent(this.attributes.health)
    this.positionComponent = new PositionComponent(tilemap, this.attributes.gridPosition)
    this.energyComponent = new EnergyComponent(this.attributes.energy)
  }

  /**
   *
   * @param {Object} attributes
   * @returns {Object}
   */
  #normalizeAttributes(attributes) {
    return {
      ...attributes,
      gridPosition: new Vector2().copy(attributes.gridPosition)
    }
  }

  update() { }

  #drawHealthBar() {
    const gridCellPosition = this.positionComponent.ScreenPosition

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
    const position = this.positionComponent.ScreenPosition
    position.subScalar(OrthographicTile.TILE_SIZE / 4)

    spriteRenderer.begin()
    spriteRenderer.drawImage(this.attributes.imageId, position, OrthographicTile.TILE_SIZE / 2, OrthographicTile.TILE_SIZE / 2)
    spriteRenderer.end()

    if (this.selected) {
      this.#drawHealthBar()
    }
  }

  toJSON() {
    return {
      ...this.attributes,
      gridPosition: this.positionComponent.GridPosition.toJSON(),
      health: this.healthComponent.Health,
      maxHealth: this.healthComponent.MaxHealth,
      energy: this.energyComponent.Energy,
      maxEnergy: this.energyComponent.MaxEnergy
    }
  }
}
