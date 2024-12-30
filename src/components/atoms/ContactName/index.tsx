import React from 'react';

const KISMET_LOGO_URL = 'https://storage.googleapis.com/kismet-assets/logoKismet.png';

export type ContactType = 'Host' | 'Attendee';

export interface ContactNameProps {
  firstName?: string | null;
  lastName?: string | null;
  className?: string;
  fallback?: string;
  isKismetEnhanced?: boolean;
  iconSize?: number;
  type?: ContactType;
}

export const ContactName: React.FC<ContactNameProps> = ({
  firstName,
  lastName,
  className = '',
  fallback = 'Guest',
  isKismetEnhanced = false,
  iconSize = 16,
  type = 'Attendee'
}) => {
  const formattedFirstName = firstName?.trim() || '';
  const formattedLastName = lastName?.trim() || '';
  const displayName = [formattedFirstName, formattedLastName]
    .filter(Boolean)
    .join(' ') || fallback;

  const nameClassName = `${className} ${type === 'Host' ? 'font-bold underline' : ''}`.trim();

  return (
    <span className={`inline-flex items-center ${nameClassName}`}>
      {isKismetEnhanced && (
        <img 
          src={KISMET_LOGO_URL} 
          alt="Kismet Logo" 
          width={iconSize} 
          height={iconSize} 
          className="inline-block mr-1 align-text-bottom"
        />
      )}
      {displayName}
    </span>
  );
}; 