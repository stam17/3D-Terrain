"use strict";
//--------------------------------------------------
// Utility Class
//--------------------------------------------------
class GLUtils{

    /**
    * Creates and returns a webgl2 instance for the given canvas.
    * @param {Canvas} canvas the WebGL context for this application.
    * @param {bool} fitScreen should the canvas always try to fit the browser window size?
    * @return {WebGLRenderingContext} a webgl2 context, with debugging enabled.
    */
    static createWebGL2Instance(canvas, fitScreen = false){
        let gl = canvas.getContext("webgl2"); // WebGLRenderingContext (WebGL 2!)
        // post error if not supported
        if(!gl){ console.error("WebGL context is not available."); }

        gl = WebGLDebugUtils.makeDebugContext(gl); // enable debugging

        //--------------------------------------------------
        // size management, set scaling of canvas element always to be full window size
    	gl.setSize = function(w,h){
    		//set the size of the canvas, on chrome we need to set it 3 ways to make it work perfectly.
    		gl.canvas.style.width = w + "px";
    		gl.canvas.style.height = h + "px";
    		gl.canvas.width = w;
    		gl.canvas.height = h;

    		//when updating the canvas size, must reset the viewport of the canvas
    		//else the resolution webgl renders at will not change
    		gl.viewport(0,0,w,h);
    		return this;
    	}
    	gl.fitScreen = function(wp,hp){
    		return this.setSize((window.innerWidth - 15 )*(wp || 1), (window.innerHeight - 30) * (hp || 1));
    	}
        if(fitScreen){
            window.onresize = function(){
                gl.fitScreen();
                g_camera.updateProjectionMatrix();
            };
            gl.fitScreen();
        }

        return gl;
    }

    //get the text of a script tag in the html that is storing shader code.
	static getDomShaderSrc(elementID){
		let element = document.getElementById(elementID);
		if(!element || element.text == ""){
			console.log(elementID + " shader not found or no text."); return null;
		}
		return element.text;
	}

