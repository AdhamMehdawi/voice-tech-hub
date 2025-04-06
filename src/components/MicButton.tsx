
import React, { useState } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import '../types/speech-recognition.d.ts'; // Import type definitions

interface MicButtonProps {
  onRecordingComplete: (transcript: string) => void;
  isProcessing: boolean;
}

const MicButton: React.FC<MicButtonProps> = ({ onRecordingComplete, isProcessing }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  const startRecording = () => {
    if (isProcessing) return;
    
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognitionAPI) {
      console.error("Speech recognition not supported in this browser");
      return;
    }
    
    const recognitionInstance = new SpeechRecognitionAPI();
    recognitionInstance.continuous = false;
    recognitionInstance.lang = 'en-US';
    recognitionInstance.interimResults = false;
    recognitionInstance.maxAlternatives = 1;
    
    recognitionInstance.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onRecordingComplete(transcript);
      setIsRecording(false);
    };
    
    recognitionInstance.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsRecording(false);
    };
    
    recognitionInstance.onend = () => {
      setIsRecording(false);
    };
    
    recognitionInstance.start();
    setRecognition(recognitionInstance);
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (recognition) {
      recognition.stop();
      setIsRecording(false);
    }
  };

  const handleClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <button
      className={`${
        isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary/90'
      } relative flex items-center justify-center h-16 w-16 rounded-full text-white focus:outline-none transition-colors ${
        isRecording ? 'pulse-effect' : ''
      } disabled:opacity-50`}
      onClick={handleClick}
      disabled={isProcessing}
    >
      {isProcessing ? (
        <Loader2 className="h-8 w-8 animate-spin" />
      ) : isRecording ? (
        <MicOff className="h-8 w-8" />
      ) : (
        <Mic className="h-8 w-8" />
      )}
    </button>
  );
};

export default MicButton;
