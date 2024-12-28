import React, { useState, useRef } from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/shadcn/hover-card';
import { ContactAvatar } from '../../atoms/ContactAvatar';
import { ContactData, ContactDataSource } from '../../atoms/ContactData';
import { ContactName } from '../../atoms/ContactName';
import { ContactBio } from '../../atoms/ContactBio';
import { ContactUserSessionSummary, HotelSession } from '../../atoms/ContactUserSessionSummary';
import { ContactContactInfo, ContactInfo } from '../../atoms/ContactContactInfo';
import { FaAddressCard } from 'react-icons/fa';
import Modal from 'react-modal';

export interface ContactHoverCardProps {
  firstName?: string | null;
  lastName?: string | null;
  avatarSize?: number;
  imageUrl?: string;
  dataSources?: ContactDataSource[];
  bio?: string;
  onBioEdit?: (updatedBio: string) => void;
  className?: string;
  sessions?: HotelSession[];
  onSessionClick?: (sessionId: string) => void;
  onDateClick?: (sessionDateId: string) => void;
  onEventClick?: (eventId: string) => void;
  contactInfo?: ContactInfo;
  onContactInfoEdit?: (updatedInfo: ContactInfo) => void;
}

export const ContactHoverCard: React.FC<ContactHoverCardProps> = ({
  firstName,
  lastName,
  avatarSize = 40,
  imageUrl,
  dataSources = [],
  bio,
  onBioEdit,
  className = '',
  sessions = [],
  onSessionClick,
  onDateClick,
  onEventClick,
  contactInfo = { phone: '', email: '', address: '' },
  onContactInfoEdit,
}) => {
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const hideTimeoutRef = useRef<NodeJS.Timeout>();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const hasContactInfo = !!(contactInfo?.phone || contactInfo?.email || contactInfo?.address);

  const handleContactInfoMouseEnter = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    if (hasContactInfo) {
      setShowContactInfo(true);
    }
  };

  const handleContactInfoMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      if (!wrapperRef.current?.matches(':hover')) {
        setShowContactInfo(false);
      }
    }, 300);
  };

  const handleContactInfoEdit = (updatedInfo: ContactInfo) => {
    onContactInfoEdit?.(updatedInfo);
    setShowContactInfo(false);
    setShowEditModal(false);
  };

  const handleModalClose = () => {
    setShowEditModal(false);
  };

  return (
    <div 
      ref={wrapperRef}
      className="relative" 
      onMouseLeave={handleContactInfoMouseLeave}
    >
      <HoverCard>
        <HoverCardTrigger>
          <div className="flex items-center gap-2 cursor-pointer">
            <ContactAvatar
              firstName={firstName}
              lastName={lastName}
              size={avatarSize}
              imageUrl={imageUrl} 
              dataSources={dataSources}
            />
            <ContactName firstName={firstName} lastName={lastName} />
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-80 bg-white p-4 rounded-lg shadow-lg border">
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <ContactAvatar 
                firstName={firstName}
                lastName={lastName}
                size={48} 
                imageUrl={imageUrl} 
                dataSources={dataSources}
              />
              <div className="flex flex-col flex-1">
                <ContactName firstName={firstName} lastName={lastName} />
                {dataSources.length > 0 && <ContactData sources={dataSources} />}
              </div>
              <div className="relative">
                <div className="flex items-center gap-1">
                  {hasContactInfo && (
                    <button
                      className="p-1 text-gray-500 hover:text-gray-700"
                      onMouseEnter={handleContactInfoMouseEnter}
                      onMouseLeave={handleContactInfoMouseLeave}
                    >
                      <FaAddressCard size={20} />
                    </button>
                  )}
                  <button
                    className="text-sm text-blue-500 hover:text-blue-700"
                    onClick={() => setShowEditModal(true)}
                  >
                    {hasContactInfo ? 'edit' : 'add contact info'}
                  </button>
                </div>
                {showContactInfo && hasContactInfo && (
                  <div 
                    className="absolute right-0 top-8 z-50 bg-white p-4 rounded-lg shadow-lg border min-w-[200px]"
                    onMouseEnter={handleContactInfoMouseEnter}
                    onMouseLeave={handleContactInfoMouseLeave}
                  >
                    <ContactContactInfo 
                      info={contactInfo}
                      onEdit={undefined}
                    />
                  </div>
                )}
              </div>
            </div>
            <ContactBio 
              bio={bio || ''} 
              onEdit={onBioEdit}
              className="mt-2" 
            />
            {sessions.length > 0 && (
              <>
                <div className="text-sm font-medium text-gray-600">Past & Future Business</div>
                <ContactUserSessionSummary 
                  sessions={sessions}
                  collapsed={true}
                  onSessionClick={onSessionClick}
                  onDateClick={onDateClick}
                  onEventClick={onEventClick}
                />
              </>
            )}
          </div>
        </HoverCardContent>
      </HoverCard>

      <Modal
        isOpen={showEditModal}
        onRequestClose={handleModalClose}
        className="max-w-md mx-auto mt-20 bg-white p-6 rounded-lg shadow-xl"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
      >
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">
              {hasContactInfo ? 'Edit Contact Information' : 'Add Contact Information'}
            </h2>
            <button
              onClick={handleModalClose}
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
          <ContactContactInfo 
            info={contactInfo}
            onEdit={handleContactInfoEdit}
            forceEdit={true}
            className="mt-2"
          />
        </div>
      </Modal>
    </div>
  );
}; 