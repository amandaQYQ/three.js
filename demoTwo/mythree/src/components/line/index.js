import React, { useEffect } from 'react';
import * as THREE from 'three';
import { Scene } from 'three';

function Line() {

    useEffect(() => {
        /**renderer渲染器 */
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(500, 500)
        renderer.setClearColor('#84d0ee');
        const div = document.querySelector('#line');
        div.appendChild(renderer.domElement);

        /**camera相机 */
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
        camera.position.set(0, 0, 600)
        camera.lookAt(0, 0, 0); // 看向哪个点，哪个点就是圆心，也就是页面的中心

        /**点和线 */
        var geometry = new THREE.Geometry();
        var material = new THREE.LineBasicMaterial({ vertexColors: THREE.VertexColors });

        var p1 = new THREE.Vector3(-100, 0, 100);
        var p2 = new THREE.Vector3(100, 0, -100);
        geometry.vertices.push(p1);
        geometry.vertices.push(p2);

        var color1 = new THREE.Color(0x444444);
        var color2 = new THREE.Color(0xFF0000);
        geometry.colors.push(color1, color2);

        var line = new THREE.Line(geometry, material, THREE.LinePieces);

        /**几何体 */
        // const sphere = new THREE.SphereGeometry(1, 18, 12)
        // const spherematerial = new THREE.MeshBasicMaterial({ color: 'red' })
        // const mySphere = new Mesh(sphere, spherematerial);
        // mySphere.position.set(50, 0, 0);

        /**scene场景 */
        const scene = new Scene();
        scene.add(line);
        // scene.add(mySphere);


        /**渲染 */
        renderer.render(scene, camera);
    })

    return <div id='line' />
}


/**网格线 */
function GridLine() {
    useEffect(() => {
        /**renderer渲染器 */
        const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('GridLine') });
        renderer.setSize(800, 600);
        renderer.setClearColor('#84d0ee');

        /**camera相机 */
        var camera = new THREE.OrthographicCamera(-5, 5, 3.75, -3.75, 0.1, 100);
        camera.position.set(0, -25, 0);
        camera.lookAt(0, 0, 0); // 看向哪个点，哪个点就是圆心，也就是页面的中心

        /**scene场景 */
        const scene = new Scene();

        // 定义x轴上两个点
        const geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(-2, 0, 0));
        geometry.vertices.push(new THREE.Vector3(2, 0, 0));

        for (let i = 0; i <= 5; i++) {

            
            let horizontal = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 'yellow', opacity: .2 }));
            horizontal.position.z = (i * .8) - 2;
            scene.add(horizontal);
      
            let vertical = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 'black', opacity: 0.2 }));
            vertical.position.x = (i * .8) - 2;
            vertical.rotation.y = 90 * Math.PI / 180;   //  旋转90度
            scene.add(vertical);

            renderer.render(scene, camera);
        }

        /**渲染 */
        renderer.render(scene, camera);
    })

    return <canvas id="GridLine" />
}

export {
    Line,
    GridLine
}