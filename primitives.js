"use strict";
var Primitives = {};
Primitives.Cube = class{
    static getMesh(gl){
        if(MeshCache["cube"] !== undefined){
            return MeshCache["cube"];
        }

        let verts =    [-0.5, 0.5, 0.5, //Front
                        -0.5,-0.5, 0.5,
                         0.5,-0.5, 0.5,
                         0.5, 0.5, 0.5,

                         0.5, 0.5,-0.5, //Back
                         0.5,-0.5,-0.5,
                        -0.5,-0.5,-0.5,
                        -0.5, 0.5,-0.5,

                        -0.5, 0.5,-0.5, //Top
                        -0.5, 0.5, 0.5,
                         0.5, 0.5, 0.5,
                         0.5, 0.5,-0.5,

                        -0.5,-0.5, 0.5, //Bottom
                        -0.5,-0.5,-0.5,
                         0.5,-0.5,-0.5,
                         0.5,-0.5, 0.5,

                         0.5, 0.5, 0.5, //Right
                         0.5,-0.5, 0.5,
                         0.5,-0.5,-0.5,
                         0.5, 0.5,-0.5,

                        -0.5, 0.5,-0.5, //Left
                        -0.5,-0.5,-0.5,
                        -0.5,-0.5, 0.5,
                        -0.5, 0.5, 0.5];

        let normals =  [0.0, 0.0, 1.0, //Front
                        0.0, 0.0, 1.0,
                        0.0, 0.0, 1.0,
                        0.0, 0.0, 1.0,

                        0.0, 0.0,-1.0, //Back
                        0.0, 0.0,-1.0,
                        0.0, 0.0,-1.0,
                        0.0, 0.0,-1.0,

                        0.0, 1.0, 0.0, //Top
                        0.0, 1.0, 0.0,
                        0.0, 1.0, 0.0,
                        0.0, 1.0, 0.0,

                        0.0,-1.0, 0.0, //Bottom
                        0.0,-1.0, 0.0,
                        0.0,-1.0, 0.0,
                        0.0,-1.0, 0.0,

                        1.0, 0.0, 0.0, //Right
                        1.0, 0.0, 0.0,
                        1.0, 0.0, 0.0,
                        1.0, 0.0, 0.0,

                       -1.0, 0.0, 0.0, //left
                       -1.0, 0.0, 0.0,
                       -1.0, 0.0, 0.0,
                       -1.0, 0.0, 0.0];

        let texcoords = [0.0, 1.0,
                        0.0, 0.0,
                        1.0, 0.0,
                        1.0, 1.0,

                        0.0, 1.0,
                        0.0, 0.0,
                        1.0, 0.0,
                        1.0, 1.0,

                        0.0, 1.0,
                        0.0, 0.0,
                        1.0, 0.0,
                        1.0, 1.0,

                        0.0, 1.0,
                        0.0, 0.0,
                        1.0, 0.0,
                        1.0, 1.0,

                        0.0, 1.0,
                        0.0, 0.0,
                        1.0, 0.0,
                        1.0, 1.0,

                        0.0, 1.0,
                        0.0, 0.0,
                        1.0, 0.0,
                        1.0, 1.0];

        let indices =  [0, 1, 2, //Front
                        2, 3, 0,

                        4, 5, 6, //Back
                        6, 7, 4,

                        8, 9, 10, //Top
                        10, 11, 8,

                        12, 13, 14, //Bottom
                        14, 15, 12,

                        16, 17, 18, //Right
                        18, 19, 16,

                        20, 21, 22, //left
                        22, 23, 20];

        MeshCache["cube"] = GLUtils.createMeshVAO(gl, "cube", gl.TRIANGLES, verts, normals, texcoords, indices);
        return MeshCache["cube"];
    }
}

