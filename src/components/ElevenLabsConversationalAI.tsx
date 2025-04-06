
import React, { useEffect, useRef } from 'react';

interface ElevenLabsConversationalAIProps {
  agentId: string;
}

const ElevenLabsConversationalAI: React.FC<ElevenLabsConversationalAIProps> = ({ agentId }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    console.log('ElevenLabs component mounting...');
    
    // Clear the container and add the widget
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
      
      // Create the widget element with the exact structure from the embed code
      const widgetElement = document.createElement('elevenlabs-conval');
      widgetElement.setAttribute('agent-id', agentId);
      containerRef.current.appendChild(widgetElement);
      
      console.log('ElevenLabs widget element added to DOM');
    }
    
    // Load the script if it doesn't exist
    const scriptId = 'elevenlabs-conval-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://elevenlabs.io/conval-widget/index.js';
      script.async = true;
      script.type = 'text/javascript';
      
      // Add load event listener for debugging
      script.onload = () => {
        console.log('ElevenLabs script loaded successfully');
      };
      
      script.onerror = (e) => {
        console.error('Error loading ElevenLabs script:', e);
      };
      
      document.body.appendChild(script);
    }
    
    // Cleanup function
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
      console.log('ElevenLabs component unmounted');
    };
  }, [agentId]);
  
  return (
    <div ref={containerRef} className="elevenlabs-widget-container h-full w-full bg-transparent z-50">
      {/* Widget will be appended here by the useEffect */}
      <div className="flex items-center justify-center h-full w-full">
        <p className="text-jarvis-blue animate-pulse">Initializing Jarvis voice interface...</p>
      </div>
    </div>
  );
};

export default ElevenLabsConversationalAI;
