import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**立方体 */
class Cube extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.draw = this.draw.bind(this);
    }
    componentDidMount() {
        this.draw();
    }
    draw() {
        // 渲染器
        const renderer = new THREE.WebGLRenderer({
            canvas: this.myRef.current
        });
        renderer.setSize(500, 500);
        renderer.setClearColor(0x000000);

        // 相机
        const camera = new THREE.OrthographicCamera(-2, 2, 2, -2, 1, 10);
        camera.position.set(4, 4, 4);
        camera.lookAt(0, 0, 0);

        // 场景
        const scene = new THREE.Scene();

        // 立方体
        const cubeGeo = new THREE.CubeGeometry(1, 2, 3, 2, 2, 3);
        const cubeMat = new THREE.MeshBasicMaterial({
            color: 0xffff00,
            wireframe: true
        })
        const cube = new THREE.Mesh(cubeGeo, cubeMat);
        scene.add(cube);

        renderer.render(scene, camera);
    }
    render() {
        return <canvas ref={this.myRef} style={{ display: 'block' }} />
    }
}

/**平面 */
function Plane() {
    const myref = useRef(null);
    useEffect(() => {

        // 渲染器
        const renderer = new THREE.WebGLRenderer({
            canvas: myref.current
        });
        renderer.setSize(500, 500);
        renderer.setClearColor(0x000000);

        // 相机
        const camera = new THREE.OrthographicCamera(-2, 2, 2, -2, 1, 4);
        camera.position.set(1.5, 1.5, 1.5);
        camera.lookAt(0, 0, 0);

        // 场景
        const scene = new THREE.Scene();

        // 坐标轴
        axis(scene);

        // 平面
        const planeGeo = new THREE.PlaneGeometry(1, 2, 3, 3);
        const planeMat = new THREE.MeshBasicMaterial({
            color: 0xffff00,
            wireframe: true
        })
        const plane = new THREE.Mesh(planeGeo, planeMat);
        scene.add(plane);

        renderer.render(scene, camera);
    })

    // 绘制坐标轴
    const axis = function (scene) {
        // x-axis
        var xGeo = new THREE.Geometry();
        xGeo.vertices.push(new THREE.Vector3(0, 0, 0));
        xGeo.vertices.push(new THREE.Vector3(2, 0, 0));
        var xMat = new THREE.LineBasicMaterial({
            color: 0xff0000
        });
        var xAxis = new THREE.Line(xGeo, xMat);
        scene.add(xAxis);

        // y-axis
        var yGeo = new THREE.Geometry();
        yGeo.vertices.push(new THREE.Vector3(0, 0, 0));
        yGeo.vertices.push(new THREE.Vector3(0, 2, 0));
        var yMat = new THREE.LineBasicMaterial({
            color: 0x00ff00
        });
        var yAxis = new THREE.Line(yGeo, yMat);
        scene.add(yAxis);

        // z-axis
        var zGeo = new THREE.Geometry();
        zGeo.vertices.push(new THREE.Vector3(0, 0, 0));
        zGeo.vertices.push(new THREE.Vector3(0, 0, 2));
        var zMat = new THREE.LineBasicMaterial({
            color: 0x00ccff
        });
        var zAxis = new THREE.Line(zGeo, zMat);
        scene.add(zAxis);
        console.log('aaaaa')
    }
    return <canvas ref={myref} />
}

export {
    Cube,
    Plane
}