import React, { useState, useRef, useEffect } from 'react';
import { ContactAvatar } from '@/components/atoms/ContactAvatar';
import { ContactName } from '@/components/atoms/ContactName';
import { ContactHoverCard } from '@/components/molecules/ContactHoverCard';
import { FaChevronDown, FaChevronUp, FaPlus, FaSearch, FaPencilAlt } from 'react-icons/fa';
import { PlannerPrivateNotes } from '@/components/molecules/Planners/PlannerPrivateNotesSaaS';
import { PlannerPublicNotes } from '@/components/molecules/Planners/PlannerPublicNotesSaaS';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { DateRange as DayPickerDateRange } from "react-day-picker";
import { DateRangePicker } from '@/components/atoms/DateRangePicker';

// The backend stores date ranges in the following format:
// - start: string (ISO date) | undefined - The start date if known
// - end: string (ISO date) | undefined - The end date if known
// - type: 'firm' | 'flexible' | 'deciding' - The type of date range
//   - firm: Dates are locked in
//   - flexible: Primary dates set but alternatives possible
//   - deciding: Still deciding on dates, with optional reason
// - alternativeDates?: Array<{start: string, end: string}> - Only for flexible type
// - decidingReason?: string - Only for deciding type
interface ReservationDateRange {
  start?: string;
  end?: string;
  type: 'firm' | 'flexible' | 'deciding';
  alternativeDates?: Array<{
    start: string; // Must be ISO date string
    end: string; // Must be ISO date string
  }>;
  decidingReason?: string;
}

// FIXME: Current linter errors stem from:
// 1. Trying to create Date objects from potentially undefined strings
// 2. Not properly type guarding the dateRange object before accessing properties
// 3. Not enforcing required type field in state updates

// To fix:
// 1. Add proper null checks before creating Date objects
// 2. Ensure dateRange.type is always set when updating state
// 3. Use proper type guards when accessing dateRange properties
// 4. Consider splitting into separate states for different date range aspects

type ReservationStatus = 'pending' | 'confirmed' | 'cancelled' | 'tentative' | 'lost' | 'waitlisted';

const STATUS_COLORS: Record<ReservationStatus, { bg: string; text: string }> = {
  pending: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  confirmed: { bg: 'bg-green-100', text: 'text-green-700' },
  cancelled: { bg: 'bg-red-100', text: 'text-red-700' },
  tentative: { bg: 'bg-blue-100', text: 'text-blue-700' },
  lost: { bg: 'bg-gray-100', text: 'text-gray-700' },
  waitlisted: { bg: 'bg-purple-100', text: 'text-purple-700' }
};

interface GroupReservation {
  title: string;
  status: ReservationStatus;
  isTransient?: boolean;
  isLinkedTripleseat?: boolean;
  tripleseatUrl?: string;
  dateRange?: ReservationDateRange;
  leadScore: number;
  qualificationStatus: 'pending' | 'qualified' | 'not_qualified';
  intentScore: number;
  assignedSalesAgent: {
    name: string;
    id: string;
  };
  publicNotes: string;
  privateNotes: string;
  account?: {
    id: string;
    name: string;
  };
  rooms?: Array<{
    id: string;
    name: string;
  }>;
  events?: Array<{
    id: string;
    name: string;
  }>;
  addOns?: Array<{
    id: string;
    name: string;
  }>;
  extras?: Array<{
    id: string;
    name: string;
  }>;
}

const QUALIFICATION_COLORS = {
  pending: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  qualified: { bg: 'bg-green-100', text: 'text-green-700' },
  not_qualified: { bg: 'bg-red-100', text: 'text-red-700' },
} as const;

const DATE_TYPE_COLORS = {
  firm: { bg: 'bg-green-100', text: 'text-green-700' },
  flexible: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  deciding: { bg: 'bg-gray-100', text: 'text-gray-700' },
} as const;

