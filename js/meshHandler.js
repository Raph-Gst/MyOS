import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { FBXLoader } from 'https://unpkg.com/three@0.126.1/examples/jsm/loaders/FBXLoader.js';

export async function load3DModel(container) {
    if (!container) {
        console.error("Le container est invalide.");
        return;
    }

    const iw = container.clientWidth;
    const ih = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, iw / ih, 0.1, 1000);
    camera.position.set(0, 1.5, 15);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(iw, ih);
    renderer.shadowMap.enabled = true; // Activer les ombres
    container.appendChild(renderer.domElement);

    const loader = new FBXLoader();
    try {
        const fbx = await loader.loadAsync('img/bea.fbx');

        console.log("FBX Loaded:", fbx);
        console.log("Children of mesh:", fbx.children);

        // Désactiver les animations
        fbx.animations = [];

        // Ajouter une lumière ambiante plus intense


        // Ajouter plusieurs lumières directionnelles
        const directionalLight1 = new THREE.DirectionalLight(0xffffff, 3);
        directionalLight1.position.set(0, 0, 20); // Positionner cette lumière
        directionalLight1.castShadow = true; // Activer les ombres
        scene.add(directionalLight1);

        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight2.position.set(-5, 10, 5); // Positionner cette lumière
        directionalLight2.castShadow = true; // Activer les ombres
        scene.add(directionalLight2);

        // Ajouter une lumière ponctuelle pour plus de détails
        const pointLight = new THREE.PointLight(0xffffff, 1, 100);
        pointLight.position.set(0, 10, 0);
        scene.add(pointLight);

        fbx.scale.set(0.01, 0.01, 0.01);
        fbx.position.set(0, 5, 0);
        scene.add(fbx);

        function loop() {
            fbx.rotation.y += 0.01; // Rotation du modèle
            renderer.render(scene, camera);
            requestAnimationFrame(loop);
        }

        loop();

        // Observer les changements de taille du container
        const resizeObserver = new ResizeObserver(() => {
            const width = container.clientWidth;
            const height = container.clientHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        });

        resizeObserver.observe(container);

    } catch (error) {
        console.error("Erreur lors du chargement du fichier FBX :", error);
    }
}
