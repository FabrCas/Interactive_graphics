"use strict";

var shadedCube = function() {

var canvas;
var gl;
var testBarycenter = false;

if(testBarycenter)
    var numPositions = 180;
else
    var numPositions = 168;  //number of face(28) * 6 (3 vartices for each triangles, and 2 triangles for each quad)

var texSize = 128;//512;

// ************************** to test the creation of texture coordinates in the 1st point **********************************
// Create a checkerboard pattern using floats

var image1 = new Array()
    for (var i =0; i<texSize; i++)  image1[i] = new Array();
    for (var i =0; i<texSize; i++)
        for ( var j = 0; j < texSize; j++)
           image1[i][j] = new Float32Array(4);
    for (var i =0; i<texSize; i++) for (var j=0; j<texSize; j++) {
        var c = (((i & 0x8) == 0) ^ ((j & 0x8) == 0));
        image1[i][j] = [c, c, c, 1];
    }


var image2 = new Uint8Array(4*texSize*texSize);

    for (var i = 0; i < texSize; i++)
        for (var j = 0; j < texSize; j++)
           for(var k =0; k<4; k++)
                image2[4*texSize*i+4*j+k] = 255*image1[i][j][k];

// **************************************************************************************************************************

// *************************************7th exercise, create the bump texture ***********************************************
// Bump Data

var data = new Array()
    for (var i = 0; i<= texSize; i++)  data[i] = new Array();
    for (var i = 0; i<= texSize; i++) for (var j=0; j<=texSize; j++)
      data[i][j] = Math.random();

// Bump Map Normals

var normalst = new Array()
    for (var i=0; i<texSize; i++)  normalst[i] = new Array();
    for (var i=0; i<texSize; i++) for ( var j = 0; j < texSize; j++)
        normalst[i][j] = new Array();
    for (var i=0; i<texSize; i++) for ( var j = 0; j < texSize; j++) {
        normalst[i][j][0] = data[i][j]-data[i+1][j];
        normalst[i][j][1] = data[i][j]-data[i][j+1];
        normalst[i][j][2] = 1;
    }

// Scale to Texture Coordinates

    for (var i=0; i<texSize; i++) for (var j=0; j<texSize; j++) {
       var d = 0;
       for(k=0;k<3;k++) d+=normalst[i][j][k]*normalst[i][j][k];
       d = Math.sqrt(d);
       for(k=0;k<3;k++) normalst[i][j][k]= 0.5*normalst[i][j][k]/d + 0.5;
    }

// Normal Texture Array

var normals = new Uint8Array(3*texSize*texSize);

    for ( var i = 0; i < texSize; i++ )
        for ( var j = 0; j < texSize; j++ )
           for(var k =0; k<3; k++)
                normals[3*texSize*i+3*j+k] = 255*normalst[i][j][k];
           

// **************************************************************************************************************************
/* Vertices of the polyhedron */
var vertices = [
        // from 20 to 30 vertices
        vec4( -0.4,   0.5,  0.6,  1),  //A
        vec4(  0.4,   0.5,  0.6,  1),  //B
        vec4(  0.4,   0.5, -0.6,  1),  //C
        vec4( -0.4,   0.5, -0.6,  1),  //D
        vec4( -0.2,   0.4,  0.4,  1),  //E
        vec4(  0.2,   0.4,  0.4,  1),  //F
        vec4(  0.2,   0.4, -0.4,  1),  //G
        vec4( -0.2,   0.3,  0,    1),  //I
        vec4( -0.2,   0.4, -0.4,  1),  //H
        vec4(  0.2,   0.3,  0,    1),  //L
        vec4(  0.4,   0.5,  0,    1),  //J
        vec4( -0.4,   0.5,  0,    1),  //K

        vec4(  0.2,   0,  -0.4,   1),  //M
        vec4( -0.2,   0,  -0.4,   1),  //N
        vec4( -0.2,   0,   0.4,   1),  //O
        vec4(  0.2,   0,   0.4,   1),  //P
        vec4( -0.4,   0,   0,     1),  //Q
        vec4(  0.4,   0,   0,     1),  //R

        // the other are defined symmetrically
        vec4( -0.4,  -0.5,  0.6, 1),  //A'
        vec4(  0.4,  -0.5,  0.6, 1),  //B'
        vec4(  0.4,  -0.5, -0.6, 1),  //C'
        vec4( -0.4,  -0.5, -0.6, 1),  //D'
        vec4( -0.2,  -0.4,  0.4, 1),  //E'
        vec4(  0.2,  -0.4,  0.4, 1),  //F'
        vec4(  0.2,  -0.4, -0.4, 1),  //G'
        vec4( -0.2,  -0.3,  0,   1),  //I'
        vec4( -0.2,  -0.4, -0.4, 1),  //H'
        vec4(  0.2,  -0.3,  0,   1),  //L'
        vec4(  0.4,  -0.5,  0,   1),  //J'
        vec4( -0.4,  -0.5,  0,   1),  //K'

    ];

/* colors vertices */
var vertexColors = [
// define 30 vectors for the coulors 
        vec4(0.0, 0.0, 0.0, 1.0),  // black
        vec4(1.0, 0.0, 0.0, 1.0),  // red
        vec4(1.0, 1.0, 0.0, 1.0),  // yellow
        vec4(0.0, 1.0, 0.0, 1.0),  // green
        vec4(0.0, 0.0, 1.0, 1.0),  // blue
        vec4(1.0, 0.0, 1.0, 1.0),  // magenta
        vec4(1.0, 1.0, 1.0, 1.0),  // white
        vec4(0.0, 1.0, 1.0, 1.0),   // cyan
        vec4(0.0, 0.0, 0.0, 1.0),  // black
        vec4(1.0, 0.0, 0.0, 1.0),  // red
        vec4(1.0, 1.0, 0.0, 1.0),  // yellow
        vec4(0.0, 1.0, 0.0, 1.0),  // green
        vec4(0.0, 0.0, 1.0, 1.0),  // blue
        vec4(1.0, 0.0, 1.0, 1.0),  // magenta
        vec4(0.0, 1.0, 1.0, 1.0),  // white
        vec4(0.0, 1.0, 1.0, 1.0),   // cyan
        vec4(0.0, 0.0, 0.0, 1.0),  // black
        vec4(1.0, 0.0, 0.0, 1.0),  // red
        vec4(1.0, 1.0, 0.0, 1.0),  // yellow
        vec4(0.0, 1.0, 0.0, 1.0),  // green
        vec4(0.0, 0.0, 1.0, 1.0),  // blue
        vec4(1.0, 0.0, 1.0, 1.0),  // magenta
        vec4(0.0, 1.0, 1.0, 1.0),  // white
        vec4(0.0, 1.0, 1.0, 1.0),  // cyan
        vec4(0.0, 0.0, 0.0, 1.0),  // black
        vec4(1.0, 0.0, 0.0, 1.0),  // red
        vec4(1.0, 1.0, 0.0, 1.0),  // yellow
        vec4(0.0, 1.0, 0.0, 1.0),  // green
        vec4(0.0, 0.0, 1.0, 1.0),  // blue
        vec4(1.0, 0.0, 1.0, 1.0),  // magenta
        vec4(0.0, 1.0, 1.0, 1.0),  // white
        vec4(0.0, 1.0, 1.0, 1.0)   // cyan

];

if(testBarycenter){
    // add 2 more vertices to have a non symmetric geometry
    vertices.push(vec4( -0.4,  0.9,  0,   1));  //S
    vertices.push(vec4(  0.4,  0.9,  0,   1));  //T
}

/* Texture coordinates */
var textureCoord = [
   vec2(0, 0),
   vec2(0, 1),
   vec2(1, 1),
   vec2(1, 0)
];

// the main predefined light source
var lightPosition = vec4(1.0, 1.0, 1.0, 0.0); //source light in the frontal top-left corner 
var lightAmbient =  vec4(0.2, 0.2, 0.2, 1.0);
var lightDiffuse =  vec4(1.0, 1.0, 1.0, 1.0);
var lightSpecular = vec4(1.0, 1.0, 1.0, 1.0);


var ctm;
var ambientColor, diffuseColor, specularColor;
var modelViewMatrix, projectionMatrix;
var viewerPos;
var program;

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;
var axis = 0;
var theta = vec3(0, 0, 0);
var thetaLoc;
var flag = false;


// 1st point -> handle normals & texture 
var positionsArray = [];
var normalsArray = [];
var normalquad = []
var colorsArray = [];
var textureCoordsArray = [];
var texture;
var textureEnabled = 0.0   //initially turn off the texture ù

// 2nd point -> commpute the barycenter
var centroids = []; //centroid computed for each face 
var areaQuads = []; var accAreas = 0; 
var barycenter;
var barycenter_approximated = false;

// 3rd point -> View and perspective Projection managing 

var near = 1.0;
var far = 12.0;
var  fovy = 65.0;
var  aspect = 1.0;

var radius = 2.5;
var phi = 0.0;
var _theta = 0.0;


var modelViewMatrixCamera;

var eye;
const at = vec3(0.0, 0.0, 0.0);
const up = vec3(0.0, 1.0, 0.0); 

//4th point -> cylindrical neon light 

// the 3 lights sources for the cylindrical neon light

var lightPosition_1 =  vec4(0.0, 1.4, 0.0, 1.0);
var lightAmbient_1 =   vec4(0.2, 0.2, 0.2, 1.0);
var lightDiffuse_1 =   vec4(0.25, 0.25, 0.25, 1.0);
var lightSpecular_1 =  vec4(0.25, 0.25, 0.25, 1.0);

var lightPosition_2 = vec4(-0.74, 1.4, 0.0, 1.0);
var lightAmbient_2 =  vec4(0.2, 0.2, 0.2, 1.0);
var lightDiffuse_2 =  vec4(0.25, 0.25, 0.25, 1.0);
var lightSpecular_2 =  vec4(0.25, 0.25, 0.25, 1.0);

var lightPosition_3 = vec4(0.74, 1.4, 0.0, 1.0);
var lightAmbient_3 =   vec4(0.2, 0.2, 0.2, 1.0);
var lightDiffuse_3 =   vec4(0.25, 0.25, 0.25, 1.0);
var lightSpecular_3 =  vec4(0.25, 0.25, 0.25, 1.0);

// additional cylinder properties
var materialAmbient_1 =  vec4(0.0, 1.0, 0.0, 1.0);
var materialDiffuse_1 =  vec4(0.0, 1.0, 0.0, 1.0);
var materialSpecular_1 = vec4(0.0, 1.0, 0.0, 1.0);

var neonLightEnabled = 0.0; //turn on the neon light
var n_vertices_cylinder
var emission = vec4(0.0, 0.8, 0.0, 1.0);
var emission_2 = vec4(emission[0]/9, emission[1]/9, emission[2]/9, 1.0);
var points_cylinder;
var normals_cylinder;
var colors_cylinder;
var textures_cylinder;

//5th point -> edit object material properties (5th point)

// change color of vertices
var polyhedron_color = vec4(0.1,0.1,0.1,1.0); // dark grey 

// metal properties 
//var materialAmbient = vec4(0.5, 0.5, 0.5, 1.0);
//var materialDiffuse = vec4(0.5, 0.5, 0.5, 1.0);
//var materialSpecular = vec4(0.8, 0.8, 0.8, 1.0);
//var materialShininess = 100.0;

//chrome properties
var materialAmbient = vec4(0.25, 0.25, 0.25, 1.0);
var materialDiffuse = vec4(0.4, 0.4, 0.4, 1.0);
var materialSpecular = vec4(0.774597, 0.774597, 0.774597, 1.0);
var materialShininess = 60;

//6th
var enable_per_frag = 0.0
//7th
var ambientProduct;
var diffuseProduct;
var specularProduct;
var diffuseProductLoc;

init();

function configureTexture(image) {
   texture = gl.createTexture();
   gl.activeTexture(gl.TEXTURE0);
   gl.bindTexture(gl.TEXTURE_2D, texture);
   gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, texSize, texSize, 0,
       gl.RGBA, gl.UNSIGNED_BYTE, image);
   gl.generateMipmap(gl.TEXTURE_2D);
   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
       gl.NEAREST_MIPMAP_LINEAR);
   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
}

