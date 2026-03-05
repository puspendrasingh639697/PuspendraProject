import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Text3D, Float, Environment, PerspectiveCamera } from "@react-three/drei";

// 3D Dashboard Component
const Dashboard3D = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden relative">
      {/* 3D Canvas */}
      <Canvas className="absolute inset-0">
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={60} />
        <OrbitControls 
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
        />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, -10]} angle={0.3} penumbra={1} />
        
        {/* Background Grid */}
        <gridHelper args={[20, 20, 0xff0000, 0x444444]} rotation={[0, 0, 0]} />
        
        {/* Main Dashboard Panel */}
        <DashboardPanel position={[0, 0, 0]} />
        
        {/* Navigation Panel */}
        <NavigationPanel position={[-5, 2, -2]} />
        
        {/* Online Users Panel */}
        <OnlinePanel position={[4, 2, -1]} />
        
        {/* Leaderboard Panel */}
        <LeaderboardPanel position={[0, -2, 1]} />
        
        {/* Weather Panel */}
        <WeatherPanel position={[5, -1, -3]} />
        
        <Environment preset="city" />
      </Canvas>
      
      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="container mx-auto p-8 h-full flex flex-col">
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-8">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            >
              WHO
            </motion.h1>
            <div className="text-white text-sm font-mono opacity-70">
              3D DASHBOARD v1.0
            </div>
          </div>
          
          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="w-full max-w-md mx-auto mb-12 pointer-events-auto"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Type here to search..."
                className="w-full bg-black/50 backdrop-blur-xl border border-cyan-500/30 rounded-2xl py-4 px-6 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-cyan-400">
                🔍
              </div>
            </div>
          </motion.div>
          
          {/* Bottom Info Bar */}
          <div className="mt-auto flex justify-between items-center text-white/80 text-sm font-mono">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-cyan-400">ENG</span>
                <span>10:51 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-cyan-400">IN</span>
                <span>1/17/2026</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🌤️</span>
                <span>10°C Partly cloudy</span>
              </div>
            </div>
            <div className="text-xs opacity-50">
              • 3D INTERFACE • HOVER TO INTERACT • DRAG TO ROTATE •
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 3D Dashboard Panel Component
const DashboardPanel = ({ position }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[8, 4, 0.2]} />
        <meshStandardMaterial 
          color="#0a0a0a"
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.9}
        />
        {/* Panel Content */}
        <Text3D
          position={[-3, 1.5, 0.11]}
          scale={0.3}
          font="/fonts/helvetiker_bold.typeface.json"
          height={0.1}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          WHO DASHBOARD
          <meshNormalMaterial />
        </Text3D>
        
        {/* Stats */}
        <Text3D
          position={[-3, 0.5, 0.11]}
          scale={0.15}
          font="/fonts/helvetiker_bold.typeface.json"
        >
          WATCHLIST: 4,315
          <meshStandardMaterial color="#00ffff" />
        </Text3D>
        
        <Text3D
          position={[-3, 0, 0.11]}
          scale={0.15}
          font="/fonts/helvetiker_bold.typeface.json"
        >
          AVAILABLE: 28
          <meshStandardMaterial color="#00ff88" />
        </Text3D>
      </mesh>
    </Float>
  );
};

// 3D Navigation Panel Component
const NavigationPanel = ({ position }) => {
  const meshRef = useRef();
  const navItems = [
    "Discover", "Followings", "Search", "History", 
    "Messages", "Log In", "Sign Up"
  ];
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });
  
  return (
    <Float speed={1} rotationIntensity={0.3}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[3, 5, 0.1]} />
        <meshStandardMaterial 
          color="#111111"
          metalness={0.7}
          roughness={0.3}
        />
        
        {/* Navigation Title */}
        <Text3D
          position={[-1, 2, 0.06]}
          scale={0.15}
          font="/fonts/helvetiker_bold.typeface.json"
        >
          NAVIGATION
          <meshStandardMaterial color="#ff6b6b" />
        </Text3D>
        
        {/* Navigation Items */}
        {navItems.map((item, index) => (
          <React.Fragment key={index}>
            <Text3D
              position={[-1.2, 1.5 - index * 0.4, 0.06]}
              scale={0.08}
              font="/fonts/helvetiker_regular.typeface.json"
            >
              • {item}
              <meshStandardMaterial 
                color={index >= 5 ? "#00ffff" : "#ffffff"}
                emissive={index >= 5 ? "#00ffff" : "#000000"}
                emissiveIntensity={0.2}
              />
            </Text3D>
          </React.Fragment>
        ))}
      </mesh>
    </Float>
  );
};