Primitives.Quad = class{
    static getMesh(gl){
        if(MeshCache["quad"] !== undefined){
            MeshCache["quad"];
        }
        let verts =    [-0.5, 0.5, 0.0,
                        -0.5,-0.5, 0.0,
                         0.5,-0.5, 0.0,
                         0.5, 0.5, 0.0];

        let normals =  [0.0, 0.0, 1.0,
                        0.0, 0.0, 1.0,
                        0.0, 0.0, 1.0,
                        0.0, 0.0, 1.0];

        let texcoords = [0.0, 1.0,
                         0.0, 0.0,
                         1.0, 0.0,
                         1.0, 1.0];

        let indices =  [0, 1, 2,
                        2, 3, 0];
        MeshCache["quad"] = GLUtils.createMeshVAO(gl, "cube", gl.TRIANGLES, verts, normals, texcoords, indices);
        return MeshCache["quad"];
    }
}

Primitives.Sphere = class{
    static getMesh(gl){
        if(MeshCache["sphere"] !== undefined){
            return MeshCache["sphere"];
        }

        // dimensions
        let hc = 8; // horizontal count
        let vc = 8; // vertical count

        let verts = [];
        let texcoords = [];
        let indices = [];

        // tip of the sphere
        for(let i = 0; i < hc; i++){
            verts.push(0.0);    verts.push(0.5);    verts.push(0.0);
            texcoords.push(i/hc + 0.5/hc); texcoords.push(1);
        }

        // first ring
        let radius = Math.sin(Math.PI*(1/vc))*0.5;
        let height = 0.5 * Math.sin(Math.PI/2 - Math.PI*(1/vc));

        verts.push(Math.cos(0)*radius);        verts.push(height);        verts.push(Math.sin(0)*radius);
        texcoords.push(0); texcoords.push(1-(1/vc));

        for(let i = 1; i <= hc; i++){
            let index = hc + i;
            verts.push(Math.cos(Math.PI*2*(i/hc))*radius);   verts.push(height);     verts.push(Math.sin(Math.PI*2*(i/hc))*radius);
            texcoords.push(i/hc); texcoords.push(1-(1/vc));
            indices.push(index - 1); indices.push(index); indices.push(i-1);
        }

        // center rings
        for(let v = 2; v < vc; v++){
            let radius = Math.sin(Math.PI*(v/vc))*0.5;
            let height = 0.5 * Math.sin(Math.PI/2 - Math.PI*(v/vc));

            verts.push(Math.cos(0)*radius);     verts.push(height);      verts.push(Math.sin(0)*radius);
            texcoords.push(0); texcoords.push(1-(v/vc));

            for(let h = 1; h <= hc; h++){
                verts.push(Math.cos(Math.PI*2*(h/hc))*radius);  verts.push(height);         verts.push(Math.sin(Math.PI*2*(h/hc))*radius);
                texcoords.push(h/hc); texcoords.push(1-(v/vc));
                indices.push(v*hc+h+v-2);                      indices.push((v-1)*hc+h+v-2); indices.push((v-1)*hc+h-1+v-2);
                indices.push(v*hc+h+v-2);                      indices.push(v*hc+h+1+v-2);   indices.push((v-1)*hc+h+v-2);
            }
        }

        // Bottom
        for(let i = 0; i < hc; i++){
            verts.push(0.0);    verts.push(-0.5);    verts.push(0.0);
            texcoords.push(i/hc + 0.5/hc); texcoords.push(0);
            indices.push(vc*(hc+1)-1+i); indices.push((vc-1)*hc+vc-1+i);  indices.push((vc-1)*hc+vc-2+i);
        }

        // radius of sphere is 0.5, so normal directions are vertice positions * 2 (to be length 1)
        let normals = [];
        for(let i = 0; i < (verts.length-1)/3; i++){
            let x = verts[i*3]*2;
            let y = verts[i*3+1]*2;
            let z = verts[i*3+2]*2;
            normals.push(x); normals.push(y); normals.push(z);
        }

        MeshCache["sphere"] = GLUtils.createMeshVAO(gl, "sphere", gl.TRIANGLES, verts, normals, texcoords, indices);
        return MeshCache["sphere"];
    }
}

