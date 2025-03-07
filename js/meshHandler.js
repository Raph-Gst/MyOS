import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.126.1/examples/jsm/loaders/GLTFLoader.js';


export async function load3DModel(container, mesh) {
    if (!container) {
        console.error("Le container est invalide.");
        return;
    }

    const iw = container.clientWidth;
    const ih = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, iw / ih, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(iw, ih);
    renderer.shadowMap.enabled = true; // Activer les ombres
    container.appendChild(renderer.domElement);

    const loader = new GLTFLoader();
    let gltf;

    try {
        gltf = await loader.loadAsync(`img/3d/${mesh}.glb`);
        console.log("GLB Loaded:", gltf);
        
        const model = gltf.scene;
        model.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        // Appliquer une rotation uniforme sur tout le modèle pour l'orienter dans la même direction
        const rotationAngle = Math.PI / 2;  // 90 degrés en radians, par exemple, pour orienter l'objet sur un axe
        model.rotation.set(0, rotationAngle, 0);  // Rotation autour de l'axe Y (tu peux ajuster cela)

        const pointLight = new THREE.PointLight(0xffffff, 1, 100);
        pointLight.position.set(0, 20, 20);
        scene.add(pointLight);

        model.scale.set(1, 1, 1);
        model.position.set(0, 5, 0);
        scene.add(model);

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3()).length(); // Taille de l'objet

        // Positionner la caméra plus près de l'objet
        camera.position.set(center.x, center.y + (size * 0.5), center.z + (size * 0.5));
        camera.lookAt(center);

        let isMouseDown = false;
        let previousMousePosition = { x: 0, y: 0 };

        const mixer = new THREE.AnimationMixer(model);

        if(gltf.animations.length !== 0){
            for(let i = 0; i < gltf.animations.length; i++){
                mixer.clipAction(gltf.animations[i]).setDuration(4).play();
            }
        }

        const clock = new THREE.Clock();
        let t = 0;
        loop();

        function loop() {
            requestAnimationFrame(loop);
            const dt = clock.getDelta();
            t += dt;
            mixer.update(dt);
            renderer.render(scene, camera);
        }

        // Observer les changements de taille du container
        const resizeObserver = new ResizeObserver(() => {
            const width = container.clientWidth;
            const height = container.clientHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        });

        resizeObserver.observe(container);

        // Gestion des mouvements de la caméra
        container.addEventListener('mousemove', (event) => {
            if (isMouseDown) {
                const deltaX = event.clientX - previousMousePosition.x;
                const deltaY = event.clientY - previousMousePosition.y;
                model.rotation.y += deltaX * 0.01; // Tourner l'objet
                model.rotation.x += deltaY * 0.01; // Tourner l'objet
            }
            previousMousePosition = { x: event.clientX, y: event.clientY };
        });

        container.addEventListener('mousedown', (event) => {
            if (event.button === 0) { // Bouton gauche de la souris
                isMouseDown = true;
            }
        });

        container.addEventListener('mouseup', (event) => {
            if (event.button === 0) {
                isMouseDown = false;
            }
        });

        container.addEventListener('wheel', (event) => {
            event.preventDefault();

            // Calculer la direction de la caméra vers le centre de l'objet
            const direction = new THREE.Vector3();
            camera.getWorldDirection(direction);
            direction.normalize(); // Normaliser la direction

            // Ajuster la position de la caméra en fonction de la molette
            const zoomSpeed = 0.05; // Vitesse de zoom
            camera.position.addScaledVector(direction, event.deltaY * zoomSpeed);
        });

    } catch (error) {
        console.error("Erreur lors du chargement du fichier GLB :", error);
    }
}




