export default class HashSet {
  set = null

  /**
   *
   * @param {any[] | null} list
   */
  constructor(list) {
    this.set = {}
    if (list) {
      list.forEach(item => this.add(item))
    }
  }

  /**
   *
   * @param {any} item
   */
  add(item) {
    if (!!item.toHash) {
      this.set[item.toHash()] = item
    } else {
      console.warn('Could not place item in HashSet')
    }
  }

  /**
   * @param {any} item
   */
  remove(item) {
    if (!!item.toHash) {
      const item = this.set[item.toHash()]
      this.set[item.toHash()] = undefined
      return item
    }

    console.warn('Could not remove item in HashSet')
  }

  /**
   * @param {any} item
   * @returns {Boolean}
   */
  has(item) {
    if (!!item.toHash) {
      return this.set[item.toHash()]
    }

    console.warn('Could check for item in HashSet')
  }

  [Symbol.iterator]() {
    const values = Object.values(this.set);
    let index = 0;

    return {
      next: () => {
        if (index < values.length) {
          return { value: values[index++], done: false };
        } else {
          return { done: true };
        }
      }
    }
  }

}