Primitives.Tetrahedron = class{
    static getMesh(gl){
        if(MeshCache["tetrahedron"] !== undefined){
            MeshCache["tetrahedron"];
        }
        let ax, ay, az,
            bx, by, bz,
            cx, cy, cz,
            dx, dy, dz;

        ax =  0.0;            ay =   1.0;  az =  0.0;
        bx =  0.0;            by = -(1/3); bz =  Math.sqrt(8/9);
        cx = -Math.sqrt(2/3); cy = -(1/3); cz = -Math.sqrt(2/9);
        dx =  Math.sqrt(2/3); dy = -(1/3); dz = -Math.sqrt(2/9);

        let verts =    [ax, ay, az, // left
                        bx, by, bz,
                        cx, cy, cz,
                        ax, ay, az, // back
                        cx, cy, cz,
                        dx, dy, dz,
                        ax, ay, az, // right
                        dx, dy, dz,
                        bx, by, bz,
                        bx, by, bz, // down
                        cx, cy, cz,
                        dx, dy, dz];

        // calculate normals
        let nLx, nLy, nLz;  // normal left
        let nBx, nBy, nBz;  // normal back
        let nRx, nRy, nRz;  // normal right
        let nDx, nDy, nDz;  // normal down

        // all points have the same distance, and we can get the normals
        // from the opposite point of the side we calulate the normal for.
        // we just have to invert the point and normalize it.
        let length = Math.sqrt(ax*ax+ay*ay+az*az);

        nLx = -dx / length;
        nLy = -dy / length;
        nLz = -dz / length;

        nBx = -bx / length;
        nBy = -by / length;
        nBz = -bz / length;

        nRx = -cx / length;
        nRy = -cy / length;
        nRz = -cz / length;

        nDx = -ax / length;
        nDy = -ay / length;
        nDz = -az / length;

        let normals =  [nLx, nLy, nLz,
                        nLx, nLy, nLz,
                        nLx, nLy, nLz,
                        nBx, nBy, nBz,
                        nBx, nBy, nBz,
                        nBx, nBy, nBz,
                        nRx, nRy, nRz,
                        nRx, nRy, nRz,
                        nRx, nRy, nRz,
                        nDx, nDy, nDz,
                        nDx, nDy, nDz,
                        nDx, nDy, nDz];

        let texcoords =[0.5, 1.0,
                        0.0, 0.0,
                        1.0, 0.0,
                        0.5, 1.0,
                        0.0, 0.0,
                        1.0, 0.0,
                        0.5, 1.0,
                        0.0, 0.0,
                        1.0, 0.0,
                        0.5, 1.0,
                        0.0, 0.0,
                        1.0, 0.0];

let indices =  [0, 1, 2,
                3, 4, 5,
                6, 7, 8,
                9,10,11];


        MeshCache["tetrahedron"] = GLUtils.createMeshVAO(gl, "tetrahedron", gl.TRIANGLES, verts, normals, texcoords, indices);
        return MeshCache["tetrahedron"];
    }
}

