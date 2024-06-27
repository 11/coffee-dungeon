export default class AssetManager {
  private images: Record<string, Element>

  public constructor() {
    this.images = {}
  }

  public get(id: string): CanvasImageSource {
    if (!id) {
      return null
    }

    return this.images[id] as CanvasImageSource
  }

  public remove(id: string): boolean {
    if (!id) {
      return false
    }

    this.images[id] = null
    return true
  }

  public add(id: string, image: string): boolean {
    if (!id || !image) {
      return false
    }

    const htmlImage = document.querySelector(`#${image}`)
    this.images[id] = htmlImage
    return true
  }

  public toString(): string {
    const loadedImages = Object
      .entries(this.images)
      .map(([key, value]) => {
        return `- ${key}: ${value.id}`
      })
      .join('\n')

    return `AssetManager loaded assets:\n${loadedImages}`
  }
}
