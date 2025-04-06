
import React from 'react';
import Header from '@/components/Header';
import ElevenLabsConversationalAI from '@/components/ElevenLabsConversationalAI';

const Index = () => {
  return (
    <div className="flex flex-col h-screen bg-jarvis-gradient text-foreground">
      <div className="relative flex flex-col max-w-3xl mx-auto w-full h-full border-x border-border/30 glass-panel">
        <Header />
        
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="h-full flex items-center justify-center">
            <ElevenLabsConversationalAI agentId="xyWFCQVZhNLeTZItTuLa" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
