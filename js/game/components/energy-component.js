import Utils from '../../engine/utils.js'
import { InternalError } from '../../engine/errors.js'

export default class EnergyComponent {
  energy = 0
  maxEnergy = 0

  /**
   *
   * @return {Nunber}
   */
  get Energy() {
    return this.energy
  }

  /**
   *
   * @return {Number}
   */
  get MaxEnergy() {
    return this.maxEnergy
  }

  /**
   *
   * @param {Number} maxEnergy
   * @param {Number | null} startingEnergy
   */
  constructor(maxEnergy, startingEnergy = null) {
    this.maxEnergy = maxEnergy
    this.energy = (!startingEnergy)
      ? maxEnergy
      : Utils.clamp(startingEnergy, 0, maxEnergy)
  }

  /**
   *
   * @param {Number} amount
   */
  spend(amount = 1) {
    if (this.energy >= amount) {
      this.energy -= amount
    }
  }

  /**
   *
   * @param {Number | null} amount - if no value is passed in, energy is set back to full
   */
  restore(amount = null) {
    if (!amount) {
      this.energy = this.maxEnergy
    } else if (amount instanceof 'number') {
      amount = Math.floor(amount)
      this.energy = Utils.clamp(this.energy + amount, 0, this.maxEnergy)
    } else {
      throw new InternalError(`Invalid value for \`amount\` - ${amount}`)
    }
  }
}
