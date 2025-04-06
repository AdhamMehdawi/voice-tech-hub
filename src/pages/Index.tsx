
import React from 'react';
import ElevenLabsConversationalAI from '@/components/ElevenLabsConversationalAI';
import JarvisInterface from '@/components/JarvisInterface';

const Index = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <JarvisInterface />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
          <ElevenLabsConversationalAI agentId="xyWFCQVZhNLeTZItTuLa" />
        </div>
      </div>
    </div>
  );
};

export default Index;