// 3D Online Panel Component
const OnlinePanel = ({ position }) => {
  const meshRef = useRef();
  const countries = [
    "Featured", "New", "Russian", "Arabic", "Spanish", 
    "Turkish", "English", "Brazil", "Philippines", 
    "Vietnam", "Pakistán"
  ];
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.05;
    }
  });
  
  return (
    <Float speed={3} floatIntensity={0.7}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[4, 6, 0.1]} />
        <meshStandardMaterial 
          color="#0f172a"
          metalness={0.6}
          roughness={0.4}
        />
        
        {/* Panel Title */}
        <Text3D
          position={[-1.5, 2.5, 0.06]}
          scale={0.15}
          font="/fonts/helvetiker_bold.typeface.json"
        >
          ONLINE
          <meshStandardMaterial color="#f0b90b" />
        </Text3D>
        
        {/* Countries List */}
        {countries.map((country, index) => (
          <React.Fragment key={index}>
            <Text3D
              position={[-1.8, 2 - index * 0.4, 0.06]}
              scale={0.07}
              font="/fonts/helvetiker_regular.typeface.json"
            >
              {country === "Featured" ? "★ " : "• "}{country}
              <meshStandardMaterial 
                color={country === "Featured" ? "#f0b90b" : "#94a3b8"}
              />
            </Text3D>
          </React.Fragment>
        ))}
      </mesh>
    </Float>
  );
};

// 3D Leaderboard Panel Component
const LeaderboardPanel = ({ position }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.05;
    }
  });
  
  return (
    <Float speed={4} rotationIntensity={0.4}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[6, 2, 0.1]} />
        <meshStandardMaterial 
          color="#1e293b"
          metalness={0.9}
          roughness={0.1}
          emissive="#0ea5e9"
          emissiveIntensity={0.1}
        />
        
        {/* Title */}
        <Text3D
          position={[-2.5, 0.7, 0.06]}
          scale={0.15}
          font="/fonts/helvetiker_bold.typeface.json"
        >
          LEADERBOARD
          <meshStandardMaterial color="#0ea5e9" />
        </Text3D>
        
        {/* Stats */}
        <Text3D
          position={[-2.5, 0, 0.06]}
          scale={0.1}
          font="/fonts/helvetiker_bold.typeface.json"
        >
          StásnyNoir: 20
          <meshStandardMaterial color="#ffffff" />
        </Text3D>
        
        <Text3D
          position={[-2.5, -0.6, 0.06]}
          scale={0.1}
          font="/fonts/helvetiker_bold.typeface.json"
        >
          Available
          <meshStandardMaterial color="#10b981" />
        </Text3D>
      </mesh>
    </Float>
  );
};

// 3D Weather Panel Component
const WeatherPanel = ({ position }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });
  
  return (
    <Float speed={5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color="#1e40af"
          metalness={0.5}
          roughness={0.5}
          transparent
          opacity={0.8}
        />
        
        {/* Weather Icon */}
        <Text3D
          position={[0, 0.3, 0.6]}
          scale={0.3}
          font="/fonts/helvetiker_bold.typeface.json"
        >
          🌤️
          <meshBasicMaterial color="#fbbf24" />
        </Text3D>
        
        <Text3D
          position={[0, -0.3, 0.6]}
          scale={0.1}
          font="/fonts/helvetiker_bold.typeface.json"
        >
          10°C
          <meshStandardMaterial color="#ffffff" />
        </Text3D>
      </mesh>
    </Float>
  );
};

// Main Component
const WhoDashboard3D = ({ onClose }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-black"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 bg-black/50 backdrop-blur-xl border border-cyan-500/30 rounded-xl px-4 py-2 text-cyan-400 font-mono text-sm hover:bg-cyan-500/10 hover:border-cyan-400 transition-all"
      >
        EXIT 3D VIEW [ESC]
      </button>
      
      {/* Loading Screen */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black z-[10000]"
          >
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <div className="text-cyan-400 font-mono tracking-wider">
                LOADING 3D ENVIRONMENT...
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* 3D Dashboard */}
      {isLoaded && <Dashboard3D />}
      
      {/* Controls Help */}
      <div className="absolute bottom-4 left-4 z-50">
        <div className="bg-black/50 backdrop-blur-xl rounded-xl p-4 border border-white/10">
          <div className="text-white/70 text-xs font-mono space-y-1">
            <div>🖱️ LEFT DRAG: Rotate View</div>
            <div>🖱️ RIGHT DRAG: Pan View</div>
            <div>🖱️ SCROLL: Zoom In/Out</div>
            <div>🎯 HOVER: Highlight Elements</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WhoDashboard3D;