'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

export default function ThreeScene() {
  return (
    <div className="fixed inset-0 -z-10 opacity-70">
      <Canvas camera={{ position: [0, 0, 35], fov: 60 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        {[...Array(28)].map((_, i) => (
          <mesh
            key={i}
            position={[
              (Math.random() - 0.5) * 60,
              (Math.random() - 0.5) * 60,
              (Math.random() - 0.5) * 40,
            ]}
          >
            <icosahedronGeometry args={[2, 0]} />
            <meshStandardMaterial
              color="#83C5BE"
              wireframe
              emissive="#83C5BE"
              emissiveIntensity={0.8}
            />
          </mesh>
        ))}
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}