import type Scene from './scene'

export default class SceneManager {
  private currentScene: Scene
  private scenes: Record<string, Scene>

  public constructor() {
    this.currentScene = null
    this.scenes = {}
  }

  public addScene(id: string, scene: Scene): void {
    if (!screen) {
      return
    }

    this.scenes[id] = scene
  }

  public setScene(id): void {
    if (!this.scenes[id]) {
      return
    }

    this.currentScene = this.scenes[id]
  }

  public hasScene(id): boolean {
    return !!this.scenes[id]
  }

  public initialize(): void {
    if (!this.currentScene) {
      return
    }

    this.currentScene.initialize()
  }

  public update(deltaTime: number): void {
    if (!this.currentScene) {
      return
    }

    this.currentScene.update(deltaTime)
  }

  public draw(ctx: CanvasRenderingContext2D): void{
    if (!this.currentScene) {
      return
    }

    this.currentScene.draw(ctx)
  }
}
