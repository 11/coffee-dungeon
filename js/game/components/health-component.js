export default class HealthComponent {
  health = 0
  maxHealth = 0

  get Health() {
    return this.health
  }

  get MaxHealth() {
    return this.maxHealth
  }

  /**
   *
   * @param {Number} initalHealth
   */
  constructor(startingHealth = 3) {
    this.maxHealth = startingHealth
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
