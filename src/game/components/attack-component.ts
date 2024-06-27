import { NotImplementedError } from '../../engine/errors'

export default class AttackComponent {
  private name: string

  private attack: Function = (): void => { throw new NotImplementedError('Attack not yet implemented') }

  public get Name() {
    return this.name
  }

  public get Attack(): Function {
    return this.attack
  }

  public constructor(name: string, attack: Function) {
    this.name = name
    this.attack = attack
  }
}
