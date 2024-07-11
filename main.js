import * as THREE from 'https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js';

// Font loader for text geometry
const fontLoader = new THREE.FontLoader();
let font;

// Initialize Three.js scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('menu3D'),
    antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
//document.body.appendChild(renderer.domElement);

// JSON data for menu items
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
    // Add more menu items as needed
];

// Load font asynchronously
fontLoader.load('https://cdn.jsdelivr.net/npm/three/examples/fonts/helvetiker_regular.typeface.json', 
        loadedFont => {
        font = loadedFont;
        createMenuItems();
    }, undefined, 
    error => {
        console.error('Font loading error:', error);
});

function createMenuItems() {
    const radius = 150; // Distance of menu items from center
    const angleStep = (Math.PI * 2) / menuData.length; // Angle between each menu item
    const rotationSpeed = 0.005; // Speed of rotation

    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    menuData.forEach((item, index) => {
        const angle = angleStep * index;
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);

        // Create text sprite for menu item name
        const textGeo = new THREE.TextGeometry(item.name, {
            font: font,
            size: 10,
            height: 0.2,
            curveSegments: 12,
            bevelEnabled: false
        });
        const textMesh = new THREE.Mesh(textGeo, textMaterial);
        textMesh.position.set(x, 0, z);
        textMesh.rotation.y = -angle + Math.PI / 2; // Rotate to face center
        scene.add(textMesh);

        // Create text sprite for menu item price
        const priceGeo = new THREE.TextGeometry(item.price, {
            font: font,
            size: 5,
            height: 0.2,
            curveSegments: 12,
            bevelEnabled: false
        });
        const priceMesh = new THREE.Mesh(priceGeo, textMaterial);
        priceMesh.position.set(x, -10, z); // Lower the price position
        priceMesh.rotation.y = -angle + Math.PI / 2; // Rotate to face center
        scene.add(priceMesh);
    });

    // Add ambient light to the scene
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    // Add directional light to the scene
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(0, 50, 0);
    scene.add(directionalLight);

    // Set camera position
    camera.position.set(0, 50, 200);

    // Render loop
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);

        // Rotate scene
        scene.rotation.y += rotationSpeed;
    }

    // Handle window resize
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', onWindowResize);

    // Start animation
    animate();
}