Primitives.GridAxis = class{
    static getMesh(gl){
        if(MeshCache["grid"] !== undefined){
            return MeshCache["grid"];
        }

        let verts = [];
        let size = 1.9;                 //Width and Height of the GridAxis
        let lineCount = 10;             //How many lines vertical and horizontal
        let step = size/lineCount;      //distance between each line
        let half = size/2;              //halfsize of the grid for easy access during calculations

        let p; // temporary varibale to store positin during calculations
        for(let i = 0; i <= lineCount; i++){
            if(i === lineCount/2) continue; // dont draw center axis lines
            //Vertical line
			p = -half + (i * step);
			verts.push(p);		//x1
			verts.push(0);		//y1
			verts.push(half);	//z1
			verts.push(0.7);	//cr
            verts.push(0.7);	//cg
            verts.push(0.7);	//cb

			verts.push(p);		//x2
			verts.push(0);		//y2
			verts.push(-half);	//z2
            verts.push(0.7);	//cr
            verts.push(0.7);	//cg
            verts.push(0.7);	//cb

			//Horizontal line
			p = half - (i * step);
			verts.push(-half);	//x1
			verts.push(0);		//y1
			verts.push(p);		//z1
            verts.push(0.7);	//cr
            verts.push(0.7);	//cg
            verts.push(0.7);	//cb

			verts.push(half);	//x2
			verts.push(0);		//y2
			verts.push(p);		//z2
            verts.push(0.7);	//cr
            verts.push(0.7);	//cg
            verts.push(0.7);	//cb
        }
			//x axis
			verts.push(-1.1);	//x1
			verts.push(0.0);	//y1
			verts.push(0.0);	//z1
            verts.push(1.0);	//cr
            verts.push(0.0);	//cg
            verts.push(0.0);	//cb

			verts.push(1.1);	//x2
			verts.push(0.0);	//y2
			verts.push(0.0);	//z2
            verts.push(1.0);	//cr
            verts.push(0.0);	//cg
            verts.push(0.0);	//cb

			//y axis
			verts.push(0);      //x1
			verts.push(-1.1);	//y1
			verts.push(0);		//z1
            verts.push(0.0);	//cr
            verts.push(1.0);	//cg
            verts.push(0.0);	//cb

			verts.push(0);		//x2
			verts.push(1.1);	//y2
			verts.push(0);		//z2
            verts.push(0.0);	//cr
            verts.push(1.0);	//cg
            verts.push(0.0);	//cb

			//z axis
			verts.push(0);		//x1
			verts.push(0);		//y1
			verts.push(-1.1);	//z1
            verts.push(0.0);	//cr
            verts.push(0.0);	//cg
            verts.push(1.0);	//cb

			verts.push(0);		//x2
			verts.push(0);		//y2
			verts.push(1.1);	//z2
            verts.push(0.0);	//cr
            verts.push(0.0);	//cg
            verts.push(1.0);	//cb

        // set up mesh container
        let mesh = {};
        mesh.drawMode = gl.LINES;
        mesh.vao = gl.createVertexArray();
        mesh.vertexComponentLen = 6;
		mesh.vertexCount = verts.length / mesh.vertexComponentLen;
        let strideLen = Float32Array.BYTES_PER_ELEMENT * mesh.vertexComponentLen; //Stride Length is the Vertex Size for the buffer in Bytes

        // set up buffers
        mesh.bufVertices = gl.createBuffer();
        gl.bindVertexArray(mesh.vao);
        gl.bindBuffer(gl.ARRAY_BUFFER, mesh.bufVertices);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);

        gl.enableVertexAttribArray(A_POSITION_LOC);
        gl.vertexAttribPointer( A_POSITION_LOC,                  //Attribute location
                                3,                                  //How big is the vector by number count
                                gl.FLOAT,                           //What type of number are we passing in
                                false,                              //Do we need to normalize the data
                                strideLen,                          //stride (how big is one chunk of data, 0 if onyl one kind of data in the buffer)
                                0);                                 //stride offsets by how much

        gl.enableVertexAttribArray(A_VERTEXCOLOR_LOC);
        gl.vertexAttribPointer(A_VERTEXCOLOR_LOC,
                            	3,
                            	gl.FLOAT,
                            	false,
                            	strideLen,				            //
                            	Float32Array.BYTES_PER_ELEMENT * 3  //skip first 3 floats in our vertex chunk, its like str.substr(3,1) in theory.
		);

        // clean up
        gl.bindVertexArray(null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        MeshCache["grid"] = mesh;
        return mesh;
    }
}
