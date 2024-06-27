import { Vector2 } from './Vector2'

const _vector = new Vector2()

export class Box2 {
	private isBox2: boolean
	public min: Vector2
	public max: Vector2

	public constructor(
		min: Vector2 = new Vector2(+ Infinity, + Infinity),
		max: Vector2 = new Vector2(- Infinity, - Infinity)
	) {
		this.isBox2 = true
		this.min = min
		this.max = max
	}

	public set(min: Vector2, max: Vector2): Box2 {
		this.min.copy(min)
		this.max.copy(max)

		return this
	}

	public setFromPoints(points: Vector2[]): Box2 {
		this.makeEmpty()
		for (let i = 0, il = points.length; i < il; i++) {
			this.expandByPoint(points[i])
		}

		return this
	}

	public setFromCenterAndSize(center: Vector2, size: Vector2): Box2 {
		const halfSize = _vector.copy(size).multiplyScalar(0.5)
		this.min.copy(center).sub(halfSize)
		this.max.copy(center).add(halfSize)

		return this
	}

	public clone(): Box2 {
		return new Box2(this.min, this.max)
	}

	public copy(box: Box2): Box2 {
		this.min.copy(box.min)
		this.max.copy(box.max)

		return this
	}

	public makeEmpty(): Box2 {
		this.min.x = this.min.y = + Infinity
		this.max.x = this.max.y = - Infinity
		return this
	}

	/**
	 * this is a more robust check for empty than (volume <= 0) because volume can get positive with two negative axes
	 */
	public isEmpty(): boolean {
		return (this.max.x < this.min.x) || (this.max.y < this.min.y)
	}

	public getCenter(target: Vector2 = new Vector2()): Vector2 {
		return this.isEmpty() ? target.set(0, 0) : target.addVectors(this.min, this.max).multiplyScalar(0.5)
	}

	public getSize(target: Vector2 = new Vector2()): Vector2 {
		return this.isEmpty() ? target.set(0, 0) : target.subVectors(this.max, this.min)
	}

	public expandByPoint(point: Vector2): Box2 {
		this.min.min(point)
		this.max.max(point)
		return this
	}

	public expandByVector(vector: Vector2): Box2 {
		this.min.sub(vector)
		this.max.add(vector)
		return this
	}

	public expandByScalar(scalar: number): Box2 {
		this.min.addScalar(- scalar)
		this.max.addScalar(scalar)
		return this
	}

	public containsPoint(point: Vector2): boolean {
		return point.x < this.min.x || point.x > this.max.x ||
			point.y < this.min.y || point.y > this.max.y ? false : true
	}

	public containsBox(box: Box2): boolean {
		return this.min.x <= box.min.x && box.max.x <= this.max.x &&
			this.min.y <= box.min.y && box.max.y <= this.max.y
	}

	/**
	 * This can potentially have a divide by zero if the box has a size dimension of 0.
	 */
	public getParameter(point: Vector2, target: Vector2): Vector2 {
		return target.set(
			(point.x - this.min.x) / (this.max.x - this.min.x),
			(point.y - this.min.y) / (this.max.y - this.min.y)
		)
	}

	/**
	 * using 4 splitting planes to rule out intersections
	 */
	public intersectsBox(box: Box2): boolean {
		return box.max.x < this.min.x || box.min.x > this.max.x ||
			box.max.y < this.min.y || box.min.y > this.max.y ? false : true
	}

	public clampPoint(point: Vector2, target: Vector2): Vector2 {
		return target.copy(point).clamp(this.min, this.max)
	}

	public distanceToPoint(point: Vector2): number {
		const clampedPoint = _vector.copy(point).clamp(this.min, this.max)
		return clampedPoint.sub(point).length()
	}

	public intersect(box: Box2): Box2 {
		this.min.max(box.min)
		this.max.min(box.max)
		return this
	}

	public union(box: Box2): Box2 {
		this.min.min(box.min)
		this.max.max(box.max)
		return this
	}

	public translate(offset: Vector2): Box2 {
		this.min.add(offset)
		this.max.add(offset)
		return this
	}

	public equals(box: Box2): boolean {
		return box.min.equals(this.min) && box.max.equals(this.max)
	}
}
