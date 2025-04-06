
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
    <div className="h-screen bg-black overflow-hidden">
      <JarvisInterface onActivate={handleActivate} />
      {showWidget && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-auto z-10">
          <ElevenLabsConversationalAI agentId="xyWFCQVZhNLeTZItTuLa" />
        </div>
      )}
    </div>
  );
};

export default Index;
