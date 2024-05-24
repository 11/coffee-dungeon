import { NotImplementedError } from '../../engine/errors/js'

export default class AttackComponent {
  name = null
  attack = () => { throw new NotImplementedError('Attack not yet implemented') }

  /**
   *
   * @return {string} name
   */
  get Name() {
    return this.name
  }

  /**
   *
   * @return {Function} attack
   */
  get Attack() {
    return this.attack
  }

  /**
   *
   * @param {String} name
   * @param {Function} attack
   */
  constructor(name, attack) {
    this.name = name
    this.attack = attack
  }
}