    /**
    * Creates and returns a ShaderProgram from the given vertex and fragment shader sources.
    * @param {WebGLRenderingContext} gl the WebGL context for this application.
    * @param {string} vertexShaderScr the source text (code) of the vertex shader.
    * @param {string} fragmentShaderSrc the source text (code) of the fragment shader.
    * @return {WebGLShaderProgram} A Shaderprogram, initialized, linked and validated.
    */
    static createShaderProgram(gl, vertexShaderSrc, fragmentShaderSrc){
        // create shaders, set source code and compile them
        let vertexShader = gl.createShader(gl.VERTEX_SHADER);
        let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(vertexShader, vertexShaderSrc);
        gl.shaderSource(fragmentShader, fragmentShaderSrc);
        gl.compileShader(vertexShader);
        gl.compileShader(fragmentShader);
        // check for compiler errors in vertex and fragment shader
        if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)){
            console.error('ERROR could not compile vertex shader.', gl.getShaderInfoLog(vertexShader));
            return -1;
        }
        if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)){
            console.error('ERROR could not compile fragment shader.', gl.getShaderInfoLog(fragmentShader));
            return -1;
        }
        // create shader program and attach vertex and fragment shader
        let shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);

        // Force Attribute location to giving binding spot (eg. position will always be 0)
        gl.bindAttribLocation(shaderProgram, A_POSITION_LOC, A_POSITION_NAME);
        gl.bindAttribLocation(shaderProgram, A_VERTEXCOLOR_LOC, A_VERTEXCOLOR_NAME);
        gl.bindAttribLocation(shaderProgram, A_NORMAL_LOC, A_NORMAL_NAME);

        // Link Program, completing its preparation and uploading to the GPU
        gl.linkProgram(shaderProgram);
        if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)){
            console.error('ERROR linking program!', gl.getProgramInfoLog(shaderProgram));
            return -1;
        }
        // Validate that everything worked and the program is now ready to run on the GPU
        gl.validateProgram(shaderProgram);
        if(!gl.getProgramParameter(shaderProgram, gl.VALIDATE_STATUS)){
            console.error('ERROR validating program!', gl.getProgramInfoLog(shaderProgram));
            return -1;
        }
        return shaderProgram;
    }

    /**
    * Creates and returns a mesh object assembled from the given data. The mesh object
    * uses a vao and is fully initialized for use with any shader using the globally defined
    * constanst for attributes and uniforms. It is deposited in the MeshCache using its name.
    * @param {WebGLRenderingContext} gl the WebGL context for this application.
    * @param {string} name the name of the mesh that will be used to retrieve it from the MeshCache.
    * @param {WebGLDrawMode} drawMode gl.TRIANGLES, gl TRIANGLE_FAN etc. drawmode when calling gl.drawArrays.
    * @param {Array} vertexArray array of numbers containing the position data for this mesh.
    * @param {Array} indexArray array of numbers containing the index data for this mesh.
    * @return {object} the mesh object created with the given parameters and fully initialized buffers and vao. Ready to use.
    */
    static createMeshVAO(gl, name, drawMode, vertexArray, normalArray, texcoordsArray, indexArray){
        let mesh = {drawMode: drawMode};

        //Create and bind vao
        mesh.vao = gl.createVertexArray();
        gl.bindVertexArray(mesh.vao);	//Bind it so all the calls to vertexAttribPointer/enableVertexAttribArray is saved to the vao.

        //.......................................................
        //Set up vertices
        if(vertexArray !== undefined && vertexArray != null){
            mesh.bufVertices = gl.createBuffer();											//Create buffer...
            mesh.vertexComponentLen = 3;													//How many floats make up a vertex
            mesh.vertexCount = vertexArray.length / mesh.vertexComponentLen;				//How many vertices in the array

            gl.bindBuffer(gl.ARRAY_BUFFER, mesh.bufVertices);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexArray), gl.STATIC_DRAW);	//then push array into it.
            gl.enableVertexAttribArray(A_POSITION_LOC);										//Enable Attribute location
            gl.vertexAttribPointer(A_POSITION_LOC,3,gl.FLOAT,false,0,0);					//Put buffer at location of the vao
        }
        //.......................................................
        //Set up normals
        if(normalArray !== undefined && normalArray != null){
            mesh.bufNormals = gl.createBuffer();										//Create buffer...
            gl.bindBuffer(gl.ARRAY_BUFFER, mesh.bufNormals);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalArray), gl.STATIC_DRAW);	//then push array into it.
            gl.enableVertexAttribArray(A_NORMAL_LOC);										//Enable Attribute location
            gl.vertexAttribPointer(A_NORMAL_LOC,3,gl.FLOAT,false,0,0);					//Put buffer at location of the vao
        }

        //.......................................................
        //Set up texture coordinates
        if(texcoordsArray !== undefined && texcoordsArray != null){
            mesh.bufTexcoords = gl.createBuffer();											//Create buffer...
            gl.bindBuffer(gl.ARRAY_BUFFER, mesh.bufTexcoords);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texcoordsArray), gl.STATIC_DRAW);	//then push array into it.
            gl.enableVertexAttribArray(A_TEXCOORD_LOC);										//Enable Attribute location
            gl.vertexAttribPointer(A_TEXCOORD_LOC,2,gl.FLOAT,false,0,0);					//Put buffer at location of the vao
        }

        //.......................................................
        //Setup Index.
        if(indexArray !== undefined && indexArray != null){
            mesh.bufIndex = gl.createBuffer();
            mesh.indexCount = indexArray.length;
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.bufIndex);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexArray), gl.STATIC_DRAW);
        }

        //Clean up
        gl.bindVertexArray(null); //Unbind the VAO, very Important. always unbind when your done using one.
        //Unbind any buffers that might be set AFTER we unbind the VAO!
        gl.bindBuffer(gl.ARRAY_BUFFER,null);
        if(indexArray !== undefined && indexArray != null){
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,null);
        }

        //store mesh in MeshCache with name as reference.
        MeshCache[name] = mesh;
        return mesh;
    }

    static loadTexture(gl, name, textureSrc) {
        let textureHandler = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, textureHandler);
        // fill texture with data
        gl.texImage2D(gl.TEXTURE_2D,                   // texture binding point (i.e. target)
                       0,                               // level of detail
                       gl.RGBA,                         // internal format
                       1, 1,                            // width and height of texture (pixel data)
                       0,                               // border
                       gl.RGBA,                         // input format
                       gl.UNSIGNED_BYTE,                // input type
                       new Uint8Array([0,0,255,255])
                    );  // data: array of 8 bits (1 byte) per element
        
        let image = new Image();
        // onload function executed once source and image are loaded
        image.onload = function() {
            gl.bindTexture(gl.TEXTURE_2D, textureHandler);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            gl.generateMipmap(gl.TEXTURE_2D);
        }
        image.onerror = function() {
            console.error("Image could not be loaded " + textureSrc);
        }
        image.src = textureSrc;
        TextureCache[name] = textureHandler;
    }

    // takes any array, creates a Float32Array from it, moves the data into a buffer
    // and then returns that buffer
    static createArrayBuffer(gl, array, usage = gl.STATIC_DRAW){
        // convert to typed array
        let floatArray = new Float32Array(array);
        // create buffer id
        let buffer = gl.createBuffer();
        // set id to the current active array buffer (only one can be active)
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        // upload buffer data
        gl.bufferData(gl.ARRAY_BUFFER, floatArray, usage);
        return buffer;
    }
}
