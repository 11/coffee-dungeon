export default class RotatingQueue {
  private queue: any[]
  private maxSize: number

  public get size() {
    return this.queue.length
  }

  public constructor(maxSize: number = 10) {
    this.maxSize = maxSize
    this.queue = []
  }

  public push(item: any): void {
    if (this.queue.length >= this.maxSize) {
      this.queue.shift()
    }

    this.queue.push(item)
  }

  public get(index: number): any {
    return this.queue[index]
  }
}
