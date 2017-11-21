var canvas = document.getElementById('canvas'),
    container = document.getElementById('banner');

var SCREEN_HEIGHT = Math.min(container.clientHeight * 2 / 3, container.clientWidth);
var SCREEN_WIDTH = container.clientWidth;
var SCREEN_ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;

var renderer, camera, scene;

var ANIMATION_FRAME_LENGTH = 30,
    INTERACT_DISTANCE = 2.5;
var objetArray = [],
    animationQueue = [];

var color1 = [0 / 255, 110 / 255, 255 / 255],
    color2 = [0 / 255, 255 / 255, 140 / 255];

var bitmap = [];
var BITMAP_SKIP = 1;

var fov = 90;
var cameraPos = [0, 0, 30];
var cameraLookAt = [0, 0, 0];
var viewHeight = 2 * Math.tan(THREE.Math.degToRad(fov / 2)) * cameraPos[2],
    viewWidth = viewHeight * SCREEN_ASPECT_RATIO;

var mouse = new THREE.Vector3(10000, 10000, -1),
    mouseScaled = new THREE.Vector3(10000, 10000, -1);

function init () {
    // Global Variables
    canvas.addEventListener('mousemove', onDocumentMouseMove, false);

    /* If you are familiar with python and opencv
       you can use this python script to generate custom bitmaps
       --------------------
       https://git.io/vdBAu
       --------------------
    */
    var data = '#000000000000000011111111110000000000000000' +
        '#000000000000011111111111111100000000000000' +
        '#000000000000111111111111111111000000000000' +
        '#000000000001110001111111111111000000000000' +
        '#000000000001100001111111111111100000000000' +
        '#000000000001100001111111111111100000000000' +
        '#000000000001110001111111111111100000000000' +
        '#000000000001111111111111111111100000000000' +
        '#000000000001111111111111111111100000000000' +
        '#000000000000000000000111111111100000000000' +
        '#000000000000000000000111111111100000000000' +
        '#000011111111111111111111111111100111110000' +
        '#000111111111111111111111111111100111111000' +
        '#001111111111111111111111111111100111111100' +
        '#001111111111111111111111111111100111111100' +
        '#011111111111111111111111111111100111111110' +
        '#011111111111111111111111111111101111111110' +
        '#011111111111111111111111111111001111111110' +
        '#011111111111111111111111111111001111111110' +
        '#111111111111111111111111111100011111111111' +
        '#111111111111110000000000000000111111111111' +
        '#111111111111000000000000000011111111111111' +
        '#111111111110001111111111111111111111111111' +
        '#011111111100111111111111111111111111111110' +
        '#011111111100111111111111111111111111111110' +
        '#011111111101111111111111111111111111111110' +
        '#011111111001111111111111111111111111111110' +
        '#001111111001111111111111111111111111111100' +
        '#001111111001111111111111111111111111111100' +
        '#000111111001111111111111111111111111111000' +
        '#000011111001111111111111111111111111110000' +
        '#000000000001111111111000000000000000000000' +
        '#000000000001111111111000000000000000000000' +
        '#000000000001111111111111111111100000000000' +
        '#000000000001111111111111111111100000000000' +
        '#000000000001111111111111100011100000000000' +
        '#000000000001111111111111100001100000000000' +
        '#000000000001111111111111100001100000000000' +
        '#000000000000111111111111100011100000000000' +
        '#000000000000011111111111111111000000000000' +
        '#000000000000001111111111111110000000000000' +
        '#000000000000000001111111110000000000000000';

    for (var i = 0; i < data.length; i++) {
        if (data[i] === '#') {
            bitmap.push([]);
        }
        else {
            bitmap[bitmap.length - 1].push(data[i] - '0');
        }
    }

    // Renderer
    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        canvas: canvas
    });
    renderer.setClearColor(0x212121, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

    // Camera and Controls
    camera = new THREE.PerspectiveCamera(fov, SCREEN_ASPECT_RATIO, 0.1, 1000);
    // camera = new THREE.OrthographicCamera(-viewWidth, viewWidth, viewHeight, -viewHeight, 1, 300);
    camera.position.set(cameraPos[0], cameraPos[1], cameraPos[2]);
    camera.lookAt(new THREE.Vector3(cameraLookAt[0], cameraLookAt[1], cameraLookAt[2]));

    // Scene
    scene = new THREE.Scene();

    // Lights

    // Making Object Array
    var xOffset = -bitmap[0].length / (BITMAP_SKIP * 2);
    var yOffset = bitmap.length / (BITMAP_SKIP * 2);
    for (var i = 0; i < bitmap.length; i += BITMAP_SKIP) {
        for (var j = 0; j < bitmap[i].length; j += BITMAP_SKIP) {
            if (bitmap[i][j] === 1) {
                var planeGeometry = new THREE.PlaneGeometry(1, 1);
                var circleGeometry = new THREE.CircleGeometry(1, 5);
                var frac = i / bitmap.length;
                // Materials
                var planeMaterial = new THREE.MeshBasicMaterial({
                    color: new THREE.Color(
                        color1[0] * frac + color2[0] * (1 - frac),
                        color1[1] * frac + color2[1] * (1 - frac),
                        color1[2] * frac + color2[2] * (1 - frac)
                    ),
                    transparent: true,
                    opacity: THREE.Math.randFloat(0.4, 0.6),
                    side: THREE.DoubleSide
                });

                var circleMaterial = new THREE.MeshBasicMaterial({
                    color: new THREE.Color(1, 1, 1),
                    transparent: true,
                    opacity: THREE.Math.randFloat(0.8, 1),
                    side: THREE.DoubleSide
                });

                // Mesh
                var planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
                planeMesh.position.set(xOffset + j / BITMAP_SKIP, yOffset - i / BITMAP_SKIP, 0);
                var randWidth = THREE.Math.randFloat(0.6, 1.2);
                var randHeight = randWidth;
                planeMesh.scale.set(randWidth, randHeight, 1);
                scene.add(planeMesh);
                objetArray.push([planeMesh, false]);
            }
        }
    }

    // Geometry

    // Materials

    // Mesh

    // Helpers

    // Add Stuff to Scene
}

