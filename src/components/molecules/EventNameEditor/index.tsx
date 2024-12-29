import React, { useState } from 'react';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    onChange?.(name);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    onChange?.(newName);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onChange?.(name);
  };

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          className="text-2xl font-semibold w-full border-b border-gray-200 focus:border-gray-900 focus:outline-none pb-1"
          placeholder="Enter event name"
          autoFocus
          onBlur={handleBlur}
        />
      </form>
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