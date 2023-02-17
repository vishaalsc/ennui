import React, {useEffect, useRef, useState} from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

function ModelViewer({ objUrl }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const canvasRef = useRef(null);

    useEffect(() => {
        // Load the OBJ file and set up the Three.js scene
        const loader = new OBJLoader();
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0xffffff, 1);
        const controls = new OrbitControls(camera, renderer.domElement);

        loader.load(objUrl, (object) => {
            scene.add(object);
            setIsLoaded(true);
        });

        // Set up the animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        // Disable scrolling on the page
        if (typeof window !== 'undefined') {
            document.body.style.overflow = 'hidden';
        }
    }, [objUrl, canvasRef])

    return (
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }}>
            {isLoaded ? null : <div>Loading...</div>}
        </canvas>
    );
}

export default ModelViewer;
