
import React from 'react';
import { Button } from './ui/button';

interface JarvisInterfaceProps {
  onActivate?: () => void;
}

const JarvisInterface = ({ onActivate }: JarvisInterfaceProps) => {
  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col">
      {/* Header with JARVIS logo */}
      <div className="flex justify-between items-center p-6">
        <div className="flex items-center">
          <div className="h-4 w-4 rounded-full bg-jarvis-blue mr-3"></div>
          <span className="text-jarvis-blue text-xl font-bold tracking-wider">JARVIS</span>
        </div>
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-jarvis-blue mr-2"></div>
          <span className="text-jarvis-blue text-xs">Online</span>
        </div>
      </div>
      
      {/* Center circular UI */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative">
          {/* Outer circles */}
          <div className="absolute inset-0 rounded-full border-2 border-jarvis-blue/20 w-80 h-80 -m-10 animate-pulse-slow"></div>
          <div className="absolute inset-0 rounded-full border border-jarvis-blue/30 w-64 h-64 -m-4"></div>
          
          {/* Inner circle with glow effect and button */}
          <div className="relative w-48 h-48 rounded-full flex items-center justify-center">
            <div className="absolute inset-0 bg-jarvis-blue/10 rounded-full blur-xl"></div>
            <div className="absolute inset-0 bg-gradient-radial from-jarvis-blue/30 to-transparent rounded-full"></div>
            <div className="w-24 h-24 rounded-full bg-gradient-radial from-jarvis-blue to-jarvis-blue/5 shadow-[0_0_40px_rgba(59,130,246,0.5)] flex items-center justify-center relative">
              <Button 
                onClick={onActivate}
                className="w-16 h-16 rounded-full bg-jarvis-blue/30 backdrop-blur-md border border-jarvis-blue/50 hover:bg-jarvis-blue/50 transition-all pointer-events-auto flex items-center justify-center shadow-lg"
              >
                <div className="w-12 h-12 rounded-full bg-jarvis-blue flex items-center justify-center pulse-effect">
                  <span className="text-white text-xs font-semibold">START</span>
                </div>
              </Button>
            </div>
          </div>
          
          {/* Horizontal and vertical lines */}
          <div className="absolute top-1/2 -left-40 w-40 h-px bg-jarvis-blue/30"></div>
          <div className="absolute top-1/2 -right-40 w-40 h-px bg-jarvis-blue/30"></div>
          <div className="absolute left-1/2 -top-40 h-40 w-px bg-jarvis-blue/30"></div>
          <div className="absolute left-1/2 -bottom-40 h-40 w-px bg-jarvis-blue/30"></div>
          
          {/* Decorative elements */}
          <div className="absolute top-1/3 -right-56 text-jarvis-blue/50 text-xs tracking-wider">SYS_STATUS: OPTIMAL</div>
          <div className="absolute bottom-10 -left-20 text-jarvis-blue/50 text-xs tracking-wider">JARVIS</div>
          <div className="absolute bottom-5 -left-20 text-jarvis-blue/30 text-[10px] tracking-wider">v1.0.0 // ONLINE</div>
          
          {/* Small dots */}
          <div className="absolute top-1/4 -left-10 w-1 h-1 rounded-full bg-jarvis-blue"></div>
          <div className="absolute bottom-1/4 -right-10 w-1 h-1 rounded-full bg-jarvis-blue"></div>
          <div className="absolute right-1/4 -top-10 w-1 h-1 rounded-full bg-jarvis-blue"></div>
        </div>
      </div>
    </div>
  );
};

export default JarvisInterface;
