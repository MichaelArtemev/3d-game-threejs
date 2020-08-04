import { animatePlayer } from "../entities/controllers/gameController.js";

const scene = new THREE.Scene();

export const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const pointLight = new THREE.PointLight(0xffffff);
camera.add(pointLight);
pointLight.castShadow = true;
scene.add(camera);
scene.fog = new THREE.FogExp2(0xcccccc, 0.0015);

addLights();

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(new THREE.Color(0xeeeeee, 1.0));
renderer.setClearColor(scene.fog.color);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const objLoader = new THREE.OBJLoader();
objLoader.setPath("/blender-files/");

const mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath("/blender-files/");

new Promise((resolve) => {
  console.log("ЗАГРУЗКА МОДЕЛЕЙ");
  mtlLoader.load("Tunnel.mtl", (materials) => {
    resolve(materials);
  });
}).then((materials) => {
  materials.preload();
  objLoader.setMaterials(materials);
  objLoader.load("Tunnel.obj", (object) => {    
    scene.add(object);
    console.log("ЗАГРУЗКА МОДЕЛЕЙ ЗАВЕРШЕНА");
    let download = document.getElementById("download");
    download.style.display = "none";
    window.scrollTo(0, window.outerHeight);
  });
});

function addLights() {
  var lightOne = new THREE.DirectionalLight(0xffffff);
  lightOne.position.set(1, 1, 1);
  scene.add(lightOne);
  // Add a second light with half the intensity
  var lightTwo = new THREE.DirectionalLight(0xffffff, 0.5);
  lightTwo.position.set(1, -1, -1);
  scene.add(lightTwo);
}

export function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  animatePlayer();
}

