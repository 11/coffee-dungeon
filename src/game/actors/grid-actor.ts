import { Vector2 } from '../../engine/math/Vector2'
import Color from '../../engine/gfx/color'
import ShapeRenderer from '../../engine/gfx/shape-renderer'
import SpriteRenderer from '../../engine/gfx/sprite-renderer'

// import IsometricTilemap from '../tilemap/isometric-tilemap'
import OrthographicTilemap from '../tilemap/orthographic-tilemap'
import OrthographicTile from '../tilemap/orthographic-tile'
import HealthComponent from '../components/health-component'
import PositionComponent from '../components/position-component'
import EnergyComponent from '../components/energy-component'
import { NotImplementedError } from '../../engine/errors'

export interface GridActorAttributes {
  class: string
  imageId: string | null
  energy: number
  maxEnergy: number
  health: number
  maxHealth: number
  range: number
  gridPosition: Vector2
}

export default class GridActor {
  /**
   * Engine objects
   * @summary engine objects are tools you need do some kind of fundemental operation
   */
  protected shapeRenderer: ShapeRenderer = null
  protected tilemap: OrthographicTilemap = null

  /**
   * Attributes
   * @summary attributes object stores all the inital values for a grid actor
   */
  protected attributes: Record<string, any> = null

  /**
   * Compoents
   * @summay Components store a specific set of info and some helper functions that are coupled with that variable
   */
  protected healthComponent: HealthComponent = null
  protected positionComponent: PositionComponent= null
  protected energyComponent: EnergyComponent = null

  /**
   * Properties
   * @summary properties are variables that are game related and don't belong in a component
   */
  protected selected = false
  protected held = false

  public get GridPosition() {
    return this.positionComponent.GridPosition
  }

  public get Selected() {
    return this.selected
  }

  public set Selected(value: boolean) {
    this.selected = value
  }

  public get IsPlayer() {
    return false
  }

  public get IsEnemy() {
    return false
  }

  public get Held() {
    return this.IsPlayer && this.held
  }

  public constructor(tilemap: OrthographicTilemap, attributes: GridActorAttributes) {
    this.shapeRenderer = new ShapeRenderer()
    this.tilemap = tilemap

    this.attributes = this.normalizeAttributes(attributes)

    if (this.attributes.health) {
      this.healthComponent = new HealthComponent(this.attributes.health)
    }

    if (this.attributes.gridPosition) {
      this.positionComponent = new PositionComponent(tilemap, this.attributes.gridPosition)
    }

    if (this.attributes.energy) {
      this.energyComponent = new EnergyComponent(this.attributes.energy)
    }
  }


  protected normalizeAttributes(attributes: GridActorAttributes): GridActorAttributes {
    return {
      ...attributes,
      gridPosition: new Vector2().copy(attributes.gridPosition)
    }
  }


  public update() {
    throw new NotImplementedError('update method not implemented')
  }

  protected drawHealthBar(): void {
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

  public draw(spriteRenderer: SpriteRenderer) {
    const position = this.positionComponent.ScreenPosition
    position.subScalar(OrthographicTile.TILE_SIZE / 4)

    spriteRenderer.begin()
    spriteRenderer.drawImage(this.attributes.imageId, position, OrthographicTile.TILE_SIZE / 2, OrthographicTile.TILE_SIZE / 2)
    spriteRenderer.end()

    if (this.selected) {
      this.drawHealthBar()
    }
  }

  public toJSON(): object {
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
