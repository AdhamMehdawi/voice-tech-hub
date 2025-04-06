
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="border-b border-border bg-background/50 backdrop-blur-sm p-4">
      <div className="flex items-center justify-center">
        <div className="relative">
          <div className="h-2 w-2 rounded-full bg-primary absolute -left-4 top-1/2 transform -translate-y-1/2"></div>
          <h1 className="text-xl font-semibold tracking-tight text-center">JARVIS</h1>
          <div className="h-2 w-2 rounded-full bg-primary absolute -right-4 top-1/2 transform -translate-y-1/2"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
