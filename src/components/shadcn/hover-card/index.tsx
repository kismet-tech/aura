import React, { useState } from 'react';

export const HoverCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div 
      className="hover-card relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          if (child.type === HoverCardContent) {
            return isOpen ? child : null;
          }
          return child;
        }
        return child;
      })}
    </div>
  );
};

export const HoverCardTrigger: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="hover-card-trigger">{children}</div>;
};

export const HoverCardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`hover-card-content absolute top-full left-0 mt-1 z-50 ${className}`}>
      {children}
    </div>
  );
}; 