
import React, { useState, useEffect, useCallback, useRef } from 'react';
import ElevenLabsConversationalAI from '@/components/ElevenLabsConversationalAI';
import JarvisInterface from '@/components/JarvisInterface';

const Index = () => {
  const [showWidget, setShowWidget] = useState(false);
  const [widgetLoaded, setWidgetLoaded] = useState(false);
  const [widgetError, setWidgetError] = useState<string | null>(null);
  const widgetKey = useRef(`elevenlabs-widget-${Date.now()}`);
  
  // Handler for JarvisInterface activation
  const handleActivate = useCallback(() => {
    console.log('Activating ElevenLabs widget');
    // Reset widget state when activating
    setWidgetLoaded(false);
    setWidgetError(null);
    // Generate a new key for the widget
    widgetKey.current = `elevenlabs-widget-${Date.now()}`;
    // Show widget
    setShowWidget(true);
  }, []);
  
  // Handler for when ElevenLabs widget loads successfully
  const handleWidgetLoad = useCallback(() => {
    console.log('ElevenLabs widget loaded successfully');
    setWidgetLoaded(true);
  }, []);
  
  // Handler for ElevenLabs widget errors
  const handleWidgetError = useCallback((error: Error) => {
    console.error('ElevenLabs widget error:', error);
    setWidgetError(error.message);
  }, []);
  
  // Close widget handler
  const handleCloseWidget = useCallback(() => {
    console.log('Closing ElevenLabs widget');
    setShowWidget(false);
    // Reset widget state when closing
    setTimeout(() => {
      // Delay the reset to ensure the component is unmounted first
      setWidgetLoaded(false);
      setWidgetError(null);
    }, 100);
  }, []);
  
  // Log when widget visibility changes
  useEffect(() => {
    console.log('Widget visibility:', showWidget ? 'visible' : 'hidden');
  }, [showWidget]);
  
  return (
    <div className="h-screen bg-black overflow-hidden">
      {/* Pass the widget state to JarvisInterface so it can react accordingly */}
      <JarvisInterface 
        onActivate={handleActivate} 
        widgetActive={showWidget}
      />
      
      {showWidget && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-auto z-50">
          <div className="w-full h-full max-w-2xl max-h-[600px] glass-panel m-4 relative">
            {/* Close button */}
            <button 
              onClick={handleCloseWidget}
              className="absolute top-2 right-2 z-10 bg-gray-800 bg-opacity-70 text-white rounded-full p-1 hover:bg-opacity-100 transition-all duration-200"
              aria-label="Close dialog"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Use the key to force re-mount whenever the widget is shown again */}
            <ElevenLabsConversationalAI 
              key={widgetKey.current}
              agentId="xyWFCQVZhNLeTZItTuLa" 
              onLoad={handleWidgetLoad}
              onError={handleWidgetError}
            />
            
            {/* Status indicator */}
            {!widgetLoaded && !widgetError && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                Initializing voice interface...
              </div>
            )}
            
            {/* Error message */}
            {widgetError && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80">
                <div className="bg-red-900 text-white p-4 rounded-md max-w-md text-center">
                  <h3 className="text-lg font-bold mb-2">Connection Error</h3>
                  <p>{widgetError}</p>
                  <button 
                    onClick={() => window.location.reload()} 
                    className="mt-4 px-4 py-2 bg-red-700 hover:bg-red-600 rounded"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
