"use strict";
// Math extensions
Math.deg2rad = Math.PI/180.0;

//............................................
// Vector classes
class Vector2{
    raw;

    get x(){ return this.raw[0];}
    get y(){ return this.raw[1];}

    set x(x){this.raw[0] = x;}
    set y(y){this.raw[1] = y;}

    static get ZERO(){ return new Vector2( 0.0, 0.0)};
    static get RIGHT(){return new Vector2( 1.0, 0.0)};
    static get LEFT(){ return new Vector2(-1.0, 0.0)};
    static get UP(){   return new Vector2( 0.0, 1.0)};
    static get DOWN(){ return new Vector2( 0.0,-1.0)};

    constructor(x,y){
        this.raw = [0,0];
        if(Array.isArray(x)){
            this.x = x[0];
            this.y = x[1];
        } else {
            if(!isNaN(x)){ this.x = x;}
            if(!isNaN(y)){ this.y = y;}
        }
    }

    /** returns the magnitude of this vector.
    * @return {number} the magnitude of this vector.
    */
    magnitude(){
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /** returns the squared magnitude of this vector.
    * @return {number} the squared magnitude of this vector.
    */
    sqrMagnitude(){
        return this.x * this.x + this.y * this.y;
    }

    /** returns the distance from this point to the given point v.
    * @param {Vector2} v the point to valculate the distance to.
    * @return {number} the distance to v.
    */
    distanceTo(v){
        let x = v.x - this.x;
        let y = v.y - this.y;
        return Math.sqrt(x * x + y * y);
    }

    /** normalizes this vector.
    * @return {Vector2} this vector to chain up commands.
    */
    normalize(){
        let mag = this.magnitude();
        this.x /= mag;
        this.y /= mag;
        return this;
    }

    /** sets the values x and y for this vector.
    * @param {number} x the new x value.
    * @param {number} y the new y value.
    * @return {Vector2} this vector to chain up commands.
    */
    set(x, y){
        this.x = x;
        this.y = y;
        return this;
    }

    /** multiplies the scalar s on this vector
    * @param {number} s value to multiply and scale the vector.
    * @return {Vector2} this vector to chain up commands.
    */
    multiplyScalar(s){
        this.x *= s;
        this.y *= s;
        return this;
    }

    /** calculates and returns the dot product between this vector and the vector v.
    * @param {Vector2} v vector to calculate the dot product with.
    * @return {number} the result of the dot product.
    */
    dot(v){
        return this.x * v.x + this.y * v.y;
    }

    /** adds another vector v on top of this vector.
    * @param {Vector2} v vector to add to this vector.
    * @return {Vector2} this vector to chain up commands.
    */
    addV(v){
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    /** adds the values x and y to this vector.
    * @param {number} x x value to add.
    * @param {number} y y value to add
    * @return {Vector2} this vector to chain up commands.
    */
    add(x, y){
        this.x += x;
        this.y += y;
        return this;
    }

    /** subtracts another vector v from this vector.
    * @param {Vector2} v vector to subtract from this vector.
    * @return {Vector2} this vector to chain up commands.
    */
    substractV(v){
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    /** subtracts the values x and y from this vector.
    * @param {number} x x value to subtract.
    * @param {number} y y value to subtract.
    * @return {Vector2} this vector to chain up commands.
    */
    substract(x, y){
        this.x -= x;
        this.y -= y;
        return this;
    }

    /** inverts this vector (makes it face the opposite direction, but keep its length).
    * @return {Vector2} this vector to chain up commands.
    */
    invert(){
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }

    equals(v){
        if(!(v instanceof Vector2))
            return false;
        return this.x === v.x && this.y === v.y;
    }

    clone(){ return new Vector2(this.x, this.y); }

    toVector3(){ return new Vector3(this.x, this.y, 0); }

    toVector4(){ return new Vector4(this.x, this.y, 0, 1); }

    toString(){ return "[" + this.raw.toString() + "]"; }

    toFloat32(){ return new Float32Array(this.raw);}
}

class Vector3{
    raw;

    get x(){ return this.raw[0];}
    get y(){ return this.raw[1];}
    get z(){ return this.raw[2];}

    set x(x){this.raw[0] = x;}
    set y(y){this.raw[1] = y;}
    set z(z){this.raw[2] = z;}

    static get ZERO(){   return new Vector3( 0.0, 0.0, 0.0)};
    static get RIGHT(){  return new Vector3( 1.0, 0.0, 0.0)};
    static get LEFT(){   return new Vector3(-1.0, 0.0, 0.0)};
    static get UP(){     return new Vector3( 0.0, 1.0, 0.0)};
    static get DOWN(){   return new Vector3( 0.0,-1.0, 0.0)};
    static get FORWARD(){return new Vector3( 0.0, 0.0, 1.0)};
    static get BACK(){   return new Vector3( 0.0, 0.0,-1.0)};

    constructor(x,y,z){
        this.raw = [0,0,0];
        if(Array.isArray(x)){
            this.x = x[0];
            this.y = x[1];
            this.z = x[2];
        } else {
            if(!isNaN(x)){ this.x = x;}
            if(!isNaN(y)){ this.y = y;}
            if(!isNaN(z)){ this.z = z;}
        }
    }

    /** returns the magnitude of this vector.
    * @return {number} the magnitude of this vector.
    */
    magnitude(){
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    /** returns the squared magnitude of this vector.
    * @return {number} the squared magnitude of this vector.
    */
    sqrMagnitude(){
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    /** returns the distance from this point to the given point v.
    * @param {Vector3} v the point to valculate the distance to.
    * @return {number} the distance to v.
    */
    distanceTo(v){
        let x = v.x - this.x;
        let y = v.y - this.y;
        let z = 0;
        if(v.z) z = v.z - this.z;
        return Math.sqrt(x * x + y * y + z * z);
    }

    /** normalizes this vector.
    * @return {Vector3} this vector to chain up commands.
    */
    normalize(){
        let mag = this.magnitude();
        this.x /= mag;
        this.y /= mag;
        this.z /= mag;
        return this;
    }

    /** sets the values x and y for this vector.
    * @param {number} x the new x value.
    * @param {number} y the new y value.
    * @param {number} z the new z value.
    * @return {Vector3} this vector to chain up commands.
    */
    set(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }

    /** multiplies the scalar s on this vector
    * @param {number} s value to multiply and scale the vector.
    * @return {Vector3} this vector to chain up commands.
    */
    multiplyScalar(s){
        this.x *= s;
        this.y *= s;
        this.z *= s;
        return this;
    }

    /** calculates and returns the dot product between this vector and the vector v.
    * @param {Vector3} v vector to calculate the dot product with.
    * @return {number} the result of the dot product.
    */
    dot(v){
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    /** calculates and returns the cross product between this vector and the vector v (this X v).
    * @param {Vector3} v vector to calculate the cross product with.
    * @return {Vector3} the result of the cross product.
    */
    cross(v){
        return new Vector3( this.y*v.z - this.z*v.y,
                            this.z*v.x - this.x*v.z,
                            this.x*v.y - this.y*v.x);
    }

    /** adds another vector v on top of this vector.
    * @param {Vector3} v vector to add to this vector.
    * @return {Vector3} this vector to chain up commands.
    */
    addV(v){
        this.x += v.x;
        this.y += v.y;
        if(v.z) this.z += v.z;
        return this;
    }

    /** adds the values x, y and z to this vector.
    * @param {number} x x value to add.
    * @param {number} y y value to add
    * @param {number} z z value to add
    * @return {Vector3} this vector to chain up commands.
    */
    add(x, y, z){
        this.x += x;
        this.y += y;
        if(z) this.z += z;
        return this;
    }

    /** subtracts another vector v from this vector.
    * @param {Vector3} v vector to subtract from this vector.
    * @return {Vector3} this vector to chain up commands.
    */
    subtractV(v){
        this.x -= v.x;
        this.y -= v.y;
        if(v.z) this.z -= v.z;
        return this;
    }

    /** subtracts the values x, y and z from this vector.
    * @param {number} x x value to subtract.
    * @param {number} y y value to subtract.
    * @param {number} z z value to subtract.
    * @return {Vector3} this vector to chain up commands.
    */
    substract(x, y, z){
        this.x -= x;
        this.y -= y;
        if(z) this.z -= z;
        return this;
    }

    /** inverts this vector (makes it face the opposite direction, but keep its length).
    * @return {Vector3} this vector to chain up commands.
    */
    invert(){
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        return this;
    }

    equals(v){
        if(!(v instanceof Vector3))
            return false;
        return this.x === v.x && this.y === v.y && this.z === v.z;
    }

    clone(){ return new Vector3(this.x, this.y, this.z); }

    toVector2(){ return new Vector2(this.x, this.y); }

    toVector4(){ return new Vector4(this.x, this.y, 0, 1); }

    toString(){ return "[" + this.raw.toString() + "]"; }

    toFloat32(){ return new Float32Array(this.raw);}
}

class Vector4{
    raw;

    get x(){ return this.raw[0];}
    get y(){ return this.raw[1];}
    get z(){ return this.raw[2];}
    get w(){ return this.raw[3];}

    set x(x){this.raw[0] = x;}
    set y(y){this.raw[1] = y;}
    set z(z){this.raw[2] = z;}
    set w(w){this.raw[3] = w;}

    static get ZERO(){   return new Vector4( 0.0, 0.0, 0.0, 0.0)};
    static get RIGHT(){  return new Vector4( 1.0, 0.0, 0.0, 1.0)};
    static get LEFT(){   return new Vector4(-1.0, 0.0, 0.0, 1.0)};
    static get UP(){     return new Vector4( 0.0, 1.0, 0.0, 1.0)};
    static get DOWN(){   return new Vector4( 0.0,-1.0, 0.0, 1.0)};
    static get FORWARD(){return new Vector4( 0.0, 0.0, 1.0, 1.0)};
    static get BACK(){   return new Vector4( 0.0, 0.0,-1.0, 1.0)};

    constructor(x,y,z,w){
        this.raw = [0,0,0,1];
        if(Array.isArray(x)){
            this.x = x[0];
            this.y = x[1];
            this.z = x[2];
            this.w = x[3];
        } else {
            if(!isNaN(x)){ this.x = x;}
            if(!isNaN(y)){ this.y = y;}
            if(!isNaN(z)){ this.z = z;}
            if(!isNaN(w)){ this.w = w;}
        }
    }

    /** returns the magnitude of this vector.
    * @return {number} the magnitude of this vector.
    */
    magnitude(){
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    }

    /** returns the squared magnitude of this vector.
    * @return {number} the squared magnitude of this vector.
    */
    sqrMagnitude(){
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    /** returns the distance from this point to the given point v.
    * @param {Vector4} v the point to valculate the distance to.
    * @return {number} the distance to v.
    */
    distanceTo(v){
        let x = v.x - this.x;
        let y = v.y - this.y;
        let z = 0;
        if(v.z)
            z = v.z - this.z;
        let w = 0;
        if(v.w)
            w = v.w - this.w;
        return Math.sqrt(x * x + y * y + z * z + w * w);
    }

    /** normalizes this vector.
    * @return {Vector4} this vector to chain up commands.
    */
    normalize(){
        let mag = this.magnitude();
        this.x /= mag;
        this.y /= mag;
        this.z /= mag;
        this.w /= mag;
        return this;
    }

    /** sets the values x and y for this vector.
    * @param {number} x the new x value.
    * @param {number} y the new y value.
    * @param {number} z the new z value.
    * @param {number} w the new w value.
    * @return {Vector4} this vector to chain up commands.
    */
    set(x, y, z, w){
        this.x = x;
        this.y = y;
        if(z) this.z = z;
        if(w) this.w = w;
        return this;
    }

    /** multiplies the scalar s on this vector
    * @param {number} s value to multiply and scale the vector.
    * @return {Vector4} this vector to chain up commands.
    */
    multiplyScalar(s){
        this.x *= s;
        this.y *= s;
        this.z *= s;
        this.w *= s;
        return this;
    }

    /** calculates and returns the dot product between this vector and the vector v.
    * @param {Vector4} v vector to calculate the dot product with.
    * @return {number} the result of the dot product.
    */
    dot(v){
        return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
    }

    /** adds another vector v on top of this vector.
    * @param {Vector4} v vector to add to this vector.
    * @return {Vector4} this vector to chain up commands.
    */
    addV(v){
        this.x += v.x;
        this.y += v.y;
        if(v.z) this.z += v.z;
        if(v.w) this.w += v.w;
        return this;
    }

    /** adds the values x, y, z and w to this vector.
    * @param {number} x x value to add.
    * @param {number} y y value to add
    * @param {number} z z value to add
    * @param {number} w w value to add
    * @return {Vector3} this vector to chain up commands.
    */
    add(x, y, z, w){
        this.x += x;
        this.y += y;
        if(z) this.z += z;
        if(w) this.w += w;
        return this;
    }

    /** subtracts another vector v from this vector.
    * @param {Vector4} v vector to subtract from this vector.
    * @return {Vector4} this vector to chain up commands.
    */
    substractV(v){
        this.x -= v.x;
        this.y -= v.y;
        if(v.z) this.z -= v.z;
        if(v.w) this.w -= v.w;
        return this;
    }

    /** subtracts the values x, y, z and w from this vector.
    * @param {number} x x value to subtract.
    * @param {number} y y value to subtract.
    * @param {number} z z value to subtract.
    * @param {number} w w value to subtract.
    * @return {Vector4} this vector to chain up commands.
    */
    substract(x, y, z, w){
        this.x -= x;
        this.y -= y;
        if(w) this.z -= z;
        if(w) this.w -= w;
        return this;
    }

    /** inverts this vector (makes it face the opposite direction, but keep its length).
    * @return {Vector4} this vector to chain up commands.
    */
    invert(){
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        this.w = -this.w;
        return this;
    }

    equals(v){
        if(!(v instanceof Vector4))
            return false;
        return this.x === v.x && this.y === v.y && this.z === v.z && this.w === v.w;
    }

    clone(){ return new Vector4(this.x, this.y, this.z, this.w); }

    toVector2(){ return new Vector2(this.x, this.y); }

    toVector3(){ return new Vector2(this.x, this.y, this.z); }

    toString(){ return "[" + this.raw.toString() + "]"; }

    toFloat32(){ return new Float32Array(this.raw);}
}

//............................................
// Matrix3x3 class
class Matrix3x3{
    raw;

    static get IDENTITY(){
        return new Matrix3x3();
    }

    constructor(raw){
        this.raw = [0,0,0,0,0,0,0,0,0];
        if(raw === undefined){
            this.raw[0] = this.raw[4] = this.raw[8] = 1;
        } else {
            for(let i = 0; i < 9; i++){
                this.raw[i] = raw[i];
            }
        }
    }

    clone(){
        return new Matrix3x3(this.raw);
    }

    //....................................................................
	//Methods

    //reset data back to identity
	reset(){
        for(var i=0; i < 8; i++){
	        this.raw[i] = 0;
		}
        this.raw[0] = this.raw[4] = this.raw[8] = 1; //only positions 0,4,8 need to be 1 else 0.
		return this;
	}

    //Bring the matrix back to identity without changing the transform values.
	resetRotation(){
        this.raw[1] = this.raw[3] = this.raw[6] = this.raw[7] = 0;
        this.raw[0] = this.raw[4] = this.raw[8] = 1; //only positions 0,4,8 need to be 1 else 0.
		return this;
	}

    determinant(){
        let a = this.raw[0], b = this.raw[1], c = this.raw[2],
            d = this.raw[3], e = this.raw[4], f = this.raw[5],
            g = this.raw[6], h = this.raw[7], i = this.raw[8];
            // Calculate the determinant
            return a*(e*i - f*h) - b*(d*i - f*g) + c*(d*h - e*g);
            //return a*e*i + b*f*g + c*d*h - c*e*g - a*f*h - b*d*i;
    }

    toString(){ return "[" + this.raw.toString() + "]";}

    toFloat32(){ return new Float32Array(this.raw);}

    //....................................................................
	//Transformation Methods
    //All methods can be called from an instance of Matrix4x4 and be performed on that instance,
    //but simply forward the commands to the static methods with the actual implementation.
    multM3(m){Matrix3x3.multM3(this, m, this); return this;}
    multV2(v, out){Matrix3x3.multV2(this, v, out); return out;}
    multV3(v, out){Matrix3x3.multV3(this, v, out); return out;}
    transformV2(v, out){Matrix3x3.transformV2(this, v, out); return out;}

    invert(){Matrix3x3.invert(this); return this;}
    transpose(){Matrix3x3.transpose(this); return this;}

    //....................................................................
	// Static Methods

    /** Creates a transformation matrix that translates by x, y.
    * @param {number} x amount to translate on the x axis.
    * @param {number} y amount to translate on the y axis.
    * @param {Matrix3x3} out the matrix to store the resulting transformation matrix.
    * @return {Matrix3x3} the resulting transformation matrix (out).
    */
    static translationMatrix(x, y, out){
        if(!out) out = Matrix3x3.IDENTITY;
        out.raw[2] = x;
        out.raw[5] = y;
        return out;
    }

    /** Creates a transformation matrix that rotates by "angle" degrees.
    * If the parameter out is not defined, a new matrix is created and returned
    * @param {number} angle angle of rotion around in degrees.
    * @param {Matrix3x3} out the matrix to store the resulting transformation matrix.
    * @return {Matrix3x3} the resulting transformation matrix (out).
    */
    static rotationMatrix(angle, out){
        if(!out) out = Matrix3x3.IDENTITY;
        angle *= Math.deg2rad;
        out.raw[0] = Math.cos(angle);
        out.raw[1] = -Math.sin(angle);
        out.raw[3] = Math.sin(angle);
        out.raw[4] = Math.cos(angle);
        return out;
    }

    /** Creates a transformation matrix that scales by x, y.
    * @param {number} x amount to scale on the x axis.
    * @param {number} y amount to scale on the y axis.
    * @param {Matrix3x3} out the matrix to store the resulting transformation matrix.
    * @return {Matrix3x3} the resulting transformation matrix (out).
    */
    static scaleMatrix(x, y, out){
        if(!out) out = Matrix3x3.IDENTITY;
        out.raw[0] = x;
        out.raw[4] = y;
        return out;
    }

    /** Multiplies two 3x3 matrices a and b (a * b). Sets out to be the result. A new Matrix3x3
    * is created and returned if out is not defined.
    * @param {Matrix3x3} a the matrix to use as multiplicand.
    * @param {Matrix3x3} b the matrix to use as multiplier.
    * @param {Matrix3x3} out the matrix to store the product.
    * @return {Matrix3x3} the resulting product matrix (out).
    */
    static multM3(a, b, out){
        a = a.raw;
        b = b.raw;
        if(!out) out = Matrix3x3.IDENTITY;
        out.raw[0] = a[0] * b[0] + a[1] * b[3] + a[2] * b[6];
        out.raw[1] = a[0] * b[1] + a[1] * b[4] + a[2] * b[7];
        out.raw[2] = a[0] * b[2] + a[1] * b[5] + a[2] * b[8];
        out.raw[3] = a[3] * b[0] + a[4] * b[3] + a[5] * b[6];
        out.raw[4] = a[3] * b[1] + a[4] * b[4] + a[5] * b[7];
        out.raw[5] = a[3] * b[2] + a[4] * b[5] + a[5] * b[8];
        out.raw[6] = a[6] * b[0] + a[7] * b[3] + a[8] * b[6];
        out.raw[7] = a[6] * b[1] + a[7] * b[4] + a[8] * b[7];
        out.raw[8] = a[6] * b[2] + a[7] * b[5] + a[8] * b[8];
        return out;
    }

    /** Transforms given Vector3 v by given matrix m using the complete 3x3 matrix.
    * If out is supplied, result is stored in out, else result is stored in v.
    * @param {Matrix3x3} m matrix to transform with.
    * @param {Vector3} v Vector3 to be transformed.
    * @param {Vector3} out Vector3 object to store result in,
    * can be undefiened. Then a v will recieve the result.
    * @return {Vector3} the transformed vector.
    */
    static multV3(m, v, out){
        // transform all, rotation, scale and translation
        m = m.raw;
        if(!out) out = new Vector3();
        out.x = m[0] * v.x + m[1] * v.y + m[2] * v.z;
        out.y = m[3] * v.x + m[4] * v.y + m[5] * v.z;
        out.z = m[6] * v.x + m[7] * v.y + m[8] * v.z;
        return out;
    }

    /** Transforms given Vector2 v by given matrix m using the complete 3x3 matrix.
    * If out is supplied, result is stored in out, else result is stored in v.
    * @param {Matrix3x3} m matrix to transform with.
    * @param {Vector2} v Vector2 to be transformed.
    * @param {Vector2} out Vector2 object to store result in,
    * can be undefiened. Then a v will recieve the result.
    * @return {Vector2} the transformed vector.
    */
    static multV2(m, v, out){
        // transform all, rotation, scale and translation
        m = m.raw;
        if(!out) out = new Vector2();
        out.x = m[0] * v.x + m[1] * v.y + m[2] * 1;
        out.y = m[3] * v.x + m[4] * v.y + m[5] * 1;
        return out;
    }

    /** Transforms given Vector2 v by given matrix m using ONLY the 2x2 submatrix of given 3x3 matrix (no translation).
    * This will only transform the vectors scale and rotation, but not the position.
    * @param {Matrix3x3} m matrix to transform with.
    * @param {Vector2} v Vector2 to be transformed.
    * @param {Vector2} out Vector2 object to store result in,
    * can be undefiened. Then a v will recieve the result.
    * @return {Vector2} the transformed vector.
    */
    static transformV2(m, v, out){
        // transform only rotation and scale, but not translation
        m = m.raw;
        if(!out) out = new Vector2();
        out.x = m[0] * v.x + m[1] * v.y;
        out.y = m[3] * v.x + m[4] * v.y;
        return out;
    }

    /** Inverts the given matrix m. If out is defined the result is stored in out, else the
    * given matrix m will be overwritten with its inverse.
    * @param {Matrix3x3} m the matrix to be inverted, if out is not defined, will recieve the result.
    * @param {Matrix3x3} out the matrix to store the outcome, if not defined, outcome will be stored in m.
    * @return {Matrix3x3} the resulting inverted matrix.
    */
    static invert(m, out){
        m = m.raw;
        if(!out) out = m;

        // function for derterminant of 2x2 matrix
        function det2(mat){ return mat[0]*mat[3]-mat[1]*mat[2]; }

        // determinants (matrix of minors)
        let a00 = [ m[4], m[5], m[7], m[8] ];
        let a01 = [ m[3], m[5], m[6], m[8] ];
        let a02 = [ m[3], m[4], m[6], m[7] ];
        let a10 = [ m[1], m[2], m[7], m[8] ];
        let a11 = [ m[0], m[2], m[6], m[8] ];
        let a12 = [ m[0], m[1], m[6], m[7] ];
        let a20 = [ m[1], m[2], m[4], m[5] ];
        let a21 = [ m[0], m[2], m[3], m[5] ];
        let a22 = [ m[0], m[1], m[3], m[4] ];

        let d = m.determinant();
        out.raw[0] = det2(a00)/d;
        out.raw[1] = -det2(a10)/d;
        out.raw[2] = det2(a20)/d;
        out.raw[3] = -det2(a01)/d;
        out.raw[4] = det2(a11)/d;
        out.raw[5] = -det2(a21)/d;
        out.raw[6] = det2(a02)/d;
        out.raw[7] = -det2(a12)/d;
        out.raw[8] = det2(a22)/d;
        return out;
    }

    /** Transposes the given matrix m. If out is defined the result is stored in out, else the
    * given matrix m will be overwritten with its transpose.
    * @param {Matrix3x3} m the matrix to be transposed, if out is not defined, will recieve the result.
    * @param {Matrix3x3} out the matrix to store the outcome, if not defined, outcome will be stored in m.
    * @return {Matrix3x3} the resulting transposed matrix.
    */
    static transpose(m, out){
        if(!out) out = m;

        let t1 = m.raw[1];
        let t6 = m.raw[6];
        let t7 = m.raw[7];
        out.raw[1] = m.raw[3];
        out.raw[6] = m.raw[2];
        out.raw[7] = m.raw[5];
        out.raw[3] = t1;
        out.raw[2] = t6;
        out.raw[5] = t7;
        return out;
    }
}

//............................................
// Matrix4x4 class
class Matrix4x4{
    raw;

    static get IDENTITY(){
        return new Matrix4x4();
    }

    constructor(raw){
        this.raw = new Array(16);
        if(raw === undefined || raw.length !== 16){
            this.raw = [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];
        } else {
            for(let i = 0; i < 16; i++){
                this.raw[i] = raw[i];
            }
        }
    }

    //....................................................................
    //Methods

    //reset data back to identity.
    reset(){
        for(var i=0; i < this.raw.length; i++){
            this.raw[i] = (i % 5 == 0)? 1 : 0; //only positions 0,5,10,15 need to be 1 else 0.
        }
        return this;
    }

    //Bring the matrix back to identity without changing the transform values.
    resetRotation(){
        for(var i=0; i < this.raw.length; i++){
            if(i == 3) continue;
            if(i == 7) continue;
            if(i == 11) continue; // skip translation components
            this.raw[i] = (i % 5 == 0)? 1 : 0;  //only positions 0,5,10,15 need to be 1 else 0.
        }
        return this;
    }

    clone(){ return new Matrix4x4(this.raw);}

    toString(){ return "[" + this.raw.toString() + "]";}

    toFloat32(){ return new Float32Array(this.raw);}

    //....................................................................
	//Transformation Methods
    //All methods can be called from an instance of Matrix4x4 and be performed on that instance,
    //but simply forward the commands to the static methods with the actual implementation.
	applyTranslationV(v){	 return Matrix4x4.applyTranslation(v.x,v.y,v.z,this);}
	applyTranslation(x,y,z){ return Matrix4x4.applyTranslation(x,y,z,this);}

    applyRotationX(rad){ return Matrix4x4.applyRotationX(rad, this);}
	applyRotationY(rad){ return Matrix4x4.applyRotationY(rad, this);}
	applyRotationZ(rad){ return Matrix4x4.applyRotationZ(rad, this);}

	applyScaleV(v){    return Matrix4x4.applyScale(v.x,v.y,v.z,this);}
	applyScale(x,y,z){ return Matrix4x4.applyScale(x,y,z,this);}

    multM4(m){              return Matrix4x4.multM4(this, m, this);} // multiplies: this*m
    multV4(v, out) {      return Matrix4x4.multV4(this, v, out);}
    multV3(v, out) {      return Matrix4x4.multV3(this, v, out);}
    transformV3(v, out) { return Matrix4x4.transformV3(this, v, out);}

    invert(){Matrix4x4.invert(this); return this;}
    transpose(){Matrix4x4.transpose(this); return this;}

    //....................................................................
    //Static Data Methods to generate matrices

    /** Creates and returns a perspective matrix. If a matrix object is given for out,
    * that matrix will be changed to be a perspective matrix.
    * @param {number} fovy field of view.
    * @param {number} aspect aspect ratio of the screen.
    * @param {number} near distance of camera to the near plane.
    * @param {number} far distance of camera to the far plane.
    * @param {Matrix4x4} out matrix object to be set as this perspective matrix,
    * can be undefiened. Then a new Matrix4x4 object will be created.
    * @return {Matrix4x4} the created perspective matrix.
    */
    static perspective(fov, near, far, aspect, out) {
        if(!out) out = new Matrix4x4();
        let o_r = out.raw;

        let f  = 1.0 / Math.tan(fov / 2);
        let nf = 1 / (near - far);

        o_r[ 0] = f / aspect;
        o_r[ 1] = 0;
        o_r[ 2] = 0;
        o_r[ 3] = 0;
        o_r[ 4] = 0;
        o_r[ 5] = f;
        o_r[ 6] = 0;
        o_r[ 7] = 0;
        o_r[ 8] = 0;
        o_r[ 9] = 0;
        o_r[10] = (far + near) * nf;
        o_r[11] = (2 * far * near) * nf;
        o_r[12] = 0;
        o_r[13] = 0;
        o_r[14] = -1;
        o_r[15] = 0;
        return out;
    }

    /** Creates and returns a orthographic matrix. If a matrix object is given for out,
    * that matrix will be changed to be a orthographic matrix.
    * @param {number} left distance to left boarder of camera view.
    * @param {number} right distance to right boarder of camera view.
    * @param {number} bottom distance to bottom boarder of camera view.
    * @param {number} top distance to top boarder of camera view.
    * @param {number} near distance of camera to the near plane.
    * @param {number} far distance of camera to the far plane.
    * @param {Matrix4x4} out matrix object to be set as this orthographic matrix,
    * can be undefiened. Then a new Matrix4x4 object will be created.
    * @return {Matrix4x4} the created orthographic matrix.
    */
    static ortho(left, right, bottom, top, near, far, out) {
        if(!out) out = new Matrix4x4();
        let o_r = out.raw;

        let lr = 1 / (left - right);
        let bt = 1 / (bottom - top);
        let nf = 1 / (near - far);

        o_r[ 0] = -2 * lr;
        o_r[ 1] = 0;
        o_r[ 2] = 0;
        o_r[ 3] = (left + right) * lr;
        o_r[ 4] = 0;
        o_r[ 5] = -2 * bt;
        o_r[ 6] = 0;
        o_r[ 7] = (top + bottom) * bt;
        o_r[ 8] = 0;
        o_r[ 9] = 0;
        o_r[10] = 2 * nf;
        o_r[11] = (far + near) * nf;
        o_r[12] = 0;
        o_r[13] = 0;
        o_r[14] = 0;
        o_r[15] = 1;
        return out;
    };

    /** Creates and returns a perspective matrix. If a matrix object is given for out,
    * that matrix will be changed to be a perspective matrix.
    * src: //https://github.com/toji/gl-matrix/blob/master/src/gl-matrix/mat4.js
    * @param {Matrix4x4} m the matrix to transpose.
    * @param {Matrix4x4} out matrix object to set as the transpose of matrix m.
    * If undefiened, the matrix a will be changed to its transpose.
    * @return {Matrix4x4} the created orthographic matrix.
    */
    static transpose(m, out) {
        if(!out) out = m;
        let o_r = out.raw;
        let m_r = m.raw;
        //If we are transposing ourselves we can skip a few steps but have to cache some values
        if (out === m) {
            let m01 = m_r[1], m02 = m_r[2], m03 = m_r[3], m12 = m_r[6], m13 = m_r[7], m23 = m_r[11];
            o_r[ 1] = m_r[4];
            o_r[ 2] = m_r[8];
            o_r[ 3] = m_r[12];
            o_r[ 4] = m01;
            o_r[ 6] = m_r[ 9];
            o_r[ 7] = m_r[13];
            o_r[ 8] = m02;
            o_r[ 9] = m12;
            o_r[11] = m_r[14];
            o_r[12] = m03;
            o_r[13] = m13;
            o_r[14] = m23;
        }else{
            o_r[ 0] = m_r[ 0];
            o_r[ 1] = m_r[ 4];
            o_r[ 2] = m_r[ 8];
            o_r[ 3] = m_r[12];
            o_r[ 4] = m_r[ 1];
            o_r[ 5] = m_r[ 5];
            o_r[ 6] = m_r[ 9];
            o_r[ 7] = m_r[13];
            o_r[ 8] = m_r[ 2];
            o_r[ 9] = m_r[ 6];
            o_r[10] = m_r[10];
            o_r[11] = m_r[14];
            o_r[12] = m_r[ 3];
            o_r[13] = m_r[ 7];
            o_r[14] = m_r[11];
            o_r[15] = m_r[15];
        }
        return out;
    }

    /** Creates a 3x3 Matrix that contains the inverse of the transpose of the
    * given 4x4 Matrix. Used to transform normals for example for lighting and shading.
    * @param {Matrix4x4} m the matrix to use as source.
    * @param {Matrix3x3} out 3x3 matrix object to save the inverse transpose to.
    * @return {Matrix3x3} the created 3x3 inverse transpose of the given matrix m.
    */
    static inverseTranspose3x3(m, out) {
        if(!out) out = new Matrix3x3();
        let m_r = m.raw;
        let o_r = out.raw;

        let m00 = m_r[ 0], m10 = m_r[ 1], m20 = m_r[ 2], m30 = m_r[3];
        let m01 = m_r[ 4], m11 = m_r[ 5], m21 = m_r[ 6], m31 = m_r[7];
        let m02 = m_r[ 8], m12 = m_r[ 9], m22 = m_r[10], m32 = m_r[11];
        let m03 = m_r[12], m13 = m_r[13], m23 = m_r[14], m33 = m_r[15];

        let b00 = m00 * m11 - m01 * m10;
        let b01 = m00 * m12 - m02 * m10;
        let b02 = m00 * m13 - m03 * m10;
        let b03 = m01 * m12 - m02 * m11;
        let b04 = m01 * m13 - m03 * m11;
        let b05 = m02 * m13 - m03 * m12;
        let b06 = m20 * m31 - m21 * m30;
        let b07 = m20 * m32 - m22 * m30;
        let b08 = m20 * m33 - m23 * m30;
        let b09 = m21 * m32 - m22 * m31;
        let b10 = m21 * m33 - m23 * m31;
        let b11 = m22 * m33 - m23 * m32;

        // Calculate the determinant
        let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

        if (!det) return null;

        det = 1.0 / det;

        o_r[0] = (m11 * b11 - m12 * b10 + m13 * b09) * det;
        o_r[1] = (m02 * b10 - m01 * b11 - m03 * b09) * det;
        o_r[2] = (m31 * b05 - m32 * b04 + m33 * b03) * det;

        o_r[3] = (m12 * b08 - m10 * b11 - m13 * b07) * det;
        o_r[4] = (m00 * b11 - m02 * b08 + m03 * b07) * det;
        o_r[5] = (m32 * b02 - m30 * b05 - m33 * b01) * det;

        o_r[6] = (m10 * b10 - m11 * b08 + m13 * b06) * det;
        o_r[7] = (m01 * b08 - m00 * b10 - m03 * b06) * det;
        o_r[8] = (m30 * b04 - m31 * b02 + m33 * b00) * det;
        return out;
    }

    /** Creates a transformation matrix that scales by x, y, z.
    * @param {number} x amount to scale on the x axis.
    * @param {number} y amount to scale on the y axis.
    * @param {number} z amount to scale on the z axis.
    * @param {Matrix4x4} out the matrix to store the resulting transformation matrix.
    * @return {Matrix4x4} the resulting transformation matrix (out).
    */
    static scaleMatrix(x,y,z,out) {
        if(!out) out = new Matrix4x4();
        else     out.reset();

        out.raw[ 0] = x;
        out.raw[ 5] = y;
        out.raw[10] = z;
        return out;
    };

    /** Creates a transformation matrix that rotates on the X axis by "angle" degrees.
    * If the parameter out is not defined, a new matrix is created and returned
    * @param {number} angle angle of rotion around the X axis in degrees.
    * @param {Matrix4x4} out the matrix to store the resulting transformation matrix.
    * @return {Matrix4x4} the resulting transformation matrix (out).
    */
    static rotationMatrixX(angle, out) {
        let rad = angle * Math.deg2rad;
        if(!out) out = new Matrix4x4();
        else     out.reset();

        let o_r = out.raw;
        let s = Math.sin(rad),
            c = Math.cos(rad);
        o_r[ 5] = c;
        o_r[ 6] =-s;
        o_r[ 9] = s;
        o_r[10] = c;
        return out;
    }

    /** Creates a transformation matrix that rotates on the Y axis by "angle" degrees.
    * If the parameter out is not defined, a new matrix is created and returned
    * @param {number} angle angle of rotion around the Y axis in degrees.
    * @param {Matrix4x4} out the matrix to store the resulting transformation matrix.
    * @return {Matrix4x4} the resulting transformation matrix (out).
    */
    static rotationMatrixY(angle, out) {
        let rad = angle * Math.deg2rad;
        if(!out) out = new Matrix4x4();
        else     out.reset();

        let o_r = out.raw;
        let s = Math.sin(rad),
            c = Math.cos(rad);
        o_r[ 0] = c;
        o_r[ 2] = s;
        o_r[ 8] =-s;
        o_r[10] = c;
        return out;
    }

    /** Creates a transformation matrix that rotates on the Z axis by "angle" degrees.
    * If the parameter out is not defined, a new matrix is created and returned
    * @param {number} angle angle of rotion around the Z axis in degrees.
    * @param {Matrix4x4} out the matrix to store the resulting transformation matrix.
    * @return {Matrix4x4} the resulting transformation matrix (out).
    */
    static rotationMatrixZ(angle, out) {
        let rad = angle * Math.deg2rad;
        if(!out) out = new Matrix4x4();
        else     out.reset();

        let o_r = out.raw;
        let s = Math.sin(rad),
            c = Math.cos(rad);
        o_r[0] = c;
        o_r[1] =-s;
        o_r[4] = s;
        o_r[5] = c;
        return out;
    }

    /** Creates a rotation matrix that rotates on the rad angles around the axis a.
    * src: https://en.wikipedia.org/wiki/Rotation_matrix#Rotation_matrix_from_axis_and_angle
    * If the parameter out is not defined, a new matrix is created and returned.
    * @param {number} angle angle of rotion around the given axis in degrees.
    * @param {Vector3} axis the axis to rotate around.
    * @param {Matrix4x4} out the matrix to store the resulting transformation matrix.
    * @return {Matrix4x4} the resulting transformation matrix (out).
    */
    static rotationMatrixAxis(angle, axis, out) {
        let rad = angle * Math.deg2rad;
        if(!out) out = new Matrix4x4();
        else     out.reset();
        let o_r = out.raw;

        axis.normalize();
        let s = Math.sin(rad),
            c = Math.cos(rad),
            x = axis.x,
            y = axis.y,
            z = axis.z;

        // no idea how this works, I gues wikipedia can explain it?
        o_r[ 0] = c + x*x*(1-c);
        o_r[ 1] = x*y*(1-c) - z*s;
        o_r[ 2] = x*z*(1-c) + y*s;

        o_r[ 4] = y*x*(1-c) + z*s;
        o_r[ 5] = c + y*y*(1-c);
        o_r[ 6] = y*z*(1-c) - x*s;

        o_r[ 8] = z*x*(1-c) - y*s;
        o_r[ 9] = z*y*(1-c) + x*s;
        o_r[10] = c + z*z*(1-c);
        return out;
    }

    /** Creates a transformation matrix that translates by x, y, z.
    * @param {number} x amount to translate on the x axis.
    * @param {number} y amount to translate on the y axis.
    * @param {number} z amount to translate on the z axis.
    * @param {Matrix4x4} out the matrix to store the resulting transformation matrix.
    * @return {Matrix4x4} the resulting transformation matrix (out).
    */
    static translationMatrix(x,y,z,out) {
        if(!out) out = new Matrix4x4();
        else     out.reset();

        out.raw[ 3] = x;
        out.raw[ 7] = y;
        out.raw[11] = z;
        return out;
    };

    /** Creates a lookAt 4x4 matrix that makes an object look at the given point "to", form the given point "from".
    * "up" is optional and defines to local new up direction (rotation around z-Axis). If parameter "out" is
    * undefined, a new 3x3 matrix is created and retured.
    * @param {Vector3} from the position of the object to look from.
    * @param {Vector3} to the target to look at.
    * @param {Vector3} up the new up direction (default = [0,1,0]);
    * @param {Matrix4x4} out the matrix to store the outcome, if not defined, outcome will be retured.
    * @return {Matrix4x4} the resulting lookAt matrix.
    */
    static lookAtMatrix(from, to, up, out) {
        if(!out) out = new Matrix4x4();
        else     out.reset();
        if(!up)  up = new Vector3(0, 1, 0);

        let forward = from.clone().substractV(to).normalize();
        let right = up.clone().normalize().cross(forward);
        let newUp = forward.clone().cross(right);

        // assemble matrix from basis vectors
        out.raw[ 0] = right.x;
        out.raw[ 4] = right.y;
        out.raw[ 8] = right.z;
        out.raw[ 1] = newUp.x;
        out.raw[ 5] = newUp.y;
        out.raw[ 9] = newUp.z;
        out.raw[ 2] = forward.x;
        out.raw[ 6] = forward.y;
        out.raw[10] = forward.z;
        out.raw[ 3] = from.x;
        out.raw[ 7] = from.y;
        out.raw[11] = from.z;
        return out;
    }

    //....................................................................
    //Static Operations

    /** Multiplies a 4x4 matrix on a Vector4. If out is given, the result is stored in out, else, the
    * given vector v will be changed.
    * @param {Matrix4x4} m the matrix to use for the transformation.
    * @param {Vector4} v the vector to transform.
    * @param {Vector4} out stores the outcome of the transformation. If not given, the first Vector v
    * will be changed to the transformed one.
    * @return {Vector4} the transformed vector.
    */
    static multV4(m, v, out) {
        let m_r = m.raw;
        let v_r = v.raw;
        let x = v_r[0], y = v_r[1], z = v_r[2], w = v_r[3];
        if(!out){
            v_r[0] = m_r[ 0] * x + m_r[ 1] * y + m_r[ 2] * z + m_r[ 3] * w;
            v_r[1] = m_r[ 4] * x + m_r[ 5] * y + m_r[ 6] * z + m_r[ 7] * w;
            v_r[2] = m_r[ 8] * x + m_r[ 9] * y + m_r[10] * z + m_r[11] * w;
            v_r[3] = m_r[12] * x + m_r[13] * y + m_r[14] * z + m_r[15] * w;
            return v;
        }
        let o_r = out.raw;
        o_r[0] = m_r[ 0] * x + m_r[ 1] * y + m_r[ 2] * z + m_r[ 3] * w;
        o_r[1] = m_r[ 4] * x + m_r[ 5] * y + m_r[ 6] * z + m_r[ 7] * w;
        o_r[2] = m_r[ 8] * x + m_r[ 9] * y + m_r[10] * z + m_r[11] * w;
        o_r[3] = m_r[12] * x + m_r[13] * y + m_r[14] * z + m_r[15] * w;
        return out;
    }

    /**  Multiplies a 4x4 matrix on a Vector3. If out is given, the result is stored in out, else, the
    * given vector v will be changed. The missing w component of the vector is assumed to be 1.
    * @param {Matrix4x4} m the matrix to use for the transformation.
    * @param {Vector3} v the vector to transform.
    * @param {Vector3} out stores the outcome of the transformation. If not given, the first Vector v
    * will be changed to the transformed one.
    * @return {Vector3} the transformed vector.
    */
    static multV3(m, v, out) {
        let m_r = m.raw;
        let v_r = v.raw;
        let x = v_r[0], y = v_r[1], z = v_r[2];
        if(!out){
            v_r[0] = m_r[ 0] * x + m_r[ 1] * y + m_r[ 2] * z + m_r[ 3];
            v_r[1] = m_r[ 4] * x + m_r[ 5] * y + m_r[ 6] * z + m_r[ 7];
            v_r[2] = m_r[ 8] * x + m_r[ 9] * y + m_r[10] * z + m_r[11];
            return v;
        }
        let o_r = out.raw;
        o_r[0] = m_r[ 0] * x + m_r[ 1] * y + m_r[ 2] * z + m_r[ 3];
        o_r[1] = m_r[ 4] * x + m_r[ 5] * y + m_r[ 6] * z + m_r[ 7];
        o_r[2] = m_r[ 8] * x + m_r[ 9] * y + m_r[10] * z + m_r[11];
        return out;
    }

    /** Transforms a vector3 by the given matrix using only rotation and scale.
    * The missing w component of the vector is assumed to be 1.
    * @param {Matrix4x4} m the matrix to use for the transformation.
    * @param {Vector3} v the vector to transform.
    * @param {Vector3} out stores the outcome of the transformation. If not given, the first Vector v
    * will be changed to the transformed one.
    * @return {Vector3} the transformed vector.
    */
    static transformV3(m, v, out) {
        let m_r = m.raw;
        let v_r = v.raw;
        let x = v_r[0], y = v_r[1], z = v_r[2];
        if(!out){
            v_r[0] = m_r[ 0] * x + m_r[ 1] * y + m_r[ 2] * z;
            v_r[1] = m_r[ 4] * x + m_r[ 5] * y + m_r[ 6] * z;
            v_r[2] = m_r[ 8] * x + m_r[ 9] * y + m_r[10] * z;
            return v;
        }
        let o_r = out.raw;
        o_r[0] = m_r[ 0] * x + m_r[ 1] * y + m_r[ 2] * z;
        o_r[1] = m_r[ 4] * x + m_r[ 5] * y + m_r[ 6] * z;
        o_r[2] = m_r[ 8] * x + m_r[ 9] * y + m_r[10] * z;
        return out;
    }

    /** Multiplies two 4x4 matrices a and b (a * b). Sets out to be the result. A new Matrix4x4
    * is created and returned if out is not defined.
    * @param {Matrix4x4} a the matrix to use as multiplicand.
    * @param {Matrix4x4} b the matrix to use as multiplier.
    * @param {Matrix4x4} out the matrix to store the product.
    * @return {Matrix4x4} the resulting product matrix (out).
    */
    static multM4(a, b, out){
        if(!out) out = new Matrix4x4();
        let a_r = a.raw;
        let b_r = b.raw;
        let o_r = out.raw;

        // a[column][row]
        let a00 = a_r[ 0], a10 = a_r[ 1], a20 = a_r[ 2], a30 = a_r[ 3],
            a01 = a_r[ 4], a11 = a_r[ 5], a21 = a_r[ 6], a31 = a_r[ 7],
            a02 = a_r[ 8], a12 = a_r[ 9], a22 = a_r[10], a32 = a_r[11],
            a03 = a_r[12], a13 = a_r[13], a23 = a_r[14], a33 = a_r[15];
        let b00 = b_r[ 0], b10 = b_r[ 1], b20 = b_r[ 2], b30 = b_r[ 3],
            b01 = b_r[ 4], b11 = b_r[ 5], b21 = b_r[ 6], b31 = b_r[ 7],
            b02 = b_r[ 8], b12 = b_r[ 9], b22 = b_r[10], b32 = b_r[11],
            b03 = b_r[12], b13 = b_r[13], b23 = b_r[14], b33 = b_r[15];

        o_r[0] = a00*b00 + a10*b01 + a20*b02 + a30*b03;
        o_r[1] = a00*b10 + a10*b11 + a20*b12 + a30*b13;
        o_r[2] = a00*b20 + a10*b21 + a20*b22 + a30*b23;
        o_r[3] = a00*b30 + a10*b31 + a20*b32 + a30*b33;

        o_r[4] = a01*b00 + a11*b01 + a21*b02 + a31*b03;
        o_r[5] = a01*b10 + a11*b11 + a21*b12 + a31*b13;
        o_r[6] = a01*b20 + a11*b21 + a21*b22 + a31*b23;
        o_r[7] = a01*b30 + a11*b31 + a21*b32 + a31*b33;

        o_r[8] = a02*b00 + a12*b01 + a22*b02 + a32*b03;
        o_r[9] = a02*b10 + a12*b11 + a22*b12 + a32*b13;
        o_r[10]= a02*b20 + a12*b21 + a22*b22 + a32*b23;
        o_r[11]= a02*b30 + a12*b31 + a22*b32 + a32*b33;

        o_r[12]= a03*b00 + a13*b01 + a23*b02 + a33*b03;
        o_r[13]= a03*b10 + a13*b11 + a23*b12 + a33*b13;
        o_r[14]= a03*b20 + a13*b21 + a23*b22 + a33*b23;
        o_r[15]= a03*b30 + a13*b31 + a23*b32 + a33*b33;
        return out;
    }

    /** Applies a transformation to given matrix out, that makes it scale by x, y, z.
    * Works the same as creating a nwe scale matrix and multiplying it on this matrix, but without memory allocation.
    * @param {number} x amount to scale on the x axis.
    * @param {number} y amount to scale on the y axis.
    * @param {number} z amount to scale on the z axis.
    * @param {Matrix4x4} out the matrix to store the resulting transformation matrix.
    * @return {Matrix4x4} the resulting transformation matrix (out).
    */
    static applyScale(x,y,z,out){
        if(!out) console.error("can not apply scale to undefined matrix: out");
        let o_r = out.raw;
        o_r[ 0] *= x;
        o_r[ 1] *= y;
        o_r[ 2] *= z;

        o_r[ 4] *= x;
        o_r[ 5] *= y;
        o_r[ 6] *= z;

        o_r[ 8] *= x;
        o_r[ 9] *= y;
        o_r[10] *= z;

        o_r[12] *= x;
        o_r[13] *= y;
        o_r[14] *= z;
        return out;
    };

    /** Applies a transformation to given matrix out, that makes it rotate rad degrees around the X axis.
    * Works the same as creating a new transformation matrix and multiplying it on this matrix, but without memory allocation.
    * @param {number} angle angle of rotion around the X axis in degrees.
    * @param {Matrix4x4} out the matrix to store the resulting transformation matrix.
    * @return {Matrix4x4} the resulting transformation matrix (out).
    */
    static applyRotationX(angle, out) {
        let rad = angle * Math.deg2rad;
        if(!out) console.error("can not apply rotation to undefined matrix: out");
        let o_r = out.raw;
        var s = Math.sin(rad),
            c = Math.cos(rad),
            a10 = o_r[ 1],
            a11 = o_r[ 5],
            a12 = o_r[ 9],
            a13 = o_r[13],
            a20 = o_r[ 2],
            a21 = o_r[ 6],
            a22 = o_r[10],
            a23 = o_r[14];

        // Perform axis-specific matrix multiplication
        o_r[ 1] = a10 * c + a20 * s;
        o_r[ 5] = a11 * c + a21 * s;
        o_r[ 9] = a12 * c + a22 * s;
        o_r[13] = a13 * c + a23 * s;
        o_r[ 2] = a20 * c - a10 * s;
        o_r[ 6] = a21 * c - a11 * s;
        o_r[10] = a22 * c - a12 * s;
        o_r[14] = a23 * c - a13 * s;
        return out;
    }

    /** Applies a transformation to given matrix out, that makes it rotate "angle" degrees around the Y axis.
    * Works the same as creating a new transformation matrix and multiplying it on this matrix, but without memory allocation.
    * @param {number} angle angle of rotion around the Y axis in degrees.
    * @param {Matrix4x4} out the matrix to store the resulting transformation matrix.
    * @return {Matrix4x4} the resulting transformation matrix (out).
    */
    static applyRotationY(angle, out) {
        let rad = angle * Math.deg2rad;
        if(!out) console.error("can not apply rotation to undefined matrix: out");
        let o_r = out.raw;
        var s = Math.sin(rad),
            c = Math.cos(rad),
            a00 = o_r[ 0],
            a01 = o_r[ 4],
            a02 = o_r[ 8],
            a03 = o_r[12],
            a20 = o_r[ 2],
            a21 = o_r[ 6],
            a22 = o_r[10],
            a23 = o_r[14];

        // Perform axis-specific matrix multiplication
        o_r[ 0] = a00 * c - a20 * s;
        o_r[ 4] = a01 * c - a21 * s;
        o_r[ 8] = a02 * c - a22 * s;
        o_r[12] = a03 * c - a23 * s;
        o_r[ 2] = a00 * s + a20 * c;
        o_r[ 6] = a01 * s + a21 * c;
        o_r[10] = a02 * s + a22 * c;
        o_r[14] = a03 * s + a23 * c;
        return out;
    }

    /** Applies a transformation to given matrix out, that makes it rotate "angle" degrees around the Z axis.
    * Works the same as creating a new transformation matrix and multiplying it on this matrix, but without memory allocation.
    * @param {number} angle angle of rotion around the Z axis in degrees.
    * @param {Matrix4x4} out the matrix to store the resulting transformation matrix.
    * @return {Matrix4x4} the resulting transformation matrix (out).
    */
    static applyRotationZ(angle, out){
        let rad = angle * Math.deg2rad;
        if(!out) console.error("can not apply rotation to undefined matrix: out");
        let o_r = out.raw;
        var s = Math.sin(rad),
            c = Math.cos(rad),
            a00 = o_r[ 0],
            a01 = o_r[ 4],
            a02 = o_r[ 8],
            a03 = o_r[12],
            a10 = o_r[ 1],
            a11 = o_r[ 5],
            a12 = o_r[ 9],
            a13 = o_r[13];

        // Perform axis-specific matrix multiplication
        o_r[ 0] = a00 * c + a10 * s;
        o_r[ 4] = a01 * c + a11 * s;
        o_r[ 8] = a02 * c + a12 * s;
        o_r[12] = a03 * c + a13 * s;
        o_r[ 1] = a10 * c - a00 * s;
        o_r[ 5] = a11 * c - a01 * s;
        o_r[ 9] = a12 * c - a02 * s;
        o_r[13] = a13 * c - a03 * s;
        return out;
    }

    /** Applies a transformation to given matrix out, that makes it rotate "angle" degrees around the given axis.
    * Works the same as creating a new transformation matrix and multiplying it on this matrix, but without memory allocation.
    * @param {number} angle angle of rotion around the given axis in degrees.
    * @param {Vector3} axis the axis to rotate around.
    * @param {Matrix4x4} out the matrix to store the resulting transformation matrix.
    * @return {Matrix4x4} the resulting transformation matrix (out).
    */
    static applyRotationAxis(angle, axis, out){
        let rad = angle * Math.deg2rad;
        if(!out) console.error("can not apply rotation to undefined matrix: out");
        let o_r = out.raw;
        axis.normalize();
        let s = Math.sin(rad),
            c = Math.cos(rad),
            x = axis.x,
            y = axis.y,
            z = axis.z;

        // a[column][row]
        let a00 = o_r[0], a10 = o_r[1], a20 = o_r[ 2], a30 = o_r[ 3],
            a01 = o_r[4], a11 = o_r[5], a21 = o_r[ 6], a31 = o_r[ 7],
            a02 = o_r[8], a12 = o_r[9], a22 = o_r[10], a32 = o_r[11];

        let b00 = c + x*x*(1-c),   b10 = x*y*(1-c) - z*s, b20 = x*z*(1-c) + y*s,
            b01 = y*x*(1-c) + z*s, b11 = c + y*y*(1-c),   b21 = y*z*(1-c) - x*s,
            b02 = z*x*(1-c) - y*s, b12 = z*y*(1-c) + x*s, b22 = c + z*z*(1-c);

        // Perform rotation-specific matrix multiplication
        o_r[ 0] = a00 * b00 + a10 * b01 + a20 * b02;
        o_r[ 1] = a01 * b00 + a11 * b01 + a21 * b02;
        o_r[ 2] = a02 * b00 + a12 * b01 + a22 * b02;
        o_r[ 3] = a03 * b00 + a13 * b01 + a23 * b02;
        o_r[ 4] = a00 * b10 + a10 * b11 + a20 * b12;
        o_r[ 5] = a01 * b10 + a11 * b11 + a21 * b12;
        o_r[ 6] = a02 * b10 + a12 * b11 + a22 * b12;
        o_r[ 7] = a03 * b10 + a13 * b11 + a23 * b12;
        o_r[ 8] = a00 * b20 + a10 * b21 + a20 * b22;
        o_r[ 9] = a01 * b20 + a11 * b21 + a21 * b22;
        o_r[10] = a02 * b20 + a12 * b21 + a22 * b22;
        o_r[11] = a03 * b20 + a13 * b21 + a23 * b22;
        return out;
    }

    /** Applies a transformation to given matrix out, that makes it translate for x, y and y.
    * Works the same as creating a new transformation matrix and multiplying it on this matrix, but without memory allocation.
    * @param {number} x amount to translate on the x axis.
    * @param {number} y amount to translate on the y axis.
    * @param {number} z amount to translate on the z axis.
    * @param {Matrix4x4} out the matrix to store the resulting transformation matrix.
    * @return {Matrix4x4} the resulting transformation matrix (out).
    */
    static applyTranslation(x,y,z,out){
        if(!out) console.error("can not apply translation to undefined matrix: out");
        let o_r = out.raw;
        o_r[ 3] = o_r[ 0] * x + o_r[ 1] * y + o_r[ 2] * z + o_r[ 3];
        o_r[ 7] = o_r[ 4] * x + o_r[ 5] * y + o_r[ 6] * z + o_r[ 7];
        o_r[11] = o_r[ 8] * x + o_r[ 9] * y + o_r[10] * z + o_r[11];
        o_r[15] = o_r[12] * x + o_r[13] * y + o_r[14] * z + o_r[15];
        return out;
    }

    /** Inverts the given matrix m. If out is defined the result is stored in out, else the
    * given matrix m will be overwritten with its inverse.
    * @param {Matrix4x4} m the matrix to be inverted, if out is not defined, will recieve the result.
    * @param {Matrix4x4} out the matrix to store the outcome, if not defined, outcome will be stored in m.
    * @return {Matrix4x4} the resulting inverted matrix.
    */
    static invert(m, out) {
        if(out === undefined) out = m; //If out isn't sent, then input is also output
        let o_r = out.raw;
        let m_r = m.raw;
        var a00 = m_r[ 0], a10 = m_r[ 1], a20 = m_r[ 2], a30 = m_r[ 3],
            a01 = m_r[ 4], a11 = m_r[ 5], a21 = m_r[ 6], a31 = m_r[ 7],
            a02 = m_r[ 8], a12 = m_r[ 9], a22 = m_r[10], a32 = m_r[11],
            a03 = m_r[12], a13 = m_r[13], a23 = m_r[14], a33 = m_r[15],

            b00 = a00 * a11 - a01 * a10,
            b01 = a00 * a12 - a02 * a10,
            b02 = a00 * a13 - a03 * a10,
            b03 = a01 * a12 - a02 * a11,
            b04 = a01 * a13 - a03 * a11,
            b05 = a02 * a13 - a03 * a12,
            b06 = a20 * a31 - a21 * a30,
            b07 = a20 * a32 - a22 * a30,
            b08 = a20 * a33 - a23 * a30,
            b09 = a21 * a32 - a22 * a31,
            b10 = a21 * a33 - a23 * a31,
            b11 = a22 * a33 - a23 * a32,

            // Calculate the determinant
            det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

        if (!det) return false;
        det = 1.0 / det;

        o_r[ 0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
        o_r[ 1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
        o_r[ 2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
        o_r[ 3] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
        o_r[ 4] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
        o_r[ 5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
        o_r[ 6] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
        o_r[ 8] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
        o_r[ 7] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
        o_r[ 9] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
        o_r[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
        o_r[12] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
        o_r[13] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
        o_r[14] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
        o_r[11] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
        o_r[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

        return out;
    }

    /** Transposes the given matrix m. If out is defined the result is stored in out, else the
    * given matrix m will be overwritten with its transpose.
    * @param {Matrix4x4} m the matrix to be transposed, if out is not defined, will recieve the result.
    * @param {Matrix4x4} out the matrix to store the outcome, if not defined, outcome will be stored in m.
    * @return {Matrix4x4} the resulting transposed matrix.
    */
    static transpose(m, out){
        if(!out) out = m;

        let t01 = m.raw[ 1];
        let t02 = m.raw[ 2];
        let t03 = m.raw[ 3];
        let t06 = m.raw[ 6];
        let t07 = m.raw[ 7];
        let t11 = m.raw[11];
        out.raw[ 1] = m.raw[4];
        out.raw[ 4] = t01;
        out.raw[ 2] = m.raw[8];
        out.raw[ 8] = t02;
        out.raw[ 3] = m.raw[12];
        out.raw[12] = t03;
        out.raw[ 6] = m.raw[9];
        out.raw[ 9] = t06;
        out.raw[ 7] = m.raw[13];
        out.raw[13] = t07;
        out.raw[11] = m.raw[14];
        out.raw[14] = t11;
        return out;
    }
}
