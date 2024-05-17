import GridPositionComponent from './components/grid-position-component.js'
import HealthComponent from './components/health-component.js'


export default class Enemy {
  health = null
  girdPosition = null

  constructor(tilemap) {
    this.health = new HealthComponent(3)
    this.girdPosition = new GridPositionComponent()
  }

  update() {

  }

  draw() {

  }
}
