
import React, { useState, useEffect } from 'react';

interface JarvisInterfaceProps {
  onActivate?: () => void;
}

const JarvisInterface = ({ onActivate }: JarvisInterfaceProps) => {
  const [rotationDegree, setRotationDegree] = useState(0);
  
  // Create a rotation effect for outer circuit elements
  useEffect(() => {
    const interval = setInterval(() => {
      setRotationDegree(prev => (prev + 0.2) % 360);
    }, 50);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="fixed inset-0 pointer-events-none flex flex-col">
      {/* Header with JARVIS logo */}
      <div className="flex justify-between items-center p-6">
        <div className="flex items-center">
          <div className="h-4 w-4 rounded-full bg-jarvis-blue mr-3 animate-pulse"></div>
          <span className="text-jarvis-blue text-xl font-bold tracking-wider">JARVIS</span>
        </div>
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-jarvis-blue mr-2 animate-pulse-slow"></div>
          <span className="text-jarvis-blue text-xs">Online</span>
        </div>
      </div>
      
      {/* Center circular UI */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative">
          {/* Jarvis Circular Interface Image */}
          <div className="relative w-96 h-96 flex items-center justify-center">
            {/* Rotating circuit elements */}
            <div 
              className="absolute inset-0 w-full h-full"
              style={{ transform: `rotate(${rotationDegree}deg)`, transition: 'transform 0.1s linear' }}
            >
              <img 
                src="/lovable-uploads/fdc68df8-60ca-47a6-b356-de32b60e25e5.png" 
                alt="Jarvis Interface" 
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* Inner animated circles */}
            <div className="absolute w-48 h-48 rounded-full border border-jarvis-blue/30 animate-pulse-slow"></div>
            <div className="absolute w-36 h-36 rounded-full border border-jarvis-blue/50 animate-[pulse_3s_ease-in-out_infinite]"></div>
            
            {/* Center core with pulsing effect - removed button styling */}
            <div 
              onClick={onActivate}
              className="w-24 h-24 rounded-full bg-gradient-radial from-jarvis-blue to-jarvis-blue/5 shadow-[0_0_40px_rgba(59,130,246,0.5)] flex items-center justify-center relative pointer-events-auto cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full bg-jarvis-blue/50 backdrop-blur-md flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-jarvis-blue flex items-center justify-center pulse-effect">
                  <span className="text-white text-xs font-semibold">START</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Animated data points around the circle */}
          <div className="absolute top-1/4 -left-32 text-jarvis-blue/70 text-xs tracking-wider animate-fade-in">
            <div className="flex items-center">
              <div className="h-1 w-1 rounded-full bg-jarvis-blue mr-2 animate-pulse"></div>
              SYSTEMS_ONLINE
            </div>
          </div>
          
          <div className="absolute bottom-1/4 -right-32 text-jarvis-blue/70 text-xs tracking-wider animate-fade-in">
            <div className="flex items-center">
              <div className="h-1 w-1 rounded-full bg-jarvis-blue mr-2 animate-pulse"></div>
              NEURAL_NETWORK_ACTIVE
            </div>
          </div>
          
          <div className="absolute -top-20 left-1/3 text-jarvis-blue/70 text-xs tracking-wider animate-fade-in">
            <div className="flex items-center">
              <div className="h-1 w-1 rounded-full bg-jarvis-blue mr-2 animate-pulse"></div>
              QUANTUM_PROCESSOR_READY
            </div>
          </div>
          
          {/* Dynamic data display elements */}
          <div className="absolute top-1/3 -right-56 text-jarvis-blue/50 text-xs tracking-wider">
            <div className="animate-[pulse_4s_ease-in-out_infinite]">SYS_STATUS: OPTIMAL</div>
          </div>
          
          <div className="absolute bottom-10 -left-20 text-jarvis-blue/50 text-xs tracking-wider animate-pulse-slow">JARVIS</div>
          <div className="absolute bottom-5 -left-20 text-jarvis-blue/30 text-[10px] tracking-wider">v1.0.0 // ONLINE</div>
          
          {/* Small dots with different animation timings */}
          <div className="absolute top-1/4 -left-10 w-1 h-1 rounded-full bg-jarvis-blue animate-[pulse_2s_ease-in-out_infinite]"></div>
          <div className="absolute bottom-1/4 -right-10 w-1 h-1 rounded-full bg-jarvis-blue animate-[pulse_3s_ease-in-out_infinite]"></div>
          <div className="absolute right-1/4 -top-10 w-1 h-1 rounded-full bg-jarvis-blue animate-[pulse_4s_ease-in-out_infinite]"></div>
          
          {/* Additional circuit path elements */}
          <div className="absolute top-1/2 -left-40 w-28 h-px bg-jarvis-blue/30"></div>
          <div className="absolute top-1/2 -right-40 w-28 h-px bg-jarvis-blue/30"></div>
          <div className="absolute left-1/2 -top-40 h-28 w-px bg-jarvis-blue/30"></div>
          <div className="absolute left-1/2 -bottom-40 h-28 w-px bg-jarvis-blue/30"></div>
        </div>
      </div>
    </div>
  );
};

export default JarvisInterface;
