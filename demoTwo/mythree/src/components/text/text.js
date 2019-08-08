import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

import helUrl from './font/helvetiker_regular.typeface.json';
console.log(typeof helUrl)
function Text() {
    const ref = useRef(null);
    useEffect(() => {
        // 渲染器
        const renderer = new THREE.WebGLRenderer({
            canvas: ref.current
        });
        renderer.setSize(500, 500);
        renderer.setClearColor(0x000000);

        // 相机
        const camera = new THREE.OrthographicCamera(-2, 2, 2, -2, 1, 4);
        camera.position.set(1.5, 1.5, 1.5);
        camera.lookAt(0, 0, 0);

        // 场景
        const scene = new THREE.Scene();

        // 调用字体加载函数
        const loader = new THREE.FontLoader();

        loader.load('./font/optimer_bold.typeface.json', function (font) {

            console.log(font)
            const textGeo = new THREE.TextGeometry('hello', {
                font: font,
                size: 1,
                height: 1
            });

            // textGeo.computeBoundingBox();
            // textGeo.computeVertexNormals();
            // textGeo = new THREE.BufferGeometry().fromGeometry( textGeo );

            const textMat = new THREE.MeshPhongMaterial({
                color: 0xffff00,
                wireframe: true
            });
            const mesh = new THREE.Mesh(textGeo, textMat);
            scene.add(mesh);

            renderer.render(scene, camera);
        })
        // renderer.render(scene,camera);

    })
    return <canvas ref={ref} />
}

export {
    Text
}