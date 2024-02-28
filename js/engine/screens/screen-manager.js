export default class ScreenManager {
  constructor() {
    this.currentScreen = null
    this.screens = {}
  }

  addScreen(id, screen) {
    if (!screen) {
      return
    }

    this.screens[id] = screen
  }

  setScreen(id) {
    if (!this.screens[id]) {
      return
    }

    this.currentScreen = this.screens[id]
  }

  hasScreen(id) {
    return !!this.screens[id]
  }

  initialize() {
    if (!this.currentScreen) {
      return
    }

    this.currentScreen.initialize()
  }

  update() {
    if (!this.currentScreen) {
      return
    }

    this.currentScreen.update()
  }

  draw(ctx) {
    if (!this.currentScreen) {
      return
    }

    this.currentScreen.draw(ctx)
  }
}
