export default class HealthComponent {
  private health: number
  private maxHealth: number

  public get Health(): number {
    return this.health
  }

  public get MaxHealth(): number {
    return this.maxHealth
  }

  public constructor(startingHealth: number) {
    this.maxHealth = startingHealth
    this.health = startingHealth
  }

  public takeDamage(damage: number): void{
    this.health -= damage
  }

  public isDead(): boolean {
    return this.health <= 0
  }
}
