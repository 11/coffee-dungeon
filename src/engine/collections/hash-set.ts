export default class HashSet {
  private set: Record<any, any> = null

  public constructor(list: any[] | null) {
    this.set = {}
    if (list) {
      list.forEach(item => this.add(item))
    }
  }

  public add(item: any) {
    if (!!item.toHash) {
      this.set[item.toHash()] = item
    } else {
      console.warn('Could not place item in HashSet')
    }
  }

  public remove(item: any): void {
    if (!!item.toHash) {
      const value = this.set[item.toHash()]
      this.set[item.toHash()] = undefined
      return value
    }

    console.warn('Could not remove item in HashSet')
  }

  public has(item: any): boolean {
    if (!!item.toHash) {
      return this.set[item.toHash()]
    }

    console.warn('Could check for item in HashSet')
  }

  public [Symbol.iterator]() {
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
