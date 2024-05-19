export default class HealthComponent {
  health = null

  get Health() {
    return this.health
  }

  /**
   *
   * @param {Number} initalHealth
   */
  constructor(startingHealth = 3) {
    this.health = startingHealth
  }

  /**
   *
   * @param {Number} damage
   */
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
}