function configureTexture2( image ) {
   texture = gl.createTexture();
   gl.activeTexture(gl.TEXTURE0);
   gl.bindTexture(gl.TEXTURE_2D, texture);
   gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, texSize, texSize, 0, gl.RGB, gl.UNSIGNED_BYTE, image);
   gl.generateMipmap(gl.TEXTURE_2D);
}

function quadNormal(a,b,c){
    var t1 = subtract(b, a);
    var t2 = subtract(c, b);
    var normal = cross(t1, t2);
    normal = vec3(normal);
    return normal;
}

/*          NORMAL  COMPUTATION          */


function computeNormalsQuad(a,b,c,d){

    var normal = quadNormal(vertices[a], vertices[b], vertices[c], vertices[d]);
    var vartices_nor = [a,b,c,d];
    normalquad.push({
        vertices : vartices_nor,
        value: normal
    });
}

function computeNormalVertex(id){
    var tmp = vec3(0,0,0);
    var counter = 0;
    normalquad.forEach(function(elem) {
        
        elem.vertices.forEach(function(vertex){
            if(vertex==id){
                tmp = add(tmp, elem.value);
                counter += 1; 
            }
        });

    });
    tmp[0] = tmp[0]/counter;
    tmp[1] = tmp[1]/counter;
    tmp[2] = tmp[2]/counter;
    return tmp;
}

