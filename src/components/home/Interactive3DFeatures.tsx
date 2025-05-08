
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text3D, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface Feature3DProps {
  position: [number, number, number];
  text: string;
  color: string;
  hoverColor: string;
  onClick?: () => void;
}

const Feature3D: React.FC<Feature3DProps> = ({ position, text, color, hoverColor, onClick }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * (hovered ? 0.5 : 0.1);
      
      // Gentle floating animation
      const t = state.clock.getElapsedTime();
      meshRef.current.position.y = position[1] + Math.sin(t * 0.5) * 0.1;
    }
  });

  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        setActive(!active);
        if (onClick) onClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
      }}
      scale={active || hovered ? 1.2 : 1}
    >
      <mesh ref={meshRef} castShadow>
        <octahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial
          color={hovered ? hoverColor : color}
          metalness={0.5}
          roughness={0.2}
          emissive={hovered ? hoverColor : "black"}
          emissiveIntensity={hovered ? 0.4 : 0}
        />
      </mesh>
      <Text3D
        font="/fonts/Inter_Bold.json"
        size={0.2}
        height={0.04}
        position={[0, -1.5, 0]}
      >
        {text}
        <meshStandardMaterial 
          color={hovered ? hoverColor : "white"} 
          emissive={hovered ? hoverColor : "white"}
          emissiveIntensity={hovered ? 0.6 : 0.1}
        />
      </Text3D>
    </group>
  );
};

const Interactive3DFeatures: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);
  
  const features = [
    { text: "AI Interviews", color: "#0076ff", hoverColor: "#3a95ff" },
    { text: "Resume Builder", color: "#2C74B3", hoverColor: "#5398dc" },
    { text: "Job Matching", color: "#205295", hoverColor: "#3a7ac0" },
    { text: "Coding Labs", color: "#144272", hoverColor: "#205a9e" },
    { text: "Analytics", color: "#0A2647", hoverColor: "#1a487a" }
  ];
  
  const featureDescriptions = [
    "Practice with our AI interviewer that provides real-time feedback on your responses.",
    "Build ATS-friendly resumes with smart suggestions and formatting.",
    "Get matched with jobs that fit your skills, experience, and preferences.",
    "Practice coding challenges in our interactive browser-based environment.",
    "Track your progress with detailed analytics and performance metrics."
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-6">
            <span className="h-1 w-12 rounded-full bg-highlite-accent mr-2"></span>
            <p className="text-highlite-accent font-medium">INTERACTIVE TOOLS</p>
            <span className="h-1 w-12 rounded-full bg-highlite-accent ml-2"></span>
          </div>
          <h2 className="text-4xl font-bold text-highlite-primary mb-4">Explore Our Features</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hover over each feature to see it in action. Click to learn more.
          </p>
        </div>
        
        <div className="relative">
          <div className="aspect-[16/9] w-full max-w-5xl mx-auto bg-gradient-to-br from-gray-100 to-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            <Canvas 
              shadows 
              camera={{ position: [0, 0, 8], fov: 45 }}
              dpr={[1, 2]}
            >
              <color attach="background" args={['#fcfcfc']} />
              <ambientLight intensity={0.2} />
              <spotLight 
                position={[10, 10, 10]} 
                angle={0.15} 
                penumbra={1} 
                intensity={1} 
                castShadow 
              />
              <Environment preset="city" />
              
              {features.map((feature, index) => (
                <Feature3D 
                  key={index}
                  position={[
                    4 * Math.cos((index / features.length) * Math.PI * 2),
                    0,
                    4 * Math.sin((index / features.length) * Math.PI * 2)
                  ]}
                  text={feature.text}
                  color={feature.color}
                  hoverColor={feature.hoverColor}
                  onClick={() => setSelectedFeature(index === selectedFeature ? null : index)}
                />
              ))}
              
              <OrbitControls 
                enableZoom={false}
                enablePan={false}
                rotateSpeed={0.5}
                autoRotate
                autoRotateSpeed={0.5}
              />
            </Canvas>
          </div>
          
          {selectedFeature !== null && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-md text-white px-6 py-4 rounded-lg max-w-md text-center">
              <p className="text-sm md:text-base">{featureDescriptions[selectedFeature]}</p>
            </div>
          )}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm italic">
            Click on a feature to see its description, or drag to rotate the view
          </p>
        </div>
      </div>
    </section>
  );
};

export default Interactive3DFeatures;
