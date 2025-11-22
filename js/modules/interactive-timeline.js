
import * as THREE from "three";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import timelineData from "../slides/timeline-data.js";
import { initScene } from "./scene.js";

let scene,
    camera,
    renderer,
    raycaster,
    font,
    INTERSECTED,
    IS_DRAGGING = false,
    PREVIOUS_MOUSE_POSITION = {
        x: 0,
        y: 0,
    };
const pointer = new THREE.Vector2();
const objects = [];
const radius = 5;

// Professional color palette
const colors = {
    background: 0x1a1a1a,
    line: 0x00ff00, // Brighter green for the line
    event: 0x00ff00, // Brighter green for events
    text: 0xffffff,
    highlight: 0x00ff00, // Brighter green for highlight
};

function createEventObject(event) {
    const geometry = new THREE.TorusGeometry(0.15, 0.05, 16, 100);
    const material = new THREE.MeshStandardMaterial({
        color: colors.event,
        metalness: 0.7,
        roughness: 0.3,
    });
    const torus = new THREE.Mesh(geometry, material);
    torus.userData = event;
    return torus;
}

function createEventText(event) {
    const textMaterial = new THREE.MeshBasicMaterial({
        color: colors.text
    });
    const textGeometry = new TextGeometry(event.date, {
        font: font,
        size: 0.2,
        height: 0.02,
    });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    return textMesh;
}

function showModal(event) {
    // Check if a modal already exists and remove it
    const existingModal = document.querySelector(".timeline-modal");
    if (existingModal) {
        existingModal.parentElement.removeChild(existingModal);
    }

    const modal = document.createElement("div");
    modal.className = "timeline-modal";
    modal.innerHTML = `
    <div class="timeline-modal-content">
      <span class="timeline-modal-close">&times;</span>
      <h2>${event.title}</h2>
      <p><strong>${event.date} - ${event.location}</strong></p>
      <p><em>${event.company}</em></p>
      <p>${event.content}</p>
    </div>
  `;
    document.body.appendChild(modal);

    // Add animation class
    setTimeout(() => {
        modal.classList.add("timeline-modal-show");
    }, 10);


    const closeButton = modal.querySelector(".timeline-modal-close");
    closeButton.onclick = () => {
        modal.classList.remove("timeline-modal-show");
        setTimeout(() => {
            if (modal.parentElement) {
                document.body.removeChild(modal);
            }
        }, 300); // Wait for animation to finish
    };
}

function onPointerMove(event) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onMouseDown(event) {
    IS_DRAGGING = true;
    PREVIOUS_MOUSE_POSITION = {
        x: event.clientX,
        y: event.clientY,
    };
}

function onMouseUp(event) {
    IS_DRAGGING = false;
    if (INTERSECTED) {
        flyToEvent(INTERSECTED);
    }
}

function onMouseMove(event) {
    if (IS_DRAGGING) {
        const deltaMove = {
            x: event.clientX - PREVIOUS_MOUSE_POSITION.x,
            y: event.clientY - PREVIOUS_MOUSE_POSITION.y,
        };

        const deltaRotationQuaternion = new THREE.Quaternion().setFromEuler(
            new THREE.Euler(
                (deltaMove.y * Math.PI) / 360, // Slower rotation
                (deltaMove.x * Math.PI) / 360, // Slower rotation
                0,
                "XYZ"
            )
        );

        scene.quaternion.multiplyQuaternions(
            deltaRotationQuaternion,
            scene.quaternion
        );
    }
    PREVIOUS_MOUSE_POSITION = {
        x: event.clientX,
        y: event.clientY,
    };
}

// Zoom functionality
function onMouseWheel(event) {
    camera.position.z += event.deltaY > 0 ? 0.5 : -0.5;
    camera.position.z = Math.max(5, Math.min(20, camera.position.z)); // Clamp zoom
}

