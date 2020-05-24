"use strict";
//--------------------------------------------------
// Global attribute and uniform constants
//--------------------------------------------------
// these allow us to work with by standard defined attribute and uniform names
// throughout the application. Every shader will have to follow this naming
// convention. Use these constants for uniform and attribute location lookup.
// Location objects are saved in the shaders attribLoc and uniformLoc values.
const A_POSITION_NAME	= "a_position";
const A_POSITION_LOC	= 0;
const A_VERTEXCOLOR_NAME= "a_vertexcolor";
const A_VERTEXCOLOR_LOC	= 1;
const A_NORMAL_NAME	= "a_normal";
const A_NORMAL_LOC	= 2;
const A_TEXCOORD_NAME = "a_texcoords";
const A_TEXCOORD_LOC = 3;

// transformations
const U_MODEL_MATRIX_NAME = "u_matrixM";
const U_VIEW_MATRIX_NAME = "u_matrixV";
const U_PROJECTION_MATRIX_NAME = "u_matrixP";
const U_INVERSETRANPSOSE_MATRIX_NAME = "u_matrixIT";

// color
const U_TINT_NAME = "u_tint";

// lighting
const U_LIGHT_DIRECTION_NAME = "u_lightDirection";
const U_LIGHT_COLOR_NAME = "u_lightColor";
const U_AMBIENT_COLOR_NAME = "u_ambientColor";

// texturing
const U_MAINTEX_NAME = "u_mainTex";

class Shader{
	gl;
	attribLoc; // an object to hold standardized attribute locations for any shader
	uniformLoc; // an object to hold standardized uniform locations for any shader
	program;

	constructor(gl, vertShaderSrc, fragShaderSrc){
		this.program = GLUtils.createShaderProgram(gl,vertShaderSrc,fragShaderSrc,true);

		if(this.program != null){
			this.gl = gl;
			this.gl.useProgram(this.program);
			this.attribLoc = Shader.getStandardAttribLocations(gl,this.program);
			this.uniformLoc = Shader.getStandardUniformLocations(gl,this.program);
		}
	}

	//...................................................
	//Methods
    //...................................................
	activate(){
		this.gl.useProgram(this.program);
		return this;
	}
	deactivate(){
		this.gl.useProgram(null);
		return this;
	}

	//function helps clean up resources when shader is no longer needed.
	dispose(){
		//unbind the program if its currently active
		if(this.gl.getParameter(this.gl.CURRENT_PROGRAM) === this.program){
			this.gl.useProgram(null);
		}
		this.gl.deleteProgram(this.program);
	}

    //Get the locations of standard attributes that we will mostly be using. Location will = -1 if attribute is not found.
    static getStandardAttribLocations(gl, program){
        return {
            position:    gl.getAttribLocation(program, A_POSITION_NAME),
			vertexColor: gl.getAttribLocation(program, A_VERTEXCOLOR_NAME),
			normal:		 gl.getAttribLocation(program, A_NORMAL_NAME),
			texcoords:	 gl.getAttribLocation(program, A_TEXCOORD_NAME)
        };
    }

    //Get the locations of standard Uniforms that we will mostly be using. Location will = -1 if uniform is not found.
    static getStandardUniformLocations(gl, program){
        return {
			// transformations
            modelMatrix:      		gl.getUniformLocation(program, U_MODEL_MATRIX_NAME),
            viewMatrix:       		gl.getUniformLocation(program, U_VIEW_MATRIX_NAME),
			projectionMatrix: 		gl.getUniformLocation(program, U_PROJECTION_MATRIX_NAME),
			inverseTransposeMatrix: gl.getUniformLocation(program, U_INVERSETRANPSOSE_MATRIX_NAME),
			// color
			tint:             		gl.getUniformLocation(program, U_TINT_NAME),
			// lighting
			lightDirection:			gl.getUniformLocation(program, U_LIGHT_DIRECTION_NAME),
			lightColor:				gl.getUniformLocation(program, U_LIGHT_COLOR_NAME),
			ambientColor:			gl.getUniformLocation(program, U_AMBIENT_COLOR_NAME),
			// texturing
			mainTexture:			gl.getUniformLocation(program, U_MAINTEX_NAME)
        };
    }
}
