import React, { useState } from 'react';

export interface ContactBioProps {
  bio?: string;
  className?: string;
  onEdit?: (updatedBio: string) => void;
}

export const ContactBio: React.FC<ContactBioProps> = ({
  bio = '',
  className = '',
  onEdit,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBio, setEditedBio] = useState(bio);

  if (!bio && !onEdit) return null;

  const handleSave = () => {
    if (onEdit) {
      onEdit(editedBio);
    }
    setIsEditing(false);
  };

  const renderBioContent = () => {
    if (isEditing) {
      return (
        <div className="text-sm -m-2">
          <textarea
            value={editedBio}
            onChange={(e) => setEditedBio(e.target.value)}
            className="w-full p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
          <div className="flex justify-end space-x-2 mt-2 px-2">
            <button
              onClick={() => {
                setEditedBio(bio);
                setIsEditing(false);
              }}
              className="px-2 py-1 text-gray-600 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </div>
      );
    }

    return (
      <div 
        className={`text-sm whitespace-pre-wrap group/bio relative ${onEdit ? 'cursor-pointer hover:bg-gray-50 rounded p-2 -m-2' : ''}`}
        onClick={() => onEdit && setIsEditing(true)}
      >
        {onEdit && (
          <svg
            className="absolute right-2 top-2 w-4 h-4 text-gray-500 opacity-0 group-hover/bio:opacity-100 transition-opacity"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        )}
        {bio}
      </div>
    );
  };

  return (
    <div className={`${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-sm text-gray-600 hover:text-gray-900"
      >
        <span>{isOpen ? 'close' : 'Bio'}</span>
        <span className={`ml-1 ${isOpen ? 'rotate-180' : ''}`}>
          {isOpen ? '<<' : '>>'}
        </span>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-200 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
        }`}
      >
        {renderBioContent()}
      </div>
    </div>
  );
}; 