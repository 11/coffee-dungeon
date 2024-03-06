import Tile from '../../game/tile'
import { isInsideTriangleArea } from '../math'

test('isInsideTriangleArea', () => {
  const topLeftTriangle = [
    Tile.SCREEN_SIZE_X / 2, 0,                  // top mid point
    0, Tile.SCREEN_SIZE_Y / 2,                  // left mid point
    0, 0,                                       // top left point
  ]

  const topRightTriangle = [
    Tile.SCREEN_SIZE_X / 2, 0,                  // top mid point
    Tile.SCREEN_SIZE_X, Tile.SCREEN_SIZE_Y / 2, // right mid point
    Tile.SCREEN_SIZE_X, 0                       // top right corner
  ]

  const bottomLeftTriangle = [
    Tile.SCREEN_SIZE_X / 2, Tile.SCREEN_SIZE_Y, // bottom mid point
    0, Tile.SCREEN_SIZE_Y / 2,                  // left mid point
    0, Tile.SCREEN_SIZE_Y                       // bottom left point
  ]

  const bottomRightTriangle = [
    Tile.SCREEN_SIZE_X / 2, Tile.SCREEN_SIZE_Y, // bottom mid point
    Tile.SCREEN_SIZE_X, Tile.SCREEN_SIZE_Y / 2, // right mid point
    Tile.SCREEN_SIZE_X, Tile.SCREEN_SIZE_Y      // bottom right point
  ]

  console.log(topLeftTriangle)
  console.log(topRightTriangle)
  console.log(bottomLeftTriangle)
  console.log(bottomRightTriangle)

  // should pass for upper left triangle
  const test1 = [20, 18]
  let [px, py] = test1
  let [ax, ay, bx, by, cx, cy] = topLeftTriangle
  const result1 = isInsideTriangleArea(px, py, ax, ay, bx, by, cx, cy)
  expect(result1).toBeTruthy()

  // should pass for upper right triangle
  const test2 = [113, 19]
  let [px2, py2] = test2
  let [ax2, ay2, bx2, by2, cx2, cy2] = topRightTriangle
  const result2 = isInsideTriangleArea(px2, py2, ax2, ay2, bx2, by2, cx2, cy2)
  expect(result2).toBeTruthy()

  // should pass for bottom left triangle
  const test3 = [14, 57]
  let [px3, py3] = test3
  let [ax3, ay3, bx3, by3, cx3, cy3] = bottomLeftTriangle
  const result3 = isInsideTriangleArea(px3, py3, ax3, ay3, bx3, by3, cx3, cy3)
  expect(result3).toBeTruthy()

  // should pass for bottom right triangle
  const test4 = [113, 58]
  let [px4, py4] = test4
  let [ax4, ay4, bx4, by4, cx4, cy4] = bottomRightTriangle
  const result4 = isInsideTriangleArea(px4, py4, ax4, ay4, bx4, by4, cx4, cy4)
  expect(result4).toBeTruthy()
})