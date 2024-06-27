import { Vector2 } from './Vector2'

const _lut = [ '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '0a', '0b', '0c', '0d', '0e', '0f', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '1a', '1b', '1c', '1d', '1e', '1f', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '2a', '2b', '2c', '2d', '2e', '2f', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '3a', '3b', '3c', '3d', '3e', '3f', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '4a', '4b', '4c', '4d', '4e', '4f', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '5a', '5b', '5c', '5d', '5e', '5f', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '6a', '6b', '6c', '6d', '6e', '6f', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '7a', '7b', '7c', '7d', '7e', '7f', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '8a', '8b', '8c', '8d', '8e', '8f', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '9a', '9b', '9c', '9d', '9e', '9f', 'a0', 'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'a9', 'aa', 'ab', 'ac', 'ad', 'ae', 'af', 'b0', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9', 'ba', 'bb', 'bc', 'bd', 'be', 'bf', 'c0', 'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'ca', 'cb', 'cc', 'cd', 'ce', 'cf', 'd0', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9', 'da', 'db', 'dc', 'dd', 'de', 'df', 'e0', 'e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8', 'e9', 'ea', 'eb', 'ec', 'ed', 'ee', 'ef', 'f0', 'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'fa', 'fb', 'fc', 'fd', 'fe', 'ff' ]

let _seed = 1234567


export const DEG2RAD = Math.PI / 180
export const RAD2DEG = 180 / Math.PI

// http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
export function generateUUID(): string {

	const d0 = Math.random() * 0xffffffff | 0
	const d1 = Math.random() * 0xffffffff | 0
	const d2 = Math.random() * 0xffffffff | 0
	const d3 = Math.random() * 0xffffffff | 0
	const uuid = _lut[ d0 & 0xff ] + _lut[ d0 >> 8 & 0xff ] + _lut[ d0 >> 16 & 0xff ] + _lut[ d0 >> 24 & 0xff ] + '-' +
			_lut[ d1 & 0xff ] + _lut[ d1 >> 8 & 0xff ] + '-' + _lut[ d1 >> 16 & 0x0f | 0x40 ] + _lut[ d1 >> 24 & 0xff ] + '-' +
			_lut[ d2 & 0x3f | 0x80 ] + _lut[ d2 >> 8 & 0xff ] + '-' + _lut[ d2 >> 16 & 0xff ] + _lut[ d2 >> 24 & 0xff ] +
			_lut[ d3 & 0xff ] + _lut[ d3 >> 8 & 0xff ] + _lut[ d3 >> 16 & 0xff ] + _lut[ d3 >> 24 & 0xff ]

	// .toLowerCase() here flattens concatenated strings to save heap memory space.
	return uuid.toLowerCase()

}

export function clamp(value: number, min: number, max: number): number{
	return Math.max( min, Math.min( max, value ) )
}

// compute euclidean modulo of m % n
// https://en.wikipedia.org/wiki/Modulo_operation
export function euclideanModulo(n: number, m: number): number {
	return ( ( n % m ) + m ) % m
}

// Linear mapping from range <a1, a2> to range <b1, b2>
function mapLinear(x: number, a1: number, a2: number, b1: number, b2: number): number {
	return b1 + ( x - a1 ) * ( b2 - b1 ) / ( a2 - a1 )
}

// https://www.gamedev.net/tutorials/programming/general-and-gameplay-programming/inverse-lerp-a-super-useful-yet-often-overlooked-function-r5230/
export function inverseLerp(x: number, y: number, value: number): number {
	if ( x !== y ) {
		return ( value - x ) / ( y - x )
	} else {
		return 0
	}
}

// https://en.wikipedia.org/wiki/Linear_interpolation
export function lerp(x: number, y: number, t: number): number{
	return ( 1 - t ) * x + t * y
}

// http://www.rorydriscoll.com/2016/03/07/frame-rate-independent-damping-using-lerp/
export function damp(x: number, y: number, lambda: number, dt: number): number {
	return lerp( x, y, 1 - Math.exp( - lambda * dt ) )
}

