import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export interface ContactInfo {
  phone?: string;
  email?: string;
  address?: string;
}

export interface ContactContactInfoProps {
  info: ContactInfo;
  className?: string;
  onEdit?: (updatedInfo: ContactInfo) => void;
  forceEdit?: boolean;
}

export const ContactContactInfo: React.FC<ContactContactInfoProps> = ({
  info,
  className = '',
  onEdit,
  forceEdit = false,
}) => {
  const [editedInfo, setEditedInfo] = useState<ContactInfo>(info);

  const handleSave = () => {
    onEdit?.(editedInfo);
  };

  if (forceEdit || onEdit) {
    return (
      <div className={`flex flex-col gap-4 ${className}`}>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Phone</label>
          <div className="flex items-center gap-2">
            <FaPhone className="text-gray-500" />
            <input
              type="tel"
              value={editedInfo.phone || ''}
              onChange={(e) => setEditedInfo({ ...editedInfo, phone: e.target.value })}
              className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-gray-500" />
            <input
              type="email"
              value={editedInfo.email || ''}
              onChange={(e) => setEditedInfo({ ...editedInfo, email: e.target.value })}
              className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="example@email.com"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Address</label>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-gray-500" />
            <input
              type="text"
              value={editedInfo.address || ''}
              onChange={(e) => setEditedInfo({ ...editedInfo, address: e.target.value })}
              className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="123 Main St, City, State ZIP"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    );
  }

  if (!info.phone && !info.email && !info.address) return null;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {info.phone && (
        <div className="flex items-center gap-2 text-sm">
          <FaPhone className="text-gray-500" />
          <a href={`tel:${info.phone}`} className="text-gray-700 hover:text-blue-500">
            {info.phone}
          </a>
        </div>
      )}
      {info.email && (
        <div className="flex items-center gap-2 text-sm">
          <FaEnvelope className="text-gray-500" />
          <a href={`mailto:${info.email}`} className="text-gray-700 hover:text-blue-500">
            {info.email}
          </a>
        </div>
      )}
      {info.address && (
        <div className="flex items-center gap-2 text-sm">
          <FaMapMarkerAlt className="text-gray-500" />
          <a 
            href={`https://maps.google.com/?q=${encodeURIComponent(info.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-blue-500"
          >
            {info.address}
          </a>
        </div>
      )}
    </div>
  );
}; 