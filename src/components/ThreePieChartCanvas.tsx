import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CategoriaGastoGoverno } from '../data/transparenciaData';

interface Props {
  categorias: CategoriaGastoGoverno[];
  totalGeral: number;
  tipo: 'pizza' | 'rosca';
  hoveredId: string | null;
  selectedId: string | null;
  onHover: (id: string | null) => void;
  onSelect: (id: string | null) => void;
  autoRotate: boolean;
  explosao: number; // 0 a 1
  cameraPreset?: 'perspectiva' | 'topo' | 'frente';
}

export const ThreePieChartCanvas: React.FC<Props> = ({
  categorias,
  totalGeral,
  tipo,
  hoveredId,
  selectedId,
  onHover,
  onSelect,
  autoRotate,
  explosao,
  cameraPreset = 'perspectiva',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const slicesGroupRef = useRef<THREE.Group | null>(null);
  const meshesMapRef = useRef<Map<string, { mesh: THREE.Mesh; basePos: THREE.Vector3; dir: THREE.Vector3; mat: THREE.MeshStandardMaterial }>>(new Map());

  // Refs de estado mutável para evitar recriação desnecessária de cena
  const stateRef = useRef({
    hoveredId,
    selectedId,
    onHover,
    onSelect,
    explosao,
    autoRotate,
  });

  stateRef.current = {
    hoveredId,
    selectedId,
    onHover,
    onSelect,
    explosao,
    autoRotate,
  };

  // Inicialização da Cena Three.js (executa uma vez)
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 380;
    const height = container.clientHeight || 340;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 6.5, 7.5);
    cameraRef.current = camera;

    // 3. Renderer
    const isSoftwareGl = (() => {
      try {
        const testCanvas = document.createElement('canvas');
        const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');
        if (!gl) return true;
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        const gpu = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : '';
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(String(gpu));
      } catch {
        return false;
      }
    })();

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.maxPolarAngle = Math.PI / 2 - 0.05; // Não descer abaixo do chão
    controls.minDistance = 3.5;
    controls.maxDistance = 14;
    controlsRef.current = controls;

    // 5. Iluminação de Estúdio PBR
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x334155, 0.5);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff7ed, 1.4);
    keyLight.position.set(6, 10, 6);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe0f2fe, 0.7);
    fillLight.position.set(-6, 7, -4);
    scene.add(fillLight);

    // 6. Sombra de Contato Suave no Chão (Radial Soft Contact Shadow)
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const shadowCtx = shadowCanvas.getContext('2d');
    if (shadowCtx) {
      const gradient = shadowCtx.createRadialGradient(64, 64, 10, 64, 64, 60);
      gradient.addColorStop(0, 'rgba(15, 23, 42, 0.35)');
      gradient.addColorStop(0.5, 'rgba(15, 23, 42, 0.12)');
      gradient.addColorStop(1, 'rgba(15, 23, 42, 0)');
      shadowCtx.fillStyle = gradient;
      shadowCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(8, 8);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.02;
    scene.add(shadowPlane);

    // 7. Grupo de fatias
    const slicesGroup = new THREE.Group();
    scene.add(slicesGroup);
    slicesGroupRef.current = slicesGroup;

    // 8. Raycaster para detecção de hover e clique
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const meshes = Array.from(meshesMapRef.current.values()).map((v) => v.mesh);
      const intersects = raycaster.intersectObjects(meshes, false);

      if (intersects.length > 0) {
        const topMesh = intersects[0].object as THREE.Mesh;
        const catId = topMesh.userData.id;
        renderer.domElement.style.cursor = 'pointer';
        if (stateRef.current.hoveredId !== catId) {
          stateRef.current.onHover(catId);
        }
      } else {
        renderer.domElement.style.cursor = 'grab';
        if (stateRef.current.hoveredId !== null) {
          stateRef.current.onHover(null);
        }
      }
    };

    const handleClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const meshes = Array.from(meshesMapRef.current.values()).map((v) => v.mesh);
      const intersects = raycaster.intersectObjects(meshes, false);

      if (intersects.length > 0) {
        const topMesh = intersects[0].object as THREE.Mesh;
        const catId = topMesh.userData.id;
        stateRef.current.onSelect(stateRef.current.selectedId === catId ? null : catId);
      } else {
        stateRef.current.onSelect(null);
      }
    };

    const handlePointerLeave = () => {
      if (stateRef.current.hoveredId !== null) {
        stateRef.current.onHover(null);
      }
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousemove', handlePointerMove);
    domElement.addEventListener('click', handleClick);
    domElement.addEventListener('mouseleave', handlePointerLeave);

    // 9. Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    // 10. Loop de Animação
    let animationFrameId = 0;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Auto rotação suave quando habilitada e não interagindo com mouse
      if (stateRef.current.autoRotate && slicesGroupRef.current) {
        slicesGroupRef.current.rotation.y += 0.0035;
      }

      // Interpolação suave de posição das fatias (elevação e explosão)
      const curExplosao = stateRef.current.explosao;
      const curHover = stateRef.current.hoveredId;
      const curSelect = stateRef.current.selectedId;

      meshesMapRef.current.forEach(({ mesh, basePos, dir, mat }, catId) => {
        const isFocused = curHover === catId || curSelect === catId;
        const liftY = isFocused ? 0.35 : 0;
        const expDist = (curExplosao * 0.9) + (isFocused ? 0.25 : 0);

        const targetX = basePos.x + dir.x * expDist;
        const targetY = basePos.y + liftY;
        const targetZ = basePos.z + dir.z * expDist;

        mesh.position.x += (targetX - mesh.position.x) * 0.15;
        mesh.position.y += (targetY - mesh.position.y) * 0.15;
        mesh.position.z += (targetZ - mesh.position.z) * 0.15;

        // Destaque do material
        const targetEmissive = isFocused ? 0.22 : 0;
        mat.emissiveIntensity += (targetEmissive - mat.emissiveIntensity) * 0.2;
      });

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      domElement.removeEventListener('mousemove', handlePointerMove);
      domElement.removeEventListener('click', handleClick);
      domElement.removeEventListener('mouseleave', handlePointerLeave);
      controls.dispose();
      renderer.dispose();
      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
    };
  }, []);

  // Atualização das Fatias Geométricas 3D quando as categorias ou o tipo (pizza/rosca) mudam
  useEffect(() => {
    const group = slicesGroupRef.current;
    if (!group) return;

    // Limpar fatias anteriores
    while (group.children.length > 0) {
      const child = group.children[0] as THREE.Mesh;
      group.remove(child);
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (Array.isArray(child.material)) child.material.forEach((m) => m.dispose());
        else child.material.dispose();
      }
    }
    meshesMapRef.current.clear();

    const total = totalGeral > 0 ? totalGeral : 1;
    let angleAccum = 0;

    const outerRadius = 2.4;
    const innerRadius = tipo === 'rosca' ? 1.05 : 0;
    const sliceThickness = 0.55;

    categorias.forEach((cat) => {
      const fraction = cat.valor / total;
      const angleDelta = fraction * 2 * Math.PI;
      const startAngle = angleAccum;
      const endAngle = angleAccum + angleDelta;
      const midAngle = startAngle + angleDelta / 2;
      angleAccum += angleDelta;

      if (angleDelta < 0.005) return;

      // Criação da forma 2D da fatia com arcos
      const shape = new THREE.Shape();

      if (innerRadius > 0) {
        // Formato Rosca
        const xStartInner = innerRadius * Math.cos(startAngle);
        const yStartInner = innerRadius * Math.sin(startAngle);
        shape.moveTo(xStartInner, yStartInner);

        const xStartOuter = outerRadius * Math.cos(startAngle);
        const yStartOuter = outerRadius * Math.sin(startAngle);
        shape.lineTo(xStartOuter, yStartOuter);

        shape.absarc(0, 0, outerRadius, startAngle, endAngle, false);

        const xEndInner = innerRadius * Math.cos(endAngle);
        const yEndInner = innerRadius * Math.sin(endAngle);
        shape.lineTo(xEndInner, yEndInner);

        shape.absarc(0, 0, innerRadius, endAngle, startAngle, true);
        shape.closePath();
      } else {
        // Formato Pizza Sólida
        shape.moveTo(0, 0);
        shape.lineTo(outerRadius * Math.cos(startAngle), outerRadius * Math.sin(startAngle));
        shape.absarc(0, 0, outerRadius, startAngle, endAngle, false);
        shape.lineTo(0, 0);
        shape.closePath();
      }

      // Extrusão 3D com chanfros suaves (Bevel)
      const extrudeSettings: THREE.ExtrudeGeometryOptions = {
        depth: sliceThickness,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 1,
        bevelSize: 0.04,
        bevelThickness: 0.04,
      };

      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

      // Rotaciona a geometria para que o gráfico fique deitado no plano horizontal XZ
      geometry.rotateX(-Math.PI / 2);

      // Material PBR acetinado com reflexos
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(cat.cor),
        roughness: 0.3,
        metalness: 0.18,
        emissive: new THREE.Color(cat.cor),
        emissiveIntensity: 0,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData = { id: cat.id, nome: cat.nome, valor: cat.valor };

      // Vetor de direção radial para expansão e explosão
      const dirX = Math.cos(midAngle);
      const dirZ = -Math.sin(midAngle);
      const dir = new THREE.Vector3(dirX, 0, dirZ).normalize();

      group.add(mesh);
      meshesMapRef.current.set(cat.id, {
        mesh,
        basePos: new THREE.Vector3(0, 0, 0),
        dir,
        mat: material,
      });
    });
  }, [categorias, totalGeral, tipo]);

  // Atualização dos Presets de Câmera
  useEffect(() => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    if (cameraPreset === 'perspectiva') {
      camera.position.set(0, 6.5, 7.5);
      controls.target.set(0, 0.2, 0);
    } else if (cameraPreset === 'topo') {
      camera.position.set(0, 9.5, 0.1);
      controls.target.set(0, 0, 0);
    } else if (cameraPreset === 'frente') {
      camera.position.set(0, 3.2, 8.5);
      controls.target.set(0, 0.3, 0);
    }
    controls.update();
  }, [cameraPreset]);

  return (
    <div
      ref={mountRef}
      className="w-full h-80 sm:h-96 relative flex items-center justify-center select-none overflow-hidden rounded-2xl"
      style={{ touchAction: 'none' }}
    />
  );
};
