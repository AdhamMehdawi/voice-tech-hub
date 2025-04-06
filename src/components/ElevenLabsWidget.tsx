import React, { useEffect, useRef } from 'react';

interface ElevenLabsWidgetProps {
  agentId: string;
  onReady?: () => void;
}

/**
 * A component that renders the ElevenLabs Conversational AI widget
 * using the exact embed code format provided by ElevenLabs
 */
const ElevenLabsWidget: React.FC<ElevenLabsWidgetProps> = ({ 
  agentId,
  onReady 
}) => {
  const widgetRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);
  
  useEffect(() => {
    // Only initialize once
    if (initialized.current) return;
    
    const initWidget = () => {
      if (!widgetRef.current) return;
      
      try {
        // Clear any existing content
        widgetRef.current.innerHTML = '';
        
        // Create the widget element with the new format
        const widgetHtml = `<elevenlabs-convai agent-id="${agentId}"></elevenlabs-convai>`;
        widgetRef.current.innerHTML = widgetHtml;
        
        // Create and add the script with the new URL
        const script = document.createElement('script');
        script.src = 'https://elevenlabs.io/convai-widget/index.js';
        script.async = true;
        script.type = 'text/javascript';
        document.body.appendChild(script);
        
        console.log('ElevenLabs widget initialized');
        initialized.current = true;
        
        // Notify parent that widget is ready
        if (onReady) {
          setTimeout(onReady, 2000);
        }
      } catch (error) {
        console.error('Error initializing ElevenLabs widget:', error);
      }
    };
    
    // Initialize after a short delay to ensure DOM is ready
    setTimeout(initWidget, 300);
    
    // Cleanup function
    return () => {
      initialized.current = false;
    };
  }, [agentId, onReady]);
  
  return (
    <div className="h-screen w-full flex items-center justify-center bg-black">
      {/* Subtle background glow effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute w-[500px] h-[500px] rounded-full opacity-20 bg-blue-500 blur-[100px]"></div>
      </div>
      
      {/* Widget container */}
      <div 
        ref={widgetRef}
        className="relative z-10 w-full h-full flex items-center justify-center"
        style={{ maxWidth: '1000px', margin: '0 auto' }}
      />
    </div>
  );
};

export default ElevenLabsWidget; 