function quadNormal(a,b,c){
    var t1 = subtract(b, a);
    var t2 = subtract(c, b);
    var normal = cross(t1, t2);
    normal = vec3(normal);
    return normal;
}


/*          BARYCENTER  COMPUTATION          */

// first way to compute the barycenter  
function computeBarycenter(){
    var sum = vec4(0,0,0,0);
    var length = vertices.length;
    vertices.forEach(function(vertex){
        sum = add(sum, vertex);
    });
    sum[0] /=length; sum[1] /= length; sum[2] /= length; sum[3] /= length;
    sum[0] = Number((sum[0]).toFixed(2))
    sum[1] = Number((sum[1]).toFixed(2))
    sum[2] = Number((sum[2]).toFixed(2))
    sum[3] = Number((sum[3]).toFixed(2))
    return sum; 
}


// start of the second method for the barycenter
function centroidFace(a,b,c,d){
    var centroid = vec4(0,0,0,0);
    var a = vertices[a];
    var b = vertices[b];
    var c = vertices[c];
    var d = vertices[d];

    centroid[0] = (a[0] + b[0] + c[0] + d[0])/4;
    centroid[1] = (a[1] + b[1] + c[1] + d[1])/4;
    centroid[2] = (a[2] + b[2] + c[2] + d[2])/4;
    centroid[3] = (a[3] + b[3] + c[3] + d[3])/4;
    return centroid;
}


