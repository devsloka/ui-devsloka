"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Line } from "@react-three/drei";
import * as THREE from "three";
import { FloatingDots } from "@/components/ui/floating-dots";

interface CountryFeature {
  type: "Feature";
  geometry: {
    type: "MultiPolygon" | "Polygon";
    coordinates: number[][][][];
  };
  properties: {
    NAME: string;
  };
}

function GlobeCountries() {
  const [countries, setCountries] = useState<CountryFeature[]>([]);
  const groupRef = useRef<THREE.Group>(null);
  const globeRadius = 1.005;

  useEffect(() => {
    fetch("/countries-110m.geojson")
      .then((response) => response.json())
      .then((data) => setCountries(data.features));
  }, []);

  const convertCoordinates = (lon: number, lat: number) => {
    const phi = THREE.MathUtils.degToRad(lon);
    const theta = THREE.MathUtils.degToRad(90 - lat);

    return new THREE.Vector3(
      globeRadius * Math.sin(theta) * Math.cos(phi),
      globeRadius * Math.sin(theta) * Math.sin(phi),
      globeRadius * Math.cos(theta)
    );
  };

  return (
    <group ref={groupRef}>
      {countries.map((country, i) => {
        // Handle both Polygon and MultiPolygon types
        const coordinates =
          country.geometry.type === "MultiPolygon"
            ? country.geometry.coordinates
            : [country.geometry.coordinates];

        return coordinates.flatMap((polygon, pi) =>
          polygon.flatMap((ring, ri) => {
            // Ensure we're working with position arrays
            const positions = ring.map((coord) => {
              // Handle both [lon, lat] and [lon, lat, height] formats
              const [lon, lat] = coord as [number, number];
              return convertCoordinates(lon, lat);
            });

            return (
              <Line
                key={`${i}-${pi}-${ri}`}
                points={positions}
                color="white"
                lineWidth={0.5}
                transparent
                opacity={0.8}
              />
            );
          })
        );
      })}
    </group>
  );
}

function Globe() {
  const groupRef = useRef<THREE.Group>(null);
  const indiaLon = 78.9629; // India's longitude
  const indiaLat = 20.5937; // India's latitude

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        THREE.MathUtils.degToRad(-indiaLon) + clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group
      ref={groupRef}
      rotation={[THREE.MathUtils.degToRad(-indiaLat), 0, 0]}
    >
      {/* Main globe sphere */}
      <Sphere args={[0.97, 64, 64]}>
        <meshPhongMaterial
          color="#182b4b"
          opacity={0.95}
          transparent
          specular="#204080"
          shininess={5}
        />
      </Sphere>

      {/* Country borders */}
      <GlobeCountries />

      {/* Equator positioned correctly */}
      <group>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1, 0.2, 64]} />
          <meshBasicMaterial
            color="#2a4a80"
            side={THREE.DoubleSide}
            transparent
            opacity={0}
          />
        </mesh>
      </group>
    </group>
  );
}
export function GlobeHero() {
  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-black to-blue-950">
      <FloatingDots
        className="w-full"
        maxRadius={0.5}
        maxSpeed={0.8}
        minSpeed={0.1}
      />
      <div className="absolute inset-0">
        <Canvas
          camera={{
            position: [0, 0.4, 2.2],
            fov: 75,
          }}
        >
          <ambientLight intensity={0.75} />
          <directionalLight position={[3, 3, 3]} intensity={1.5} />
          <Globe />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.3}
            autoRotate
            autoRotateSpeed={0.5}
            minDistance={1.5}
            maxDistance={3}
            target={[0, 0.2, 0]}
          />
        </Canvas>
      </div>
    </div>
  );
}
