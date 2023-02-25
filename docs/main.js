import '/reiko.css';

import * as THREE from './node_modules/three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';




const scene = new THREE.Scene();

const pointLight = new THREE.PointLight(0xffffff);
const pointLightHelper = new THREE.PointLightHelper(pointLight);
const ambientLight = new THREE.AmbientLight(0xffffff);
const gridHelper = new THREE.GridHelper(10000, 1000);
const grid = new THREE.GridHelper(10000, 1000);
const grid2 = new THREE.GridHelper(10000, 1000);
const grid3 = new THREE.GridHelper(10000, 1000);
grid.position.set(1, 0, 0);
grid2.position.set(-1, 0, 0);
grid3.position.set(0, 0, 0);
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('canvas'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);



camera.position.setZ(60);
camera.position.setY(1.2);
pointLight.position.set(20, 20, 20);

const geo = new THREE.PlaneGeometry(1000, 1000, 10, 100);
const mat = new THREE.MeshStandardMaterial({ color: 0x001238});
const iso = new THREE.Mesh(geo, mat);
iso.rotateOnAxis(new THREE.Vector3(-10, 0, 0), Math.PI / 2);
iso.position.set(0, -0.0002, 0);
const geometry = new THREE.TorusGeometry(10, 1, 16, 50);
const material = new THREE.MeshStandardMaterial({ color: 0x550043 });
const torus = new THREE.Mesh(geometry, material);
scene.add( pointLight, torus, ambientLight, pointLightHelper, grid, grid2, grid3, gridHelper);
const controls = new OrbitControls(camera, renderer.domElement);



const hermText = new THREE.TextureLoader().load('reiko.jpg');

const herm = new THREE.Mesh(
  new THREE.BoxGeometry(5, 5 ,5),
  new THREE.MeshStandardMaterial({ map: hermText })
);
scene.add(herm);

herm.position.set(0, 0, -30);
iso.position.set(0, -30, 0);
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xddddff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(1400).fill().forEach(addStar);


const Texture = new THREE.TextureLoader().load('sunset.jpg');
scene.background = Texture;
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  
  star.position.y -= 0.02;
  camera.position.z = t * -0.1;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;  
}
document.body.onscroll = moveCamera
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.25;
  grid2.position.z += 0.25;
  grid3.position.y -= 0.002;
  grid3.position.z += 0.2;
  gridHelper.position.z -= 0.4;
  herm.rotation.y += 0.02;
  camera.position.z -= 0.2;
  if (camera.position.z < -60) {
    camera.position.z += 0.2;
    camera.position.y += 0.2;
    camera.position.x += 0.2;
    herm.rotation.y += 0.05;
    herm.position.y += 0.05;
    torus.position.y += 0.05;
    torus.rotation.y += 0.05;
  }
  if (camera.position.y > 40) {
    camera.position.x -= 0.2;
    camera.position.z += 0.2;
    
  }
  if (camera.position.x < -40) {
    camera.position.x += 0.2;
    camera.position.z += 0.2;
    herm.position.z += 0.13;
    herm.rotation.z += 0.28;
    torus.position.z += 0.05;
  }
  if (camera.position.z > 80) {
    camera.position.x += 0.5;
    herm.position.x += 0.13;
    torus.position.z -= 10;
    torus.rotation.x == 0;
  }
  if (camera.position.x > 80) {
    camera.position.z -= 0.4;
    camera.position.y -= 0.2;
    camera.position.x -= 0.2;
    herm.position.z -= 0.5;
    herm.position.y -= 0.05;
    herm.position.x += 0.11;
    herm.rotation.z += 0.24;
  }
  if (torus.position.z > -10000) {
    torus.position.z = 10;
  }
  controls.update();

  renderer.render(scene, camera);
}

animate();


