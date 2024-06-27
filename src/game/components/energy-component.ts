import { clamp } from '../../engine/math/MathUtils'

export default class EnergyComponent {
  private energy: number
  private maxEnergy: number

  public get Energy(): number {
    return this.energy
  }

  public get MaxEnergy(): number {
    return this.maxEnergy
  }

  public constructor(maxEnergy: number, startingEnergy?: number) {
    this.maxEnergy = maxEnergy
    this.energy = (!startingEnergy)
      ? maxEnergy
      : clamp(startingEnergy, 0, maxEnergy)
  }

  public spend(amount: number = 1): void {
    if (this.energy >= amount) {
      this.energy -= amount
    }
  }

  public restore(amount?: number): void {
    if (!amount) {
      this.energy = this.maxEnergy
    } else  {
      amount = Math.floor(amount)
      this.energy = clamp(this.energy + amount, 0, this.maxEnergy)
    }
  }
}