// Handle window resizing
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Fly-to animation
function flyToEvent(targetObject) {
    const targetPosition = new THREE.Vector3();
    targetObject.getWorldPosition(targetPosition);

    const startPosition = camera.position.clone();
    const endPosition = targetPosition.clone().add(new THREE.Vector3(0, 0, 3)); // Offset for better view

    const startQuaternion = camera.quaternion.clone();
    const endQuaternion = new THREE.Quaternion().setFromRotationMatrix(
        new THREE.Matrix4().lookAt(camera.position, targetPosition, camera.up)
    );

    let t = 0;
    const duration = 1000; // 1 second animation

    function animateFlyTo() {
        t += 16.67; // approx 60fps
        const percent = Math.min(t / duration, 1);

        camera.position.lerpVectors(startPosition, endPosition, percent);
        camera.quaternion.slerp(startQuaternion, endQuaternion, percent);

        if (percent < 1) {
            requestAnimationFrame(animateFlyTo);
        } else {
            showModal(targetObject.userData);
        }
    }

    animateFlyTo();
}


function initTimeline(canvas) {
    const sceneSetup = initScene(canvas);
    scene = sceneSetup.scene;
    camera = sceneSetup.camera;
    renderer = sceneSetup.renderer;

    scene.background = new THREE.Color(colors.background);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);


    // Raycaster
    raycaster = new THREE.Raycaster();

    // Line
    const lineMaterial = new THREE.LineBasicMaterial({
        color: colors.line
    });
    const points = [];
    const segments = 128;
    for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        points.push(new THREE.Vector3(x, 0, z));
    }
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(line);

    // Load font and create text
    const loader = new FontLoader();
    loader.load(
        "./js/vendor/helvetiker_regular.typeface.json",
        (loadedFont) => {
            font = loadedFont;
            // Create and position the event objects and text
            timelineData.forEach((event, i) => {
                const object = createEventObject(event);
                const angle = (i / timelineData.length) * Math.PI * 2;
                const x = radius * Math.cos(angle);
                const z = radius * Math.sin(angle);
                object.position.set(x, 0, z);
                scene.add(object);
                objects.push(object);

                const text = createEventText(event);
                text.position.set(x * 1.15, 0.3, z * 1.15); // Adjust text position
                text.lookAt(camera.position); // Make text face the camera
                scene.add(text);
            });
        }
    );

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("wheel", onMouseWheel);
    window.addEventListener("resize", onWindowResize);

    // Animation loop
    const animate = () => {
        requestAnimationFrame(animate);

        // Auto-rotation
        if (!IS_DRAGGING && !INTERSECTED) {
            scene.rotation.y += 0.001;
        }


        // Raycasting
        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObjects(objects);

        if (intersects.length > 0) {
            if (INTERSECTED != intersects[0].object) {
                if (INTERSECTED) {
                    // Restore previous intersected object's state
                    INTERSECTED.material.color.set(colors.event);
                    INTERSECTED.scale.set(1, 1, 1);
                }
                INTERSECTED = intersects[0].object;
                // Highlight new intersected object
                INTERSECTED.material.color.set(colors.highlight);
                INTERSECTED.scale.set(1.2, 1.2, 1.2); // Scale up on hover
            }
        } else {
            if (INTERSECTED) {
                // Restore previous intersected object's state
                INTERSECTED.material.color.set(colors.event);
                INTERSECTED.scale.set(1, 1, 1);
            }
            INTERSECTED = null;
        }

        renderer.render(scene, camera);
    };

    animate();
}

function destroyTimeline(canvas) {
    canvas.removeEventListener("pointermove", onPointerMove);
    canvas.removeEventListener("mousedown", onMouseDown);
    canvas.removeEventListener("mouseup", onMouseUp);
    canvas.removeEventListener("mousemove", onMouseMove);
    canvas.removeEventListener("wheel", onMouseWheel);
    window.removeEventListener("resize", onWindowResize);
}

export {
    initTimeline,
    destroyTimeline
};