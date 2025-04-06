
import React, { useState, useEffect } from 'react';
import ElevenLabsWidget from '@/components/ElevenLabsWidget';
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [key, setKey] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  // Handle widget initialization
  const handleWidgetReady = () => {
    setLoading(false);
    console.log("Widget is ready!");
  };

  // Handle errors and reset widget if needed
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.message.includes('removeChild') || 
          event.message.includes('Node') || 
          event.message.includes('ConversationalAI')) {
        console.error("Detected widget error, attempting recovery:", event.message);
        
        // Reset the widget by changing the key to force remount
        setLoading(true);
        setTimeout(() => {
          setKey(prevKey => prevKey + 1);
        }, 1500);
      }
    };

    window.addEventListener('error', handleError);
    
    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black relative">
      {loading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black bg-opacity-80">
          <div className="text-white">Loading voice assistant...</div>
        </div>
      )}
      
      <ElevenLabsWidget 
        key={key} 
        agentId="yju4Z8TCpqP2wX4kV8Pm" 
        onReady={handleWidgetReady}
      />
    </div>
  );
};

export default Index;
