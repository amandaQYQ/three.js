import React, { useEffect } from 'react';
import * as THREE from 'three';
import jpg2 from './img/3.jpg';

function Texture() {
    useEffect(() => {
        const renderer = new THREE.WebGLRenderer({
			canvas: document.getElementById('texture'),
			antialias: true // 是否执行抗锯齿。默认为false. 
							// 提高清晰度的方法一
        });

		renderer.capabilities.getMaxPrecision(); // 返回顶点着色器和片元着色器的最大可用精度。
												 // 提高清晰度的方法二
		renderer.setPixelRatio(1.5); // 设置设备像素比。通常用于避免HiDPI设备上绘图模糊
									 // 提高清晰度的方法三
        const camera = new THREE.PerspectiveCamera(90, 1, 1, 100);
        camera.position.set(0, 0, 150);

        const scene = new THREE.Scene();

        const geometry = new THREE.SphereGeometry(100, 30, 30);

		const texture = new THREE.TextureLoader().load(jpg2);
		
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(.5, 1);
		texture.offset.set(0, 0);
		texture.center.set(0, 0);
		texture.rotation= 0;
		texture.magFilter = THREE.LinearMipMapLinearFilter; // 提高清晰度的方法四
		// texture.minFilter = THREE.NearestMipMapLinearFilter;
        const material = new THREE.MeshBasicMaterial( {  map: texture } );

        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        function animate() {

            sphere.rotation.y += 0.01;

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }
        animate();
    })



    return <canvas id="texture" style={{ width: '400px', height: '400px' }} />
}


export default Texture