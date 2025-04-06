import React, { useEffect, useRef } from 'react';

interface ElevenLabsConversationalAIProps {
  agentId: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

const ElevenLabsConversationalAI: React.FC<ElevenLabsConversationalAIProps> = ({ 
  agentId,
  onLoad,
  onError
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    // Only run this once to avoid re-creating the element
    if (initialized.current) return;
    initialized.current = true;

    try {
      if (!containerRef.current) return;
      
      // Create the widget element using the direct embed code
      const widget = document.createElement('elevenlabs-conval');
      widget.setAttribute('agent-id', agentId);
      
      // Clear container first
      containerRef.current.innerHTML = '';
      
      // Add widget to container
      containerRef.current.appendChild(widget);
      console.log('ElevenLabs widget element added to DOM');
      
      // Signal success
      if (onLoad) {
        // Give a short delay to allow the widget to initialize
        setTimeout(onLoad, 500);
      }
    } catch (error) {
      console.error('Error creating ElevenLabs widget:', error);
      if (onError) onError(error instanceof Error ? error : new Error('Failed to create widget'));
    }

    // No cleanup function - we'll let React handle removing the container
  }, [agentId, onLoad, onError]);

  return (
    <div 
      ref={containerRef} 
      className="elevenlabs-widget-container h-full w-full"
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    />
  );
};

export default ElevenLabsConversationalAI;
