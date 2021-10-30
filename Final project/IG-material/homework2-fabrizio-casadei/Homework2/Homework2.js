"use strict";


/*
*************************************************************
****************** Compute texture data *********************
*************************************************************
*/

// define the texture size

var texSize = 256;
var texSize_2 = 512;
var normals;
var color_texture;
var color_texture_grass;
var bump_texture_grass; 
var color_texture_sheep_face;
var color_texture_wood;
var texture;
var texture_2;
var texture_3;
var texture_4;
var texture_5;
var texture_6

function create_images(){

//***************************************** bump texture wool*******************************************
var data = new Array()
    for (var i = 0; i<= texSize; i++)  data[i] = new Array();
    for (var i = 0; i<= texSize; i++) for (var j=0; j<=texSize; j++)
        data[i][j] = lana_rawData[i*256+j];


// Bump Map Normals
var normalst = new Array()
    for (var i=0; i<texSize; i++)  normalst[i] = new Array();
    for (var i=0; i<texSize; i++) for ( var j = 0; j < texSize; j++)
        normalst[i][j] = new Array();
    for (var i=0; i<texSize; i++) for ( var j = 0; j < texSize; j++) {
        normalst[i][j][0] = (data[i][j]-data[i+1][j]);
        normalst[i][j][1] = (data[i][j]-data[i][j+1]);
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

normals = new Uint8Array(3*texSize*texSize);
    for (var i = 0; i < texSize; i++)
        for (var j = 0; j < texSize; j++)
           for(var k =0; k<3; k++)
                normals[3*texSize*i+3*j+k] = 255*normalst[i][j][k];

//***************************************** wool rgb texture *******************************************
var data_2 = new Array()
    for (var i = 0; i<= texSize; i++)  data_2[i] = new Array();
    for (var i = 0; i<= texSize; i++) for (var j=0; j<=texSize; j++)
        data_2[i][j] = lana_rawData_rgb[i*256+j];

color_texture = new Uint8Array(3*texSize*texSize);
    for (var i = 0; i < texSize; i++)
        for (var j = 0; j < texSize; j++)
           for(var k =0; k<3; k++)
                color_texture[3*texSize*i+3*j+k] = data_2[i][j][k];

//**************************************** grass color texture *****************************************

var data_3 = new Array()
    for (var i = 0; i<= texSize_2; i++)  data_3[i] = new Array();
    for (var i = 0; i<= texSize_2; i++) for (var j=0; j<=texSize_2; j++)
        data_3[i][j] = grass_data_rawData[i*texSize_2+j];


color_texture_grass = new Uint8Array(3*texSize_2*texSize_2);
    for (var i = 0; i < texSize_2; i++)
        for (var j = 0; j < texSize_2; j++)
           for(var k =0; k<3; k++)
                color_texture_grass[3*texSize_2*i+3*j+k] = data_3[i][j][k];

//**************************************** sheep face texture ******************************************

var data_4 = new Array()
    for (var i = 0; i<= texSize; i++)  data_4[i] = new Array();
    for (var i = 0; i<= texSize; i++) for (var j=0; j<=texSize; j++)
        data_4[i][j] = sheep_face_rawData[i*256+j];


color_texture_sheep_face = new Uint8Array(3*texSize*texSize);
    for (var i = 0; i < texSize; i++)
        for (var j = 0; j < texSize; j++)
           for(var k =0; k<3; k++)
                color_texture_sheep_face[3*texSize*i+3*j+k] = data_4[i][j][k];


//****************************************** wood texture **********************************************

var data_5 = new Array()
    for (var i = 0; i<= texSize; i++)  data_5[i] = new Array();
    for (var i = 0; i<= texSize; i++) for (var j=0; j<=texSize; j++)
        data_5[i][j] = wood_rawData[i*256+j];


color_texture_wood = new Uint8Array(3*texSize*texSize);
    for (var i = 0; i < texSize; i++)
        for (var j = 0; j < texSize; j++)
           for(var k =0; k<3; k++)
                color_texture_wood[3*texSize*i+3*j+k] = data_5[i][j][k];

}


function configureTexture( image ) {
    texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, texSize, texSize, 0, gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
                      gl.NEAREST_MIPMAP_LINEAR);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    gl.uniform1i(gl.getUniformLocation(program, "uTexMap"), 0);
}

function configureTexture_2( image ) {
    texture_2 = gl.createTexture();
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, texture_2);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, texSize, texSize, 0, gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
                      gl.NEAREST_MIPMAP_LINEAR);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    gl.uniform1i(gl.getUniformLocation(program, "uTexMap_1"), 1);

}

