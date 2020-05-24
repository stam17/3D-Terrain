"use strict";

/** A Perspective Camera to render 3D geometry
*/
class PerspectiveCamera {
    cameraMatrix;

    viewMatrix;
    projectionMatrix;

    aspectRatio; // aspect ratio of the window or canvas
    fov;         // field of view (view angle) of the camera
    near;        // new plane of the camera
    far;         // far plane of the camera

    /** Creates a new PerspectiveCamera object
    * @param {WebGLRenderingContext} gl the use global WebGLRenderingContext
    * @param {number} fov the field of view of the camera, default 45 degrees.
    * @param {number} near distance to the near plane of the camera frustum, default 0.1.
    * @param {number} far distance to the far plane of the camera frustum, default 1000.
    * @param {number} aspectRatio aspect ratio of the target canvas/screen.
    */
    constructor(gl, fov, near, far, aspectRatio){
        this.aspectRatio = aspectRatio || gl.canvas.width / gl.canvas.height;
        this.fov = fov || 45.0;
        this.near = near || 0.1;
        this.far = far || 1000.0;

        this.cameraMatrix = new Matrix4x4();
        this.viewMatrix = new Matrix4x4();
        this.projectionMatrix = new Matrix4x4();
        this.updateProjectionMatrix(fov, near, far, aspectRatio);
    }

    /** Sets the camera matrix to tranlate to "position" with the target orientation of "rotation".
    * @param {position} Vector3 the new position of the camera.
    * @param {rotation} Vector3 the new rotation of the camera.
    */
    setPositionRotation(position, rotation){
        this.cameraMatrix.reset()
                        .applyTranslationV(position)
                        .applyRotationY(rotation.y)
                        .applyRotationX(rotation.x)
                        .applyRotationZ(rotation.z);
        Matrix4x4.invert(this.cameraMatrix, this.viewMatrix);
    }

    /** Sets the camera matrix to tranlate to "position" with the new orientation,
    * that makes the camera look at "target" with the upwards orientation (roll) of "up".
    * @param {position} Vector3 the new position of the camera.
    * @param {target} Vector3 the target the camera should look at.
    * @param {up} Vector3 the relative upwards direction of the camera.
    */
    lookAt(position, target, up){
        if(!up) up = Vector3.UP;
        Matrix4x4.lookAtMatrix(position, target, up, this.cameraMatrix);
        Matrix4x4.invert(this.cameraMatrix, this.viewMatrix);
    }

    /** Updates the perspectie matrix of the camera with the new values
    * @param {number} fov the field of view of the camera, default 45 degrees.
    * @param {number} near distance to the near plane of the camera frustum, default 0.1.
    * @param {number} far distance to the far plane of the camera frustum, default 1000.
    * @param {number} aspectRatio aspect ratio of the target canvas/screen.
    */
    updateProjectionMatrix(fov, near, far, aspectRatio){
        // use new values if supplied, or old values if already present, or default values
        this.aspectRatio = aspectRatio || gl.canvas.width / gl.canvas.height;
        this.fov = fov || this.fov || 45.0;
        this.near = near || this.near || 0.1;
        this.far = far || this.far || 1000.0;
        Matrix4x4.perspective(this.fov, this.near, this.far, this.aspectRatio, this.projectionMatrix);
        return this.projectionMatrix;
    }
}

/** A Controller that will use mouse input to move a 3D camera around a set target.
*/
class OrbiterCameraController {
    canvas;
    camera;         // the camera to be controlled.
    target;         // the point the camera should orbit around.
    distance;       // distance of the camera to the target.
    zoomSpeed;      // speed to zoom in/out with the mousewheel
    rotationSpeed;  // speed to orbit around the target when moving the mouse.
    movementSpeed;  // speed to move up and down when holding "shift".
    pitch;          // current pitch of the camera.
    yaw;            // current yaw of the camera.
    offsetY;        // current height offset to the target of the camera.

    /** Creates a new OrbiterCameraController object
    * @param {Canvas} canvas the canvas the camera draws on.
    * @param {PerspectiveCamera} camera the camera to be controlled by this controller.
    * @param {Vector3} target the point the camera should orbit around.
    * @param {number} distance distance of the camera to the target.
    * @param {number} zoomSpeed speed to zoom in/out with the mousewheel
    * @param {number} rotationSpeed speed to orbit around the target when moving the mouse.
    * @param {number} movementSpeed speed to move up and down when holding "shift".
    * @param {number} startingPitch pitch of the camera when starting.
    * @param {number} tartingYaw yaw of the camera when starting.
    */
    constructor(canvas, camera, target, distance, zoomSpeed, rotationSpeed, movementSpeed, startingPitch, tartingYaw){
        this.canvas = canvas;
        this.camera = camera;
        this.target = target || Vector3.ZERO;
        this.distance = distance || 5;
        this.zoomSpeed = zoomSpeed || 500;
        this.rotationSpeed = rotationSpeed || 200;
        this.movementSpeed = movementSpeed || 10;
        this.pitch = startingPitch || -25
        this.yaw = tartingYaw || 0;
        this.offsetY = 0;
    }

    /** Updates the controller and the camera matrix of the controlled camera.
    * Call during update phase.
    */
    update(){
        if(Input.mouseButtonHold()){
            this.yaw += Input.mousePositionDelta.x * (this.rotationSpeed / this.canvas.height);    // make rotationspeed the same, no matter the height.
            // move up and down when shift is pressed, else
            if(Input.keyHold("shift")){
                this.offsetY += Input.mousePositionDelta.y * (this.movementSpeed / this.canvas.height);
            } else {
                this.pitch += Input.mousePositionDelta.y * (this.rotationSpeed / this.canvas.height);
            }
        }
        this.distance += Input.mouseWheelDelta * (this.zoomSpeed / this.canvas.height) * (this.distance/3);

        this.camera.cameraMatrix.reset()
                                .applyTranslation(this.target.x ,this.offsetY + this.target.y, this.target.z)
                                .applyRotationY(this.yaw)
                                .applyRotationX(this.pitch)
                                .applyTranslation(0,0,this.distance);
        Matrix4x4.invert(this.camera.cameraMatrix, this.camera.viewMatrix);
    }
}
