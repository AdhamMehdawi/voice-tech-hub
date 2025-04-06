
import React, { useEffect, useRef } from 'react';

interface ElevenLabsConversationalAIProps {
  agentId: string;
}

const ElevenLabsConversationalAI: React.FC<ElevenLabsConversationalAIProps> = ({ agentId }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Clear the container
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
      
      // Create the widget element with the exact structure from the embed code
      const widgetElement = document.createElement('elevenlabs-conval');
      widgetElement.setAttribute('agent-id', agentId);
      containerRef.current.appendChild(widgetElement);
    }
    
    // Load the script if it doesn't exist
    const scriptId = 'elevenlabs-conval-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://elevenlabs.io/conval-widget/index.js';
      script.async = true;
      script.type = 'text/javascript';
      document.body.appendChild(script);
      
      // For debugging
      console.log('ElevenLabs script loaded');
    }
    
    // Cleanup function
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [agentId]);
  
  // Log when component is mounted
  console.log('ElevenLabs component mounted with agent ID:', agentId);
  
  return (
    <div ref={containerRef} className="elevenlabs-widget-container h-full w-full">
      {/* Widget will be appended here by the useEffect */}
    </div>
  );
};

export default ElevenLabsConversationalAI;