function configureTexture_3( image ) {
    texture_3 = gl.createTexture();
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, texture_3);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, texSize, texSize, 0, gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
                      gl.NEAREST_MIPMAP_LINEAR);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    gl.uniform1i(gl.getUniformLocation(program, "uTexMap_2"), 2);

}

function configureTexture_4( image ) {
    texture_4 = gl.createTexture();
    gl.activeTexture(gl.TEXTURE3);
    gl.bindTexture(gl.TEXTURE_2D, texture_4);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, texSize, texSize, 0, gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
                      gl.NEAREST_MIPMAP_LINEAR);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    gl.uniform1i(gl.getUniformLocation(program, "uTexMap_3"), 3);

}

function configureTexture_5( image ) {
    texture_5 = gl.createTexture();
    gl.activeTexture(gl.TEXTURE4);
    gl.bindTexture(gl.TEXTURE_2D, texture_5);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, texSize, texSize, 0, gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
                      gl.NEAREST_MIPMAP_LINEAR);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    gl.uniform1i(gl.getUniformLocation(program, "uTexMap_4"), 4);

}

function configure_textures(){
    configureTexture(normals);
    configureTexture_2(color_texture);
    configureTexture_3(color_texture_grass);
    configureTexture_4(color_texture_sheep_face);
    configureTexture_5(color_texture_wood);
}

var canvas;
var gl;
var program;

var projectionMatrix;
var modelViewMatrix;

var instanceMatrix;

var modelViewMatrixLoc;

var vertices = [

    vec4( -0.5, -0.5,  0.5, 1.0 ),
    vec4( -0.5,  0.5,  0.5, 1.0 ),
    vec4( 0.5,  0.5,  0.5, 1.0 ),
    vec4( 0.5, -0.5,  0.5, 1.0 ),
    vec4( -0.5, -0.5, -0.5, 1.0 ),
    vec4( -0.5,  0.5, -0.5, 1.0 ),
    vec4( 0.5,  0.5, -0.5, 1.0 ),
    vec4( 0.5, -0.5, -0.5, 1.0 )
];

var texCoord = [
    vec2(0, 0),
    vec2(1, 0),
    vec2(1, 1),
    vec2(0, 1)
];

var texCoordsArray = [];

var torsoId = 0;
var headId  = 1;
var head1Id = 1;
var head2Id = 10;
var leftUpperArmId = 2;
var leftLowerArmId = 3;
var rightUpperArmId = 4;
var rightLowerArmId = 5;
var leftUpperLegId = 6;
var leftLowerLegId = 7;
var rightUpperLegId = 8;
var rightLowerLegId = 9;
// new ids
var tailId = 11;
var grassId = 12;
var fenceId = 13;

var scale_factor  = 3.5;

var torsoHeight = 5.0/scale_factor;
var torsoWidth = 10/scale_factor;
var torsodepth = 7.5/scale_factor
var upperArmHeight = 1.5/scale_factor;
var upperArmWidth  = 2.0/scale_factor;
var lowerArmHeight = 1.0/scale_factor;
var lowerArmWidth  = 1.0/scale_factor;
var upperLegHeight = 1.5/scale_factor;
var upperLegWidth  = 2.0/scale_factor;
var lowerLegHeight = 1.0/scale_factor;
var lowerLegWidth  = 1.0/scale_factor;

var headHeight = 3.5/scale_factor;
var headWidth =  3.0/scale_factor;

//exercise 1 
var tailHeight =3.5/scale_factor;
var tailWidth = 1.0/scale_factor;
//exercise 2
var grassDepth = 82.0/scale_factor;
var grassWidth = 180.0/scale_factor;

var numNodes = 14;
var numAngles = 12;
var angle = 0;

var theta = [0, 0, 180, 0, 180, 0, 180, 0, 180, 0, 0, 45];

//boolean flags for the rendering
var isGrass = 0.0;
var isFace = 0.0;
var isBody = 0.0; 
var isFence = 0.0;

//exercise 5
var animation_enabled = false;
var timer;
var torsoPos = [-1,0,0]
var sheepJumpInclination = 0.0;
var sheepWalkAngle = 0.0;
var motion_walk = 0;
var ended = false; 
var rotating = false;

//exercise 6

var horizonatal_translation_camera = 7.0;
const at = vec3(horizonatal_translation_camera, 0.0, 0.0);
const up = vec3(0.0, 1.0, 0.0);

var slider1value = 38.0;
var slider2value = 142.0;
var radius = 20;
var FOVy = 70;
var eye;
var x;
var y;
var z;

var numVertices = 24;

