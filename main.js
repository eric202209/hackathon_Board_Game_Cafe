import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

let container;
let camera, cameraTarget, scene, renderer;
let group, textMesh1, textMesh2, textGeo, materials;
const menuData = [
    { name: 'Latte', price: '$4.75 (H) / $5.25 (C)' },
    { name: 'Cortado', price: '$4.25 (H) / $4.75 (C)' },
    { name: 'Drip Coffee - Small', price: '$3 (H) / $3.50 (C)' },
    { name: 'Drip Coffee - Medium', price: '$3.50 (H)' },
    { name: 'Drip Coffee - Large', price: '$4 (H) / $4.25 (C)' },
    { name: 'Cafe au Lait', price: '$3.25 (H)' },
    { name: 'Cappuccino', price: '$4.50 (H)' },
    { name: 'Mocha', price: '$5.75 (H) / $6.25 (C)' },
    { name: 'Red Eye', price: '$4.50 (H) / $4.75 (C)' },
    { name: 'Americano', price: '$3.75 (H) / $4.25 (C)' },
];
let text = 'Menu';
let bevelEnabled = true;
let font;

const depth = 20;
const size = 70;
const hover = 30;
const curveSegments = 4;
const bevelThickness = 2;
const bevelSize = 1.5;
const mirror = true;

let targetRotation = 0;
let targetRotationOnPointerDown = 0;
let pointerX = 0;
let pointerXOnPointerDown = 0;
let windowHalfX = window.innerWidth / 2;

init();
animate();

function init() {
    container = document.getElementById('menu3D');
  
    // CAMERA
    camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 1500);
    camera.position.set(0, -100, 1000);
    cameraTarget = new THREE.Vector3(0, 150, 0);
  
    // SCENE
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.Fog(0x000000, 250, 1400);
  
    // LIGHTS
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.4);
    dirLight.position.set(0, 0, 1).normalize();
    scene.add(dirLight);
  
    const pointLight = new THREE.PointLight(0xffffff, 4.5, 0, 0);
    pointLight.color.setHSL(Math.random(), 1, 0.5);
    pointLight.position.set(0, 100, 90);
    scene.add(pointLight);
  
    // Add a new directional light to shine on the text
    const textDirLight = new THREE.DirectionalLight(0xffffff, 100);
    textDirLight.position.set(0, 200, 200);
    scene.add(textDirLight);
  
    materials = [
      new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }), // front
      new THREE.MeshPhongMaterial({ color: 0xffffff }) // side
    ];
  
    group = new THREE.Group();
    group.position.y = 100;
    scene.add(group);
  
    loadFont();
  
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(10000, 10000),
      new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0.5, transparent: true })
    );
    plane.position.y = 100;
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);
  
    // RENDERER
    renderer = new THREE.WebGLRenderer({ canvas: container, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    //container.appendChild(renderer.domElement);
  
    window.addEventListener('resize', onWindowResize);
    document.addEventListener('pointerdown', onPointerDown);
  }

function loadFont() {
  const loader = new FontLoader();
  loader.load('https://cdn.jsdelivr.net/npm/three/examples/fonts/helvetiker_regular.typeface.json', function (response) {
    font = response;
    createText();
  });
}

function createText() {
    group.remove(...group.children);
  
    let yOffset = 200; // adjust the initial y-offset
  
    const materials = new THREE.MeshPhongMaterial({ color: 0xffffff }); // white color
  
    // Add the "Menu" title
    const titleText = "Menu";
    const titleGeo = new TextGeometry(titleText, {
      font: font,
      size: size * 1.5, // make the title slightly larger
      height: depth,
      curveSegments: curveSegments,
      bevelThickness: 10, // increase bevel thickness for a more pronounced effect
      bevelSize: 5, // increase bevel size for a more rounded effect
      bevelEnabled: true,
      bevelOffset: 0, // set bevel offset to 0 for a 360-degree bevel
      bevelSegments: 10 // increase bevel segments for a smoother bevel
    });
  
    titleGeo.computeBoundingBox();
    titleGeo.computeVertexNormals();
  
    const titleMesh = new THREE.Mesh(titleGeo, materials);
  
    // Calculate the title width
    const titleWidth = titleGeo.boundingBox.max.x - titleGeo.boundingBox.min.x;
  
    // Center the title mesh
    titleMesh.position.x = -titleWidth / 2;
    titleMesh.position.y = yOffset;
    titleMesh.position.z = 0;
    titleMesh.rotation.x = 0;
    titleMesh.rotation.y = Math.PI * 2;
    group.add(titleMesh);
  
    yOffset -= 150; // move down 50 units for the menu items
  
    menuData.forEach((item, index) => {
      const text = `${item.name} - ${item.price}`;
      const textGeo = new TextGeometry(text, {
        font: font,
        size: size,
        height: depth,
        curveSegments: curveSegments,
        bevelThickness: 10, // increase bevel thickness for a more pronounced effect
        bevelSize: 5, // increase bevel size for a more rounded effect
        bevelEnabled: true,
        bevelOffset: 0, // set bevel offset to 0 for a 360-degree bevel
        bevelSegments: 10 // increase bevel segments for a smoother bevel
      });
  
      textGeo.computeBoundingBox();
      textGeo.computeVertexNormals();
  
      const textMesh = new THREE.Mesh(textGeo, materials);
  
      // Calculate the text width
      const textWidth = textGeo.boundingBox.max.x - textGeo.boundingBox.min.x;
  
      // Center the text mesh
      textMesh.position.x = -textWidth / 2;
      textMesh.position.y = yOffset;
      textMesh.position.z = 0;
      textMesh.rotation.x = 0;
      textMesh.rotation.y = Math.PI * 2;
      group.add(textMesh);
  
      yOffset -= 100; // move down 100 units for the next item
    });
  }

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onPointerDown(event) {
  if (event.isPrimary === false) return;

  pointerXOnPointerDown= event.clientX;
  targetRotationOnPointerDown = targetRotation;
  document.addEventListener('pointermove', onPointerMove);
  document.addEventListener('pointerup', onPointerUp);
}

function onPointerMove(event) {
  pointerX = event.clientX;
  targetRotation = targetRotationOnPointerDown + (pointerX - pointerXOnPointerDown) * 0.002;
  group.rotation.y = targetRotation;
}

function onPointerUp() {
  document.removeEventListener('pointermove', onPointerMove);
  document.removeEventListener('pointerup', onPointerUp);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}