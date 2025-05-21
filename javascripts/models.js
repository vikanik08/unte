import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

document.addEventListener('DOMContentLoaded', () => {
  initThree();
});

function initThree() {
  const modelContainer = document.querySelector('.model');
  if (!modelContainer) {
    console.error('Контейнер для модели не найден');
    return;
  }

  const scene = new THREE.Scene();
  scene.background = null;

  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 3000);
  camera.position.set(0, 10, 25);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  modelContainer.appendChild(renderer.domElement);

  const loader = new GLTFLoader();
  let model = null;

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.autoRotate = true;
  controls.autoRotateSpeed = 2.5;
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.maxDistance = 100;
  controls.minDistance = 6;
  controls.maxPolarAngle = Math.PI / 2.2;

  loader.load(
    './model/sweaters.glb',
    (gltf) => {
      console.log(" Модель успешно загружена:", gltf);
      model = gltf.scene;
      scene.add(model);
    },
    (xhr) => {
      console.log(`Загружено: ${(xhr.loaded / xhr.total * 100).toFixed(2)}%`);
    },
    (error) => {
      console.error(" Ошибка загрузки модели:", error);
    }
  );

  // Освещение
  scene.add(new THREE.AmbientLight(0xffffff, 1.2));
  const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
  dirLight.position.set(50, 100, 50);
  scene.add(dirLight);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 1));

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  function centerModel(model) {
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center);
    model.position.y += 1;
  }

  function adjustModelForScreen() {
    if (!model) return;

    const width = window.innerWidth;

    if (width <= 375) {
      model.scale.set(0.01, 0.01, 0.01);
      camera.position.set(0, 2, 8);
    } else if (width <= 480) {
      model.scale.set(0.015, 0.015, 0.015);
      camera.position.set(0, 3, 10);
    } else if (width <= 768) {
      model.scale.set(0.2, 0.2, 0.2);
      camera.position.set(0, 6, 15);
      controls.minDistance = 5;
      controls.maxDistance = 20;
    } else if (width <= 1024) {
      model.scale.set(0.5, 0.5, 0.5);
      camera.position.set(0, 8, 20);
    } else {
      model.scale.set(1, 1, 1);
      camera.position.set(0, 10, 25);
    }

    const box = new THREE.Box3().setFromObject(model);
    controls.target.copy(box.getCenter(new THREE.Vector3()));
    controls.update();
  }

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    adjustModelForScreen();
  });
}