var stack = [];

var figure = [];

for( var i=0; i<numNodes; i++) figure[i] = createNode(null, null, null, null);

var vBuffer;
var nBuffer
var modelViewLoc;

var normalsArray = [];
var pointsArray = [];
var cube_num = 0;
var normals_cube = [];

// light properties
var lightPosition = vec4(1.0, 4.0, 4.0, 1.0); 
var lightDiffuse = vec4(1.0, 1.0, 1.0, 1.0);


var materialDiffuse = vec4(0.9, 0.9, 0.9, 1.0);
var diffuseProduct;
var tangent = vec3(1.0, 0.0, 0.0); 


function quadNormal(a,b,c){
    var t1 = subtract(b, a);
    var t2 = subtract(c, b);
    var normal = cross(t1, t2);
    normal = vec3(normal);
    return normal;
}

//-------------------------------------------

function scale4(a, b, c) {
   var result = mat4();
   result[0] = a;
   result[5] = b;
   result[10] = c;
   return result;
}

//--------------------------------------------


function createNode(transform, render, sibling, child){
    var node = {
    transform: transform,
    render: render,
    sibling: sibling,
    child: child,
    }
    return node;
}


function initNodes(Id) {

    var m = mat4();

    switch(Id) {

    case torsoId:

    m = translate(torsoPos[0],torsoPos[1],torsoPos[2]);
    m =  mult(m, rotate(theta[torsoId], vec3(0, 1, 0)));
    m =  mult(m, rotate(sheepJumpInclination, vec3(0, 0, 1)));
    sheepWalkAngle
    m =  mult(m, rotate(sheepWalkAngle, vec3(0, 1, 0)));

    figure[torsoId] = createNode( m, torso, null, headId );
    break;

    case headId:
    case head1Id:
    case head2Id:


    m = translate(torsoHeight + 1.5/scale_factor, torsoHeight-0.5*headHeight, 0);
    m = mult(m, rotate(theta[head1Id], vec3(1, 0, 0)))
    m = mult(m, rotate(theta[head2Id], vec3(0, 1, 0)));
    m = mult(m, translate(0.0, -0.5*headHeight, 0.0));
    figure[headId] = createNode( m, head, leftUpperArmId, null);
    break;


    case leftUpperArmId:
    m = translate((torsoWidth/2-upperArmWidth/2), - 0, (+(torsodepth/2) - (upperArmWidth/2)));
    m = mult(m, rotate(theta[leftUpperArmId], vec3(0, 0, 1)));

    m = mult(m, rotate(180, vec3(0, 1, 0)));
    m = mult(m, rotate(180, vec3(1, 0, 0)));
    m = mult(m, translate(0, - upperArmHeight , 0));

    figure[leftUpperArmId] = createNode( m, leftUpperArm, rightUpperArmId, leftLowerArmId );
    break;

    case rightUpperArmId:
    m = translate((torsoWidth/2-upperArmWidth/2), 0, (-(torsodepth/2) + (upperArmWidth/2)));
    m = mult(m, rotate(theta[rightUpperArmId], vec3(0, 0, 1)));

    m = mult(m, rotate(180, vec3(0, 1, 0)));
    m = mult(m, rotate(180, vec3(1, 0, 0)));

    m = mult(m, translate(0, - upperArmHeight , 0));


    figure[rightUpperArmId] = createNode( m, rightUpperArm, leftUpperLegId, rightLowerArmId );
    break;

    case leftUpperLegId:
    m = translate(-(torsoWidth/2-upperLegWidth/2), 0, (+(torsodepth/2) - (upperLegWidth/2)));
    m = mult(m , rotate(theta[leftUpperLegId], vec3(0, 0, 1)));

    m = mult(m, rotate(180, vec3(0, 1, 0)));
    m = mult(m, rotate(180, vec3(1, 0, 0)));

    m = mult(m, translate(0, - upperLegHeight , 0));

    figure[leftUpperLegId] = createNode( m, leftUpperLeg, rightUpperLegId, leftLowerLegId );
    break;

    case rightUpperLegId:
    m = translate(-(torsoWidth/2-upperLegWidth/2), 0, (-(torsodepth/2) + (upperLegWidth/2)));
    m = mult(m, rotate(theta[rightUpperLegId], vec3(0, 0, 1)));

    m = mult(m, rotate(180, vec3(0, 1, 0)));
    m = mult(m, rotate(180, vec3(1, 0, 0)));

    m = mult(m, translate(0, - upperLegHeight , 0));

    figure[rightUpperLegId] = createNode( m, rightUpperLeg, tailId, rightLowerLegId );
    break;

    case leftLowerArmId:

    m = translate(0.0, - lowerArmHeight, 0.0); 
    m = mult(m, rotate(theta[leftLowerArmId], vec3(0, 0, 1)));
    figure[leftLowerArmId] = createNode( m, leftLowerArm, null, null );
    break;

    case rightLowerArmId:

    m = translate(0.0, - lowerArmHeight, 0.0);
    m = mult(m, rotate(theta[rightLowerArmId], vec3(0, 0, 1)));
    figure[rightLowerArmId] = createNode( m, rightLowerArm, null, null );
    break;

    case leftLowerLegId:

    m = translate(0.0, - lowerLegHeight, 0.0);
    m = mult(m, rotate(theta[leftLowerLegId],vec3(0, 0, 1)));
    figure[leftLowerLegId] = createNode( m, leftLowerLeg, null, null );
    break;

    case rightLowerLegId:

    m = translate(0.0, - lowerLegHeight, 0.0);
    m = mult(m, rotate(theta[rightLowerLegId], vec3(0, 0, 1)));
    figure[rightLowerLegId] = createNode( m, rightLowerLeg, null, null );
    break;

    case tailId:
    m = translate(-(torsoWidth/2) - tailWidth*2, 0.5*tailHeight, 0);
    m = mult(m , rotate(theta[tailId], vec3(0, 0, 1)));
    figure[tailId] = createNode( m, tail, null, null );

    break;

    case grassId:
    figure[grassId] = createNode( m, grass, null, null );
    break;

    case fenceId:
    figure[fenceId] = createNode(m,fence,null,null);
    break;

    }

}

