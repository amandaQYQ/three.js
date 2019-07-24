import React, { useEffect } from 'react';
import * as THREE from 'three';
import jpg2 from './img/3.jpg';
function Texture() {
    useEffect(() => {
        const renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('texture')
        });

        const camera = new THREE.PerspectiveCamera(90, 1, 1, 100);
        camera.position.set(0, 0, 150);

        const scene = new THREE.Scene();

        const geometry = new THREE.SphereGeometry(100, 30, 30);

        // const loader = new THREE.TextureLoader();
        // const material = new THREE.MeshBasicMaterial({ color: 0x7c3a3a });

        const texture = new THREE.TextureLoader().load(jpg2);
        texture.wrapS = {
			'ClampToEdgeWrapping': THREE.ClampToEdgeWrapping,
			'RepeatWrapping': THREE.RepeatWrapping,
			'MirroredRepeatWrapping': THREE.MirroredRepeatWrapping,
		};
        texture.wrapT = {
			'ClampToEdgeWrapping': THREE.ClampToEdgeWrapping,
			'RepeatWrapping': THREE.RepeatWrapping,
			'MirroredRepeatWrapping': THREE.MirroredRepeatWrapping,
		};
		texture.repeat.set(1, 1);
		texture.offset.set(0, 0);
		texture.center.set(0, 0);
		texture.rotation= 0;
		texture.magFilter = THREE.NearestFilter;
		texture.minFilter = THREE.NearestFilter;
        const material = new THREE.MeshBasicMaterial( {  map: texture } );

        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        function animate() {

            sphere.rotation.y += 0.01;

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }
        animate();
        console.log(sphere);
    })



    return <canvas id="texture" style={{ width: '400px', height: '400px' }} />
}

// function Texture2() {
//     useEffect(() => {
//         var camera, scene, renderer;
// 			var mesh;

// 			var clock = new THREE.Clock();

// 			init();
// 			animate();

// 			function init() {

// 				renderer = new THREE.WebGLRenderer( { canvas: document.getElementById('texture2'),antialias: true } );
// 				renderer.setPixelRatio( window.devicePixelRatio );
// 				renderer.setSize( 400, 400 );
// 				renderer.gammaOutput = true;
// 				renderer.gammaFactor = 2.2;
// 				// document.body.appendChild( renderer.domElement );

// 				camera = new THREE.PerspectiveCamera( 50, 1, 1, 2000 );
// 				camera.position.z = 500;

// 				scene = new THREE.Scene();

// 				var geometry = new THREE.BoxBufferGeometry( 100, 100, 100 );
// 				var material = new THREE.MeshBasicMaterial();

// 				mesh = new THREE.Mesh( geometry, material );

// 				scene.add( mesh );

// 				var loader = new BasisTextureLoader();
// 				loader.setTranscoderPath( 'js/libs/basis/' );
// 				loader.detectSupport( renderer );

// 				loader.load( 'textures/compressed/PavingStones.basis', function ( texture ) {

// 					texture.encoding = THREE.sRGBEncoding;
// 					material.map = texture;
// 					material.needsUpdate = true;

// 				}, undefined, function ( error ) {

// 					console.error( error );

// 				} );

// 				window.addEventListener( 'resize', onWindowResize, false );

// 			}

// 			function onWindowResize() {

// 				camera.aspect = window.innerWidth / window.innerHeight;
// 				camera.updateProjectionMatrix();

// 				renderer.setSize( window.innerWidth, window.innerHeight );

// 			}

// 			function animate() {

// 				requestAnimationFrame( animate );

// 				var delta = clock.getDelta() * 0.5;

// 				mesh.rotation.x += delta;
// 				mesh.rotation.y += delta;

// 				renderer.render( scene, camera );

// 			}
//     })
//     return <canvas id="texture2" />
// }
export default Texture