interface UserSessionBodyProps {
  reservation: GroupReservation;
  // If contact is provided, they are already the host for this user session
  contact?: {
    firstName?: string;
    lastName?: string;
    imageUrl?: string;
    dataSources?: Array<{ type: 'LinkedIn' | 'WhatsApp'; url: string; }>;
    phone?: string;
    email?: string;
    address?: string;
    company?: string;
    role?: string;
    lastContact?: string;
    preferredContactMethod?: string;
    timezone?: string;
    notes?: string;
    bio?: string;
  };
  onContactUpdate?: (updatedContact: NonNullable<UserSessionBodyProps['contact']>) => void;
  onReservationUpdate?: (updatedReservation: GroupReservation) => void;
  onHostSelect?: (contactId: string) => void;
  onCreateHost?: (nameOrEmail: string) => void;
  currentUser?: {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
  };
  teamMembers?: Array<{
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
  }>;
  existingContacts?: Array<{
    id: string;
    name: string;
    email?: string;
    phone?: string;
  }>;
  onAccountSelect?: (accountId: string) => void;
  onCreateAccount?: (accountName: string) => void;
  existingAccounts?: Array<{
    id: string;
    name: string;
  }>;
  onSalesAgentSelect?: (agentId: string) => void;
  salesAgents?: Array<{
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
  }>;
}

const flashKeyframes = `
  @keyframes flash {
    0%, 100% { background-color: transparent; }
    50% { background-color: rgba(239, 68, 68, 0.1); }
  }
`;

const KISMET_LOGO_URL = 'https://storage.googleapis.com/kismet-assets/logoKismet.png';

// TODO: Backend Requirements
// - What we're currently loading as comments should just be the first private note
// - Use kismet logo in avatar for notes
// - Need to have optional variable linking to integrated systems (e.g. isLinkedTripleseat, tripleseatUrl)
// - Date picker functionality needs to be hooked up to backend - currently non-functional in UI

