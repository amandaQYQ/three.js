import React, { useEffect } from 'react';
import * as THREE from 'three';

export default function OrthographicCamera() {
    useEffect(() => {
        const renderer = new THREE.WebGLRenderer(
            { canvas: document.getElementById('orthographicCamera') }
        );
        renderer.setSize(800, 600);
        renderer.setClearColor('#84d0ee');

        const camera = new THREE.OrthographicCamera(-2, 2, 1.5, -1.5, 1, 10);
        
        /** 展示demo */
        // /**  
            camera.position.set(1, 1, 2);
            camera.lookAt(0, 0, 0);
        //  **/



        /**  相机的摆放*/
        /**
            camera.position.set(0, 0, 5);
         */



        /**  相机的朝向 */
        /**
            camera.position.set(4, -3, 5); // 只有此行代码时，相机默认朝向原点，看不到物体
            camera.lookAt(0, 0, 0);        // 加上此行代码，定义相机朝向
        */

        const scene = new THREE.Scene();
        const cube = new THREE.Mesh(
            new THREE.CubeGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({
                color: 0xff0000,
                wireframe: true
            })
        );

        scene.add(cube);

        renderer.render(scene, camera);
    })
    return <canvas id="orthographicCamera" />
}