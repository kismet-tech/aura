import React from 'react';
import { Badge } from "@/components/ui/badge";
import { CalendarDays, UsersRoundIcon, DoorOpenIcon, XCircle, AlertCircle, Mail, CheckCircle2 } from 'lucide-react';
import * as HoverCard from '@radix-ui/react-hover-card';

const KISMET_LOGO_URL = 'https://storage.googleapis.com/kismet-assets/logoKismet.png';

// Styled Components
const HoverCardContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="space-y-4">{children}</div>
);

const Section = ({ children, hasBorder = false }: { children: React.ReactNode, hasBorder?: boolean }) => (
  <div className={`space-y-2.5 ${hasBorder ? 'pb-4 border-b border-slate-100' : ''}`}>{children}</div>
);

const HeaderRow = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-2">{children}</div>
);

const Title = ({ children }: { children: React.ReactNode }) => (
  <span className="text-sm font-medium text-slate-900 truncate flex-1">{children}</span>
);

const BadgeContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="w-[90px] flex justify-end">{children}</div>
);

const KismetHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-2">
    <img src={KISMET_LOGO_URL} alt="Kismet Logo" className="h-4 w-4 object-contain" />
    <h4 className="text-sm font-semibold text-slate-900">{children}</h4>
  </div>
);

const ActionsList = ({ children }: { children: React.ReactNode }) => (
  <div className="space-y-1.5">{children}</div>
);

const ActionItem = ({ icon, children }: { icon: React.ReactNode, children: React.ReactNode }) => (
  <div className="flex items-center gap-2 text-sm text-slate-600">
    {icon}
    {children}
  </div>
);

const ActionLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="hover:text-slate-900 hover:underline"
  >
    {children}
  </a>
);

export interface QualificationDetails {
  status: 'QUALIFIED' | 'NOT_QUALIFIED' | 'PENDING';
  /**
   * Title from UserSession.title in Prisma schema
   * This is the name/description of the event that was submitted in the form
   */
  title: string;
  reason?: string;
  requestedDates: Date[];
  guestCount?: number;
  roomCount?: number;
  eventSpace: boolean;
  eventCapacity?: number;
  availableRooms?: number;
  availableSpace?: number;
  missingInfo?: string[];
  /**
   * Status line shows actions taken by Kismet
   * @property text - Description of the action taken (e.g., "Kismet suggested alternative dates")
   * @property emailLink - Link to the specific email in our Common Inbox (e.g., "/inbox/email-id")
   * @property date - When the action was taken
   */
  actions: Array<{
    text: string;
    emailLink?: string;
    date?: Date;
  }>;
  /**
   * List of events and their required capacities
   */
  events?: Array<{
    name: string;
    capacity: number;
  }>;
}

interface QualificationStatusHoverCardProps {
  details: QualificationDetails;
  children?: React.ReactNode;
}

const getStatusColor = (status: QualificationDetails['status']) => {
  switch (status) {
    case 'QUALIFIED':
      return 'bg-green-50 text-green-700 border-green-200';
    case 'NOT_QUALIFIED':
      return 'bg-red-50 text-red-700 border-red-200';
    case 'PENDING':
      return 'bg-yellow-50 text-yellow-700 border-yellow-200';
  }
};

export const QualificationStatusBadge: React.FC<{ status: QualificationDetails['status'] }> = ({ status }) => {
  return (
    <Badge 
      variant={status === 'NOT_QUALIFIED' ? 'destructive' : 'outline'}
      className={`${getStatusColor(status)} px-4 py-1.5 text-sm font-medium pointer-events-none`}
    >
      {status.replace('_', ' ')}
    </Badge>
  );
};

