
import * as THREE from "three";

let scene, camera, renderer;

function initScene(canvas) {
    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 10;

    // Renderer
    renderer = new THREE.WebGLRenderer({
        canvas
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    return {
        scene,
        camera,
        renderer
    };
}

export {
    initScene
};