function create_objects(){
    traverse(torsoId);
    traverse(grassId);
    traverse(fenceId);
}

function traverse(Id) {

   if(Id == null) return;
   stack.push(modelViewMatrix);
   modelViewMatrix = mult(modelViewMatrix, figure[Id].transform);
   figure[Id].render();
   if(figure[Id].child != null) traverse(figure[Id].child);
    modelViewMatrix = stack.pop();
   if(figure[Id].sibling != null) traverse(figure[Id].sibling);
}

function torso() {

    resetFlags();


    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5*torsoHeight, 0.0) );
    instanceMatrix = mult(instanceMatrix, scale( torsoWidth, torsoHeight, torsodepth));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix) );

    isBody = 1.0;
    gl.uniform1f( gl.getUniformLocation(program,"isBody"), isBody );
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);

    resetFlags();
}

function head() {

    resetFlags();

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * headHeight, 0.0 ));
    instanceMatrix = mult(instanceMatrix, scale(headWidth, headHeight, headWidth));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));


    //draw first the face
    isFace = 1.0;
    gl.uniform1f( gl.getUniformLocation(program,"isFace"), isFace );
    gl.uniform1f( gl.getUniformLocation(program,"isBody"), isBody );

    gl.drawArrays(gl.TRIANGLE_FAN, 4, 4); //2nd quad

    resetFlags();
    isBody = 1.0;
    gl.uniform1f( gl.getUniformLocation(program,"isBody"), isBody );
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4); //1st quad
    for(var i =2; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4); //the remaining ones

}

function leftUpperArm() {

    resetFlags();
    isBody = 1.0;
    gl.uniform1f( gl.getUniformLocation(program,"isBody"), isBody );

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * upperArmHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale(upperArmWidth, upperArmHeight, upperArmWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix) );
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function leftLowerArm() {

    resetFlags();

    gl.uniform1f( gl.getUniformLocation(program,"isBody"), isBody );
    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * lowerArmHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale(lowerArmWidth, lowerArmHeight, lowerArmWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix) );
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function rightUpperArm() {

    resetFlags();
    isBody = 1.0;
    gl.uniform1f( gl.getUniformLocation(program,"isBody"), isBody );

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * upperArmHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale(upperArmWidth, upperArmHeight, upperArmWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix) );
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function rightLowerArm() {

    resetFlags();

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * lowerArmHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale(lowerArmWidth, lowerArmHeight, lowerArmWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix) );
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function leftUpperLeg() {

    resetFlags();
    isBody = 1.0;
    gl.uniform1f( gl.getUniformLocation(program,"isBody"), isBody );

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * upperLegHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale(upperLegWidth, upperLegHeight, upperLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix) );
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function leftLowerLeg() {

    resetFlags();

    gl.uniform1f( gl.getUniformLocation(program,"isBody"), isBody );
    instanceMatrix = mult(modelViewMatrix, translate( 0.0, 0.5 * lowerLegHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale(lowerLegWidth, lowerLegHeight, lowerLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix) );
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function rightUpperLeg() {

    resetFlags();
    isBody = 1.0;
    gl.uniform1f( gl.getUniformLocation(program,"isBody"), isBody );
    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * upperLegHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale(upperLegWidth, upperLegHeight, upperLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix) );
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function rightLowerLeg() {

    resetFlags();
    
    gl.uniform1f( gl.getUniformLocation(program,"isBody"), isBody );
    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * lowerLegHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale(lowerLegWidth, lowerLegHeight, lowerLegWidth) )
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function tail() {

    resetFlags();
    isBody = 1.0;
    gl.uniform1f( gl.getUniformLocation(program,"isBody"), isBody );
    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * tailHeight, 0.0) );
    instanceMatrix = mult(instanceMatrix, scale(tailWidth, tailHeight, tailWidth) )
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix) );
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}


