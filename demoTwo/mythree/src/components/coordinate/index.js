import React, { useEffect } from 'react';
import * as THREE from 'three';

/**坐标轴 */
export default function Coordinate() {
    useEffect(() => {
        const renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('coordinate')
        });
        renderer.setSize(500, 500);
        renderer.setClearColor('black');

        const camera = new THREE.OrthographicCamera(-5, 5, 3.75, -3.75, 0.1, 100)
        camera.position.set(25, 25, 25);
        camera.lookAt(0, 0, 0);

        const scene = new THREE.Scene();

        /** 
            // 新建一个几何体(长方体)
            var cube = new THREE.Mesh(new THREE.CubeGeometry(1, 2, 3, ), new THREE.MeshBasicMaterial({
                color: 0xffff00,
                wireframe: true
            }));
            // cube.position.set(3, 0, 0); // 沿x轴正轴平移3
            cube.position.set(0, 0, 0); // 如果不设置，原点默认也是立方体的中心
            scene.add(cube);


            // 标记点1
            const sphere = new THREE.SphereGeometry(.1, 18, 12)
            const spherematerial = new THREE.MeshBasicMaterial({ color: 'red' })
            const mySphere = new THREE.Mesh(sphere, spherematerial);
            // mySphere.position.set(2.5, -1, 0); // 沿x轴正轴平移3
            mySphere.position.set(-.5, -1, 0);
            scene.add(mySphere);


            // 标记点2
            const sphere2 = new THREE.SphereGeometry(.1, 18, 12)
            const spherematerial2 = new THREE.MeshBasicMaterial({ color: 'red' })
            const mySphere2 = new THREE.Mesh(sphere2, spherematerial2);
            // mySphere2.position.set(3, 0, 0); // 沿x轴正轴平移3
            mySphere2.position.set(0, 0, 0);
            scene.add(mySphere2);
        */

        // x轴
        const xGeo = new THREE.Geometry();
        xGeo.vertices.push(new THREE.Vector3(0, 0, 0));
        xGeo.vertices.push(new THREE.Vector3(3, 0, 0));

        const xMaterial = new THREE.LineBasicMaterial({
            color: 0xff0000
        });

        const xAxis = new THREE.Line(xGeo, xMaterial);
        scene.add(xAxis);


        // y轴
        const yGeo = new THREE.Geometry();
        yGeo.vertices.push(new THREE.Vector3(0, 0, 0));
        yGeo.vertices.push(new THREE.Vector3(0, 3, 0));
        const yMaterial = new THREE.LineBasicMaterial({
            color: 0x00ff00
        });
        const yAxis = new THREE.Line(yGeo, yMaterial);
        scene.add(yAxis);


        // z轴
        const zGeo = new THREE.Geometry();
        zGeo.vertices.push(new THREE.Vector3(0, 0, 0));
        zGeo.vertices.push(new THREE.Vector3(0, 0, 3));
        const zMaterial = new THREE.LineBasicMaterial({
            color: 0x00ccff
        });
        const zAxis = new THREE.Line(zGeo, zMaterial);
        scene.add(zAxis);


        renderer.render(scene, camera);
    })
    return <canvas id="coordinate" />
}