function animate () {
    requestAnimationFrame(animate);
    render();
}

function render () {
    while (animationQueue.length > 0) {
        var objIndex = animationQueue[0][0];
        var aniFrame = animationQueue[0][1];
        if (aniFrame > ANIMATION_FRAME_LENGTH) {
            objetArray[objIndex][1] = false;
            animationQueue.shift();
        }
        else {
            break;
        }
    }

    for (var i = 0; i < objetArray.length; i++) {
        var obj = objetArray[i][0];
        var isAnimating = objetArray[i][1];
        if (isAnimating === false) {
            var px = obj.position.x;
            var py = obj.position.y;
            var dist = Math.sqrt(Math.pow(px - mouseScaled.x, 2) + Math.pow(py - mouseScaled.y, 2));
            if (dist < INTERACT_DISTANCE) {
                var startPosVector = obj.position.clone();
                var mouseRepelVector = new THREE.Vector3()
                    .subVectors(startPosVector, mouseScaled)
                    .multiplyScalar(THREE.Math.randFloat(INTERACT_DISTANCE + 0.5, INTERACT_DISTANCE + 2) - dist);
                var endPosVector = new THREE.Vector3()
                    .addVectors(startPosVector, mouseRepelVector);
                animationQueue.push([i, 0, startPosVector, endPosVector]);
                objetArray[i][1] = true;
            }
        }
    }

    for (var i = 0; i < animationQueue.length; i++) {
        var obj = objetArray[animationQueue[i][0]][0];
        var aniFrame = animationQueue[i][1];
        var startPosVector = animationQueue[i][2];
        var endPosVector = animationQueue[i][3];
        var curPosVector = new THREE.Vector3();
        var frac = 1 - Math.abs(aniFrame - (ANIMATION_FRAME_LENGTH / 2)) / (ANIMATION_FRAME_LENGTH / 2);
        frac = easeOutQuad(frac);
        curPosVector.lerpVectors(startPosVector, endPosVector, frac);

        obj.position.x = curPosVector.x;
        obj.position.y = curPosVector.y;
        obj.position.z = curPosVector.z;
        animationQueue[i][1] += 1;
    }

    mouse = new THREE.Vector3(10000, 10000, -2);
    mouseScaled = new THREE.Vector3(10000, 10000, -2);

    renderer.render(scene, camera);
}

function onWindowResize () {
    var SCREEN_HEIGHT = Math.min(container.clientHeight * 2 / 3, container.clientWidth);
    var SCREEN_WIDTH = container.clientWidth;
    var SCREEN_ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
    camera.aspect = SCREEN_ASPECT_RATIO;
    camera.updateProjectionMatrix();
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    console.log(SCREEN_WIDTH + 'x' + SCREEN_HEIGHT);
}

function onDocumentMouseMove (event) {
    var rect = canvas.getBoundingClientRect();

    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;

    mouseScaled.x = mouse.x * viewWidth / SCREEN_WIDTH - viewWidth / 2;
    mouseScaled.y = -mouse.y * viewHeight / SCREEN_HEIGHT + viewHeight / 2;
}

function sigmoid (t) {
    return 1 / (1 + Math.pow(Math.E, -t));
}

// no easing, no acceleration
function linear (t) {
    return t;
}
// accelerating from zero velocity
function easeInQuad (t) {
    return t * t;
}
// decelerating to zero velocity
function easeOutQuad (t) {
    return t * (2 - t);
}
// acceleration until halfway, then deceleration
function easeInOutQuad (t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
// accelerating from zero velocity
function easeInCubic (t) {
    return t * t * t;
}
// decelerating to zero velocity
function easeOutCubic (t) {
    return (--t) * t * t + 1;
}
// acceleration until halfway, then deceleration
function easeInOutCubic (t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}
// accelerating from zero velocity
function easeInQuart (t) {
    return t * t * t * t;
}
// decelerating to zero velocity
function easeOutQuart (t) {
    return 1 - (--t) * t * t * t;
}
// acceleration until halfway, then deceleration
function easeInOutQuart (t) {
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
}
// accelerating from zero velocity
function easeInQuint (t) {
    return t * t * t * t * t;
}
// decelerating to zero velocity
function easeOutQuint (t) {
    return 1 + (--t) * t * t * t * t;
}
// acceleration until halfway, then deceleration
function easeInOutQuint (t) {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
}

// Event Handlers
window.addEventListener('resize', onWindowResize);

init();
animate();