function polygonArea(a,b,c,d) {
// compute the area of the 2 triangles and sum them

var ab = subtract(b,a);
var ac = subtract(c,a);
var area1 = cross(ab,ac);
area1[0] = Math.abs(area1[0])/2;
area1[1] = Math.abs(area1[1])/2;
area1[2] = Math.abs(area1[2])/2;
area1 = Math.sqrt(area1[0] * area1[0] + area1[1] * area1[1] + area1[2] * area1[2]);


var cd = subtract(d,c);
var ca = subtract(c,a);
var area2 = cross(cd,ca);
area2[0] = Math.abs(area2[0])/2;
area2[1] = Math.abs(area2[1])/2;
area2[2] = Math.abs(area2[2])/2;
area2 = Math.sqrt(area2[0] * area2[0] + area2[1] * area2[1] + area2[2] * area2[2]);

var full_area = area1 + area2;
accAreas += full_area; // increase the whole sum of ares used to normalize the barycender weighted sum
return full_area; // full area weight for the barycenter;
}


function computeBarycenterCentroids(){
    var sum = vec4(0,0,0,0);
    var length = centroids.length;
    var i = 0;
    centroids.forEach(function(centroid){
        var tmp = vec4(centroid[0],centroid[1],centroid[2],centroid[3]);
        tmp[0] *= (areaQuads[i] * 100);
        tmp[1] *= (areaQuads[i] * 100);
        tmp[2] *= (areaQuads[i] * 100);
        tmp[3] *= (areaQuads[i] * 100);

        sum = add(sum, tmp);
        i += 1;
    });
    sum[0] /= (accAreas * 100) ; sum[1] /= (accAreas * 100); sum[2] /= (accAreas * 100); sum[3] /= (accAreas * 100);

    sum[0] = Number((sum[0]).toFixed(2))
    sum[1] = Number((sum[1]).toFixed(2))
    sum[2] = Number((sum[2]).toFixed(2))
    sum[3] = Number((sum[3]).toFixed(2))

    return sum;
}

// end second method for the barycenter

