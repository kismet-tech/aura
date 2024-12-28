import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPencilAlt } from 'react-icons/fa';
import Modal from 'react-modal';

export interface ContactInfo {
  phone?: string;
  email?: string;
  address?: string;
}

export interface ContactContactInfoProps {
  info: ContactInfo;
  className?: string;
  onEdit?: (updatedInfo: ContactInfo) => void;
}

export const ContactContactInfo: React.FC<ContactContactInfoProps> = ({
  info,
  className = '',
  onEdit,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedInfo, setEditedInfo] = useState<ContactInfo>(info);

  if (!info.phone && !info.email && !info.address) return null;

  const handleSave = () => {
    onEdit?.(editedInfo);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setEditedInfo(info);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={`flex flex-col gap-2 relative group ${className}`}>
        {onEdit && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="absolute right-0 top-0 p-1 text-gray-400 opacity-0 group-hover:opacity-100 hover:text-gray-600 transition-opacity"
            title="Edit contact information"
          >
            <FaPencilAlt size={14} />
          </button>
        )}
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

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCancel}
        className="max-w-md mx-auto mt-20 bg-white p-6 rounded-lg shadow-xl"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Edit Contact Information</h2>
            <button
              onClick={handleCancel}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-col gap-4">
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
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}; 