function grass(){
    
    isGrass = 1.0;
    gl.uniform1f( gl.getUniformLocation(program,"isGrass"), isGrass );

    instanceMatrix = mult(modelViewMatrix, translate(0, -(upperArmHeight + lowerArmHeight + 0.05), 0));
    instanceMatrix = mult(instanceMatrix, rotate(90, vec3(1, 0, 0)));
    instanceMatrix = mult(instanceMatrix, scale(grassWidth, grassDepth, 0.0 ))

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));


    for(var i =0; i<1; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function fence(){
    
    resetFlags();

    //central fence

    isFence = 1.0;
    gl.uniform1f( gl.getUniformLocation(program,"isFence"), isFence );

    //horizonatal sticks
    instanceMatrix = mult(modelViewMatrix, translate(8.0, 2.7 -(upperArmHeight + lowerArmHeight) + 0.30, 0) );
    instanceMatrix = mult(instanceMatrix, rotate(90,vec3(0, 1, 0)))
    instanceMatrix = mult(instanceMatrix, scale(8.0, 0.5, 0.5))
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix) );

    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);

    instanceMatrix = mult(modelViewMatrix, translate(8.0, 2.7 -(upperArmHeight + lowerArmHeight) - 1.0, 0) );
    instanceMatrix = mult(instanceMatrix, rotate(90,vec3(0, 1, 0)))
    instanceMatrix = mult(instanceMatrix, scale(8.0, 0.5, 0.5))
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix) );

    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);


    instanceMatrix = mult(modelViewMatrix, translate(8.0, 2.7 -(upperArmHeight + lowerArmHeight) - 2.30, 0) );
    instanceMatrix = mult(instanceMatrix, rotate(90,vec3(0, 1, 0)))
    instanceMatrix = mult(instanceMatrix, scale(8.0, 0.5, 0.5))
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix) );

    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);

    //vertical sticks
    instanceMatrix = mult(modelViewMatrix, translate(8.0, 2-(upperArmHeight + lowerArmHeight - 0.05), -4.0) );
    instanceMatrix = mult(instanceMatrix, scale(1.0, 4, 1.0))
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix) );

    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);

    instanceMatrix = mult(modelViewMatrix, translate(8.0, 2-(upperArmHeight + lowerArmHeight - 0.05), 4.0) );
    instanceMatrix = mult(instanceMatrix, scale(1.0, 4, 1.0))
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix) );

    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);


    //left fence

    instanceMatrix = mult(modelViewMatrix, translate(8.0, 2.7 -(upperArmHeight + lowerArmHeight) + 0.30, 7) );
    instanceMatrix = mult(instanceMatrix, rotate(90,vec3(0, 1, 0)))
    instanceMatrix = mult(instanceMatrix, scale(8.0, 0.5, 0.5))
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix) );

    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);

    instanceMatrix = mult(modelViewMatrix, translate(8.0, 2.7 -(upperArmHeight + lowerArmHeight) - 1.0, 7) );
    instanceMatrix = mult(instanceMatrix, rotate(90,vec3(0, 1, 0)))
    instanceMatrix = mult(instanceMatrix, scale(8.0, 0.5, 0.5))
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix) );

    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);


    instanceMatrix = mult(modelViewMatrix, translate(8.0, 2.7 -(upperArmHeight + lowerArmHeight) - 2.30, 7) );
    instanceMatrix = mult(instanceMatrix, rotate(90,vec3(0, 1, 0)))
    instanceMatrix = mult(instanceMatrix, scale(8.0, 0.5, 0.5))
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix) );

    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);


    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);

    instanceMatrix = mult(modelViewMatrix, translate(8.0, 2-(upperArmHeight + lowerArmHeight - 0.05), 11.0) );
    instanceMatrix = mult(instanceMatrix, scale(1.0, 4, 1.0))
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix) );

    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);

    //right fence


    instanceMatrix = mult(modelViewMatrix, translate(8.0, 2.7 -(upperArmHeight + lowerArmHeight) + 0.30, -7) );
    instanceMatrix = mult(instanceMatrix, rotate(90,vec3(0, 1, 0)))
    instanceMatrix = mult(instanceMatrix, scale(8.0, 0.5, 0.5))
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix) );

    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);

    instanceMatrix = mult(modelViewMatrix, translate(8.0, 2.7 -(upperArmHeight + lowerArmHeight) - 1.0, -7) );
    instanceMatrix = mult(instanceMatrix, rotate(90,vec3(0, 1, 0)))
    instanceMatrix = mult(instanceMatrix, scale(8.0, 0.5, 0.5))
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix) );

    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);


    instanceMatrix = mult(modelViewMatrix, translate(8.0, 2.7 -(upperArmHeight + lowerArmHeight) - 2.30, -7) );
    instanceMatrix = mult(instanceMatrix, rotate(90,vec3(0, 1, 0)))
    instanceMatrix = mult(instanceMatrix, scale(8.0, 0.5, 0.5))
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix) );

    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);


    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);

    instanceMatrix = mult(modelViewMatrix, translate(8.0, 2-(upperArmHeight + lowerArmHeight - 0.05), -11.0) );
    instanceMatrix = mult(instanceMatrix, scale(1.0, 4, 1.0))
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix) );

    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);

}