export const QualificationStatusHoverCard: React.FC<QualificationStatusHoverCardProps> = ({
  details
}) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Check if we have any request details to show
  const hasRequestDetails = details.requestedDates.length > 0 || 
    details.guestCount !== undefined || 
    details.roomCount !== undefined || 
    (details.eventSpace && details.eventCapacity !== undefined);

  // Check if we have room details
  const hasRoomDetails = details.roomCount !== undefined || details.guestCount !== undefined;

  // Check if we have event details
  const hasEventDetails = details.eventSpace && details.eventCapacity !== undefined;

  return (
    <HoverCardContainer>
      <Section hasBorder>
        <HeaderRow>
          <Title>{details.title}</Title>
          <BadgeContainer>
            <Badge className={`${getStatusColor(details.status)} px-1.5 py-0.5 text-[10px] font-medium shrink-0 pointer-events-none`}>
              {details.status.replace('_', ' ')}
            </Badge>
          </BadgeContainer>
        </HeaderRow>
        {details.actions.length > 0 && (
          <div className="space-y-2">
            <KismetHeader>Kismet AI</KismetHeader>
            <ActionsList>
              {details.actions.map((action, index) => (
                <ActionItem key={index} icon={<Mail className="h-4 w-4 text-slate-400 shrink-0" />}>
                  {action.emailLink ? (
                    <ActionLink href={action.emailLink}>{action.text}</ActionLink>
                  ) : (
                    <span>{action.text}</span>
                  )}
                </ActionItem>
              ))}
            </ActionsList>
          </div>
        )}
        {details.reason && (
          <p className="text-sm text-slate-600 leading-relaxed">{details.reason}</p>
        )}
      </Section>

      {/* Request Details - Only show if we have details */}
      {hasRequestDetails && (
        <Section>
          <h4 className="text-sm font-semibold text-slate-900">Request Details</h4>
          
          {/* Dates */}
          {details.requestedDates.length > 0 && (
            <div className="space-y-2">
              <h5 className="text-xs font-medium text-slate-500">DATES</h5>
              <div className="flex items-center gap-2.5 text-slate-700">
                <CalendarDays className="h-4 w-4 text-slate-400" />
                <span>{formatDate(details.requestedDates[0])} - {formatDate(details.requestedDates[details.requestedDates.length - 1])}</span>
              </div>
            </div>
          )}

          {/* Room Details */}
          {hasRoomDetails && (
            <div className="space-y-2">
              <h5 className="text-xs font-medium text-slate-500">ROOM BLOCK</h5>
              <div className="space-y-2">
                {details.roomCount !== undefined && (
                  <div className="flex items-center gap-2.5 text-slate-700">
                    <DoorOpenIcon className="h-4 w-4 text-slate-400" />
                    <span>{details.roomCount} rooms</span>
                  </div>
                )}
                {details.guestCount !== undefined && (
                  <div className="flex items-center gap-2.5 text-slate-700">
                    <UsersRoundIcon className="h-4 w-4 text-slate-400" />
                    <span>{details.guestCount} guests</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Event Details */}
          {hasEventDetails && (
            <div className="space-y-2">
              <h5 className="text-xs font-medium text-slate-500">EVENT SPACE</h5>
              <div className="flex items-start gap-2.5 text-slate-700">
                <UsersRoundIcon className="h-4 w-4 mt-0.5 text-slate-400" />
                <span>
                  {details.events?.map((event, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && ', '}
                      {event.name} ({event.capacity} guests)
                    </React.Fragment>
                  ))}
                </span>
              </div>
            </div>
          )}
        </Section>
      )}

      {/* Availability Confirmation for Qualified */}
      {details.status === 'QUALIFIED' && (
        <Section>
          <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            Availability Confirmed
          </h4>
          <ul className="text-sm space-y-2 text-slate-600">
            {details.roomCount && details.availableRooms && (
              <li className="flex items-start gap-2">
                <span className="text-slate-400 mt-1">•</span>
                <span>{details.availableRooms} rooms available for requested dates</span>
              </li>
            )}
            {details.eventCapacity && details.availableSpace && (
              <li className="flex items-start gap-2">
                <span className="text-slate-400 mt-1">•</span>
                <span>Event space capacity of {details.availableSpace} confirmed</span>
              </li>
            )}
          </ul>
        </Section>
      )}

      {/* Availability Issues for Not Qualified */}
      {details.status === 'NOT_QUALIFIED' && (
        <Section>
          <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
            <XCircle className="h-4 w-4 text-red-500" />
            Availability Issues
          </h4>
          <ul className="text-sm space-y-2 text-slate-600">
            {details.availableRooms !== undefined && details.roomCount && details.availableRooms < details.roomCount && (
              <li className="flex items-start gap-2">
                <span className="text-slate-400 mt-1">•</span>
                <span>Only {details.availableRooms} rooms available (need {details.roomCount})</span>
              </li>
            )}
            {details.availableSpace !== undefined && details.eventCapacity && details.availableSpace < details.eventCapacity && (
              <li className="flex items-start gap-2">
                <span className="text-slate-400 mt-1">•</span>
                <span>Event space capacity {details.availableSpace} (need {details.eventCapacity})</span>
              </li>
            )}
          </ul>
        </Section>
      )}

      {/* Missing Info for Pending */}
      {details.status === 'PENDING' && details.missingInfo && details.missingInfo.length > 0 && (
        <Section>
          <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-yellow-500" />
            Missing Information
          </h4>
          <ul className="text-sm space-y-2 text-slate-600">
            {details.missingInfo.map((info, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-slate-400 mt-1">•</span>
                <span>{info}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </HoverCardContainer>
  );
}; 