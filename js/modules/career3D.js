import * as THREE from 'https://esm.sh/three@0.158.0';
import { CSS2DRenderer, CSS2DObject } from 'https://esm.sh/three@0.158.0/examples/jsm/renderers/CSS2DRenderer.js';
import { gsap } from 'https://esm.sh/gsap@3.12.5';
import { ScrollTrigger } from 'https://esm.sh/gsap@3.12.5/ScrollTrigger.js';

gsap.registerPlugin(ScrollTrigger);

// Career data extracted from the original timeline
const careerData = [
  {
    year: 2002,
    location: 'Russia',
    company: 'Schlumberger',
    role: 'Intern',
    description: '- Learn and adopt Schlumberger\'s QHSE\n- Manage inventory and ad hocly support onsite engineer',
    position: new THREE.Vector3(0, 0, 0),
    color: 0xffaa00 // Amber for early years
  },
  {
    year: 2005,
    location: 'Vietnam',
    company: 'Sumitomo',
    role: 'Business Assistant',
    description: '- Contract and tender support\n- Engineering support\n- Business development for Vietnam market',
    position: new THREE.Vector3(5, 2, 10),
    color: 0xffaa00
  },
  {
    year: 2005,
    location: 'Vietnam',
    company: 'JVPC',
    role: 'Jr. Reservoir Engineer',
    description: '- Monitor, analyse and forecast well performances\n- Manage database for oil-production wells\n- Coordinate to resolve daily production operation issues and prepare production reports for company and partners',
    position: new THREE.Vector3(-5, 0, 20),
    color: 0xffaa00
  },
  {
    year: 2008,
    location: 'Vietnam',
    company: 'Baker Hughes',
    role: 'Sales Manager',
    description: '- Manage P&L, HR, inventory Account and sales management\n- Application engineering\n- Mentoring employees',
    position: new THREE.Vector3(0, -2, 30),
    color: 0xffaa00
  },
  {
    year: 2012,
    location: 'USA',
    company: 'Baker Hughes',
    role: 'Designer & Application Engineer',
    description: '- PDC designer\n- DART application engineer for Asia Pacific and Africa',
    position: new THREE.Vector3(4, 1, 40),
    color: 0x00aaff // Blue for later years
  },
  {
    year: 2014,
    location: 'Australia',
    company: 'Baker Hughes',
    role: 'Account Manager',
    description: '- Account and sales management for key offshore customers\n- Design PDC for Australia\n- Be the technical lead and mentor team members',
    position: new THREE.Vector3(0, 0, 50),
    color: 0x00aaff
  },
  {
    year: 2016,
    location: 'Australia - APAC',
    company: 'Baker Hughes',
    role: 'APAC Engineering Manager',
    description: '- Engineering management for Drill Bit operation in APAC\n- Design PDC for key applications in the region\n- Mentor and support team members across the region\n- Work closely with other product lines for new market/opportunity in the region',
    position: new THREE.Vector3(-3, -1, 60),
    color: 0x00aaff
  }
];

let scene, camera, renderer, css2dRenderer;
let tube, nodes = [];
let cards = [];
let path;
let animationFrameId;

export function initCareer3D(container) {
  // Create scene
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x111111, 0.02);

  // Create camera
  camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.set(0, 2, -5);
  camera.lookAt(0, 0, 0);

  // Create renderers
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  css2dRenderer = new CSS2DRenderer();
  css2dRenderer.setSize(container.clientWidth, container.clientHeight);
  css2dRenderer.domElement.style.position = 'absolute';
  css2dRenderer.domElement.style.top = '0';
  css2dRenderer.domElement.style.left = '0';
  css2dRenderer.domElement.style.pointerEvents = 'none';
  container.appendChild(css2dRenderer.domElement);

  // Create path
  const points = careerData.map(item => item.position);
  path = new THREE.CatmullRomCurve3(points);

  // Create tube geometry
  const tubeGeometry = new THREE.TubeGeometry(path, 64, 0.5, 8, false);
  const tubeMaterial = new THREE.MeshStandardMaterial({
    color: 0x00aaff,
    emissive: 0x0044aa,
    roughness: 0.1
  });
  tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
  scene.add(tube);

  // Create nodes
  careerData.forEach((item, index) => {
    const sphereGeometry = new THREE.SphereGeometry(0.8, 16, 16);
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: item.color,
      emissive: new THREE.Color(item.color).multiplyScalar(0.3),
      roughness: 0.2
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.copy(item.position);
    sphere.userData = { index, data: item };
    scene.add(sphere);
    nodes.push(sphere);

    // Create HTML card
    const cardDiv = document.createElement('div');
    cardDiv.className = 'timeline-card hidden';
    cardDiv.innerHTML = `
      <h3>${item.year} - ${item.location}</h3>
      <p><strong>${item.role}</strong></p>
      <p>${item.company}</p>
      <div class="timeline-description">${item.description.replace(/\n/g, '<br>')}</div>
    `;
    const cardLabel = new CSS2DObject(cardDiv);
    cardLabel.position.copy(item.position).add(new THREE.Vector3(0, 2, 0));
    scene.add(cardLabel);
    cards.push({ label: cardLabel, div: cardDiv, position: item.position });
  });

  // Add lighting
  const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(10, 10, 5);
  scene.add(directionalLight);

  // Add starfield
  createStarfield();

  // Setup GSAP ScrollTrigger
  setupScrollAnimation(container);

  // Handle resize
  window.addEventListener('resize', () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    css2dRenderer.setSize(width, height);
  });

  // Start render loop
  animate();
}

function createStarfield() {
  const starGeometry = new THREE.BufferGeometry();
  const starCount = 1000;
  const positions = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 200;
  }

  starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.5,
    transparent: true,
    opacity: 0.8
  });

  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);
}

function setupScrollAnimation(container) {
  const section = container.closest('.section');
  const scroller = container.closest('.slide');

  gsap.timeline({
    scrollTrigger: {
      trigger: section,
      scroller: scroller,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        // Move camera along path
        const pointOnPath = path.getPointAt(progress);
        
        // Offset camera to see the tube from outside
        camera.position.copy(pointOnPath).add(new THREE.Vector3(0, 2, -5));
        camera.lookAt(pointOnPath);

        // Show/hide cards based on distance
        cards.forEach((card, index) => {
          const distance = camera.position.distanceTo(card.position);
          if (distance < 8) {
            card.div.classList.remove('hidden');
            card.div.classList.add('visible');
          } else {
            card.div.classList.remove('visible');
            card.div.classList.add('hidden');
          }
        });
      }
    }
  });
}

function animate() {
  animationFrameId = requestAnimationFrame(animate);
  renderer.render(scene, camera);
  css2dRenderer.render(scene, camera);
}

export function destroyCareer3D() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
  gsap.ScrollTrigger.getAll().forEach(trigger => trigger.kill());

  if (renderer) {
    renderer.dispose();
  }
  if (css2dRenderer) {
    css2dRenderer.domElement.remove();
  }
}