function quad(a, b, c, d) {

    // 2nd point: estimates centroids and areas of quads for the barycenter
    var centroid  =centroidFace(a,b,c,d);
    var area = polygonArea(vertices[a], vertices[b], vertices[c], vertices[d]);
    centroids.push(centroid);
    areaQuads.push(area);
    
    //compute face normal to each vertex (phong shading)
    var normal = quadNormal(vertices[a], vertices[b], vertices[c], vertices[d]);

    // compute smooth normals (Gouraud Shading)
    var normal_a = computeNormalVertex(a);
    var normal_b = computeNormalVertex(b);
    var normal_c = computeNormalVertex(c);
    var normal_d = computeNormalVertex(d);

    // manage a first triangle
    positionsArray.push(vertices[a]);
    normalsArray.push(normal_a);
    //normalsArray.push(normal);
    colorsArray.push(polyhedron_color);
    textureCoordsArray.push(textureCoord[0]);


    // manage b first triangle
    positionsArray.push(vertices[b]);
    normalsArray.push(normal_b);
    //normalsArray.push(normal);
    colorsArray.push(polyhedron_color);
    textureCoordsArray.push(textureCoord[1]);

    // manage c first triangle
    positionsArray.push(vertices[c]);                                                                                                                
    normalsArray.push(normal_c);
    //normalsArray.push(normal);
    colorsArray.push(polyhedron_color);
    textureCoordsArray.push(textureCoord[2]);

    // manage a second triangle
    positionsArray.push(vertices[a]);
    normalsArray.push(normal_a);
    //normalsArray.push(normal);
    colorsArray.push(polyhedron_color);
    textureCoordsArray.push(textureCoord[0]);

    // manage c second  triangle
    positionsArray.push(vertices[c]);
    normalsArray.push(normal_c);
    //normalsArray.push(normal);
    colorsArray.push(polyhedron_color);
    textureCoordsArray.push(textureCoord[2]);

    // manage d second triangle
    positionsArray.push(vertices[d]);
    normalsArray.push(normal_d);
    //normalsArray.push(normal);
    colorsArray.push(polyhedron_color);
    textureCoordsArray.push(textureCoord[3]);
}


function colorCube()
{   
    //compute normals to each face 
    computeNormalsQuad(0 , 1 , 5, 4);
    computeNormalsQuad(11, 0 , 4, 7);
    computeNormalsQuad(3 , 11, 7, 8);
    computeNormalsQuad(2 , 3 , 8, 6);
    computeNormalsQuad(10, 2 , 6, 9);
    computeNormalsQuad(1 , 10, 9, 5);
    computeNormalsQuad(4 , 5 , 9, 7);
    computeNormalsQuad(6 , 8 , 7, 9);

    computeNormalsQuad(14, 15, 1,  0);
    computeNormalsQuad(16, 14, 0, 11);
    computeNormalsQuad(13, 16, 11, 3);
    computeNormalsQuad(12, 13, 3,  2);
    computeNormalsQuad(17, 12, 2, 10);
    computeNormalsQuad(15, 17, 10, 1);

    computeNormalsQuad(18+ 4, 18+ 5, 18+ 1 , 18+ 0 );
    computeNormalsQuad(18+ 7, 18+ 4, 18+ 0 , 18+ 11);
    computeNormalsQuad(18+ 8, 18+ 7, 18+ 11, 18+ 3 );
    computeNormalsQuad(18+ 6, 18+ 8, 18+ 3 , 18+ 2 ); 
    computeNormalsQuad(18+ 9, 18+ 6, 18+ 2 , 18+ 10);
    computeNormalsQuad(18+ 5, 18+ 9, 18+ 10, 18+ 1 );
    computeNormalsQuad(18+ 7, 18+ 9, 18+ 5 , 18+ 4 );
    computeNormalsQuad(18+ 9, 18+ 7, 18+ 8 , 18+ 6 );

    computeNormalsQuad(18+ 0 , 18+ 1,  15, 14);
    computeNormalsQuad(18+11 , 18+ 0,  14, 16);
    computeNormalsQuad(18+ 3 , 18+ 11, 16, 13);
    computeNormalsQuad(18+ 2 , 18+ 3,  13, 12);
    computeNormalsQuad(18+10 , 18+ 2,  12, 17);
    computeNormalsQuad(18+ 1 , 18+ 10, 17, 15);

    if(testBarycenter){
    // add 2 more vertices to have a non symmetric geometry
        computeNormalsQuad(0,1,31,30);
        computeNormalsQuad(2,3,30,31);
    }


    //1st face
    quad(0 , 1 , 5, 4);
    quad(11, 0 , 4, 7);
    quad(3 , 11, 7, 8);
    quad(2 , 3 , 8, 6);
    quad(10, 2 , 6, 9);
    quad(1 , 10, 9, 5);
    quad(4 , 5 , 9, 7);
    quad(6 , 8 , 7, 9);

    ////1st part body
    quad(14, 15, 1,  0);
    quad(16, 14, 0, 11);
    quad(13, 16, 11, 3);
    quad(12, 13, 3,  2);
    quad(17, 12, 2, 10);
    quad(15, 17, 10, 1);


    ////2nd face
    quad(18+ 4, 18+ 5, 18+ 1 , 18+ 0 );
    quad(18+ 7, 18+ 4, 18+ 0 , 18+ 11);
    quad(18+ 8, 18+ 7, 18+ 11, 18+ 3 );
    quad(18+ 6, 18+ 8, 18+ 3 , 18+ 2 ); 
    quad(18+ 9, 18+ 6, 18+ 2 , 18+ 10);
    quad(18+ 5, 18+ 9, 18+ 10, 18+ 1 );
    quad(18+ 7, 18+ 9, 18+ 5 , 18+ 4 );
    quad(18+ 9, 18+ 7, 18+ 8 , 18+ 6 );


    ////2nd part body

    quad(18+ 0 , 18+ 1,  15, 14);
    quad(18+11 , 18+ 0,  14, 16);
    quad(18+ 3 , 18+ 11, 16, 13);
    quad(18+ 2 , 18+ 3,  13, 12);
    quad(18+10 , 18+ 2,  12, 17);
    quad(18+ 1 , 18+ 10, 17, 15);


    // faces to add for testing the rotations around the barycenter
    if(testBarycenter){
    // add 2 more faces to have a non symmetric geometry
        quad(0,1,31,30);
        quad(2,3,30,31);
    }


    if(barycenter_approximated) barycenter = computeBarycenter();
    else  barycenter = computeBarycenterCentroids();
    console.log("barycenter: " + String(barycenter));
}

