import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, Text, Html } from "@react-three/drei";
import { Suspense, useState } from "react";
import { Plant } from "./PlantCard";
import { Loader2, RotateCcw, ZoomIn, ZoomOut, Move3D } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PlantModelViewerProps {
  plant: Plant;
}

// Fallback 3D model component (since we don't have actual .glb files)
function PlantModel({ plant }: { plant: Plant }) {
  return (
    <group>
      {/* Stem */}
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[0.05, 0.1, 2, 8]} />
        <meshStandardMaterial color="#2d5016" />
      </mesh>
      
      {/* Leaves */}
      <mesh position={[0.3, 0.5, 0]} rotation={[0, 0, Math.PI / 6]}>
        <planeGeometry args={[0.8, 1.2]} />
        <meshStandardMaterial color="#4a7c23" side={2} />
      </mesh>
      
      <mesh position={[-0.3, 0.8, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <planeGeometry args={[0.6, 1]} />
        <meshStandardMaterial color="#5a8b2a" side={2} />
      </mesh>
      
      <mesh position={[0.2, 1.2, -0.3]} rotation={[Math.PI / 6, Math.PI / 4, 0]}>
        <planeGeometry args={[0.7, 0.9]} />
        <meshStandardMaterial color="#6aa832" side={2} />
      </mesh>
      
      {/* Flowers/Fruits based on plant type */}
      {plant.name.toLowerCase().includes('turmeric') && (
        <mesh position={[0, 1.5, 0]}>
          <sphereGeometry args={[0.2, 8, 6]} />
          <meshStandardMaterial color="#ff6b35" />
        </mesh>
      )}
      
      {plant.name.toLowerCase().includes('tulsi') && (
        <>
          <mesh position={[0.1, 1.3, 0.1]}>
            <sphereGeometry args={[0.05, 6, 4]} />
            <meshStandardMaterial color="#9b4dca" />
          </mesh>
          <mesh position={[-0.1, 1.4, -0.1]}>
            <sphereGeometry args={[0.05, 6, 4]} />
            <meshStandardMaterial color="#9b4dca" />
          </mesh>
        </>
      )}
      
      {/* Add floating plant name */}
      <Text
        position={[0, 2, 0]}
        fontSize={0.3}
        color="#4a7c23"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-medium.woff"
      >
        {plant.name}
      </Text>
    </group>
  );
}

// Loading component
function LoadingFallback() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading 3D model...</p>
      </div>
    </Html>
  );
}

export const PlantModelViewer = ({ plant }: PlantModelViewerProps) => {
  const [cameraReset, setCameraReset] = useState(0);

  const resetCamera = () => {
    setCameraReset(prev => prev + 1);
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-sky-100 to-green-50 dark:from-slate-800 dark:to-slate-900">
      {/* 3D Canvas */}
      <Canvas
        key={cameraReset}
        camera={{ 
          position: [3, 3, 3], 
          fov: 50,
          near: 0.1,
          far: 1000
        }}
        shadows
        className="w-full h-full"
      >
        <Suspense fallback={<LoadingFallback />}>
          {/* Lighting setup */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[-10, -10, -10]} intensity={0.3} />
          
          {/* Stage for better presentation */}
          <Stage environment="forest" adjustCamera={false}>
            <PlantModel plant={plant} />
          </Stage>
          
          {/* Camera controls */}
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={1}
            maxDistance={10}
            minPolarAngle={0}
            maxPolarAngle={Math.PI}
            autoRotate={false}
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>

      {/* Control Panel */}
      <div className="absolute bottom-4 left-4 flex flex-col space-y-2">
        <div className="bg-background/80 backdrop-blur-sm rounded-lg p-2 border border-border/50">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-2">
            <Move3D className="w-3 h-3" />
            <span>3D Controls</span>
          </div>
          <div className="flex flex-col space-y-1 text-xs text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Click & drag to rotate</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span>Scroll to zoom</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              <span>Right-click & drag to pan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reset Camera Button */}
      <div className="absolute bottom-4 right-4">
        <Button
          variant="secondary"
          size="sm"
          onClick={resetCamera}
          className="bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-background/90"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset View
        </Button>
      </div>

      {/* Model Info Overlay */}
      <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm rounded-lg p-3 border border-border/50 max-w-xs">
        <h3 className="font-medium text-foreground mb-1">{plant.name}</h3>
        <p className="text-xs text-muted-foreground italic mb-2">{plant.botanicalName}</p>
        <p className="text-xs text-muted-foreground">
          Interactive 3D model showing plant structure and characteristics. 
          This demonstration model represents the general appearance of {plant.name.toLowerCase()}.
        </p>
      </div>

      {/* Feature Badge */}
      <div className="absolute top-4 right-4">
        <div className="bg-primary/10 backdrop-blur-sm rounded-full px-3 py-1 border border-primary/20">
          <span className="text-xs font-medium text-primary">3D Model Preview</span>
        </div>
      </div>
    </div>
  );
};