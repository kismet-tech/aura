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

// Styled Components
const HoverableContent = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col gap-4">
    {children}
  </div>
);

const TriggerContainer = ({ hasHoverCard, children }: { hasHoverCard: boolean, children: React.ReactNode }) => (
  <div className={`flex items-center gap-2 ${hasHoverCard ? 'cursor-pointer' : 'cursor-default'}`}>
    {children}
  </div>
);

const HeaderSection = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-start gap-4">
    {children}
  </div>
);

const HeaderInfo = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col flex-1">
    {children}
  </div>
);

const ContactInfoButton = ({ 
  isEditable, 
  onMouseEnter, 
  onMouseLeave, 
  onClick 
}: { 
  isEditable: boolean, 
  onMouseEnter: () => void, 
  onMouseLeave: () => void, 
  onClick: () => void 
}) => (
  <button
    className={`p-1 ${isEditable ? 'text-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onClick={onClick}
  >
    <FaAddressCard size={20} />
  </button>
);

const ContactInfoPopover = ({ children }: { children: React.ReactNode }) => (
  <div className="absolute right-0 top-8 z-50 bg-white p-4 rounded-lg shadow-lg border min-w-[200px]">
    {children}
  </div>
);

const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="text-sm font-medium text-gray-600">{children}</div>
);

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
        <TriggerContainer hasHoverCard={hasHoverCard}>
          <ContactAvatar 
            firstName={firstName} 
            lastName={lastName} 
            size={avatarSize} 
            imageUrl={imageUrl} 
            dataSources={dataSources}
          />
          <ContactName firstName={firstName} lastName={lastName} />
        </TriggerContainer>
      </HoverCardTrigger>
      {hasHoverCard && (
        <HoverCardContent className="w-80 bg-white p-4 rounded-lg shadow-lg border">
          <HoverableContent>
            <HeaderSection>
              <ContactAvatar 
                firstName={firstName} 
                lastName={lastName} 
                size={48} 
                imageUrl={imageUrl} 
                dataSources={dataSources}
              />
              <HeaderInfo>
                <ContactName firstName={firstName} lastName={lastName} />
                <ContactData sources={dataSources} />
              </HeaderInfo>
              <div className="relative">
                <ContactInfoButton
                  isEditable={isContactInfoEditable}
                  onMouseEnter={handleContactInfoMouseEnter}
                  onMouseLeave={handleContactInfoMouseLeave}
                  onClick={handleContactInfoClick}
                />
                {showContactInfo && (
                  <ContactInfoPopover>
                    <ContactContactInfo 
                      info={contactInfo}
                      onEdit={isContactInfoEditable ? handleContactInfoEdit : undefined}
                    />
                  </ContactInfoPopover>
                )}
              </div>
            </HeaderSection>
            {bio && (
              <ContactBio bio={bio} onEdit={onBioEdit} />
            )}
            {sessions.length > 0 && (
              <>
                <SectionHeader>Past & Future Business</SectionHeader>
                <ContactUserSessionSummary 
                  sessions={sessions}
                  collapsed={true}
                  onSessionClick={onSessionClick}
                  onDateClick={onDateClick}
                  onEventClick={onEventClick}
                />
              </>
            )}
          </HoverableContent>
        </HoverCardContent>
      )}
    </HoverCard>
  );
}; 