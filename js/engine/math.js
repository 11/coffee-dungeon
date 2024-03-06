import { Vector2 } from './threejs-math/index.js'

/**
 * Baycentric coodrinate approach to determining if a point is inside of a triangle
 * @param {Number} px 
 * @param {Number} py 
 * @param {Number} ax 
 * @param {Number} ay 
 * @param {Number} bx 
 * @param {Number} by 
 * @param {Number} cx 
 * @param {Number} cy 
 * @return {Boolean} if point is inside triangle
 */
export function isInsideTriangleBaycentric(px, py, ax, ay, bx, by, cx, cy) {
  let w1 = (ax * (cy - ay) + (py - ay) * (cx - ax) - px * (cy - ay)) / ((by - ay) * (cx - ax) - (bx - ax) * (cy - ay))
  if (isNaN(w1)) {
    w1 = 0
  }

  let w2 = (py - ay - w1 * (by - ay)) / (cy - ay)
  if (isNaN(w2)) {
    w2 = 0
  }

  return w1 >= 0 && w2 >= 0 && (w1 + w2) <= 1
}

/**
 * Baycentric coodrinate approach to determining if a point is inside of a triangle 
 * @param {Vector2} p - point we're checking that is inside triangle
 * @param {Vector2} a - point a in triangle 
 * @param {Vector2} b - point b in triangle
 * @param {Vector2} c - point c in triangle
 * @return {Boolean} if point is inside triangle
 */
export function isInsideTriangleBaycentricVectors(p, a, b, c) {
  const w1 = (a.x * (c.y - a.y) + (p.y - a.y) * (c.x - a.x) - p.x * (c.y - a.y)) / ((b.y - a.y) * (c.x - a.x) - (b.x - a.x) * (c.y - a.y))
  const w2 = (p.y - a.y - w1 * (b.y - a.y)) / (c.y - a.y)
  return w1 >= 0 && w2 >= 0 && (w1 + w2) <= 1
}

/**
 * cacluate the area of a triangle 
 * @param {Number} ax 
 * @param {Number} ay 
 * @param {Number} bx 
 * @param {Number} by 
 * @param {Number} cx 
 * @param {Number} cy 
 * @returns 
 */
export function triangleArea(ax, ay, bx, by, cx, cy) {
  return Math.abs((ax * (by - cy) + bx * (cy - ay) + cx * (ay - by)) / 2.0)
}

/**
 * calculate if a point is inside a triangle using area method
 * @param {Number} px 
 * @param {Number} py 
 * @param {Number} ax 
 * @param {Number} ay 
 * @param {Number} bx 
 * @param {Number} by 
 * @param {Number} cx 
 * @param {Number} cy 
 */
export function isInsideTriangleArea(px, py, ax, ay, bx, by, cx, cy) {
  const A = triangleArea(ax, ay, bx, by, cx, cy) // calculate area of triangle ABC
  const pbc = triangleArea(px, py, bx, by, cx, cy)  // calculate area of triangle PBC 
  const pac = triangleArea(ax, ay, px, py, cx, cy)  // calculate area of triangle PAC 
  const pab = triangleArea(ax, ay, bx, by, px, py)  // calculate area of triangle PAB 
  return A === pbc + pac + pab
}