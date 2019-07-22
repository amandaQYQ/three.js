import React from 'react';
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols'
import './index.css';

export default class Cube extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();

        this.state = {
            addLight: true // 加灯光
        }
    }
    componentDidMount() {
        this.initRenderer();
        this.setState({
            update: true
        })
    }
    componentDidUpdate() {
        console.log(1)
        this.initRenderer();
    }
    // 初始化渲染
    initRenderer = () => {
        let renderer = new THREE.WebGLRenderer({ canvas: this.myRef.current, antialias: true });
        // renderer.setSize(500, 500); // 当不设置尺寸，而为了响应设置canvas宽高100%的时候，可能会拉伸图形

        let cube = this.mesh();
        let scene = this.setScene(cube);
        let camera = this.setCamera();

        /* // 只解决拉伸：
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        */

        // 解决分辨率+拉伸：
        if (this.resizeRendererToDisplaySize(renderer)) {
            // 解决拉伸：
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();


            // 使用报错：'OrbitControls' is not exported from 'three' (imported as 'THREE').
            // 解决：npm install three-orbit-controls
            const controls = new OrbitControls(camera, canvas); // 自我理解： 允许相机围绕目标转
              
            controls.target.set(0, 5, 0);
            controls.update();
        }

        let animate = () => {
            requestAnimationFrame(animate);

            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);

        };
        // animate();
        requestAnimationFrame(animate);
    }
    // 解决分辨率：
    resizeRendererToDisplaySize = (renderer) => {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false); // 设置为false很重要

            // .setSize(width : Integer, height : Integer, updateStyle : Boolean) : null
            // 将输出canvas的大小调整为(width, height)并考虑设备像素比，且将视口从(0, 0)开始调整到适合大小 
            // 将updateStyle设置为false以阻止对canvas的样式做任何改变。
        }
        return needResize;
    }
    // 创建camera相机
    setCamera = () => {
        let camera = new THREE.PerspectiveCamera(75, 1, 0.1, 500);
        camera.position.set(0, 0, 2); // or camera.position.z = 2
        camera.lookAt(0, 0, 0); // default
        return camera;
    }
    // cube尺寸设置
    setGeometry = () => {
        let geometry = new THREE.BoxGeometry(1, 1, 1);
        return geometry;
    }
    // cube材质设置
    setMaterial = () => {
        let material = null;
        if (this.state.addLight) {
            // 加灯光
            material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
        } else {
            material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });
        }
        // 

        return material;
    }
    // 加个灯光特效
    setLight = () => {
        const light = new THREE.DirectionalLight(0xd65670, 1);
        light.position.set(0, 0, 2);
        return light;
    }
    // 创建cube=> (合并尺寸、材质)
    mesh() {
        let cube = new THREE.Mesh(this.setGeometry(), this.setMaterial());
        return cube;
    }
    // 创建scene场景
    setScene = (cube) => {
        let scene = new THREE.Scene();
        scene.add(cube);

        // 加灯光
        if (this.state.addLight) {
            let light = this.setLight();
            scene.add(light);
        }

        return scene;
    }
    render() {
        return (
            <>
                <canvas ref={this.myRef} style={{ display: 'block' }} id="aa" />
            </>
        )
    }
}