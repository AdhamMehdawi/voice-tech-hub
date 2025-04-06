
import React, { useEffect, useRef, useState } from 'react';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  
  useEffect(() => {
    console.log('ElevenLabs component mounting...');
    let isMounted = true;
    
    // Clear the container and add the widget
    if (containerRef.current) {
      try {
        // Create the widget element with the exact structure from the embed code
        const widgetElement = document.createElement('elevenlabs-conval');
        widgetElement.setAttribute('agent-id', agentId);
        
        // Clear container safely before appending
        while (containerRef.current.firstChild) {
          containerRef.current.removeChild(containerRef.current.firstChild);
        }
        
        containerRef.current.appendChild(widgetElement);
        console.log('ElevenLabs widget element added to DOM');
      } catch (e) {
        console.error('Error creating ElevenLabs widget:', e);
        if (isMounted) {
          setError('Failed to create widget element');
          onError?.(e instanceof Error ? e : new Error('Unknown error'));
        }
      }
    }
    
    // Load the script if it doesn't exist
    const scriptId = 'elevenlabs-conval-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://elevenlabs.io/conval-widget/index.js';
      script.async = true;
      script.type = 'text/javascript';
      
      // Add load event listener
      script.onload = () => {
        console.log('ElevenLabs script loaded successfully');
        if (isMounted) {
          setLoading(false);
          onLoad?.();
        }
      };
      
      script.onerror = (e) => {
        console.error('Error loading ElevenLabs script:', e);
        if (isMounted) {
          setError('Failed to load ElevenLabs script');
          setLoading(false);
          onError?.(new Error('Failed to load ElevenLabs script'));
        }
      };
      
      document.body.appendChild(script);
      scriptRef.current = script;
    } else {
      // Script already exists
      setLoading(false);
    }
    
    // Cleanup function
    return () => {
      isMounted = false;
      console.log('ElevenLabs component unmounting...');
      
      if (containerRef.current) {
        // Safely clear the container
        try {
          const container = containerRef.current;
          while (container.firstChild) {
            container.removeChild(container.firstChild);
          }
        } catch (e) {
          console.error('Error cleaning up ElevenLabs widget container:', e);
        }
      }
      
      // Don't remove the script on unmount as it might be used by other instances
      console.log('ElevenLabs component unmounted');
    };
  }, [agentId, onLoad, onError]);
  
  return (
    <div ref={containerRef} className="elevenlabs-widget-container h-full w-full bg-transparent z-50">
      {loading && (
        <div className="flex items-center justify-center h-full w-full">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] mb-4"></div>
            <p className="text-lg">Initializing voice interface...</p>
          </div>
        </div>
      )}
      {error && (
        <div className="flex items-center justify-center h-full w-full">
          <div className="text-center text-red-500 p-4 rounded-md">
            <p className="font-bold mb-2">Error</p>
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ElevenLabsConversationalAI;
