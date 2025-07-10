import * as THREE from './three.module.js';
import { OrbitControls } from './OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 300 );
camera.position.set( 0, 50, 150 );

const renderer = new THREE.WebGLRenderer( { antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );

const cube = new THREE.Mesh(
    new THREE.BoxGeometry( 50, 50, 50 ),
    new THREE.MeshNormalMaterial()
);
scene.add( cube );

animate();
function animate() {
    requestAnimationFrame( animate );
    controls.update();
    renderer.render( scene, camera );
}