// https://www.desmos.com/calculator/vcsjnyz7x4
export function pingpong(x: number, length: number= 1): number {
	return length - Math.abs( euclideanModulo( x, length * 2 ) - length )
}

// http://en.wikipedia.org/wiki/Smoothstep
export function smoothstep(x: number, min: number, max: number): number {
	if ( x <= min ) return 0
	if ( x >= max ) return 1

	x = ( x - min ) / ( max - min )

	return x * x * ( 3 - 2 * x )
}

export function smootherstep(x: number, min: number, max: number): number {
	if ( x <= min ) return 0
	if ( x >= max ) return 1

	x = ( x - min ) / ( max - min )

	return x * x * x * ( x * ( x * 6 - 15 ) + 10 )
}

// Random integer from <low, high> interval
export function randInt(low: number, high: number): number {
	return low + Math.floor( Math.random() * ( high - low + 1 ) )
}

// Random float from <low, high> interval
export function randFloat( low: number, high: number): number{
	return low + Math.random() * ( high - low )
}

// Random float from <-range/2, range/2> interval
export function randFloatSpread(range: number): number {
	return range * ( 0.5 - Math.random() )
}

// Deterministic pseudo-random float in the interval [ 0, 1 ]
export function seededRandom(s: number): number {
	if ( s !== undefined ) _seed = s

	// Mulberry32 generator

	let t = _seed += 0x6D2B79F5

	t = Math.imul( t ^ t >>> 15, t | 1 )

	t ^= t + Math.imul( t ^ t >>> 7, t | 61 )

	return ( ( t ^ t >>> 14 ) >>> 0 ) / 4294967296
}

export function degToRad(degrees: number): number {
	return degrees * DEG2RAD
}

export function radToDeg(radians: number): number {
	return radians * RAD2DEG
}

export function isPowerOfTwo(value: number): boolean{
	return (value & (value - 1)) === 0 && value !== 0
}

export function ceilPowerOfTwo(value: number): number {
	return Math.pow( 2, Math.ceil( Math.log( value ) / Math.LN2 ) )
}

export function floorPowerOfTwo(value: number): number {
	return Math.pow( 2, Math.floor( Math.log( value ) / Math.LN2 ) )
}


export function denormalize(value: number, array: number): number {
	switch ( array.constructor ) {
		case Float32Array:
			return value
		case Uint16Array:
			return value / 65535.0
		case Uint8Array:
			return value / 255.0
		case Int16Array:
			return Math.max( value / 32767.0, - 1.0 )
		case Int8Array:
			return Math.max( value / 127.0, - 1.0 )
		default:
			throw new Error( 'Invalid component type.' )
	}
}

export function normalize(value: number, array: number): number {
	switch ( array.constructor ) {
		case Float32Array:
			return value
		case Uint16Array:
			return Math.round( value * 65535.0 )
		case Uint8Array:
			return Math.round( value * 255.0 )
		case Int16Array:
			return Math.round( value * 32767.0 )
		case Int8Array:
			return Math.round( value * 127.0 )
		default:
			throw new Error( 'Invalid component type.' )
	}
}


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
export function isInsideTriangleBaycentric(px: number, py: number, ax: number, ay: number, bx: number, by: number, cx: number, cy: number): boolean {
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
export function isInsideTriangleBaycentricVectors(p: Vector2, a: Vector2, b: Vector2, c: Vector2): boolean {
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
export function triangleArea(ax: number, ay: number, bx: number, by: number, cx: number, cy: number): number {
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
export function isInsideTriangleArea(px: number, py: number, ax: number, ay: number, bx: number, by: number, cx: number, cy: number): boolean {
  const A = triangleArea(ax, ay, bx, by, cx, cy) // calculate area of triangle ABC
  const pbc = triangleArea(px, py, bx, by, cx, cy)  // calculate area of triangle PBC
  const pac = triangleArea(ax, ay, px, py, cx, cy)  // calculate area of triangle PAC
  const pab = triangleArea(ax, ay, bx, by, px, py)  // calculate area of triangle PAB
  return A === pbc + pac + pab
}

export type NormalizedNumber = 0.0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1
