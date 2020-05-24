"use strict";
class Transform{
    position;
    scale;
    rotation;

    up;     // the local up direction
    right;  // the local right direction
    forward;  // the local forward direction

    modelMatrix;

    constructor(){
        //transform Vectors
        this.position   = new Vector3(0,0,0);
        this.scale      = new Vector3(1,1,1);
        this.rotation   = new Vector3(0,0,0);

        //direction Vectors
        this.up         = Vector3.UP;
        this.right      = Vector3.RIGHT;
        this.forward    = Vector3.FORWARD;

        //transform Matrix
        this.modelMatrix = new Matrix4x4(); // main model matrix, chached from updateMatrix
    }

    //...................................................
	//Methods
    //...................................................
    updateMatrix(){
        // Apply position, rotation and scale to model matrix (using the methods with no memory allocation);
        // Rotation order is: Z,X,Y or roll, pitch, yaw
        this.modelMatrix.reset()
                        .applyTranslationV(this.position)
                        .applyRotationY(this.rotation.y)
                        .applyRotationX(this.rotation.x)
                        .applyRotationZ(this.rotation.z)
                        .applyScaleV(this.scale);

        // after calculating the new transformation matrix, use it to update the
        // local direction vectors up and right
        this.updateDirection();
        return this.modelMatrix;
    }

    // updates the vectors for easy access to the local directions
    // of this object
    updateDirection(){
        this.right.set(1,0,0);
        this.up.set(0,1,0);
        this.forward.set(0,0,1);
        this.modelMatrix.transformV3(this.forward);
        this.modelMatrix.transformV3(this.up);
        this.modelMatrix.transformV3(this.right);
        this.right.normalize();
        this.up.normalize();
        this.forward.normalize();
        return this;
    }

    getModelMatrix(){  return this.modelMatrix.raw;}

    reset(){
        this.position.set(0,0,0);
        this.scale.set(1,1,1);
        this.rotation.set(0,0,0);
        updateMatrix();
        return this;
    }

}
