
import React, { useState, useEffect } from 'react';
import ChatInterface from '@/components/ChatInterface';
import Header from '@/components/Header';
import Settings from '@/components/Settings';

const Index = () => {
  const [webhookUrl, setWebhookUrl] = useState('https://your-webhook-endpoint.com');
  
  // Load webhook URL from localStorage on mount
  useEffect(() => {
    const savedUrl = localStorage.getItem('jarvisWebhookUrl');
    if (savedUrl) {
      setWebhookUrl(savedUrl);
    }
  }, []);
  
  // Save webhook URL to localStorage on change
  const handleWebhookChange = (url: string) => {
    setWebhookUrl(url);
    localStorage.setItem('jarvisWebhookUrl', url);
  };
  
  return (
    <div className="flex flex-col h-screen bg-jarvis-gradient text-foreground">
      <div className="relative flex flex-col max-w-lg mx-auto w-full h-full border-x border-border/30 glass-panel">
        <Header />
        <Settings webhookUrl={webhookUrl} onWebhookChange={handleWebhookChange} />
        <div className="flex-1 overflow-hidden">
          <ChatInterface webhookUrl={webhookUrl} />
        </div>
      </div>
    </div>
  );
};

export default Index;