const UserSessionBody: React.FC<UserSessionBodyProps> = ({
  reservation,
  contact,
  onContactUpdate,
  onReservationUpdate,
  onHostSelect,
  onCreateHost,
  currentUser,
  teamMembers = [],
  existingContacts = [],
  onAccountSelect,
  onCreateAccount,
  existingAccounts = [],
  onSalesAgentSelect,
  salesAgents = [],
}) => {
  const [showHostSearch, setShowHostSearch] = useState(false);
  const [showAccountSearch, setShowAccountSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [accountSearchValue, setAccountSearchValue] = useState("");
  const [editingField, setEditingField] = useState<'email' | 'phone' | 'name' | 'title' | null>(null);
  const [editValue, setEditValue] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [isGroupReservationExpanded, setIsGroupReservationExpanded] = useState(false);
  const [collapsedHeight, setCollapsedHeight] = useState<number | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isNotesExpanded, setIsNotesExpanded] = useState(false);
  const [hasNewNote, setHasNewNote] = useState(false);
  const [notesCount, setNotesCount] = useState(0);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [pickerDateRange, setPickerDateRange] = useState<DayPickerDateRange | undefined>(() => {
    if (reservation.dateRange?.start && reservation.dateRange?.end) {
      return {
        from: new Date(reservation.dateRange.start),
        to: new Date(reservation.dateRange.end)
      };
    }
    return undefined;
  });
  const [hoveredStars, setHoveredStars] = useState<number | null>(null);
  const [showSalesAgentDropdown, setShowSalesAgentDropdown] = useState(false);
  const [salesAgentSearchValue, setSalesAgentSearchValue] = useState("");
  const [showRoomsSection, setShowRoomsSection] = useState(false);
  const [showEventsSection, setShowEventsSection] = useState(false);
  const [showAddOnsSection, setShowAddOnsSection] = useState(false);
  const [showExtrasSection, setShowExtrasSection] = useState(false);
  
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const groupReservationContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrame: number;
    
    const calculateHeight = () => {
      if (rightColumnRef.current && groupReservationContentRef.current) {
        const rightColumnHeight = rightColumnRef.current.offsetHeight;
        const contentScrollHeight = groupReservationContentRef.current.scrollHeight;
        
        if (contentScrollHeight > rightColumnHeight) {
          if (!isInitialLoad) {
            setCollapsedHeight(rightColumnHeight);
          } else {
            setCollapsedHeight(rightColumnHeight);
            setIsInitialLoad(false);
          }
          setIsGroupReservationExpanded(false);
        } else {
          setCollapsedHeight(null);
          setIsGroupReservationExpanded(false);
        }
      }
    };

    const handleResize = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(calculateHeight);
    };

    // Initial calculation after a short delay to ensure content is rendered
    const initialTimer = setTimeout(calculateHeight, 100);

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrame);
      clearTimeout(initialTimer);
    };
  }, [contact, isInitialLoad]);

  // Calculate total notes count
  useEffect(() => {
    const publicCount = reservation.publicNotes?.split('\n').filter(note => note.trim()).length || 0;
    const privateCount = reservation.privateNotes?.split('\n').filter(note => note.trim()).length || 0;
    setNotesCount(publicCount + privateCount);
  }, [reservation.publicNotes, reservation.privateNotes]);

  const handleNotesChange = (notes: string, type: 'public' | 'private') => {
    setHasNewNote(true);
    setTimeout(() => setHasNewNote(false), 2000);

    onReservationUpdate?.({
      ...reservation,
      [type === 'public' ? 'publicNotes' : 'privateNotes']: notes,
    });
  };

  const handleEdit = (field: 'email' | 'phone' | 'name' | 'title') => {
    setEditingField(field);
    if (field === 'name') {
      setEditValue(contact?.firstName || '');
      setEditLastName(contact?.lastName || '');
    } else if (field === 'title') {
      setEditValue(reservation.title || '');
    } else {
      setEditValue(contact?.[field] || '');
    }
  };

  const handleSave = () => {
    if (editingField === 'title') {
      onReservationUpdate?.({ ...reservation, title: editValue });
      setEditingField(null);
      setEditValue("");
    } else if (contact && editingField) {
      if (editingField === 'name') {
        onContactUpdate?.({
          ...contact,
          firstName: editValue,
          lastName: editLastName,
        });
      } else {
        onContactUpdate?.({
          ...contact,
          [editingField]: editValue,
        });
      }
      setEditingField(null);
      setEditValue("");
      setEditLastName("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditingField(null);
      setEditValue("");
      setEditLastName("");
    }
  };

  const handleSelect = (value: string) => {
    if (value === 'create') {
      onCreateHost?.(searchValue);
    } else {
      onHostSelect?.(value);
    }
    setShowHostSearch(false);
    setSearchValue("");
  };

  const handleAccountSelect = (value: string) => {
    if (value === 'create') {
      onCreateAccount?.(accountSearchValue);
    } else {
      onAccountSelect?.(value);
    }
    setShowAccountSearch(false);
    setAccountSearchValue("");
  };

  const filteredContacts = existingContacts.filter(contact => 
    contact.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    (contact.email && contact.email.toLowerCase().includes(searchValue.toLowerCase()))
  );

  const filteredAccounts = existingAccounts.filter(account => 
    account.name.toLowerCase().includes(accountSearchValue.toLowerCase())
  );

  const filteredSalesAgents = salesAgents.filter(agent => 
    agent.name.toLowerCase().includes(salesAgentSearchValue.toLowerCase()) ||
    agent.email.toLowerCase().includes(salesAgentSearchValue.toLowerCase())
  );

  const toggleBookingType = () => {
    onReservationUpdate?.({
      ...reservation,
      isTransient: !reservation.isTransient
    });
  };

  const renderStars = (score: number, onStarClick: (rating: number) => void) => {
    const displayScore = hoveredStars !== null ? hoveredStars : score;
    
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onStarClick(star)}
            onMouseEnter={() => setHoveredStars(star)}
            onMouseLeave={() => setHoveredStars(null)}
            className="focus:outline-none"
          >
            <svg
              className={`w-5 h-5 ${
                star <= displayScore
                  ? 'text-black'
                  : 'text-gray-200'
              } transition-colors duration-150`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </button>
        ))}
      </div>
    );
  };

  // Helper to convert from DayPicker date range to our backend format
  const handleDateRangeUpdate = (range: DayPickerDateRange | undefined) => {
    if (!range?.from || !range?.to) {
      // If clearing the date range, preserve the type
      const updatedDateRange: ReservationDateRange = {
        type: reservation.dateRange?.type || 'flexible',
      };
      
      onReservationUpdate?.({
        ...reservation,
        dateRange: updatedDateRange
      });
      return;
    }
    
    const updatedDateRange: ReservationDateRange = {
      start: range.from.toISOString().split('T')[0],
      end: range.to.toISOString().split('T')[0],
      type: reservation.dateRange?.type || 'flexible', // Preserve existing type or default to flexible
      alternativeDates: reservation.dateRange?.alternativeDates,
      decidingReason: reservation.dateRange?.decidingReason
    };

    onReservationUpdate?.({
      ...reservation,
      dateRange: updatedDateRange
    });
  };

  const handleDateTypeChange = () => {
    if (!reservation.dateRange) {
      // If no date range exists, create one with just the type
      const updatedDateRange: ReservationDateRange = {
        type: 'flexible' // Default to flexible
      };
      onReservationUpdate?.({
        ...reservation,
        dateRange: updatedDateRange
      });
      return;
    }

    const currentType = reservation.dateRange.type;
    const nextType = {
      firm: 'flexible',
      flexible: 'deciding',
      deciding: 'firm',
    }[currentType] as ReservationDateRange['type'];
    
    const updatedDateRange: ReservationDateRange = {
      ...reservation.dateRange,
      type: nextType,
      // Clear alternative dates if switching away from flexible
      alternativeDates: nextType === 'flexible' ? 
        reservation.dateRange.alternativeDates : undefined,
      // Clear deciding reason if switching away from deciding
      decidingReason: nextType === 'deciding' ? 
        reservation.dateRange.decidingReason : undefined,
    };

    onReservationUpdate?.({
      ...reservation,
      dateRange: updatedDateRange
    });
  };

  const handleAddAlternativeDates = () => {
    if (!reservation.dateRange?.start || !reservation.dateRange?.end) return;

    const updatedDateRange: ReservationDateRange = {
      ...reservation.dateRange,
      type: 'flexible',
      alternativeDates: [
        ...(reservation.dateRange.alternativeDates || []),
        {
          start: reservation.dateRange.start,
          end: reservation.dateRange.end,
        }
      ]
    };

    onReservationUpdate?.({
      ...reservation,
      dateRange: updatedDateRange
    });
  };

  return (
    <div className="p-4 space-y-4">
      <style>{flashKeyframes}</style>
      
      {/* Header Section */}
      <section className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {editingField === 'title' ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter title"
                  className="px-2 py-1 border rounded text-lg font-medium flex-grow"
                  autoFocus
                />
                <button
                  onClick={handleSave}
                  className="text-green-600 hover:text-green-800 text-sm"
                >
                  save
                </button>
              </div>
            ) : (
              <h1 className="text-lg font-semibold group">
                {reservation.title ? (
                  <button 
                    onClick={() => handleEdit('title')}
                    className="flex items-center gap-2 hover:text-gray-600"
                  >
                    <span>{reservation.title}</span>
                    <FaPencilAlt className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity text-sm" />
                  </button>
                ) : (
                  <button 
                    onClick={() => handleEdit('title')}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Add Title
                  </button>
                )}
              </h1>
            )}
            <span className="text-gray-400">/</span>
            <button
              onClick={toggleBookingType}
              className="text-lg font-semibold hover:text-blue-600 transition-colors bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full"
            >
              {reservation.isTransient ? 'Transient Booking' : 'Group Booking'}
            </button>
            {reservation.account && (
              <>
                <span className="text-gray-400">/</span>
                <h2 className="text-lg font-semibold text-gray-600">{reservation.account.name}</h2>
              </>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => setShowAccountSearch(!showAccountSearch)}
              className="text-sm px-3 py-1 rounded border border-gray-300 hover:bg-gray-50"
            >
              {reservation.account ? 'Change Account' : 'Add Account'}
            </button>
            {showAccountSearch && (
              <div className="absolute right-0 top-full mt-1 w-[300px] bg-white rounded-lg shadow-lg border p-2 z-50">
                <div className="relative mb-2">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={accountSearchValue}
                    onChange={(e) => setAccountSearchValue(e.target.value)}
                    placeholder="Search by account name..."
                    className="w-full pl-9 pr-3 py-2 text-sm border rounded"
                  />
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {filteredAccounts.length === 0 && accountSearchValue && (
                    <button
                      onClick={() => handleAccountSelect('create')}
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center gap-2 text-sm"
                    >
                      <FaPlus className="text-gray-500" />
                      Create new account "{accountSearchValue}"
                    </button>
                  )}
                  {filteredAccounts.map((account) => (
                    <button
                      key={account.id}
                      onClick={() => handleAccountSelect(account.id)}
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
                    >
                      <div className="font-medium">{account.name}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Grid Layout */}
      <div className="grid lg:grid-cols-[1fr,400px] gap-4">
        {/* Group Reservation Section */}
        <section className="bg-white rounded-lg shadow p-6 relative">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              {reservation.isTransient ? 'Transient Booking Details' : 'Group Booking Details'}
            </h2>
            {reservation.isLinkedTripleseat && reservation.tripleseatUrl && (
              <a
                href={reservation.tripleseatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                View on Tripleseat
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
          <div 
            ref={groupReservationContentRef}
            className={`space-y-6 ${collapsedHeight ? 'overflow-hidden transition-all duration-500 ease-in-out relative pb-12' : ''} ${
              isInitialLoad ? '' : 'transition-all duration-500 ease-in-out'
            }`}
            style={{ 
              maxHeight: collapsedHeight ? 
                (isGroupReservationExpanded ? 
                  (groupReservationContentRef.current?.scrollHeight ?? 'none') : 
                  `${collapsedHeight - 48}px`) 
                : 'none'
            }}
          >
            <div className="space-y-4">
              {/* Row 1: Status and Qualified */}
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center">
                  <span className="text-gray-600 w-32">Status:</span>
                  <button
                    onClick={() => setIsStatusModalOpen(true)}
                    className="focus:outline-none"
                  >
                    <Badge 
                      variant="outline" 
                      className={`${STATUS_COLORS[reservation.status].bg} ${STATUS_COLORS[reservation.status].text} border-0 capitalize`}
                    >
                    {reservation.status}
                    </Badge>
                  </button>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 w-32">Qualified:</span>
                  <button
                    onClick={() => {
                      const nextStatus = {
                        pending: 'qualified',
                        qualified: 'not_qualified',
                        not_qualified: 'pending',
                      }[reservation.qualificationStatus] as GroupReservation['qualificationStatus'];
                      
                      onReservationUpdate?.({
                        ...reservation,
                        qualificationStatus: nextStatus,
                      });
                    }}
                    className="focus:outline-none"
                  >
                    <Badge 
                      variant="outline" 
                      className={`${QUALIFICATION_COLORS[reservation.qualificationStatus].bg} ${QUALIFICATION_COLORS[reservation.qualificationStatus].text} border-0 capitalize`}
                    >
                      {reservation.qualificationStatus.replace('_', ' ')}
                    </Badge>
                  </button>
                </div>
              </div>

              {isStatusModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 max-w-md w-full">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">Change Status</h3>
                      <button 
                        onClick={() => setIsStatusModalOpen(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.keys(STATUS_COLORS).map((statusKey) => (
                        <Badge
                          key={statusKey}
                          variant="outline"
                          className={`
                            ${STATUS_COLORS[statusKey as ReservationStatus].bg} 
                            ${STATUS_COLORS[statusKey as ReservationStatus].text} 
                            border-0 cursor-pointer capitalize
                            ${reservation.status === statusKey ? 'ring-2 ring-offset-2' : ''}
                          `}
                          onClick={() => {
                            onReservationUpdate?.({
                              ...reservation,
                              status: statusKey as ReservationStatus
                            });
                            setIsStatusModalOpen(false);
                          }}
                        >
                          {statusKey}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Row 2: Date Range */}
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <span className="text-gray-600 w-32">Date Range:</span>
                    <DateRangePicker
                      dateRange={pickerDateRange}
                      setDateRange={handleDateRangeUpdate}
                    />
                  </div>
                  <button
                    onClick={() => handleDateTypeChange()}
                    className="focus:outline-none"
                  >
                    <Badge 
                      variant="outline" 
                      className={`${DATE_TYPE_COLORS[reservation.dateRange?.type || 'flexible'].bg} ${DATE_TYPE_COLORS[reservation.dateRange?.type || 'flexible'].text} border-0 capitalize`}
                    >
                      {reservation.dateRange?.type || 'flexible'}
                    </Badge>
                  </button>
                </div>
                {reservation.dateRange?.type === 'deciding' && (
                  <div className="ml-32">
                    <input
                      type="text"
                      value={reservation.dateRange.decidingReason || ''}
                      onChange={(e) => {
                        if (!reservation.dateRange) return;
                        
                        const updatedDateRange: ReservationDateRange = {
                          ...reservation.dateRange,
                          type: 'deciding', // Ensure type is set
                          decidingReason: e.target.value
                        };

                        onReservationUpdate?.({
                          ...reservation,
                          dateRange: updatedDateRange
                        });
                      }}
                      placeholder="Describe the factors under consideration..."
                      className="w-full px-3 py-2 border rounded text-sm"
                    />
                  </div>
                )}
                {reservation.dateRange?.type === 'flexible' && reservation.dateRange.start && reservation.dateRange.end && (
                  <div className="ml-32 space-y-2">
                    {reservation.dateRange.alternativeDates?.map((dates, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <DateRangePicker
                          dateRange={{
                            from: new Date(dates.start),
                            to: new Date(dates.end)
                          }}
                          setDateRange={(range) => {
                            if (!range?.from || !range?.to) {
                              // Remove this date range
                              onReservationUpdate?.({
                                ...reservation,
                                dateRange: {
                                  ...reservation.dateRange!,
                                  alternativeDates: reservation.dateRange?.alternativeDates?.filter((_, i) => i !== index)
                                }
                              });
                              return;
                            }
                            
                            const newAlternativeDates = [...(reservation.dateRange?.alternativeDates || [])];
                            newAlternativeDates[index] = {
                              start: range.from.toISOString().split('T')[0],
                              end: range.to.toISOString().split('T')[0],
                            };
                            
                            onReservationUpdate?.({
                              ...reservation,
                              dateRange: {
                                ...reservation.dateRange!,
                                alternativeDates: newAlternativeDates
                              }
                            });
                          }}
                        />
                        <button
                          onClick={() => {
                            onReservationUpdate?.({
                              ...reservation,
                              dateRange: {
                                ...reservation.dateRange!,
                                alternativeDates: reservation.dateRange?.alternativeDates?.filter((_, i) => i !== index)
                              }
                            });
                          }}
                          className="text-red-600 hover:text-red-800"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => handleAddAlternativeDates()}
                      className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                    >
                      <FaPlus className="h-3 w-3" />
                      Add alternative dates
                    </button>
                  </div>
                )}
              </div>

              {/* Row 3: Sales Agent */}
              <div className="flex items-center">
                <span className="text-gray-600 w-32">Sales Agent:</span>
                <div className="relative">
                  <button
                    onClick={() => setShowSalesAgentDropdown(!showSalesAgentDropdown)}
                    className="text-sm hover:text-blue-600 focus:outline-none flex items-center gap-2"
                  >
                    <span>{reservation.assignedSalesAgent.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  {showSalesAgentDropdown && (
                    <div className="absolute left-0 top-full mt-1 w-[300px] bg-white rounded-lg shadow-lg border p-2 z-50">
                      <div className="relative mb-2">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          value={salesAgentSearchValue}
                          onChange={(e) => setSalesAgentSearchValue(e.target.value)}
                          placeholder="Search by name or email..."
                          className="w-full pl-9 pr-3 py-2 text-sm border rounded"
                        />
                      </div>
                      <div className="max-h-[300px] overflow-y-auto">
                        {filteredSalesAgents.map((agent) => (
                          <button
                            key={agent.id}
                            onClick={() => {
                              onSalesAgentSelect?.(agent.id);
                              setShowSalesAgentDropdown(false);
                              setSalesAgentSearchValue("");
                            }}
                            className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center gap-2"
                          >
                            {agent.avatarUrl && (
                              <img 
                                src={agent.avatarUrl} 
                                alt={agent.name} 
                                className="w-6 h-6 rounded-full"
                              />
                            )}
                            <div>
                              <div className="font-medium">{agent.name}</div>
                              <div className="text-sm text-gray-500">{agent.email}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Row 4: Lead Score and Intent Score */}
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center">
                  <span className="text-gray-600 w-32">Lead Score:</span>
                  {renderStars(reservation.leadScore, (rating) => {
                    onReservationUpdate?.({
                      ...reservation,
                      leadScore: rating
                    });
                  })}
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 w-32">Intent Score:</span>
                  <span>{reservation.intentScore}/100</span>
                </div>
              </div>
            </div>
            <div className={`space-y-4 ${hasNewNote ? 'animate-flash' : ''}`}>
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setIsNotesExpanded(!isNotesExpanded)}
              >
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-medium text-gray-900">Notes</h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                    {notesCount}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{isNotesExpanded ? 'close' : 'open'}</span>
                  {isNotesExpanded ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </div>

              {isNotesExpanded && (
            <div className="space-y-4">
                  <PlannerPublicNotes
                    initialNotes={reservation.publicNotes}
                    currentUser={currentUser}
                    onChange={(notes) => handleNotesChange(notes, 'public')}
                    open={false}
                  />
                  <PlannerPrivateNotes
                    initialNotes={reservation.privateNotes}
                    users={[currentUser, ...teamMembers]
                      .filter((user): user is NonNullable<typeof user> => user !== undefined)}
                    onChange={(notes) => handleNotesChange(notes, 'private')}
                    open={false}
                  />
                </div>
              )}
            </div>
          </div>
          {collapsedHeight && groupReservationContentRef.current && (
            <button
              onClick={() => setIsGroupReservationExpanded(!isGroupReservationExpanded)}
              className="absolute bottom-0 left-0 right-0 h-12 flex items-center justify-center bg-gradient-to-t from-white via-white to-transparent hover:bg-gray-50"
            >
              <span className="text-blue-600 text-sm mr-1">
                {isGroupReservationExpanded ? 'Show less' : 'Show more'}
              </span>
              <FaChevronDown 
                className={`text-blue-600 transform transition-transform duration-200 ${isGroupReservationExpanded ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>
          )}
        </section>

        {/* Right Side Sections */}
        <div ref={rightColumnRef} className="space-y-4">
          {/* Contact Section */}
          <section className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Contact</h2>
              <div className="relative">
                <button
                  onClick={() => setShowHostSearch(!showHostSearch)}
                  className="text-sm px-3 py-1 rounded border border-gray-300 hover:bg-gray-50"
                >
                  {contact ? 'Change Host' : 'Add Host'}
                </button>
                {showHostSearch && (
                  <div className="absolute right-0 top-full mt-1 w-[300px] bg-white rounded-lg shadow-lg border p-2 z-50">
                    <div className="relative mb-2">
                      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Search by name or email..."
                        className="w-full pl-9 pr-3 py-2 text-sm border rounded"
                      />
                    </div>
                    <div className="max-h-[300px] overflow-y-auto">
                      {filteredContacts.length === 0 && searchValue && (
                        <button
                          onClick={() => handleSelect('create')}
                          className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center gap-2 text-sm"
                        >
                          <FaPlus className="text-gray-500" />
                          Create new contact with "{searchValue}"
                        </button>
                      )}
                      {filteredContacts.map((contact) => (
                        <button
                          key={contact.id}
                          onClick={() => handleSelect(contact.id)}
                          className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
                        >
                          <div className="font-medium">{contact.name}</div>
                          {contact.email && (
                            <div className="text-sm text-gray-500">{contact.email}</div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {contact ? (
              <div className="space-y-4">
                <ContactHoverCard
                  firstName={contact.firstName}
                  lastName={contact.lastName}
                  imageUrl={contact.imageUrl}
                  dataSources={contact.dataSources}
                  contactInfo={{
                    phone: contact.phone,
                    email: contact.email,
                    address: contact.address,
                  }}
                  onContactInfoEdit={(updatedInfo) => {
                    onContactUpdate?.({
                      ...contact,
                      ...updatedInfo,
                    });
                  }}
                  bio={contact.bio}
                  onBioEdit={(updatedBio) => {
                    onContactUpdate?.({
                      ...contact,
                      bio: updatedBio,
                    });
                  }}
                />
                <div className="text-sm space-y-1">
                  {(!contact.firstName && !contact.lastName) ? (
                    editingField === 'name' ? (
                      <div className="flex items-center gap-2">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="First name"
                            className="px-2 py-1 border rounded text-sm w-24"
                            autoFocus
                          />
                          <input
                            type="text"
                            value={editLastName}
                            onChange={(e) => setEditLastName(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Last name"
                            className="px-2 py-1 border rounded text-sm w-24"
                          />
                        </div>
                        <button
                          onClick={handleSave}
                          className="text-green-600 hover:text-green-800 text-sm"
                        >
                          save
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => handleEdit('name')}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        add name
                      </button>
                    )
                  ) : null}
                  {!contact.email && (
                    <div className="mb-2">
                      {editingField === 'email' ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="email"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyDown={handleKeyDown}
                          placeholder="Enter email"
                          className="px-2 py-1 border rounded text-sm"
                          autoFocus
                        />
                        <button
                          onClick={handleSave}
                          className="text-green-600 hover:text-green-800 text-sm"
                        >
                          save
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => handleEdit('email')}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        add email
                      </button>
                      )}
                    </div>
                  )}
                  {!contact.phone && (
                    <div className="mb-2">
                      {editingField === 'phone' ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="tel"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyDown={handleKeyDown}
                          placeholder="Enter phone"
                          className="px-2 py-1 border rounded text-sm"
                          autoFocus
                        />
                        <button
                          onClick={handleSave}
                          className="text-green-600 hover:text-green-800 text-sm"
                        >
                          save
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => handleEdit('phone')}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        add phone
                      </button>
                      )}
                    </div>
                  )}
                  {(contact.email || contact.phone) && (
                    <div className="text-gray-600">
                      {contact.email && <div>{contact.email}</div>}
                      {contact.phone && <div>{contact.phone}</div>}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-gray-600 text-sm">No host assigned</p>
            )}
          </section>

          {/* Guest List Section */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Guest List</h2>
            <p className="text-gray-600 italic">Coming Soon</p>
          </section>
        </div>
      </div>

      <div className="mt-4">
        <hr className="border-gray-200" />

        {/* Itinerary Section */}
        <section className="bg-white rounded-lg shadow p-6 mt-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Itinerary</h2>
            <div className="flex gap-2">
              <Button
                className="text-sm px-3 py-1 rounded border border-gray-300 hover:bg-gray-50 text-gray-700"
                onClick={() => {
                  // TODO: Implement alternate itinerary functionality
                }}
              >
                Add Alternate Itinerary
              </Button>
              <Button
                className="text-sm px-3 py-1 rounded border border-gray-300 bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
                onClick={() => {
                  // TODO: Implement Kismet generation functionality
                }}
              >
                <img src={KISMET_LOGO_URL} alt="Kismet" className="w-4 h-4" />
                Generate with Kismet
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div>
              {reservation.rooms?.length ? (
                <div className="flex items-center gap-2">
                  <span className="font-medium">Rooms</span>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                    {reservation.rooms.length}
                  </span>
                </div>
              ) : (
                <button 
                  onClick={() => setShowRoomsSection(true)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Add Rooms
                </button>
              )}
            </div>
            <div>
              {reservation.events?.length ? (
                <div className="flex items-center gap-2">
                  <span className="font-medium">Events</span>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                    {reservation.events.length}
                  </span>
                </div>
              ) : (
                <button 
                  onClick={() => setShowEventsSection(true)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Add Events
                </button>
              )}
            </div>
            <div>
              {reservation.addOns?.length ? (
                <div className="flex items-center gap-2">
                  <span className="font-medium">Add-Ons</span>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                    {reservation.addOns.length}
                  </span>
                </div>
              ) : (
                <button 
                  onClick={() => setShowAddOnsSection(true)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Add Add-Ons
                </button>
              )}
            </div>
            <div>
              {reservation.extras?.length ? (
                <div className="flex items-center gap-2">
                  <span className="font-medium">Extras</span>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                    {reservation.extras.length}
                  </span>
                </div>
              ) : (
                <button 
                  onClick={() => setShowExtrasSection(true)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Add Extras
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Rooms Section */}
        {((reservation.rooms?.length ?? 0) > 0 || showRoomsSection) && (
          <section className="bg-white rounded-lg shadow p-6 mt-4">
            <h2 className="text-lg font-semibold mb-4">Rooms</h2>
            <p className="text-gray-600 italic">Coming Soon</p>
          </section>
        )}

        {/* Events Section */}
        {((reservation.events?.length ?? 0) > 0 || showEventsSection) && (
          <section className="bg-white rounded-lg shadow p-6 mt-4">
            <h2 className="text-lg font-semibold mb-4">Events</h2>
            <p className="text-gray-600 italic">Coming Soon</p>
          </section>
        )}

        {/* Add-Ons Section */}
        {((reservation.addOns?.length ?? 0) > 0 || showAddOnsSection) && (
          <section className="bg-white rounded-lg shadow p-6 mt-4">
            <h2 className="text-lg font-semibold mb-4">Add-Ons</h2>
            <p className="text-gray-600 italic">Coming Soon</p>
          </section>
        )}

        {/* Extras Section */}
        {((reservation.extras?.length ?? 0) > 0 || showExtrasSection) && (
          <section className="bg-white rounded-lg shadow p-6 mt-4">
            <h2 className="text-lg font-semibold mb-4">Extras</h2>
            <p className="text-gray-600 italic">Coming Soon</p>
          </section>
        )}
      </div>
    </div>
  );
};

export default UserSessionBody; 