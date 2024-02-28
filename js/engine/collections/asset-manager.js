export default class AssetManager {
  constructor() {
    this.images = {}
  }

  get(id) {
    if (!id) {
      return null
    }

    return this.images[id]
  }

  remove(id) {
    if (!id) {
      return false
    }

    this.images[id] = null
    return true
  }

  add(id, image) {
    if (!id || !image) {
      return false
    }

    const htmlImage = document.querySelector(`#${image}`)
    this.images[id] = htmlImage
    return true
  }

  toString() {
    const loadedImages = Object
      .entries(this.images)
      .map(([key, value]) => {
        return `- ${key}: ${value.id}`
      })
      .join('\n')

    return `AssetManager loaded assets:\n${loadedImages}`
  }
}
