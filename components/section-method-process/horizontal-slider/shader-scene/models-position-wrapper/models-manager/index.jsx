"use client";

import { useState, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, useGLTF } from "@react-three/drei";
import * as THREE from 'three';
import gsap from "gsap";

const glbModels = [
  "/models/sketchbook.glb",
  "/models/vector_design.glb",
  "/models/customer_feedback.glb",
  "/models/mailbox.glb",
];

// Préchargement des modèles
glbModels.forEach((model) => {
  useGLTF.preload(model);
});

const ModelsManager = ({ activeIndex, isDotNavigationScrolling, ...props }) => {
    const models = glbModels.map((path) => useGLTF(path));
    const modelsRef = useRef([]);

    const [displayedIndex, setDisplayedIndex] = useState(null);
    const [pendingIndex, setPendingIndex] = useState(null);
    const [hovered, setHovered] = useState(false);

    const color = useRef(new THREE.Color());

    // Étape 1 : fadeOut de l'ancien modèle puis attente pour afficher le nouveau
    useEffect(() => {
      if (isDotNavigationScrolling) return;
      if (activeIndex === displayedIndex) return;

      const fadeOut = (index) => {
        return new Promise((resolve) => {
          const model = modelsRef.current[index];
          if (!model) {
            resolve();
            return;
          }
        
          gsap.to(model.scale, {
            x: 0.95,
            y: 0.95,
            z: 0.95,
            duration: 0.2,
            ease: "power2.in",
          });
        
          gsap.to(model.position, {
            x: 1,
            duration: 0.2,
            ease: "power2.in",
          });
        
          model.traverse((child) => {
            if (child.isMesh && child.material) {
              gsap.to(child.material, {
                opacity: 0,
                duration: 0.2,
                ease: "power2.in",
                onComplete: resolve,
              });
            }
          });
        });
      };

      const animateOut = async () => {
        await fadeOut(displayedIndex);
        setPendingIndex(activeIndex);
        if (activeIndex === null) {
          setDisplayedIndex(null);
        }
      };

      animateOut();
    }, [activeIndex, displayedIndex, isDotNavigationScrolling]);

    // Étape 2 : après que le modèle soit visible (via pendingIndex), on le définit comme affiché
    useEffect(() => {
      if (pendingIndex === null) return;

      const model = modelsRef.current[pendingIndex];
      if (!model) return;

      // Préparation du modèle avant l'animation
      model.position.x = -1;
      model.scale.set(0.95, 0.95, 0.95);
      model.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.transparent = true;
          child.material.opacity = 0;
        }
      });

      // On attend un frame pour s'assurer que React a rendu le modèle visible
      requestAnimationFrame(() => {
        setDisplayedIndex(pendingIndex);
        setPendingIndex(null);
      });
    }, [pendingIndex]);

    // Étape 3 : fadeIn une fois le modèle rendu visible
    useEffect(() => {
      if (displayedIndex === null) return;

      const model = modelsRef.current[displayedIndex];
      if (!model) return;

      gsap.to(model.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(model.position, {
        x: 0,
        duration: 0.3,
        ease: "power2.out",
      });

      model.traverse((child) => {
        if (child.isMesh && child.material) {
          gsap.to(child.material, {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      });
    }, [displayedIndex]);

    useEffect(() => {
        if (displayedIndex === null) return;
        const model = modelsRef.current[displayedIndex];
        if (!model) return;

        model.traverse((child) => {
            if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            child.material.roughness = 0.5;
            child.material.metalness = 0.5;

            // Ajouter les handlers de hover
            child.onPointerOver = (e) => {
                e.stopPropagation();
                setHovered(child.name);
            };
            child.onPointerOut = (e) => {
                e.stopPropagation();
                setHovered(null);
            };
            }
        });
    }, [displayedIndex]);

    useFrame(() => {
        const model = modelsRef.current[displayedIndex];
        if (!model) return;

        model.traverse((child) => {
          if (child.isMesh && child.material) {
            const targetColor = hovered ? "#fce300" : "#9f9f9f";
            child.material.color.lerp(color.current.set(targetColor), 0.1);
          }
        });
    });


    return (
      <>
        {models.map((model, i) => (
          <group 
            key={i} {...props} 
            visible={i === displayedIndex} 
            onPointerOver={(e) => setHovered(e.object.name)}
            onPointerOut={() => setHovered(null)}
          >
              <Float
                  speed={2} // vitesse du flottement
                  rotationIntensity={1} // intensité de la rotation
                  floatIntensity={1} // intensité du déplacement vertical
                  floatingRange={[0, 0.25]} // amplitude verticale
                  enabled={i === displayedIndex && pendingIndex === null} // actif uniquement sur le modèle affiché
              >
                  <primitive
                    object={model.scene}
                    ref={(el) => (modelsRef.current[i] = el)}
                  />
              </Float>
          </group>
        ))}
      </>
    );
};

export default ModelsManager;