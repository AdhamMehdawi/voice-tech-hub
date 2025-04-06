
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings as SettingsIcon } from 'lucide-react';

interface SettingsProps {
  webhookUrl: string;
  onWebhookChange: (url: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ webhookUrl, onWebhookChange }) => {
  const [inputValue, setInputValue] = useState(webhookUrl);
  
  const handleSave = () => {
    onWebhookChange(inputValue);
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="absolute top-4 right-4">
          <SettingsIcon className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-panel border-white/10">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <Input
              id="webhook-url"
              placeholder="https://your-webhook-url.com"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="bg-background/50"
            />
          </div>
          <Button onClick={handleSave} className="w-full">Save Settings</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Settings;
