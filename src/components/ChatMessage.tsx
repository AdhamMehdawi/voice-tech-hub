
import React from 'react';
import { cn } from '@/lib/utils';

export type MessageType = {
  id: string;
  text: string;
  sender: 'user' | 'jarvis';
  timestamp: Date;
};

interface ChatMessageProps {
  message: MessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div className={cn(
      isUser ? 'user-message' : 'jarvis-message'
    )}>
      <div className="flex items-center mb-1">
        <span className="font-medium text-sm">
          {isUser ? 'You' : 'Jarvis'}
        </span>
        <span className="text-xs ml-2 opacity-50">
          {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </span>
      </div>
      <p>{message.text}</p>
    </div>
  );
};

export default ChatMessage;
