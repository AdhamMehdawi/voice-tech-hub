
import React from 'react';
import ElevenLabsConversationalAI from '@/components/ElevenLabsConversationalAI';

const Index = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-jarvis-gradient">
      <div className="w-full max-w-3xl">
        <ElevenLabsConversationalAI agentId="xyWFCQVZhNLeTZItTuLa" />
      </div>
    </div>
  );
};

export default Index;
