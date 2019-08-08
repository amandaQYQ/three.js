import React, { useEffect } from 'react';
import * as THREE from 'three';

export default function PerspectiveCamera() {
    useEffect(() => {
        const renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('perspectiveCamera')
        });
        renderer.setSize(400, 400)
        renderer.setClearColor(0x000000);

        const camera = new THREE.PerspectiveCamera(45, 1, 15, 1000);
        camera.position.set(0, 0, 20);
        const scene = new THREE.Scene();

        const geometry = new THREE.CubeGeometry(10, 10, 10);
        const matetial = new THREE.MeshBasicMaterial({
            color: 'red',
            wireframe: true // 是否渲染几何线框。缺省值为false(即呈现为平面多边形)。
        });
        const cube = new THREE.Mesh(geometry, matetial);

        scene.add(cube);
        renderer.render(scene, camera);
    })
    return <canvas id="perspectiveCamera" />
}