function resetFlags(){
    isGrass = 0.0;
    isFace = 0.0;
    isBody = 0.0; 
    isFence = 0.0;

    gl.uniform1f( gl.getUniformLocation(program,"isGrass"), isGrass );
    gl.uniform1f( gl.getUniformLocation(program,"isFace"), isFace );
    gl.uniform1f( gl.getUniformLocation(program,"isBody"), isBody );
    gl.uniform1f( gl.getUniformLocation(program,"isFence"), isFence );
}

function quad(a, b, c, d) {

    var normal = quadNormal(vertices[a], vertices[b], vertices[c]);

    //load vertices and normals
    pointsArray.push(vertices[a]);
    normalsArray.push(normal);
    pointsArray.push(vertices[b]);
    normalsArray.push(normal);
    pointsArray.push(vertices[c]);
    normalsArray.push(normal);
    pointsArray.push(vertices[d]);
    normalsArray.push(normal);


    //load the texture coordiantes
    texCoordsArray.push(texCoord[1]);
    texCoordsArray.push(texCoord[2]);
    texCoordsArray.push(texCoord[3]);
    texCoordsArray.push(texCoord[0]);
}


function cube()
{
    quad( 1, 0, 3, 2 );
    quad( 2, 3, 7, 6 );
    quad( 3, 0, 4, 7 );
    quad( 6, 5, 1, 2 );
    quad( 4, 5, 6, 7 );
    quad( 5, 4, 0, 1 );
}



function computeEyeParams(){
    x = radius * Math.sin( slider2value * Math.PI / 180 ) * Math.cos( slider1value * Math.PI / 180 );
    y = radius * Math.sin( slider1value * Math.PI / 180 );
    z = radius * Math.cos( slider2value * Math.PI / 180 )* Math.cos( slider1value * Math.PI / 180 );

}

