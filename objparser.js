"use strict";
class OBJLoader{
    static getMesh(gl, name, path){
        if(MeshCache[name] !== undefined){
            return MeshCache[name];
        }
        MeshCache[name] = GLUtils.createMeshVAO(gl, name);

        OBJLoader.loadTextFileAJAX(path,
                         function(fileContent){
                             let objData = OBJLoader.parse(fileContent)[0];
                             let tempMesh = GLUtils.createMeshVAO(gl, "tempObjModel", gl.TRIANGLES,
                                                                objData.vertices,
                                                                objData.normals,
                                                                objData.textureCoordinates,
                                                                objData.indices);
                             let realMesh = MeshCache[name];
                             for(let property in tempMesh){
                                 realMesh[property] = tempMesh[property];
                             }
                         },
                         function(error){console.error(error);}
                     );
        return MeshCache[name];
    }

    static loadTextFileAJAX(name, onSucces, onError){
        var xhr = new XMLHttpRequest(),
            okStatus = document.location.protocol === "file:" ? 0 : 200;
        xhr.open('GET', name, true);
        xhr.onreadystatechange= function () {
            if (xhr.readyState !== XMLHttpRequest.DONE) {
                return;
            }
            if (xhr.status !== 200) {
                onError(xhr.responseText);
                return;
            }
            onSucces(xhr.responseText);
        };
        xhr.send(null);
    }