//4th
function createCylinder(){
    //define colors cylinder
    var color_side_top_bottom = [0.2,0.2,0.2,1.0];   //dark gray cylinder 
    // create the cylinder
    var myCylinder = cylinder(72, 3, true, color_side_top_bottom);
    myCylinder.scale(0.1, 1.5, 0.1);
    //myCylinder.scale(2.2,2.2,2.2);
    myCylinder.rotate(90.0, [ 0, 0, 1]);
    myCylinder.translate(0.0, 1.5, 0.0);

    //takes its data and store into arrays for shaders 
    points_cylinder = myCylinder.TriangleVertices;
    normals_cylinder = myCylinder.TriangleNormals;
    colors_cylinder = myCylinder.TriangleVertexColors;
    textures_cylinder = myCylinder.TextureCoordinates;

    n_vertices_cylinder = myCylinder.TriangleVertices.length;

    positionsArray = positionsArray.concat(points_cylinder);
    normalsArray =  normalsArray.concat(normals_cylinder);
    colorsArray = colorsArray.concat(colors_cylinder);
    textureCoordsArray = textureCoordsArray.concat(textures_cylinder);
    
}

function init() {
    canvas = document.getElementById("gl-canvas");

    gl = canvas.getContext('webgl2');
    if (!gl) alert( "WebGL 2.0 isn't available");


    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    gl.enable(gl.DEPTH_TEST);

    //3rd 
    aspect =  canvas.width/canvas.height;
    near = +near;
    far = +far;
    phi = +phi* Math.PI/180.0;
    _theta = +_theta* Math.PI/180.0;

    //
    //  Load shaders and initialize attribute buffers
    //

    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // create shapes
    colorCube();
    createCylinder();

    //load normals, vertices, colors, textures

    var nBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(normalsArray), gl.STATIC_DRAW);

    var normalLoc = gl.getAttribLocation(program, "aNormal");
    gl.vertexAttribPointer(normalLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(normalLoc);

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(positionsArray), gl.STATIC_DRAW);

    var positionLoc = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(positionLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);

    // add the colours buffer
    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colorsArray), gl.STATIC_DRAW);

    // take the colour loc
    var colorLoc =gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorLoc);


    var textureBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(textureCoordsArray), gl.STATIC_DRAW);

    var textureCoordLocation = gl.getAttribLocation(program, "aTexCoord");
    gl.vertexAttribPointer(textureCoordLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(textureCoordLocation);

    gl.uniform1i( gl.getUniformLocation(program, "uTextureMap"), 0);

    thetaLoc = gl.getUniformLocation(program, "theta");

    viewerPos = vec3(0.0, 0.0, -20.0);

    projectionMatrix = ortho(-1, 1, -1, 1, -100, 100);

    ambientProduct = mult( lightAmbient, materialAmbient);
    diffuseProduct = mult( lightDiffuse, materialDiffuse);
    specularProduct = mult(lightSpecular, materialSpecular);

    document.getElementById("ButtonX").onclick = function(){axis = xAxis;};
    document.getElementById("ButtonY").onclick = function(){axis = yAxis;};
    document.getElementById("ButtonZ").onclick = function(){axis = zAxis;};
    document.getElementById("ButtonT").onclick = function(){flag = !flag;};
    document.getElementById("ButtonTexture").onclick = function(){
      textureEnabled = 1.0 - textureEnabled; 
      if(textureEnabled ==1.0){
        if(neonLightEnabled==1.0) { neonLightEnabled = 0.0; alert("Neon light turned off");}
        //configureTexture(image2)  //chess texture creation 
        configureTexture2(normals);
      }
    };

    document.getElementById("NeonLight").onclick = function(){
      neonLightEnabled = 1.0 - neonLightEnabled; 
      if(neonLightEnabled ==1.0){
            // 4th point
             if(textureEnabled ==1.0){ textureEnabled = 0.0; alert("Bump texture turned off");}
            var  ambientProduct_1 = mult( lightAmbient_1,  materialAmbient);
            var  diffuseProduct_1 = mult( lightDiffuse_1,  materialDiffuse);
            var specularProduct_1 = mult(lightSpecular_1, materialSpecular);
        
            var  ambientProduct_2 = mult( lightAmbient_2,  materialAmbient);
            var  diffuseProduct_2 = mult( lightDiffuse_2,  materialDiffuse);
            var specularProduct_2 = mult(lightSpecular_2, materialSpecular);
        
            var  ambientProduct_3 = mult( lightAmbient_3,  materialAmbient);
            var  diffuseProduct_3 = mult( lightDiffuse_3,  materialDiffuse);
            var specularProduct_3 = mult(lightSpecular_3, materialSpecular);

            gl.uniform4fv(gl.getUniformLocation(program, "uAmbientProduct_1"),
               ambientProduct_1);
            gl.uniform4fv(gl.getUniformLocation(program, "uDiffuseProduct_1"),
               diffuseProduct_1);
            gl.uniform4fv(gl.getUniformLocation(program, "uSpecularProduct_1"),
               specularProduct_1);
            gl.uniform4fv(gl.getUniformLocation(program, "uAmbientProduct_2"),
               ambientProduct_2);
            gl.uniform4fv(gl.getUniformLocation(program, "uDiffuseProduct_2"),
               diffuseProduct_2);
            gl.uniform4fv(gl.getUniformLocation(program, "uSpecularProduct_2"),
               specularProduct_2);
            gl.uniform4fv(gl.getUniformLocation(program, "uAmbientProduct_3"),
               ambientProduct_3);
            gl.uniform4fv(gl.getUniformLocation(program, "uDiffuseProduct_3"),
               diffuseProduct_3);
            gl.uniform4fv(gl.getUniformLocation(program, "uSpecularProduct_3"),
               specularProduct_3);
        
            gl.uniform4fv(gl.getUniformLocation(program, "uLightPosition_1"),
               lightPosition_1);
            gl.uniform4fv(gl.getUniformLocation(program, "uLightPosition_2"),
               lightPosition_2);
            gl.uniform4fv(gl.getUniformLocation(program, "uLightPosition_3"),
               lightPosition_3);
          // turn on 
      }
    };
    document.getElementById("Per_FragOn").onclick = function(){
      enable_per_frag = 1.0-enable_per_frag;
    };


    gl.uniform4fv(gl.getUniformLocation(program, "uAmbientProduct"),
       ambientProduct);
    gl.uniform4fv(gl.getUniformLocation(program, "uDiffuseProduct"),
       diffuseProduct );
    gl.uniform4fv(gl.getUniformLocation(program, "uSpecularProduct"),
       specularProduct );
    gl.uniform4fv(gl.getUniformLocation(program, "uLightPosition"),
       lightPosition );

    diffuseProductLoc = gl.getUniformLocation(program, "vDiffuseProduct");



    gl.uniform1f(gl.getUniformLocation(program,
       "uShininess"), materialShininess);


    //3rd point sliders definiton 
    document.getElementById("zNearSlider").oninput = function(event) {
      near = +event.target.value;
      console.log("Near ->" + near);
    };

    document.getElementById("zFarSlider").oninput = function(event) {
       far = +event.target.value;
       console.log("Far -> " + far);
    };

    document.getElementById("phiSlider").oninput = function(event) {
       phi = event.target.value* Math.PI/180.0; //radians
       console.log("Phi -> " + event.target.value); //gradians
    };

    document.getElementById("thetaSlider").oninput = function(event) {
       _theta = event.target.value* Math.PI/180.0;  //radians
       console.log("Theta -> " + event.target.value);  //gradians
    };

    document.getElementById("fovSlider").oninput = function(event) {
       fovy = event.target.value;
       console.log("FOVY -> " + fovy);
    };

    document.getElementById("aspectSlider").oninput = function(event) {
       aspect = event.target.value;
       console.log("Aspect -> " + aspect);
    };

    document.getElementById("radiusSlider").oninput = function(event) {
       radius = event.target.value;
       console.log("Radius -> " + radius);
    };

    render();
}



