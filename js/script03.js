import * as THREE from '../draft/threejs/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 300);
camera.position.z = 80;

const renderer = new THREE.WebGLRenderer( { canvas: document.querySelector( 'canvas' ), alpha: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio );

window.addEventListener( 'resize', () => {

    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

});

// Titik-titik
const particlesCount = 300;
const positions = new Float32Array( particlesCount * 3 );
const velocities = new Float32Array( particlesCount * 3 );

for ( let i = 0; i < particlesCount * 3; i ++ ) {

    positions[ i ] = ( Math.random() - 0.5 ) * 150;
    velocities[ i ] = ( Math.random() - 0.5 ) * 0.1; // pelan

}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
const material = new THREE.PointsMaterial( { color: 0xffffff, size: 2 } );
const particles = new THREE.Points( geometry, material );
scene.add( particles );

// Garis
const maxLines = 1000;
const linePositions = new Float32Array( maxLines * 6 );
const lineGeometry = new THREE.BufferGeometry();
lineGeometry.setAttribute( 'position', new THREE.BufferAttribute( linePositions, 3 ) );
const lineMaterial = new THREE.LineBasicMaterial( { color: 0x00ffff, transparent: true, opacity: 0.3 } );
const lines = new THREE.LineSegments( lineGeometry, lineMaterial );
scene.add( lines );

animate();
function animate() {

    requestAnimationFrame( animate );

    const pos = geometry.attributes.position.array;

    // Update posisi tiap titik
    for ( let i = 0; i < particlesCount * 3; i ++ ) {
        pos[ i ] += velocities[ i ];

        // Bounce balik kalau keluar batas
        if (pos[ i ] > 75 || pos[ i ] < - 75 ) {
            velocities[ i ] = - velocities[ i ];
        }
    }

  geometry.attributes.position.needsUpdate = true;

  // Update garis
    let lineIndex = 0;
    for ( let i = 0; i < particlesCount; i ++ ) {
        const ix = i * 3;
        for ( let j = i + 1; j < particlesCount; j ++ ) {
            const jx = j * 3;
            const dx = pos[ ix ] - pos[ jx ];
            const dy = pos[ ix + 1 ] - pos[ jx + 1 ];
            const dz = pos[ ix + 2 ] - pos[ jx + 2 ];
            const dist = dx * dx + dy * dy + dz * dz;
            if ( dist < 600 ) {
                if ( lineIndex < maxLines * 6) {
                    linePositions[ lineIndex ++ ] = pos[ ix ];
                    linePositions[ lineIndex ++ ] = pos[ ix + 1 ];
                    linePositions[ lineIndex ++ ] = pos[ ix + 2 ];
                    linePositions[ lineIndex ++ ] = pos[ jx ];
                    linePositions[ lineIndex ++ ] = pos[ jx + 1 ];
                    linePositions[ lineIndex ++ ] = pos[ jx + 2 ];
                }
            }
        }
    }

    lineGeometry.setDrawRange( 0, lineIndex / 3 );
    lineGeometry.attributes.position.needsUpdate = true;

    renderer.render( scene, camera );

}