export default interface Scene {
  initialize(): void
  update(deltaTime: number): void
  draw(ctx): void
}
