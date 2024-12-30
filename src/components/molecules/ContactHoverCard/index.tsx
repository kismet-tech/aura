import React, { useState } from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/shadcn/hover-card';
import { ContactAvatar } from '../../atoms/ContactAvatar';
import { ContactData, ContactDataSource } from '../../atoms/ContactData';
import { ContactName } from '../../atoms/ContactName';
import { ContactBio } from '../../atoms/ContactBio';
import { ContactUserSessionSummary, HotelSession } from '../../atoms/ContactUserSessionSummary';
import { ContactContactInfo, ContactInfo } from '../../atoms/ContactContactInfo';
import { FaAddressCard } from 'react-icons/fa';

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
  const [isContactInfoEditable, setIsContactInfoEditable] = useState(false);
  const hasHoverCard = dataSources.length > 0;

  const handleContactInfoClick = () => {
    setShowContactInfo(true);
    setIsContactInfoEditable(true);
  };

  const handleContactInfoMouseEnter = () => {
    if (!isContactInfoEditable) {
      setShowContactInfo(true);
    }
  };

  const handleContactInfoMouseLeave = () => {
    if (!isContactInfoEditable) {
      setShowContactInfo(false);
    }
  };

  const handleContactInfoEdit = (updatedInfo: ContactInfo) => {
    onContactInfoEdit?.(updatedInfo);
    setIsContactInfoEditable(false);
    setShowContactInfo(false);
  };

  return (
    <HoverCard>
      <HoverCardTrigger>
        <div className={`flex items-center gap-2 ${hasHoverCard ? 'cursor-pointer' : 'cursor-default'}`}>
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
      {hasHoverCard && (
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
                <ContactData sources={dataSources} />
              </div>
              <div className="relative">
                <button
                  className={`p-1 ${isContactInfoEditable ? 'text-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
                  onMouseEnter={handleContactInfoMouseEnter}
                  onMouseLeave={handleContactInfoMouseLeave}
                  onClick={handleContactInfoClick}
                >
                  <FaAddressCard size={20} />
                </button>
                {showContactInfo && (
                  <div className="absolute right-0 top-8 z-50 bg-white p-4 rounded-lg shadow-lg border min-w-[200px]">
                    <ContactContactInfo 
                      info={contactInfo}
                      onEdit={isContactInfoEditable ? handleContactInfoEdit : undefined}
                    />
                  </div>
                )}
              </div>
            </div>
            {bio && (
              <ContactBio bio={bio} onEdit={onBioEdit} />
            )}
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
      )}
    </HoverCard>
  );
}; 