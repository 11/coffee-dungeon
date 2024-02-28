export default class RotatingQueue {
  get size() {
    return this.queue.length
  }

  constructor(maxSize = 10) {
    this.maxSize = maxSize
    this.queue = []
  }

  push(item) {
    if (this.queue.length >= this.maxSize) {
      this.queue.shift()
    }

    this.queue.push(item)
  }

  get(index) {
    return this.queue[index]
  }
}
