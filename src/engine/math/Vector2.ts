class Vector2 {
	public isVector2: boolean
	public x: number
	public y: number

	public constructor(x: number = 0, y: number = 0 ) {
		this.isVector2 = true
		this.x = x
		this.y = y
	}

	public get width() {
		return this.x
	}

	public set width(value: number) {
		this.x = value
	}

	public get height(): number{
		return this.y
	}

	public set height(value: number) {
		this.y = value
	}

	public set(x: number, y: number ) {
		this.x = x
		this.y = y
		return this
	}

	public setScalar(scalar): Vector2 {
		this.x = scalar
		this.y = scalar
		return this
	}

	public setX(x: number): Vector2 {
		this.x = x
		return this
	}

	public setY(y: number): Vector2 {
		this.y = y
		return this
	}

	public setComponent(index, value): Vector2 {
		switch ( index ) {
			case 0:
				this.x = value
				break
			case 1:
				this.y = value
				break
			default: throw new Error( 'index is out of range: ' + index )
		}

		return this
	}

	public getComponent(index: 0 | 1): number{
		switch (index) {
			case 0: return this.x
			case 1: return this.y
			default: throw new Error( 'index is out of range: ' + index )
		}
	}

	public clone(): Vector2 {
		return new Vector2(this.x, this.y)
	}

	public copy(v: Vector2): Vector2 {
		this.x = v.x
		this.y = v.y
		return this

	}

	public add(v: Vector2): Vector2 {
		this.x += v.x
		this.y += v.y
		return this

	}

	public addScalar(s: number): Vector2 {
		this.x += s
		this.y += s
		return this

	}

	public addVectors(a: Vector2, b: Vector2): Vector2 {
		this.x = a.x + b.x
		this.y = a.y + b.y
		return this
	}

	public addScaledVector(v: Vector2, s: number): Vector2 {
		this.x += v.x * s
		this.y += v.y * s
		return this
	}

	public sub(v: Vector2): Vector2 {
		this.x -= v.x
		this.y -= v.y
		return this
	}

	public subScalar(s: number): Vector2 {
		this.x -= s
		this.y -= s
		return this
	}

	public subVectors(a: Vector2, b: Vector2): Vector2 {
		this.x = a.x - b.x
		this.y = a.y - b.y
		return this
	}

	public multiply(v: Vector2) {
		this.x *= v.x
		this.y *= v.y
		return this
	}

	public multiplyScalar(s: number): Vector2 {
		this.x *= s
		this.y *= s
		return this
	}

	public divide(v: Vector2): Vector2 {
		this.x /= v.x
		this.y /= v.y
		return this
	}

	public divideScalar(s: number): Vector2 {
		return this.multiplyScalar( 1 / s)
	}

	public min(v: Vector2): Vector2 {
		this.x = Math.min( this.x, v.x )
		this.y = Math.min( this.y, v.y )
		return this
	}

	public max(v: Vector2) {
		this.x = Math.max( this.x, v.x )
		this.y = Math.max( this.y, v.y )
		return this
	}

	public clamp(min, max): Vector2 {
		// assumes min < max, componentwise
		this.x = Math.max( min.x, Math.min( max.x, this.x ) )
		this.y = Math.max( min.y, Math.min( max.y, this.y ) )
		return this
	}

	public clampScalar( minVal, maxVal ) {
		this.x = Math.max( minVal, Math.min( maxVal, this.x ))
		this.y = Math.max( minVal, Math.min( maxVal, this.y ))
		return this
	}

	public clampLength(min: number, max: number): Vector2 {
		const length = this.length()
		return this.divideScalar( length || 1 ).multiplyScalar( Math.max( min, Math.min( max, length ) ) )
	}

	public floor(): Vector2 {
		this.x = Math.floor(this.x)
		this.y = Math.floor(this.y)
		return this
	}

	public ceil(): Vector2 {
		this.x = Math.ceil(this.x)
		this.y = Math.ceil(this.y)
		return this
	}

	public round(): Vector2 {
		this.x = Math.round(this.x)
		this.y = Math.round(this.y)

		return this
	}

	public roundToZero(): Vector2{
		this.x = ( this.x < 0 ) ? Math.ceil( this.x ) : Math.floor( this.x )
		this.y = ( this.y < 0 ) ? Math.ceil( this.y ) : Math.floor( this.y )

		return this
	}

	public negate(): Vector2 {
		this.x = - this.x
		this.y = - this.y

		return this
	}

	public dot(v: Vector2): number {
		return this.x * v.x + this.y * v.y
	}

	public cross(v: Vector2): number{
		return this.x * v.y - this.y * v.x
	}

	public lengthSq(): number{
		return this.x * this.x + this.y * this.y
	}

	public length(): number {
		return Math.sqrt( this.x * this.x + this.y * this.y )
	}

	public manhattanLength(): number {
		return Math.abs( this.x ) + Math.abs( this.y )
	}

	public normalize(): Vector2 {
		return this.divideScalar( this.length() || 1 )
	}

	/**
	 * computes the angle in radians with respect to the positive x-axis
	 */
	public angle(): number {
		const angle = Math.atan2( - this.y, - this.x ) + Math.PI
		return angle
	}

	public distanceTo(v: Vector2): number {
		return Math.sqrt( this.distanceToSquared(v) )
	}

	public distanceToSquared(v: Vector2): number {
		const dx = this.x - v.x, dy = this.y - v.y
		return dx * dx + dy * dy
	}

	public manhattanDistanceTo(v: Vector2): number {
		return Math.abs( this.x - v.x ) + Math.abs( this.y - v.y )
	}

	public setLength(length: number): Vector2 {
		return this.normalize().multiplyScalar( length )
	}

	public lerp(v: Vector2, alpha: number): Vector2 {
		this.x += ( v.x - this.x ) * alpha
		this.y += ( v.y - this.y ) * alpha
		return this
	}

	public lerpVectors(v1: Vector2, v2: Vector2, alpha: number): Vector2 {
		this.x = v1.x + ( v2.x - v1.x ) * alpha
		this.y = v1.y + ( v2.y - v1.y ) * alpha
		return this
	}

	public equals(v: Vector2): boolean {
		return ( ( v.x === this.x ) && ( v.y === this.y ) )
	}

	public fromArray(array: number[], offset = 0): Vector2 {
		this.x = array[offset]
		this.y = array[offset + 1]

		return this
	}

	public toArray( array = [], offset = 0 ): number[] {
		array[ offset ] = this.x
		array[ offset + 1 ] = this.y
		return array
	}

	public rotateAround(center: Vector2, angle: number): Vector2 {
		const c = Math.cos( angle ), s = Math.sin( angle )

		const x = this.x - center.x
		const y = this.y - center.y

		this.x = x * c - y * s + center.x
		this.y = x * s + y * c + center.y
		return this
	}

	public random(): Vector2 {
		this.x = Math.random()
		this.y = Math.random()
		return this
	}

	public *[ Symbol.iterator ]() {
		yield this.x
		yield this.y
	}

	public toJSON(): Record<string | symbol, number | string> {
		return {
			class: 'vector2',
			x: this.x,
			y: this.y,
		}
	}

	public toHash(): string{
		return `(${this.x},${this.y})`
	}
}

export { Vector2 }
