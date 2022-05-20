---
# vi: ft=js
---
/*
 * sourced with modifications from https://codepen.io/billimarie/pen/mJLeBY
 */

// visible nodes in the network, any type
{% assign nodes = site.data.nodes | where: 'hidden', false |jsonify %}
var nodes = {{nodes}};

var mouseX = 0,
  mouseY = 0,
  windowHalfX = window.innerWidth / 2,
  windowHalfY = window.innerHeight / 2,
  SEPARATION = 50,
  AMOUNTX = 10,
  AMOUNTY = 10,
  camera,
  scene,
  renderer;

window.addEventListener('DOMContentLoaded', (_) => {
  init();
  animate();
});


// converts a world coordinate tuple (i.e. geojson) into [-1..1,-1..1,-1..1] space
// i.e. normalizes GPS into camera's coordinate space
// TODO: this doesnt work right
function worldToScreenVector(x, y, z) {
  var vector = new THREE.Vector3();
  vector.set(x,y,z);
  console.log(vector);
  // map to normalized device coordinate (NDC) space
  vector.project( camera );
  // map to 2D screen space
  vector.x = (   vector.x + 1 ) * (windowHalfX * 1.0);
  vector.y = ( - vector.y + 1 ) * (windowHalfY * 1.0);
  vector.z = 0;
  return vector;
}

function init() {

  var container,
    separation = 100,
    amountX = 50,
    amountY = 50,
    particle;

  container = document.getElementById('mesh-animation-container');

  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({alpha: true}); // gradient; this can be swapped for WebGLRenderer
  renderer.setSize(container.offsetWidth + 100, container.offsetHeight + 100);
  renderer.domElement.classList.add('mesh-animation');
  container.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(
    75,
    container.offsetWidth / container.offsetHeight,
    1,
    10000
  );
  camera.position.z = 100;

  // particles
  var PI2 = Math.PI * 2;
  var material = new THREE.SpriteMaterial({
    color: 0xffffff,
    // TODO: fix how we render points
    // - include some coverage representation
    //program: function (context) {
    //  context.beginPath();
    //  context.arc(0, 0, 0.5, 0, PI2, true);
    //  context.fill();
    //}
  });


  var points = [];
  var particle;
  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    var parsed_location = JSON.parse(node.location);
    particle = new THREE.Sprite(material);
    particle.position = worldToScreenVector(parsed_location.coordinates[0], parsed_location.coordinates[1], 0)
    particle.position.z = (Math.random() * 2 - 1) * 0.1; // random z variation
    console.log(particle.position, parsed_location);
    // random layout
    //particle.position.x = Math.random() * 2 - 1;
    //particle.position.y = Math.random() * 2 - 1;
    //particle.position.z = Math.random() * 2 - 1;
    particle.position.normalize();
    particle.position.multiplyScalar(Math.random() * 10 + 450);
    particle.scale.x = particle.scale.y = 10;
    scene.add(particle);
    points.push(particle.position);
  }

  //var geometry = new THREE.Geometry(); // killed in r125
  var geometry = new THREE.BufferGeometry().setFromPoints(points);

  // lines
  var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({color: 0xffffff, opacity: 0.5}));
  scene.add(line);

  // mousey
  document.addEventListener('mousemove', onDocumentMouseMove, false);
  document.addEventListener('touchstart', onDocumentTouchStart, false);
  document.addEventListener('touchmove', onDocumentTouchMove, false);

  // recompute the canvas size on resize
  //window.addEventListener('resize', onWindowResize, false);

} // end init();

function onWindowResize() {

  let w = container.offsetWidth;
  let h = container.offsetHeight;
  windowHalfX = w / 2;
  windowHalfY = h / 2;

  camera.aspect = w / h;
  camera.updateProjectionMatrix();

  renderer.setSize(w, h);

}

function onDocumentMouseMove(event) {

  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;

}

function onDocumentTouchStart(event) {

  if (event.touches.length > 1) {

    event.preventDefault();

    mouseX = event.touches[0].pageX - windowHalfX;
    mouseY = event.touches[0].pageY - windowHalfY;

  }
}

function onDocumentTouchMove(event) {

  if (event.touches.length == 1) {

    event.preventDefault();

    mouseX = event.touches[0].pageX - windowHalfX;
    mouseY = event.touches[0].pageY - windowHalfY;

  }
}

function animate() {

  requestAnimationFrame(animate);
  render();

}

function render() {

  camera.position.x += (mouseX - camera.position.x) * .05;
  camera.position.y += (- mouseY + 200 - camera.position.y) * .05;
  camera.lookAt(scene.position);

  renderer.render(scene, camera);

}
