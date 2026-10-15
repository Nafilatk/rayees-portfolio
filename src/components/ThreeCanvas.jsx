import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    let renderer, scene, camera, animationFrameId;
    let lensGroup, innerCollar, apertureGroup, dustParticles;
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    try {
      const container = canvasRef.current.parentElement;
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;

      // 1. Scene & Camera
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.set(0, 0, 5.5);

      // 2. Renderer
      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // 3. Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xfff2db, 2.5);
      keyLight.position.set(4, 5, 3);
      scene.add(keyLight);

      const rimLight = new THREE.DirectionalLight(0xacee01, 1.8);
      rimLight.position.set(-4, -3, -2);
      scene.add(rimLight);

      const fillLight = new THREE.PointLight(0xacee01, 0.9);
      fillLight.position.set(0, -2, 2);
      scene.add(fillLight);

      // 4. Cinema Lens Mesh Group
      lensGroup = new THREE.Group();
      lensGroup.scale.set(1.15, 1.15, 1.15);

      // Outer Lens Barrel
      const barrelGeo = new THREE.CylinderGeometry(2.2, 2.2, 0.4, 48, 1, true);
      const barrelMat = new THREE.MeshStandardMaterial({
        color: 0x050505,
        metalness: 0.95,
        roughness: 0.2,
        side: THREE.DoubleSide
      });
      const barrelMesh = new THREE.Mesh(barrelGeo, barrelMat);
      lensGroup.add(barrelMesh);

      // Light and Bright Green Anamorphic Accent Ring
      const goldRingGeo = new THREE.TorusGeometry(2.18, 0.04, 16, 64);
      const goldRingMat = new THREE.MeshStandardMaterial({
        color: 0xacee01,
        metalness: 0.9,
        roughness: 0.15,
        emissive: 0xacee01,
        emissiveIntensity: 0.35
      });
      const goldRing = new THREE.Mesh(goldRingGeo, goldRingMat);
      goldRing.position.z = 0.15;
      lensGroup.add(goldRing);

      // Focus Gear Teeth Ring
      const gearGeo = new THREE.CylinderGeometry(2.26, 2.26, 0.15, 60);
      const gearMat = new THREE.MeshStandardMaterial({
        color: 0x0e0e0e,
        metalness: 0.85,
        roughness: 0.4
      });
      const gear = new THREE.Mesh(gearGeo, gearMat);
      gear.position.z = -0.15;
      lensGroup.add(gear);

      // Inner Aperture Collar
      innerCollar = new THREE.Group();
      const collarGeo = new THREE.CylinderGeometry(1.7, 1.7, 0.3, 32, 1, true);
      const collarMat = new THREE.MeshStandardMaterial({
        color: 0x020202,
        metalness: 0.95,
        roughness: 0.25,
        side: THREE.DoubleSide
      });
      const collarMesh = new THREE.Mesh(collarGeo, collarMat);
      innerCollar.add(collarMesh);

      // Metric Calibration Ticks
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const tickGeo = new THREE.BoxGeometry(0.08, 0.02, 0.02);
        const tickMat = new THREE.MeshBasicMaterial({
          color: i % 3 === 0 ? 0xacee01 : 0x555555
        });
        const tick = new THREE.Mesh(tickGeo, tickMat);
        tick.position.set(Math.cos(angle) * 1.75, Math.sin(angle) * 1.75, 0.05);
        tick.rotation.z = angle;
        innerCollar.add(tick);
      }
      lensGroup.add(innerCollar);

      // Mechanical Aperture Iris Blades
      apertureGroup = new THREE.Group();
      const bladeGeo = new THREE.PlaneGeometry(1.1, 0.35);
      const bladeMat = new THREE.MeshStandardMaterial({
        color: 0x18181f,
        metalness: 0.95,
        roughness: 0.2,
        side: THREE.DoubleSide
      });
      for (let i = 0; i < 9; i++) {
        const angle = (i / 9) * Math.PI * 2;
        const blade = new THREE.Mesh(bladeGeo, bladeMat);
        blade.position.set(Math.cos(angle) * 0.7, Math.sin(angle) * 0.7, 0);
        blade.rotation.z = angle + 0.5;
        apertureGroup.add(blade);
      }
      lensGroup.add(apertureGroup);

      // Front Optical Glass Element
      const glassGeo = new THREE.SphereGeometry(1.65, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.35);
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0x94a3b8,
        transmission: 0.9,
        opacity: 0.85,
        transparent: true,
        roughness: 0.05,
        ior: 1.52,
        reflectivity: 0.6,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        side: THREE.DoubleSide
      });
      const glass = new THREE.Mesh(glassGeo, glassMat);
      glass.position.z = 0.08;
      lensGroup.add(glass);

      // Anti-Reflective Coating Sheen
      const sheenGeo = new THREE.RingGeometry(0.6, 1.4, 32);
      const sheenMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.12,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending
      });
      const sheen = new THREE.Mesh(sheenGeo, sheenMat);
      sheen.position.z = 0.12;
      sheen.rotation.set(0.4, 0.3, 0);
      lensGroup.add(sheen);

      scene.add(lensGroup);

      // 5. Cinematic Projector Dust Motes
      const dustCount = 80;
      const dustPositions = new Float32Array(dustCount * 3);
      for (let i = 0; i < dustCount; i++) {
        dustPositions[i * 3] = (Math.random() - 0.5) * 10;
        dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 8;
        dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      }
      const dustGeo = new THREE.BufferGeometry();
      dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
      const dustMat = new THREE.PointsMaterial({
        size: 0.035,
        color: 0xacee01,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending
      });
      dustParticles = new THREE.Points(dustGeo, dustMat);
      scene.add(dustParticles);

      // 6. Mouse Listener
      const onPointerMove = (e) => {
        mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener('mousemove', onPointerMove, { passive: true });

      // 7. Resize Listener
      const onResize = () => {
        if (!container || !renderer || !camera) return;
        const w = container.clientWidth || window.innerWidth;
        const h = container.clientHeight || window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener('resize', onResize);

      // 8. Render Animation Loop with Viewport Visibility Observer (Saves 100% GPU when scrolled offscreen)
      let clock = new THREE.Clock();
      let isVisible = true;

      const animate = () => {
        if (!isVisible) {
          animationFrameId = null;
          return;
        }

        animationFrameId = requestAnimationFrame(animate);
        const delta = clock.getDelta();
        const elapsedTime = clock.getElapsedTime();

        // Smooth mouse dampening
        mouse.x += (mouse.targetX - mouse.x) * 0.05;
        mouse.y += (mouse.targetY - mouse.y) * 0.05;

        if (lensGroup) {
          lensGroup.rotation.y = mouse.x * 0.4 + elapsedTime * 0.12;
          lensGroup.rotation.x = -mouse.y * 0.3 + Math.sin(elapsedTime * 0.4) * 0.08;
          lensGroup.position.y = Math.sin(elapsedTime * 0.5) * 0.1;
        }

        if (innerCollar) {
          innerCollar.rotation.z += delta * 0.15;
        }
        if (apertureGroup) {
          apertureGroup.rotation.z -= delta * 0.1;
        }

        if (dustParticles) {
          const positions = dustParticles.geometry.attributes.position.array;
          for (let i = 1; i < dustCount * 3; i += 3) {
            positions[i] += delta * 0.1;
            if (positions[i] > 4) positions[i] = -4;
          }
          dustParticles.geometry.attributes.position.needsUpdate = true;
        }

        renderer.render(scene, camera);
      };

      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          isVisible = entry.isIntersecting;
          if (isVisible && !animationFrameId) {
            clock.start();
            animate();
          }
        },
        { threshold: 0.01 }
      );

      if (canvasRef.current) {
        observer.observe(canvasRef.current);
      }

      animate();

      return () => {
        observer.disconnect();
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('mousemove', onPointerMove);
        window.removeEventListener('resize', onResize);
        if (renderer) renderer.dispose();
      };
    } catch (err) {
      console.warn("Three.js canvas init failed gracefully:", err);
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-65"
      style={{ display: 'block' }}
    />
  );
}
