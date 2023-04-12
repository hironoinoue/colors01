import './style.css';
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import smokeTexturePng from "./public/03.png";

//canvas
const canvas = document.querySelector("#webgl");
//sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};
//scene
const scene = new THREE.Scene();
//camera
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 1, 1000);
camera.position.z = 1300;
scene.add(camera);
//renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});


renderer.setSize(sizes.width, sizes.height);
renderer.setClearColor(0xc5eaf6, 1);
renderer.setPixelRatio(window.devicePixelRatio);

//light
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
ambientLight.position.set(-1, 0, 1);
scene.add(ambientLight);




/**
 * Cube box 1
 */
const cubeGeometry = new THREE.BoxGeometry( 200, 200, 200 );
const cubeMaterial = new THREE.MeshLambertMaterial({
  color: 0xf3d2ff,
  wireframe: false,
});
const cubeMesh = new THREE.Mesh( cubeGeometry, cubeMaterial);
let sineDriver = 0;

/**
 * CUbe nox 2
 */

const cube2Geometry = new THREE.BoxGeometry( 200, 200, 200 );
const cube2Material = new THREE.MeshLambertMaterial({
  color: 0x5196ac,
  wireframe: false,
});
const cube2Mesh = new THREE.Mesh( cube2Geometry, cube2Material);
let sineDriver2 = 0;
/**
 smoke
 */

const smokeTextureLoader = new THREE.TextureLoader();
const smokeTexture = smokeTextureLoader.load(smokeTexturePng);
const smokeGeometry = new THREE.PlaneGeometry(400,400);

const count = 21;
//const elapsedTime = clock.getElapsedTime();
  const colorArray = new Float32Array(count * 3);
  for (let i = 0; i < count; i ++) {
    colorArray[i] = Math.random() ;
  }
  smokeGeometry.setAttribute(
    "color",
    new THREE.BufferAttribute(colorArray, 3)
  );
  

const lambertMaterial = new THREE.MeshLambertMaterial({
  color: 0xffffff,
  //color: 0x9bedff,
  emissive: 0xbc497a,
  opacity:  1,
  map: smokeTexture,
  transparent: true,
  depthTest: false,
  vertexColors: true,
  combine: THREE.MixOperation,
  reflectivity: 0.682,
  refractionRatio: 1,
  
});
const smokeParticles = [];

for (let i = 0; i < 21; i++) {
  var particles = new THREE.Mesh (smokeGeometry, lambertMaterial);
  //particles .position.set(Math.random() * 200 - 100, Math.random() * 200 - 100, Math.random() * 1000 - 100);
  particles.position.set(Math.random()* 250 - 100, Math.random()* -100 - 90, Math.random() * 900 - 100);
  particles.rotation.z = Math.random() * 360;
  smokeParticles.push(particles);
  scene.add(particles);
}

/**
 * Smoke 2
 */

const lambertMaterial2 = new THREE.MeshLambertMaterial({
  color: 0xffffff,
  //color: 0xffc6ff,
  emissive: 0x14678a,
  transparent: true,
  opacity: 1,
  map: smokeTexture,
  depthTest: false,
  vertexColors: true,
  combine: THREE.MixOperation,
  reflectivity: 0.682,
  refractionRatio: 1,
}); 

const smokeParticles2 = [];

for (let i = 0; i < 20; i ++) {
  var particles2 = new THREE.Mesh(smokeGeometry, lambertMaterial2);
  particles2 .position.set(Math.random() * 200 - 100, Math.random() * 200 - 20, Math.random() * 1000 - 100);
  //particles2.position.set(Math.random()* 250 - 100, Math.random()* -100 - 220, Math.random() * 900 - 100);
  particles2.rotation.z = Math.random() * 360;
  smokeParticles2.push(particles2);
  scene.add(particles2);
}

//animation
const clock = new THREE.Clock();
function evolveSmoke() {
  const delta = clock.getDelta();
  var sp = smokeParticles.length;
    while(sp--) {
        smokeParticles[sp].rotation.z += (delta * 0.2);
    }
}
evolveSmoke();

console.log(smokeGeometry.attributes.color);

const clock2 = new THREE.Clock();
function evolveSmoke2() {
  const delta2 = clock2.getDelta();
  var sp2 = smokeParticles2.length;
    while(sp2--) {
        smokeParticles2[sp2].rotation.z += (delta2 * 0.2);
    }
}
evolveSmoke2();

const tick = () => {

  
  renderer.render(scene, camera);
  evolveSmoke();
  evolveSmoke2();

  const delta = clock.getDelta();
  const delta2 = clock2.getDelta();
  cubeMesh.rotation.x += 0.005 * delta;
  cubeMesh.rotation.y += 0.01 * delta;
  
  sineDriver += .01;

  cube2Mesh.rotation.x += 0.005 * delta;
  cube2Mesh.rotation.y += 0.01 * delta;
  sineDriver2 += .01;

  window.requestAnimationFrame(tick);
};
tick();

//resize
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width/sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(window.devicePixelRatio);
})