import React, { useState } from "react";
import Modal from "react-modal";
import { ContactDataSource } from "../ContactData";
import { ComponentType } from "react";

const ReactModal = Modal as unknown as ComponentType<ReactModal["props"]>;

const getInitials = (
  firstName?: string | null,
  lastName?: string | null
): string => {
  return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase() || "N/A";
};

export interface ContactAvatarProps {
  firstName?: string | null;
  lastName?: string | null;
  size?: number;
  imageUrl?: string;
  dataSources?: ContactDataSource[];
  className?: string;
}

export const ContactAvatar: React.FC<ContactAvatarProps> = ({
  firstName,
  lastName,
  size = 40,
  imageUrl,
  dataSources = [],
  className = "",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const initials = getInitials(firstName, lastName);

  return (
    <>
      <div
        className={`relative rounded-full overflow-hidden flex items-center justify-center bg-gray-200 ${className}`}
        style={{ width: size, height: size }}
        onClick={() => imageUrl && setIsModalOpen(true)}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`${firstName} ${lastName}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <span
            className="text-gray-600 font-medium"
            style={{ fontSize: size * 0.4 }}
          >
            {initials}
          </span>
        )}
      </div>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="max-w-2xl mx-auto mt-20 bg-white p-4 rounded-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <img
          src={imageUrl}
          alt={`${firstName} ${lastName}`}
          className="w-full h-auto"
        />
      </ReactModal>
    </>
  );
};