window.onload = function init() {

    canvas = document.getElementById( "gl-canvas" );

    gl = canvas.getContext('webgl2');
    if (!gl) { alert( "WebGL 2.0 isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //
    //  Load shaders and initialize attribute buffers
    //

    program = initShaders( gl, "vertex-shader", "fragment-shader");
    gl.enable(gl.DEPTH_TEST);
    gl.useProgram( program);

    instanceMatrix = mat4();

    projectionMatrix = ortho(-10.0,10.0,-10.0, 10.0,-10.0,10.0);
    modelViewMatrix = mat4();

    diffuseProduct = mult(lightDiffuse, materialDiffuse);

    gl.uniform4fv( gl.getUniformLocation(program, "uDiffuseProduct"), diffuseProduct);
    gl.uniformMatrix4fv(gl.getUniformLocation( program, "modelViewMatrix"), false, flatten(modelViewMatrix)  );
    gl.uniformMatrix4fv( gl.getUniformLocation( program, "projectionMatrix"), false, flatten(projectionMatrix)  );
    gl.uniform3fv( gl.getUniformLocation(program, "uObjTangent"), tangent);

    modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix")

    cube();

    // load vertices 

    vBuffer = gl.createBuffer();

    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData(gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW);

    var positionLoc = gl.getAttribLocation( program, "aPosition" );
    gl.vertexAttribPointer( positionLoc, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( positionLoc );

    // load normals

    nBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(normalsArray), gl.STATIC_DRAW);

    var normalLoc = gl.getAttribLocation(program, "aNormal");
    gl.vertexAttribPointer(normalLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(normalLoc);

    // sliders defintions 

    document.getElementById("x_camera_slider").oninput = function(event) {
        if (event.target.value != slider1value){
        slider1value = event.target.value;
        // console.log("X -> " + event.target.value); 
        }
    };

    document.getElementById("y_camera_slider").oninput = function(event) {
        if (event.target.value != slider1value){
        slider2value = event.target.value;
        // console.log("Y -> " + event.target.value);
        } 
    };

    document.getElementById("FOVy_slider").oninput = function(event) {
        if (event.target.value != FOVy){
        FOVy = event.target.value;
        // console.log("FOVy -> " + event.target.value);
        } 
    };

    document.getElementById("Radius_slider").oninput = function(event) {
        if (event.target.value != radius){
        radius = event.target.value;
        // console.log("radius -> " + event.target.value);
        } 
    };

    document.getElementById("startAnimation").onclick = function(event) {
        console.log("animation started")
        if(animation_enabled == false && ended != true){
            animation_enabled = true;
            timer = setInterval(function() {
                forwardAnimation();
            }, 50); //40
        document.getElementById("startAnimation").innerText = "Stop the animation";
            
        }else{
            console.log("animation paused")
            animation_enabled = false;
            stopAnimation();
            document.getElementById("startAnimation").innerText = "Start the animation";
        }    
    };

    document.getElementById("resetAnimation").onclick = function(event) {
        console.log("reset the animation")
        stopAnimation();
        animation_enabled = false;
        ended = false; 
        
        torsoPos = [-1, 0, 0];
        theta = [0, 0, 180, 0, 180, 0, 180, 0, 180, 0, 0, 45];
        resetArmAndLeg();
        motion_walk = 0;
        document.getElementById("startAnimation").innerText = "Start the animation";
        sheepJumpInclination = 0;
        sheepWalkAngle = 0;
        init();

        // second solution: reload the page
        // window.location.reload();
    };

    gl.uniform4fv(gl.getUniformLocation(program, "uLightPosition"),
    lightPosition );

    var tBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(texCoordsArray), gl.STATIC_DRAW);
 
    var texCoordLoc = gl.getAttribLocation( program, "aTexCoord");
    gl.vertexAttribPointer( texCoordLoc, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(texCoordLoc);

    create_images();
    configure_textures();

    for(i=0; i<numNodes; i++) initNodes(i);

    render();
}

/********************************* animation functions [start] *********************************/

function forwardAnimation() {

    if(torsoPos[0] < 3.75){
        console.log("walking on the grass");
        walk();

    }else if(torsoPos[0] < 5.8){
        motion_walk = 0;
        console.log("jumping, increasing height");
        jump_ascent();

    }else if(torsoPos[0] < 9.7){
        console.log("jumping, going down");
        jump_lightDescent();

    }else if(torsoPos[0] < 10.7){
        console.log("landing on the grass");
        jump_descent();
    }else if(torsoPos[0] < 11.5){
        console.log("landing on the grass, second part");
        jump_descent2();

    }else if(torsoPos[0] < 17){
        console.log("walking again...");
        walk();

    }
    else{
        resetArmAndLeg();
        stopAnimation();
        
        // rotate the sheep
        timer = setInterval(function() {
            rotating = true;
            rotate_180Animation()
        }, 40);
    }
    rotating = false; 
}


function stopAnimation(){
    clearInterval(timer);
}


function moveSheepGround(id ,move_id){

    // move fist the torse ahead
    if (!rotating) {
        torsoPos[0] += 0.05;
    }
    initNodes(torsoId);
    // move amrs or legs 
    if (move_id == 0.0) theta[id] -= 45
    else if (move_id == 1.0) theta[id] += 45
    else theta[id] = 180 ;
    initNodes(id);
}

function moveArmAndLegForJump(){
    // first reset arms and legs theta angle
    resetArmAndLeg();
    // move ahead the sheep 
    torsoPos[0] += 0.05;
    initNodes(torsoId); 

    // compute the new theta angles 
    theta[leftUpperArmId]-= 75;
    theta[rightUpperArmId]-= 75;
    theta[leftUpperLegId]+= 75;
    theta[rightUpperLegId]+= 75;

    // update the nodes
    initNodes(leftUpperArmId);
    initNodes(rightUpperArmId);
    initNodes(leftUpperLegId);
    initNodes(rightUpperLegId);
}

function rotate_180Animation(){
    console.log("the sheep is rotating...")

    if (sheepWalkAngle < 180){
        sheepWalkAngle += 5;
        initNodes(torsoId);
        if (sheepWalkAngle==360) sheepWalkAngle =0;
    }
    else{
        stopAnimation();
        ended = true;
    }
}

function walk(){
    if(motion_walk == 0){
        moveSheepGround(leftUpperArmId,1);
        moveSheepGround(rightUpperArmId,0);
        moveSheepGround(leftUpperLegId,0);
        moveSheepGround(rightUpperLegId,1);
        motion_walk++;
    }else if(motion_walk == 1){
        moveSheepGround(leftUpperArmId,0);
        moveSheepGround(rightUpperArmId,1);
        moveSheepGround(leftUpperLegId,1);
        moveSheepGround(rightUpperLegId,0);
        motion_walk++;
    // invert the motion of arms and legs
    }else if(motion_walk == 2){
        moveSheepGround(leftUpperArmId,0);
        moveSheepGround(rightUpperArmId,1);
        moveSheepGround(leftUpperLegId,1);
        moveSheepGround(rightUpperLegId,0);
        motion_walk++;
    }else if(motion_walk == 3){
        moveSheepGround(leftUpperArmId,1);
        moveSheepGround(rightUpperArmId,0);
        moveSheepGround(leftUpperLegId,0);
        moveSheepGround(rightUpperLegId,1);
        motion_walk = 0;
    }
}

function jump_ascent(){

    if(sheepJumpInclination > (-7)){
        sheepJumpInclination -= 8;
        torsoPos[0] += 0.2;
        torsoPos[1] += 0.4;
        initNodes(torsoId); 
    }else if(sheepJumpInclination == -8){
        sheepJumpInclination -= 2;
        moveArmAndLegForJump();
    }else if(sheepJumpInclination > (-25)){
        sheepJumpInclination -= 2;
        torsoPos[0] += 0.2;
        torsoPos[1] += 0.35;
        initNodes(torsoId); 
    }
}

function jump_lightDescent(){
    if(sheepJumpInclination < (+5)){
        torsoPos[0] += 0.4;
        sheepJumpInclination += 4;
        initNodes(torsoId); 
    }else{
        if(sheepJumpInclination < (+25)){
            sheepJumpInclination += 8;
            torsoPos[0] += 0.4;
            torsoPos[1] -= 0.35;
            initNodes(torsoId); 
        }
    }
}

function jump_descent(){

    if(torsoPos[1] > 0.3){
        sheepJumpInclination += 1;
        torsoPos[0] += 0.2;
        torsoPos[1] -= 0.4;
        initNodes(torsoId); 
    }
}

function jump_descent2(){

    if(torsoPos[1] > 0.5){
        resetArm();
        sheepJumpInclination -= 10;
        torsoPos[0] += 0.2;
        torsoPos[1] -= 0.4;
        initNodes(torsoId);
    }else{ 
        torsoPos[1] = 0.0;
        resetArmAndLeg();
        sheepJumpInclination = 0;
        torsoPos[0] += 0.2;
        initNodes(torsoId);
    }
}

function resetArm(){
    // reset initial angles 
    moveSheepGround(leftUpperArmId,-1);
    moveSheepGround(rightUpperArmId,-1);
}

function resetLeg(){
    moveSheepGround(leftUpperLegId,-1);
    moveSheepGround(rightUpperLegId,-1);
}

function resetArmAndLeg(){
    resetArm();
    resetLeg();
}

/********************************* animation functions [end] *********************************/

var render = function() {

    gl.clear( gl.COLOR_BUFFER_BIT  | gl.DEPTH_BUFFER_BIT);

    create_objects();

    computeEyeParams()  //update x,y and z values
    eye= vec3(x + horizonatal_translation_camera, y, z);
    modelViewMatrix = lookAt(eye, at, up);

    projectionMatrix = perspective(FOVy, 1, 0.01, 1000);
    gl.uniformMatrix4fv(gl.getUniformLocation(program, "projectionMatrix"), false, flatten(projectionMatrix));

    var nMatrix = normalMatrix(modelViewMatrix, true); 
    gl.uniformMatrix3fv( gl.getUniformLocation(program, "uNormalMatrix"), false, flatten(nMatrix));

    requestAnimationFrame(render);
}
