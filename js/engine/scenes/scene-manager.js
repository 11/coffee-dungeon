export default class SceneManager {
  constructor() {
    this.currentScene = null
    this.scenes = {}
  }

  addScreen(id, screen) {
    if (!screen) {
      return
    }

    this.scenes[id] = screen
  }

  setScreen(id) {
    if (!this.scenes[id]) {
      return
    }

    this.currentScene = this.scenes[id]
  }

  hasScreen(id) {
    return !!this.scenes[id]
  }

  initialize() {
    if (!this.currentScene) {
      return
    }

    this.currentScene.initialize()
  }

  update() {
    if (!this.currentScene) {
      return
    }

    this.currentScene.update()
  }

  draw(ctx) {
    if (!this.currentScene) {
      return
    }

    this.currentScene.draw(ctx)
  }
}
