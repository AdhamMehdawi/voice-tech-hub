
import React, { useState, useEffect } from 'react';
import ElevenLabsConversationalAI from '@/components/ElevenLabsConversationalAI';
import JarvisInterface from '@/components/JarvisInterface';

const Index = () => {
  const [showWidget, setShowWidget] = useState(false);
  
  const handleActivate = () => {
    console.log('Activating ElevenLabs widget');
    setShowWidget(true);
  };
  
  // Log when widget visibility changes
  useEffect(() => {
    console.log('Widget visibility:', showWidget ? 'visible' : 'hidden');
  }, [showWidget]);
  
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <JarvisInterface onActivate={handleActivate} />
        {showWidget && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-auto z-10">
            <ElevenLabsConversationalAI agentId="xyWFCQVZhNLeTZItTuLa" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
