"use strict";
/*
EXAMPLE:
var renderLoop = new RenderLoop(function(deltaTime){
	console.log(rloop.fps + " " + deltaTime);
},10).start();
*/

// the Time object will allow easy access to time based values, such as
// deltaTime and time since application start.
var Time = {};
Time.deltaTime = 0;
Time.time = 0;

// A simple render loop, after calling start() the callback function will be called
// "fps"- many times a second with a deltaTime (time between two frames) parameter.
class RenderLoop{
	constructor(callback,fps){
		let oThis = this;           //Keep track of this object also in other scopes (eg. callbacks)
		this.msLastFrame= null;		//The time in Miliseconds of the last frame.
		this.callBack 	= callback;	//What function to call for each frame
		this.isActive 	= false;	//Control the On/Off state of the render loop
		this.fps 		= fps;		//Save the value of how fast the loop is going.

		if(fps !== undefined && fps > 0){ //Build a run method that limits the framerate
			this.fpsLimit = 1000/fps; //Calc how many milliseconds per frame in one second of time.

			this.run = function(){
				//Calculate Deltatime between frames and the FPS currently.
				let msCurrent	= performance.now();
				let	msDelta		= (msCurrent - oThis.msLastFrame);
				let	sDelta		= msDelta / 1000.0;		//What fraction of a single second is the delta time

				if(msDelta >= oThis.fpsLimit){ //Now execute frame since the time has elapsed.
					oThis.fps			= Math.floor(1/sDelta);
					oThis.msLastFrame	= msCurrent;
					Time.deltaTime 	    = sDelta;
					Time.time			+=sDelta;
					oThis.callBack(sDelta);
				}

				if(oThis.isActive) window.requestAnimationFrame(oThis.run);
			}
		}else{ //Else build a run method thats optimised as much as possible.
			this.run = function(){
				//Calculate Deltatime between frames and the FPS currently.
				let msCurrent	= performance.now();	//Gives you the whole number of how many milliseconds since the dawn of time :)
				let	sDelta		= (msCurrent - oThis.msLastFrame) / 1000.0;	//ms between frames, Then / by 1 second to get the fraction of a second.

				//Now execute frame since the time has elapsed.
				oThis.fps			= Math.floor(1/sDelta); //Time it took to generate one frame, divide 1 by that to get how many frames in one second.
				oThis.msLastFrame	= msCurrent;
				Time.deltaTime 	    = sDelta;
				Time.time			+=sDelta;

				oThis.callBack(sDelta);
				if(oThis.isActive) window.requestAnimationFrame(oThis.run);
			}
		}
	}

	start(){
		this.isActive = true;
		this.msLastFrame = performance.now();
		window.requestAnimationFrame(this.run);
		return this;
	}

	stop(){
		this.isActive = false;
		return this;
	}
}
