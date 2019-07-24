import React, { useEffect } from 'react';
import * as THREE from 'three';

import jpg1 from './img/1.jpg';
import jpg2 from './img/2.jpg';
import jpg3 from './img/3.jpg';
import jpg4 from './img/4.jpg';
import jpg5 from './img/5.jpg';
import jpg6 from './img/6.jpg';
import jpg7 from './img/7.jpg';

import './index.css';

/* 只用一种纹理 
    THREE.MeshBasicMaterial
*/
function BasicMaterial() {
    useEffect(() => {
        const renderer = new THREE.WebGLRenderer(
            {
                canvas: document.getElementById('BasicMaterial')
            }
        );
        renderer.setSize(400, 400);

        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
        camera.position.z = 25;

        const scene = new THREE.Scene();

        const geometry = new THREE.BoxGeometry(10, 10, 10); // 创建一个几何体（此处是正方体）

        /* 使用颜色 */
        // const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });

        /* 使用纹理 */
        const loader = new THREE.TextureLoader();
        const material = new THREE.MeshBasicMaterial({
            map: loader.load(jpg1),
        })

        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // 动起来
        function animate() {
            requestAnimationFrame(animate);

            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            renderer.render(scene, camera);

        }
        animate();
    })


    return (
        <canvas id='BasicMaterial' />
    )
}

/**
 * 多种纹理应用在一个几何体上
 * THREE.MeshBasicMaterial
 */
function MultipleMaterial() {
    useEffect(() => {
       
        const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('MultipleMaterial') });
        renderer.setSize(400, 400);

        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
        camera.position.z = 25;

        const scene = new THREE.Scene();

        const geometry = new THREE.BoxGeometry(10, 10, 10);

        /**测试DefaultLoadingManager */
        /** 
            const a = THREE.DefaultLoadingManager;
            // a.onStart = (url, itemsLoaded, itemsTotal) => {
            //     console.log(url, itemsLoaded, itemsTotal)
            // }  // 此方法没生效
            a.onLoad = (url, itemsLoaded, itemsTotal) => {
                console.log(url, itemsLoaded, itemsTotal)
            }
            a.onProgress = (url, itemsLoaded, itemsTotal) => {
                console.log(url, itemsLoaded, itemsTotal)
            }
            a.onError = (url, itemsLoaded, itemsTotal) => {
                console.log(url, itemsLoaded, itemsTotal)
            }
        */

        const loader = new THREE.TextureLoader();
     
        const materials = [
            new THREE.MeshBasicMaterial({ map: loader.load(jpg2) }),
            new THREE.MeshBasicMaterial({ map: loader.load(jpg3) }),
            new THREE.MeshBasicMaterial({ map: loader.load(jpg4) }),
            new THREE.MeshBasicMaterial({ map: loader.load(jpg5) }),
            new THREE.MeshBasicMaterial({ map: loader.load(jpg6) }),
            new THREE.MeshBasicMaterial({ map: loader.load(jpg7) })
        ];
        const cube = new THREE.Mesh(geometry, materials);
        scene.add(cube);
        
        // 动起来
        function animate() {
            requestAnimationFrame(animate);

            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            renderer.render(scene, camera);

        }
        animate();

    })
    return <canvas id="MultipleMaterial" />
}

/* 上述方法优化运行 */
/* 不必等待纹理加载，页面可以立即开始渲染 
    THREE.MeshBasicMaterial + THREE.TextureLoader
*/
function OptimizedMaterial() {

    useEffect(() => {
        const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('OptimizedMaterial') });
        renderer.setSize(400, 400);

        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
        camera.position.z = 25;

        const scene = new THREE.Scene();

        const geometry = new THREE.BoxBufferGeometry(10, 10, 10);

        /*** 区别*/
        /**老方法 */
        /*
            const materials = [
                new THREE.MeshBasicMaterial({ map: loader.load(jpg2) }),
                new THREE.MeshBasicMaterial({ map: loader.load(jpg3) }),
                new THREE.MeshBasicMaterial({ map: loader.load(jpg4) }),
                new THREE.MeshBasicMaterial({ map: loader.load(jpg5) }),
                new THREE.MeshBasicMaterial({ map: loader.load(jpg6) }),
                new THREE.MeshBasicMaterial({ map: loader.load(jpg7) })
            ];
            const cube = new THREE.Mesh(geometry, materials);
            scene.add(cube);
        */

        /**一种材料 */
        /*
            let cube = null;
            const loader = new THREE.TextureLoader();
            loader.load(jpg7, (texture) => {
                const material = new THREE.MeshBasicMaterial({ map: texture });
                cube = new THREE.Mesh(geometry, material);
                scene.add(cube);
            })
        */

        /**多种材料 */
        /*
            const arr = [jpg2, jpg3, jpg4, jpg5, jpg6, jpg7];
            let cube = null;
            const loader = new THREE.TextureLoader();
            let materials = [];
            arr.map(d => {
                loader.load(d, (texture) => {
                    materials.push(new THREE.MeshBasicMaterial({ map: texture }));
                    if (materials.length == arr.length) {
                        cube = new THREE.Mesh(geometry, materials);
                        scene.add(cube);
                    };

                })
            })
        */

        /*上面的方法不够好: 通过loadingManager*/
        const loadManager = new THREE.LoadingManager();
        const loader = new THREE.TextureLoader(loadManager);
        const materials = [
            new THREE.MeshBasicMaterial({ map: loader.load(jpg2) }),
            new THREE.MeshBasicMaterial({ map: loader.load(jpg3) }),
            new THREE.MeshBasicMaterial({ map: loader.load(jpg4) }),
            new THREE.MeshBasicMaterial({ map: loader.load(jpg5) }),
            new THREE.MeshBasicMaterial({ map: loader.load(jpg6) }),
            new THREE.MeshBasicMaterial({ map: loader.load(jpg7) })
        ];
        let cube = null;
        let cubes = [];
        loadManager.onLoad = () => {
            // const cube = new THREE.Mesh(geometry, materials);
            cube = new THREE.Mesh(geometry, materials);
            scene.add(cube);
            // cubes.push(cube);
        }

        // 动起来
        function animate() {
            /** 使用cubes*/
            /** 
                cubes.forEach((cube, index) => {
                    cube.rotation.x += 0.01;
                    cube.rotation.y += 0.01;
                })
                renderer.render(scene, camera);
                requestAnimationFrame(animate);
            */
            
            /** 不使用cubes */
            if (cube) {
                cube.rotation.x += 0.01;
                cube.rotation.y += 0.01;
                renderer.render(scene, camera);
                requestAnimationFrame(animate);
            } else {
                renderer.render(scene, camera);
                requestAnimationFrame(animate);
            }
        }

        animate();

    })
    return <canvas id="OptimizedMaterial" />
}


function FinalMaterial() {
    return (<>
        <BasicMaterial />
        <MultipleMaterial />
        <OptimizedMaterial />
    </>)
}
export default FinalMaterial;