    /**
    * Simple obj parser. Returns obj-file as a array containing objects with vertices, uvs, normals, indices and materials.
    *
    * Based on https://github.com/mortennobel/KickJS/blob/master/src/js/kick/importer/ObjImporter.js
    *
    */
    static parse(objFileContent, mtlFileContent, noIndices){
        var materials = (function parseMaterials(){
            if (!mtlFileContent){
                mtlFileContent = "";
            }
            var materialMap = {};
            var lines = mtlFileContent.split("\n");
            var currentElement;
            var count = 0;
            for (var i = 0;i<lines.length;i++){
                var elements = lines[i].trim().split(" ");
                if (elements.length > 0){
                    if (elements[0] == "newmtl"){
                        currentElement = {};
                        materialMap[elements[1]] = currentElement;
                        materialMap[count] = currentElement;
                        count++;
                    } else if (elements[0] == "Ns"){
                        currentElement.Ns = parseFloat(elements[1]);
                    } else if (elements[0] == "Ni"){
                        currentElement.Ni = parseFloat(elements[1]);
                    } else if (elements[0] == "d"){
                        currentElement.d = parseFloat(elements[1]);
                    } else if (elements[0] == "Tr"){
                        currentElement.Tr = parseFloat(elements[1]);
                    } else if (elements[0] == "Tf"){
                        currentElement.Tf = [parseFloat(elements[1]), parseFloat(elements[2]), parseFloat(elements[3])];
                    } else if (elements[0] == "illum"){
                        currentElement.illum = parseInt(elements[1]);
                    } else if (elements[0] == "Ka"){
                        currentElement.Ka = [parseFloat(elements[1]), parseFloat(elements[2]), parseFloat(elements[3])];
                    } else if (elements[0] == "Kd"){
                        currentElement.Kd = [parseFloat(elements[1]), parseFloat(elements[2]), parseFloat(elements[3])];
                    } else if (elements[0] == "Ks"){
                        currentElement.Ks = [parseFloat(elements[1]), parseFloat(elements[2]), parseFloat(elements[3])];
                    } else if (elements[0] == "Ke"){
                        currentElement.Ke = [parseFloat(elements[1]), parseFloat(elements[2]), parseFloat(elements[3])];
                    } else if (elements[0] == "map_Ka"){
                        currentElement.map_Ka = elements[1];
                    } else if (elements[0] == "map_Kd"){
                        currentElement.map_Kd = elements[1];
                    } else if (elements[0] == "map_bump"){
                        currentElement.map_bump = elements[1];
                    } else if (elements[0] == "bump"){
                        currentElement.bump = elements[1];
                    }
                }
            }
            return materialMap;
        })();

        var lines = objFileContent.split("\n"),
            linesLength = lines.length,
            vertices = [],
            normals = [],
            textureCoordinates = [],
            triangles = [],
            resObjects = [],
            currentObject = {},
            i,
            j,
            trim = function (str) { return str.replace(/^\s+|\s+$/g, ""); },
            strAsArray = function (numberString, type) {
                if (!type) {
                    type = Array;
                }
                numberString = numberString.replace(/^\s+|\s+$/g, ""); // trim
                numberString = numberString.replace(/\s{2,}/g, ' '); // remove double white spaces
                var numberArray = numberString.split(" ").map(Number);
                if (!type || type === Array) {
                    return numberArray;
                } else {
                    // typed array
                    return new type(numberArray);
                }
            },
            getIndices = function (strArray) {
                var array = [],
                    i,
                    j,
                    str,
                    splittedStr,
                    vertexIndex;
                for (j = 0; j < strArray.length; j++) {
                    for (i = 0; i < strArray[j].length; i++) {
                        str = strArray[j][i];
                        splittedStr = str.split("/");
                        vertexIndex = parseInt(splittedStr[0], 10);
                        array.push([vertexIndex,
                            splittedStr.length >= 2 ? parseInt(splittedStr[1], 10) : vertexIndex,
                            splittedStr.length >= 3 ? parseInt(splittedStr[2], 10) : vertexIndex]);
                    }
                }
                return array;
            };
        currentObject.name = "Default";
        currentObject.material = materials[0];
        currentObject.triangles = triangles;
        resObjects.push(currentObject);


        for (i = 0;i < linesLength; i++) {
            var line = trim(lines[i]);
            var tokenIndex = line.indexOf(' ');
            if (tokenIndex < 0) {
                continue;
            }
            var token = line.substring(0, tokenIndex);
            var value = line.substring(tokenIndex + 1);
            if (token === "o" || token === "g") {
                if (triangles.length>0){
                    currentObject = {};
                    resObjects.push(currentObject);
                    triangles = [];
                    currentObject.triangles = triangles;
                }
                currentObject.name = value;
                currentObject.material = materials[0];
            } else if (token === "usemtl") {
                currentObject.material = materials[value];
            } else if (token === "v") {
                var vertex = strAsArray(value);
                vertices.push(vertex);
            } else if (token === "vn") {
                var normal = strAsArray(value);
                normals.push(normal);
            } else if (token === "vt") {
                textureCoordinates.push(strAsArray(value));
            } else if (token === "f") {
                var polygon = value.split(" ");
                triangles.push(polygon.slice(0, 3));
                for (j = 3; j < polygon.length; j++) {
                    triangles.push([polygon[j - 1], polygon[j], polygon[0]]);
                }
            }
        }

        // convert to output vertices

        for (j = 0;j<resObjects.length;j++){
            var mapping = {};
            var outVertex = [];
            var outNormals = [];
            var outTextureCoordinates = [];
            var outTriangles = [];
            var indices = getIndices(resObjects[j].triangles);
            for (i=0;i<indices.length;i++){
                var t = indices[i];
                var tStr = ""+t[0]+"#"+t[1]+"#"+t[2];
                if (typeof mapping[tStr] !== 'undefined') {
                    outTriangles.push(mapping[tStr]);
                } else {
                    //var index = outVertex.length;
                    var index = outVertex.length/3;
                    outTriangles.push(index);
                    mapping[tStr] = index;
                    //outVertex.push(vertices[t[0]-1]);
                    vertices[t[0]-1].forEach(function(v){outVertex.push(v);});
                    if (!isNaN(t[1]-1)){
                        //outTextureCoordinates.push(textureCoordinates[t[1]-1]);
                        textureCoordinates[t[1]-1].forEach(function(t){outTextureCoordinates.push(t);});
                    }
                    if (!isNaN(t[2]-1)) {
                        //outNormals.push(normals[t[2] - 1]);
                        normals[t[2] - 1].forEach(function(n){outNormals.push(n);});
                    }
                }
            }
            resObjects[j].vertices = outVertex;
            resObjects[j].normals = outNormals;
            resObjects[j].textureCoordinates = outTextureCoordinates;
            resObjects[j].indices = outTriangles;
        }

        if (noIndices){
            for (j = 0;j<resObjects.length;j++){
                var outVertex = [];
                var outNormals = [];
                var outTextureCoordinates = [];
                for (var i=0;i<resObjects[j].indices.length;i++){
                    var vertexIndex = resObjects[j].indices[i];
                    outVertex.push(resObjects[j].vertices[vertexIndex]);
                    outNormals.push(resObjects[j].normals[vertexIndex]);
                    textureCoordinates.push(resObjects[j].textureCoordinates[vertexIndex]);
                }
                resObjects[j].vertices = outVertex;
                resObjects[j].normals = outNormals;
                resObjects[j].textureCoordinates = outTextureCoordinates;
                delete resObjects[j].indices;
            }
        }

        return resObjects;
    }
}
