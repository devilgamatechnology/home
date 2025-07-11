import * as THREE from '../draft/threejs/three.module.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 300 );
camera.position.set( 0, 0, 20 );

const renderer = new THREE.WebGLRenderer( { antialias: true, canvas: document.querySelector( 'canvas' ) } );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio );

window.addEventListener( 'resize', function() {

    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

} );

const geometry = new THREE.PlaneGeometry( 50, 50, 50, 50 );
const plane = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial( { color: 0x3399ff, wireframe: true } )
);
scene.add( plane );

const positionAttribute = geometry.attributes.position;
const vertexCount = positionAttribute.count;
const originalPositions = positionAttribute.array.slice();

function wave() {

    const time = Date.now() * 0.001;

    for ( let i = 0; i < vertexCount; i ++ ) {
        const x = originalPositions[ i * 3 ];
        const y = originalPositions[ i * 3 + 1 ];
        const z = Math.sin( x * 0.5 + time ) * 0.5 + Math.cos( y * 0.5 + time ) * 0.5;
        
        positionAttribute.setZ( i, z );
    }

    positionAttribute.needsUpdate = true;

}


animate();
function animate() {

    requestAnimationFrame( animate );

    wave();

    renderer.render( scene, camera );

}