
import React, { useEffect, useRef, useState } from 'react';
import { toast } from "@/hooks/use-toast";

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
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  
  useEffect(() => {
    // Track whether component is mounted
    let isMounted = true;
    
    // Only initialize once
    if (initialized.current) return;
    
    const initWidget = () => {
      if (!widgetRef.current || !isMounted) return;
      
      try {
        // Clear any existing content
        widgetRef.current.innerHTML = '';
        
        // Create the widget element with the new format
        const widgetHtml = `<elevenlabs-convai agent-id="${agentId}"></elevenlabs-convai>`;
        widgetRef.current.innerHTML = widgetHtml;
        
        // Remove any existing script to prevent duplicates
        if (scriptRef.current && document.body.contains(scriptRef.current)) {
          document.body.removeChild(scriptRef.current);
        }
        
        // Create and add the script with the new URL
        const script = document.createElement('script');
        script.src = 'https://elevenlabs.io/convai-widget/index.js';
        script.async = true;
        script.type = 'text/javascript';
        
        // Add error handling to the script
        script.onerror = () => {
          if (isMounted && retryCount < 3) {
            console.error('Failed to load ElevenLabs widget script, retrying...');
            setRetryCount(prev => prev + 1);
            setTimeout(initWidget, 2000);
          } else if (isMounted) {
            toast({
              title: "Widget Error",
              description: "Failed to load the ElevenLabs voice widget. Please refresh the page.",
              variant: "destructive"
            });
          }
        };
        
        document.body.appendChild(script);
        scriptRef.current = script;
        
        console.log('ElevenLabs widget initialized');
        initialized.current = true;
        
        // Notify parent that widget is ready
        if (onReady && isMounted) {
          setTimeout(onReady, 2000);
        }
      } catch (error) {
        console.error('Error initializing ElevenLabs widget:', error);
        if (isMounted) {
          toast({
            title: "Widget Error",
            description: "There was a problem initializing the voice assistant.",
            variant: "destructive"
          });
        }
      }
    };
    
    // Initialize after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(initWidget, 1000);
    
    // Cleanup function
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      initialized.current = false;
      
      // Remove the script element to prevent memory leaks
      if (scriptRef.current && document.body.contains(scriptRef.current)) {
        document.body.removeChild(scriptRef.current);
      }
    };
  }, [agentId, onReady, retryCount]);
  
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
      
      {/* Fallback message for errors */}
      {retryCount > 0 && (
        <div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm opacity-70">
          Connecting to voice assistant... ({retryCount}/3)
        </div>
      )}
    </div>
  );
};

export default ElevenLabsWidget;
