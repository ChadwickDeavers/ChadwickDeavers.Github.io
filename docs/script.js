






let scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// yellow torus //
var geoT = new THREE.TorusGeometry(10, 3, 16, 100);
var matT = new THREE.PointsMaterial({
  color: 0xffff00,
  size: 0.1
});
var torus = new THREE.Points(geoT, matT);

// white torus //
var tGeo = new THREE.TorusGeometry(10, 3, 16, 1000);
var tMat = new THREE.PointsMaterial({
  color: 0xaaaaaa,
  size: 0.1
});
var torusP = new THREE.Points(tGeo, tMat);


// red torus //
var geoR = new THREE.TorusGeometry(10, 3, 16, 100);
var matR = new THREE.PointsMaterial({
  color: 0xff0000,
  size: 0.1
});
var torusR = new THREE.Points(geoR, matR);
// green torus //
var geoG = new THREE.TorusGeometry(10, 3, 16, 100);
var matG = new THREE.PointsMaterial({
  color: 0x00ff00,
  size: 0.1
});
var torusG = new THREE.Points(geoG, matG);

// orange torus //
var geoO = new THREE.TorusGeometry(10, 3, 16, 100);
var matO = new THREE.PointsMaterial({
  color: 0xffcc00,
  size: 0.1
});
var torusO = new THREE.Points(geoO, matO);

// blue torus //
var geoB = new THREE.TorusGeometry(10, 3, 16, 100);
var matB = new THREE.PointsMaterial({
  color: 0x0000ff,
  size: 0.1
});
var torusB = new THREE.Points(geoB, matB);

// particles //
var geometry = new THREE.Geometry();
for (var i = 0; i < 100000; i++) {
  var vertex = new THREE.Vector3();
  vertex.x = THREE.Math.randFloatSpread(10000);
  vertex.y = THREE.Math.randFloatSpread(10000);
  vertex.z = THREE.Math.randFloatSpread(10000);
  geometry.vertices.push(vertex);
}
var material = new THREE.PointsMaterial({
  size: 0.001,
  color: 0xdddddd
});
var particles = new THREE.Points(geometry, material);

// adding them all to the scene //
scene.add(particles, torus, torusP, torusR, torusG, torusB, torusO);

// animating all the movement //
camera.position.z = 40;
var render = function() {
  requestAnimationFrame(render);
  particles.rotation.x += 0.001;
  particles.rotation.y -= 0.001;
  particles.rotation.z -= 0.001;
  torus.rotation.x += 0.03;
  torus.rotation.y += 0.03;
  torusO.rotation.x -= 0.03;
  torusO.rotation.y += 0.03;
  torusP.rotation.x += 0.03;
  torusP.rotation.y -= 0.03;
  torusR.rotation.x -= 0.03;
  torusR.rotation.z += 0.03;
  torusG.rotation.y += 0.03;
  torusG.rotation.z -= 0.03;
  torusG.rotation.x += 0.0;
  torusB.rotation.x -= 0.03;
  torusB.rotation.z -= 0.03;
  renderer.render(scene, camera);
};
render();

window.addEventListener('resize', function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
