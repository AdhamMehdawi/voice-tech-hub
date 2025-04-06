
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
  const mountedRef = useRef(true);
  
  useEffect(() => {
    console.log('ElevenLabs component mounting...');
    mountedRef.current = true;
    
    // Function to safely set state only if component is still mounted
    const safeSetState = (stateSetter: Function, value: any) => {
      if (mountedRef.current) {
        stateSetter(value);
      }
    };
    
    // Create the widget element with the exact structure from the embed code
    const setupWidget = () => {
      try {
        if (!containerRef.current) return;
        
        // Create the widget element
        const widgetElement = document.createElement('elevenlabs-conval');
        widgetElement.setAttribute('agent-id', agentId);
        
        // Safely clear the container first - check if the container has any children
        const container = containerRef.current;
        if (container) {
          // Instead of using while loop, use innerHTML to clear the container
          container.innerHTML = '';
          // Then append the new element
          container.appendChild(widgetElement);
        }
        
        console.log('ElevenLabs widget element added to DOM');
      } catch (e) {
        console.error('Error creating ElevenLabs widget:', e);
        if (mountedRef.current) {
          safeSetState(setError, 'Failed to create widget element');
          if (onError) onError(e instanceof Error ? e : new Error('Unknown error'));
        }
      }
    };
    
    // Load the script if it doesn't exist
    const loadScript = () => {
      const scriptId = 'elevenlabs-conval-script';
      let script = document.getElementById(scriptId) as HTMLScriptElement | null;
      
      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://elevenlabs.io/conval-widget/index.js';
        script.async = true;
        script.type = 'text/javascript';
        
        // Add load event listener
        script.onload = () => {
          console.log('ElevenLabs script loaded successfully');
          if (mountedRef.current) {
            safeSetState(setLoading, false);
            if (onLoad) onLoad();
          }
        };
        
        script.onerror = (e) => {
          console.error('Error loading ElevenLabs script:', e);
          if (mountedRef.current) {
            safeSetState(setError, 'Failed to load ElevenLabs script');
            safeSetState(setLoading, false);
            if (onError) onError(new Error('Failed to load ElevenLabs script'));
          }
        };
        
        document.body.appendChild(script);
        scriptRef.current = script;
      } else {
        // Script already exists
        safeSetState(setLoading, false);
      }
    };
    
    // Setup widget and load script
    setupWidget();
    loadScript();
    
    // Cleanup function
    return () => {
      console.log('ElevenLabs component unmounting...');
      mountedRef.current = false;
      
      // Safely clear the container using innerHTML instead of removeChild
      if (containerRef.current) {
        try {
          containerRef.current.innerHTML = '';
        } catch (e) {
          console.error('Error cleaning up ElevenLabs widget container:', e);
        }
      }
      
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
