import { Vector2 } from "./threejs-math"

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
export function isInsideTriangle(px, px, ax, ay, bx, by, cx, cy) {
  const w1 = ax * (cy - ay) + (py - ay) * (cx - ax) - px * (cy - ay) / (by - ay) * (cx - ax) - (bx - ax) * (cy - ay)
  const w2 = py - ay - w1 * (by - ay) / (cy - ay)
  return w1 > 0 && w2 > 0 && (w1 + w2) <= 1
}

/**
 * Baycentric coodrinate approach to determining if a point is inside of a triangle 
 * @param {Vector2} p - point we're checking that is inside triangle
 * @param {Vector2} a - point a in triangle 
 * @param {Vector2} b - point b in triangle
 * @param {Vector2} c - point c in triangle
 * @return {Boolean} if point is inside triangle
 */
export function isInsideTriangleVectors(p, a, b, c) {
  const w1 = a.x * (c.y - a.y) + (p.y - a.y) * (c.x - a.x) - p.x * (c.y - a.y) / (b.y - a.y) * (c.x - a.x) - (b.x - a.x) * (c.y - a.y)
  const w2 = p.y - a.y - w1 * (b.y - a.y) / (c.y - a.y)
  return w1 > 0 && w2 > 0 && (w1 + w2) <= 1
}