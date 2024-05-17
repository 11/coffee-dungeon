export default class HealthComponent {
  health = null

  constructor(health = 3) {
    this.health = health
  }

  takeDamage(damage) {
    this.health -= damage
  }

  /**
   *
   * @returns {boolean}
   */
  isDead() {
    return this.health <= 0
  }

  get Health() {
    return this.health
  }
}
