
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
    if (!document.querySelector('script[src="https://elevenlabs.io/conval-widget/index.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://elevenlabs.io/conval-widget/index.js';
      script.async = true;
      script.type = 'text/javascript';
      document.body.appendChild(script);
    }
    
    // Cleanup function
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [agentId]);
  
  return (
    <div ref={containerRef} className="elevenlabs-widget-container h-full w-full"></div>
  );
};

export default ElevenLabsConversationalAI;