function render(){

     gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
 
     if(flag) theta[axis] += 2.0;

    // diffuse term for the correct rough representation 
    gl.uniform4fv(diffuseProductLoc, diffuseProduct);
 
    // Perspective and view settings for the 3rd exercise

    eye= vec3(radius*Math.sin(_theta)*Math.cos(phi),
    radius*Math.sin(_theta)*Math.sin(phi), radius*Math.cos(_theta));

    modelViewMatrixCamera = lookAt(eye, at, up);

    projectionMatrix = perspective(fovy, aspect, near, far);

    gl.uniformMatrix4fv(gl.getUniformLocation(program, "uModelViewMatrix_camera")
        , false, flatten(modelViewMatrixCamera));
    gl.uniformMatrix4fv(gl.getUniformLocation(program, "uProjectionMatrix")
        , false, flatten(projectionMatrix));


    //draw the polyhedron
    modelViewMatrix = mat4();
    /* 2nd point ->  adjust the modelViewMatrix (in this case: rotation,
    translation) according to the barycenter.
    in this case is not modified given the symmetry of the geometric */
    modelViewMatrix = mult(modelViewMatrix, translate(barycenter[0], barycenter[1], barycenter[2]));
    modelViewMatrix = mult(modelViewMatrix, rotate(theta[xAxis], vec3(1, 0, 0)));
    modelViewMatrix = mult(modelViewMatrix, rotate(theta[yAxis], vec3(0, 1, 0)));
    modelViewMatrix = mult(modelViewMatrix, rotate(theta[zAxis], vec3(0, 0, 1)));
    modelViewMatrix = mult(modelViewMatrix, translate(-barycenter[0], -barycenter[1], -barycenter[2]));

    gl.uniformMatrix4fv(gl.getUniformLocation(program,
            "uModelViewMatrix"), false, flatten(modelViewMatrix));

    // draw the polyhedron
    gl.drawArrays(gl.TRIANGLES, 0, numPositions);


     // draw the cylinder for the 4th point
    if (neonLightEnabled == 1.0) {

        // to fix its position
        modelViewMatrix = mat4();    

        gl.uniformMatrix4fv(gl.getUniformLocation(program,
            "uModelViewMatrix"), false, flatten(modelViewMatrix));

        gl.uniform4fv(gl.getUniformLocation(program, "emission_ds"),
               emission);
        gl.uniform4fv(gl.getUniformLocation(program, "emission_a"),
               emission_2);

        gl.drawArrays(gl.TRIANGLES, numPositions, n_vertices_cylinder);

        // active the trasparency 
        //gl.enable(gl.BLEND);
        //gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    }
    
    gl.uniform1f( gl.getUniformLocation(program,"textureOn"), textureEnabled );


    gl.uniform1f( gl.getUniformLocation(program,"per_FragOn"), enable_per_frag );

    gl.uniform1f( gl.getUniformLocation(program,"neonLightOn"), neonLightEnabled );

    
    requestAnimationFrame(render);
}

}
shadedCube();
