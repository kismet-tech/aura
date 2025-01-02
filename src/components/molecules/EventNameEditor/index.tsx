import React, { useState, useEffect } from 'react';
import { Pencil } from 'lucide-react';

interface EventNameEditorProps {
  initialName?: string;
  onChange?: (name: string) => void;
}

export const EventNameEditor: React.FC<EventNameEditorProps> = ({
  initialName = '',
  onChange
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName);

  useEffect(() => {
    setName(initialName);
  }, [initialName]);

  const handleBlur = () => {
    console.log("On Blur Event Triggered!");
    setIsEditing(false);
    onChange?.(name);
  };

  if (isEditing) {
    return (
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="text-2xl font-semibold w-full border-b border-gray-200 focus:border-gray-900 focus:outline-none pb-1 mb-6"
        placeholder="Enter event name"
        autoFocus
        onBlur={handleBlur}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleBlur();
          }
        }}
      />
    );
  }

  return (
    <div className="flex items-center gap-2 mb-6 group">
      <h2 className="text-2xl font-semibold">
        {name || 'Untitled Event'}
      </h2>
      <button
        onClick={() => setIsEditing(true)}
        className="opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Pencil className="h-4 w-4 text-gray-500 hover:text-gray-900" />
      </button>
    </div>
  );
}; 