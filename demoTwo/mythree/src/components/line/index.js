import Render from 'react';
import * as THREE from 'three';

function Line() {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(100, 100)

    const div = document.querySelector('#line');
    div.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(45,)

    return (
        <div id='line'>

        </div>
    )
}