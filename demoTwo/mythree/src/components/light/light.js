import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols'

export default function Light() {
    const ref = useRef(null);
    useEffect(() => {
        const canvas = ref.current;
        const renderer = new THREE.WebGLRenderer({ canvas });
        // renderer.setSize(400, 400);
        const camera = new THREE.PerspectiveCamera(45, 2, .1, 100);
        camera.position.set(0, 0, 45);
        camera.lookAt(0,0,0)
        // camera.position.z = 5;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color('#7494b9');
        /**几何体1 */
        // const geometry = new THREE.ConeBufferGeometry(70, 100, 32);
        // const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        // var cone = new THREE.Mesh(geometry, material);
        // scene.add(cone);
        /**鼠标控制 */
        // const controls = new OrbitControls(camera, canvas);
        // controls.target.set(0, 5, 0);
        // controls.update();


        /**几何体2的纹理 */

        // const planeSize = 40;

        // const loader = new THREE.TextureLoader();
        // const texture = loader.load('https://threejsfundamentals.org/threejs/resources/images/checker.png');
        // texture.wrapS = THREE.RepeatWrapping;
        // texture.wrapT = THREE.RepeatWrapping;
        // texture.magFilter = THREE.NearestFilter;
        // const repeats = planeSize / 2;
        // texture.repeat.set(repeats, repeats);

        // /**几何体2 */
        // const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
        // const planeMat = new THREE.MeshPhongMaterial({
        //     map: texture,
        //     side: THREE.DoubleSide,
        // });
        // const mesh = new THREE.Mesh(planeGeo, planeMat);
        // mesh.rotation.x = Math.PI * -.5;
        // scene.add(mesh);

        /**几何体3 */
        {
            const cubeSize = 4;
            // const cubeGeo = new THREE.BoxBufferGeometry(cubeSize, cubeSize, cubeSize);
            // const cubeMat = new THREE.MeshPhongMaterial({ color: 0x2fa1d6 });
            const color = new THREE.Color(0x2fa1d6);
            // const cubeMat = new THREE.MeshPhongMaterial({ color: color });


            // cubeMat.color = color
            const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
            const cubeMat = new THREE.MeshBasicMaterial({ color: color });

            const mesh = new THREE.Mesh(cubeGeo, cubeMat);
            mesh.position.set(cubeSize + 1, cubeSize / 2, 0);
            scene.add(mesh);
        }
        // renderer.render(scene, camera);

        function resizeRendererToDisplaySize(renderer) {
            const canvas = renderer.domElement;
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;
            const needResize = canvas.width !== width || canvas.height !== height;
            if (needResize) {
                renderer.setSize(width, height, false);
            }
            return needResize;
        }

        function render() {

            if (resizeRendererToDisplaySize(renderer)) {
                const canvas = renderer.domElement;
                camera.aspect = canvas.clientWidth / canvas.clientHeight;
                camera.updateProjectionMatrix();
            }

            renderer.render(scene, camera);

            requestAnimationFrame(render);
            // console.log(111111111)
        }

        requestAnimationFrame(render);

    })
    return <canvas id="light" ref={ref} style={{ width: '100%', height: '100%', display: 'block' }} />
}