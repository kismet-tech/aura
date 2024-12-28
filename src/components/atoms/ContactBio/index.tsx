import React, { useState, useEffect } from 'react';

export interface ContactBioProps {
  bio: string;
  onEdit?: (updatedBio: string) => void;
  className?: string;
}

export const ContactBio: React.FC<ContactBioProps> = ({
  bio,
  onEdit,
  className = '',
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentBio, setCurrentBio] = useState(bio);
  const [editedBio, setEditedBio] = useState(bio);

  // Update local state when prop changes
  useEffect(() => {
    setCurrentBio(bio);
    setEditedBio(bio);
  }, [bio]);

  const handleSave = () => {
    onEdit?.(editedBio);
    setCurrentBio(editedBio);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedBio(currentBio);
    setIsEditing(false);
  };

  return (
    <div className={className}>
      <div className="flex flex-col">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <span>{isOpen ? 'close' : 'Bio'}</span>
          <span className="ml-1">
            {isOpen ? '<<' : '>>'}
          </span>
        </button>
        {isOpen && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm text-blue-500 hover:text-blue-700 mt-1"
          >
            edit
          </button>
        )}
      </div>

      <div
        className={`overflow-hidden transition-all duration-200 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
        }`}
      >
        {isEditing ? (
          <div className="flex flex-col gap-2">
            <textarea
              value={editedBio}
              onChange={(e) => setEditedBio(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Enter bio..."
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCancel}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div className="text-sm text-gray-700">
            {currentBio || 'No bio available'}
          </div>
        )}
      </div>
    </div>
  );
}; 