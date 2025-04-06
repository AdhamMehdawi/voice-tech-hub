
import React, { useState, useRef, useEffect } from 'react';
import ChatMessage, { MessageType } from './ChatMessage';
import MicButton from './MicButton';
import { useToast } from '@/hooks/use-toast';

interface ChatInterfaceProps {
  webhookUrl: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ webhookUrl }) => {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: 'welcome',
      text: "Hello, I'm Jarvis. How can I assist you today?",
      sender: 'jarvis',
      timestamp: new Date(),
    },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addMessage = (text: string, sender: 'user' | 'jarvis') => {
    const newMessage: MessageType = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleTranscription = async (transcript: string) => {
    if (!transcript.trim()) return;
    
    addMessage(transcript, 'user');
    setIsProcessing(true);
    
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: transcript }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Add a slight delay for a more natural conversation flow
      setTimeout(() => {
        addMessage(data.response || 'I processed your request.', 'jarvis');
        setIsProcessing(false);
      }, 500);
      
    } catch (error) {
      console.error('Error sending message to webhook:', error);
      toast({
        variant: "destructive",
        title: "Communication Error",
        description: "Unable to reach Jarvis. Please try again.",
      });
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col space-y-2">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="border-t border-border bg-background/50 backdrop-blur-sm p-4">
        <div className="flex justify-center items-center">
          <MicButton 
            onRecordingComplete={handleTranscription} 
            isProcessing={isProcessing} 
          />
        </div>
        {isProcessing && (
          <p className="text-center text-sm mt-2 text-muted-foreground animate-pulse">
            Processing your request...
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
