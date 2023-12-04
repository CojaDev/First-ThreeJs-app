import * as THREE from 'three';
import gsap from 'gsap';
import './style.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
const scene = new THREE.Scene();

const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: '#fff',
  roughness: 0.05,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
/*const ambientLight = new THREE.AmbientLight(0xffffff, 0.1); // Adjust intensity as needed
scene.add(ambientLight);*/

//sizes
const sizes = {
  width: window.innerWidth,
  heigth: window.innerHeight,
};

const light = new THREE.PointLight(0xffffff, 200, 100);
light.position.set(0, 10, 10);
light.intensity = 145;
scene.add(light);

const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.heigth,
  0.1,
  1000
); //
camera.position.z = 15;
scene.add(camera);

const canvas = document.querySelector('.screen');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.heigth);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 10;
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.heigth = window.innerHeight;

  camera.aspect = sizes.width / sizes.heigth;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.heigth);
});
const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();

const tl = gsap.timeline({ defaults: { duration: 1 } });
const nt = gsap.timeline({ defaults: { duration: 0.8 } });
tl.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
nt.fromTo('nav', { y: '-100%' }, { y: '0%' });
nt.fromTo('.title', { opacity: 0 }, { opacity: 1 });

let mouseDown = false;
let rgb = [];
window.addEventListener('mousedown', () => (mouseDown = true));
window.addEventListener('mouseup', () => (mouseDown = false));
window.addEventListener('mousemove', (e) => {
  if (mouseDown) {
    rgb = [
      Math.round((e.pageX / sizes.width) * 255),
      Math.round((e.pageY / sizes.heigth) * 255),
      150,
    ];
    let newColor = new THREE.Color(`rgb(${rgb.join(',')})`);
    gsap.to(mesh.material.color, {
      r: newColor.r,
      g: newColor.g,
      b: newColor.b,
    });
  }
});
