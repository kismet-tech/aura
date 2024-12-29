import React, { useState, useRef, useEffect } from 'react';
import { ContactAvatar } from '@/components/atoms/ContactAvatar';
import { ContactName } from '@/components/atoms/ContactName';
import { ContactHoverCard } from '@/components/molecules/ContactHoverCard';
import { FaChevronDown, FaChevronUp, FaPlus, FaSearch, FaPencilAlt, FaCopy } from 'react-icons/fa';
import { PlannerPrivateNotes } from '@/components/molecules/Planners/PlannerPrivateNotesSaaS';
import { PlannerPublicNotes } from '@/components/molecules/Planners/PlannerPublicNotesSaaS';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from "@/components/shadcn/button";
import { format } from "date-fns";
import { DateRange as DayPickerDateRange } from "react-day-picker";
import { DateRangePicker } from '@/components/atoms/DateRangePicker';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import { ModifyEventOffer } from '@/components/molecules/ModifyEventOffer';
import { EventOfferCarouselItemSaaS } from '@/components/atoms/EventOfferCarouselItemSaaS';
import { RenderableItineraryEventOffer, HotelEventOfferStatus, VenueOfferPricingType } from "@kismet_ai/foundation";
import { ExtraLineItem } from '@/components/atoms/ExtraLineItem';

// The backend stores date ranges in the following format:
// - start: string (ISO date) | undefined - The start date if known
// - end: string (ISO date) | undefined - The end date if known
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
  intentMetrics?: {
    websiteVisits: number;
    mostRecentVisit: string | null;
    lastEmailOpen: string | null;
    numberOfContacts: number;
    researchedHotel: boolean;
  };
  assignedSalesAgent: {
    name: string;
    id: string;
  };
  publicNotes: string;
  privateNotes: string;
  itineraryName?: string;
  pmsType?: 'Cloudbeds' | 'Mews';
  itineraries?: Array<{
    id: string;
    name: string;
    isActive?: boolean;
    rooms?: Array<{
      id: string;
      name: string;
    }>;
    events?: Array<{
      id: string;
      name: string;
    }>;
    eventData?: Record<string, {
      startDateTime: string;
      endDateTime: string;
      status: HotelEventOfferStatus;
      numberOfGuests: number;
      imageUrl: string;
      isEventOfferPriceEnabled: boolean;
      eventOfferPriceInCents: number;
      venueOffers: Array<{
        venueOfferId: string;
        venueName: string;
        pricingInfo: {
          priceInCents: number;
          pricingType: VenueOfferPricingType;
        };
      }>;
      details: {
        description: string;
      };
    }>;
    addOns?: Array<{
      id: string;
      name: string;
    }>;
    extras?: Array<{
      id: string;
      name: string;
      description?: string;
      priceInCents: number;
    }>;
  }>;
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
  eventData?: Record<string, {
    startDateTime: string;
    endDateTime: string;
    status: HotelEventOfferStatus;
    numberOfGuests: number;
    imageUrl: string;
    isEventOfferPriceEnabled: boolean;
    eventOfferPriceInCents: number;
    venueOffers: Array<{
      venueOfferId: string;
      venueName: string;
      pricingInfo: {
        priceInCents: number;
        pricingType: VenueOfferPricingType;
      };
    }>;
    details: {
      description: string;
    };
  }>;
  addOns?: Array<{
    id: string;
    name: string;
  }>;
  extras?: Array<{
    id: string;
    name: string;
    description?: string;
    priceInCents: number;
  }>;
  upsellRevenue?: {
    roomUpgrades: number;
  };
  requiresContract?: boolean;
  attritionPercentage?: number;
  cancellationDeadlineDays?: number;
  contractStatus?: 'not_required' | 'pending' | 'on_file';
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
  const [editingField, setEditingField] = useState<'email' | 'phone' | 'name' | 'title' | 'itinerary' | null>(null);
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
  const [showModifyEvent, setShowModifyEvent] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  
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

  const handleEdit = (field: 'email' | 'phone' | 'name' | 'title' | 'itinerary') => {
    setEditingField(field);
    if (field === 'name') {
      setEditValue(contact?.firstName || '');
      setEditLastName(contact?.lastName || '');
    } else if (field === 'title') {
      setEditValue(reservation.title || '');
    } else if (field === 'itinerary') {
      setEditValue(reservation.itineraryName || 'Itinerary');
    } else {
      setEditValue(contact?.[field] || '');
    }
  };

  const handleSave = () => {
    if (editingField === 'title') {
      onReservationUpdate?.({ ...reservation, title: editValue });
      setEditingField(null);
      setEditValue("");
    } else if (editingField === 'itinerary') {
      if (!reservation.itineraries) {
        // If no itineraries array exists, create it with the current one as active
        const newItinerary = {
          id: `${Date.now()}`, // Simple ID generation
          name: `${reservation.itineraryName || 'Itinerary'} (copy)`,
          isActive: false,
        };
        
        onReservationUpdate?.({
          ...reservation,
          itineraries: [
            { id: 'current', name: reservation.itineraryName || 'Itinerary', isActive: true },
            newItinerary
          ],
        });
      } else {
        // Add new copy to existing itineraries, preserving active states
        const newItinerary = {
          id: `${Date.now()}`, // Simple ID generation
          name: `${reservation.itineraryName || 'Itinerary'} (copy)`,
          isActive: false,
        };

        // Ensure at least one itinerary is active
        const hasActiveItinerary = reservation.itineraries.some(i => i.isActive);
        const updatedItineraries = hasActiveItinerary 
          ? reservation.itineraries 
          : reservation.itineraries.map(i => ({
              ...i,
              isActive: i.name === reservation.itineraryName // Make current itinerary active if none are
            }));
        
        onReservationUpdate?.({
          ...reservation,
          itineraries: [...updatedItineraries, newItinerary],
        });
      }
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

  const handleDuplicateItinerary = () => {
    if (!reservation.itineraries) {
      // If no itineraries array exists, create it with the current one as active
      const currentItinerary = {
        id: 'current',
        name: reservation.itineraryName || 'Itinerary',
        isActive: true
      };
      
      const newItinerary = {
        id: `${Date.now()}`,
        name: `${reservation.itineraryName || 'Itinerary'} (copy)`,
        isActive: false
      };
      
      onReservationUpdate?.({
        ...reservation,
        itineraryName: newItinerary.name, // Switch to new itinerary
        itineraries: [currentItinerary, newItinerary]
      });
    } else {
      // Add new copy to existing itineraries
      const newItinerary = {
        id: `${Date.now()}`,
        name: `${reservation.itineraryName || 'Itinerary'} (copy)`,
        isActive: false
      };
      
      // Keep current itinerary active, but switch to viewing the new one
      const updatedItineraries = reservation.itineraries.map(itinerary => ({
        ...itinerary,
        isActive: itinerary.name === reservation.itineraryName
      }));
      
      onReservationUpdate?.({
        ...reservation,
        itineraryName: newItinerary.name, // Switch to new itinerary
        itineraries: [...updatedItineraries, newItinerary]
      });
    }
  };

  const handleAddItinerary = () => {
    if (!reservation.itineraries) {
      // If no itineraries array exists, create it with the current one as active and add a new blank one
      const currentItinerary = {
        id: 'current',
        name: reservation.itineraryName || 'Itinerary',
        isActive: true
      };

      const newItinerary = {
        id: `${Date.now()}`,
        name: 'Itinerary (2)',
        isActive: false
      };

      onReservationUpdate?.({
        ...reservation,
        itineraryName: newItinerary.name, // Switch to new itinerary
        itineraries: [currentItinerary, newItinerary],
        // Clear all content for the new itinerary
        rooms: [],
        events: [],
        addOns: [],
        extras: [],
        eventData: {}
      });
    } else {
      // Find the highest number in existing "Itinerary (n)" names
      const numbers = reservation.itineraries
        .map(i => {
          const match = i.name.match(/Itinerary \((\d+)\)/);
          return match ? parseInt(match[1]) : 1;
        });
      const nextNumber = Math.max(...numbers, 1) + 1;

      const newItinerary = {
        id: `${Date.now()}`,
        name: `Itinerary (${nextNumber})`,
        isActive: false
      };
      
      onReservationUpdate?.({
        ...reservation,
        itineraryName: newItinerary.name, // Switch to new itinerary
        itineraries: [...reservation.itineraries, newItinerary],
        // Clear all content for the new itinerary
        rooms: [],
        events: [],
        addOns: [],
        extras: [],
        eventData: {}
      });
    }
  };

  // Helper to determine if we should show the active/set active badge
  const shouldShowActiveBadge = () => {
    if (!reservation.itineraries || reservation.itineraries.length <= 1) {
      return false; // Don't show any badge for single itinerary
    }
    return true;
  };

  // Helper to determine if current itinerary is active
  const isCurrentItineraryActive = () => {
    if (!reservation.itineraries) return true; // Single itinerary case
    if (reservation.itineraries.length === 1) return true; // Single itinerary case
    
    const currentItinerary = reservation.itineraries.find(i => i.name === reservation.itineraryName);
    if (!currentItinerary) return false;
    
    return currentItinerary.isActive === true;
  };

  const handleSetActiveItinerary = () => {
    if (!reservation.itineraries) return;
    
    // Update all itineraries to be inactive except the current one
    const updatedItineraries = reservation.itineraries.map(itinerary => ({
      ...itinerary,
      isActive: itinerary.name === reservation.itineraryName
    }));

    onReservationUpdate?.({
      ...reservation,
      itineraries: updatedItineraries
    });
  };

  // Helper to get the current itinerary data
  const getCurrentItineraryData = () => {
    if (!reservation.itineraries) {
      // If no itineraries exist, return root level data
      return {
        rooms: reservation.rooms || [],
        events: reservation.events || [],
        eventData: reservation.eventData || {},
        addOns: reservation.addOns || [],
        extras: reservation.extras || []
      };
    }

    const currentItinerary = reservation.itineraries.find(i => i.name === reservation.itineraryName);
    if (!currentItinerary) {
      return {
        rooms: [],
        events: [],
        eventData: {},
        addOns: [],
        extras: []
      };
    }

    return {
      rooms: currentItinerary.rooms || [],
      events: currentItinerary.events || [],
      eventData: currentItinerary.eventData || {},
      addOns: currentItinerary.addOns || [],
      extras: currentItinerary.extras || []
    };
  };

  // Helper to update the current itinerary data
  const updateCurrentItineraryData = (updates: {
    rooms?: Array<any>;
    events?: Array<any>;
    eventData?: Record<string, any>;
    addOns?: Array<any>;
    extras?: Array<any>;
  }) => {
    if (!reservation.itineraries) {
      // If no itineraries exist, update at root level
      onReservationUpdate?.({
        ...reservation,
        ...updates
      });
      return;
    }

    const updatedItineraries = reservation.itineraries.map(itinerary => {
      if (itinerary.name === reservation.itineraryName) {
        return {
          ...itinerary,
          ...updates
        };
      }
      return itinerary;
    });

    onReservationUpdate?.({
      ...reservation,
      itineraries: updatedItineraries
    });
  };

  const handleDeleteEvent = (eventId: string) => {
    const currentData = getCurrentItineraryData();
    const updatedEvents = currentData.events.filter(event => event.id !== eventId);
    const { [eventId]: deletedEvent, ...updatedEventData } = currentData.eventData;
    
    updateCurrentItineraryData({
      events: updatedEvents,
      eventData: updatedEventData
    });
    
    setShowModifyEvent(false);
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
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="cursor-help">{(() => {
                          if (reservation.intentScore >= 80) return 'Very High';
                          if (reservation.intentScore >= 60) return 'High';
                          if (reservation.intentScore >= 40) return 'Medium';
                          if (reservation.intentScore >= 20) return 'Low';
                          return 'Very Low';
                        })()}</span>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="p-4 space-y-2 w-64">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Website Visits:</span>
                            <span>{reservation.intentMetrics?.websiteVisits || 0}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Most Recent Visit:</span>
                            <span>
                              {reservation.intentMetrics?.mostRecentVisit ? 
                                new Date(reservation.intentMetrics.mostRecentVisit).toLocaleString() : 
                                'Never'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Last Email Open:</span>
                            <span>
                              {reservation.intentMetrics?.lastEmailOpen ? 
                                new Date(reservation.intentMetrics.lastEmailOpen).toLocaleString() : 
                                'Never'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Number of Contacts:</span>
                            <span>{reservation.intentMetrics?.numberOfContacts || 0}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Researched Hotel:</span>
                            <span>{reservation.intentMetrics?.researchedHotel ? 'Yes' : 'No'}</span>
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
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
              <h2 className="text-lg font-semibold">Contact/Host</h2>
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
            <div className="flex items-center gap-3">
              {editingField === 'itinerary' ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter itinerary name"
                    className="px-2 py-1 border rounded text-lg font-semibold"
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
                <div className="flex items-center gap-2 group">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-2 hover:text-gray-600">
                        <span className="text-lg font-semibold">{reservation.itineraryName || 'Itinerary'}</span>
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-[200px]">
                      {reservation.itineraries?.map((itinerary) => (
                        <DropdownMenuItem
                          key={itinerary.id}
                          className="flex items-center justify-between"
                          onSelect={() => {
                            // TODO: Implement itinerary switch functionality
                            onReservationUpdate?.({
                              ...reservation,
                              itineraryName: itinerary.name
                            });
                          }}
                        >
                          <span>{itinerary.name}</span>
                          {itinerary.isActive && (
                            <Badge variant="outline" className="ml-2 bg-green-100 text-green-700 border-0">
                              Active
                            </Badge>
                          )}
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuItem
                        onSelect={() => {
                          handleEdit('itinerary');
                          setEditValue(reservation.itineraryName || 'Itinerary');
                        }}
                        className="text-blue-600"
                      >
                        Rename
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={handleDuplicateItinerary}
                          className="hover:text-gray-600"
                        >
                          <FaCopy className="text-gray-400 hover:text-gray-600 text-sm" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Duplicate</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={handleAddItinerary}
                          className="hover:text-gray-600"
                        >
                          <FaPlus className="text-gray-400 hover:text-gray-600 text-sm" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add New</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  {shouldShowActiveBadge() && (
                    isCurrentItineraryActive() ? (
                      <Badge variant="outline" className="ml-2 bg-green-100 text-green-700 border-0">
                        Active
                      </Badge>
                    ) : (
                      <button
                        onClick={handleSetActiveItinerary}
                        className="ml-2"
                      >
                        <Badge variant="outline" className="bg-gray-100 text-gray-700 border-0 cursor-pointer hover:bg-gray-200">
                          Set Active
                        </Badge>
                      </button>
                    )
                  )}
              <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 bg-white hover:bg-white border-black ml-2"
                onClick={() => {
                  // TODO: Implement Kismet generation functionality
                }}
              >
                <img src={KISMET_LOGO_URL} alt="Kismet" className="w-4 h-4" />
                Generate with Kismet
                  </Button>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 bg-white hover:bg-white"
                onClick={() => {
                  // TODO: Implement get link functionality
                }}
              >
                Get Link
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 bg-white hover:bg-white"
                onClick={() => {
                  // TODO: Implement send to host functionality
                }}
              >
                Send to Host
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div>
              {(reservation.rooms?.some(room => room.id)) ? (
                <div className="flex items-center gap-2">
                  <span className="font-medium">Rooms</span>
                  <button
                    onClick={() => setShowRoomsSection(true)}
                    className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full hover:bg-gray-200"
                  >
                    {reservation.rooms.length}
                  </button>
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
              {(reservation.events?.some(event => event.id && reservation.eventData?.[event.id])) ? (
                <div className="flex items-center gap-2">
                  <span className="font-medium">Events</span>
                  <button
                    onClick={() => setShowEventsSection(true)}
                    className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full hover:bg-gray-200"
                  >
                    {reservation.events.length}
                  </button>
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
              {(reservation.addOns?.some(addon => addon.id)) ? (
                <div className="flex items-center gap-2">
                  <span className="font-medium">Add-Ons</span>
                  <button
                    className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full cursor-not-allowed"
                  >
                    {reservation.addOns.length}
                  </button>
                </div>
              ) : (
                <button 
                  className="text-gray-400 hover:text-gray-400 cursor-not-allowed flex items-center gap-1"
                >
                  Add Add-Ons
                  <span className="text-xs text-gray-400">(coming soon)</span>
                </button>
              )}
            </div>
            <div>
              {(reservation.extras?.some(extra => extra.id)) ? (
                <div className="flex items-center gap-2">
                  <span className="font-medium">Extras</span>
                  <button
                    onClick={() => setShowExtrasSection(true)}
                    className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full hover:bg-gray-200"
                  >
                    {reservation.extras.length}
                  </button>
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
        {((reservation.rooms && reservation.rooms.some(room => room.id)) || showRoomsSection) && (
          <section className="bg-white rounded-lg shadow p-6 mt-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Rooms</h2>
              {/* TODO @Julian: This button should trigger the create block flow in the PMS integration.
                  For Cloudbeds: Create block in Cloudbeds with current dates and room count
                  For Mews: Create block in Mews with current dates and room count */}
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white hover:bg-gray-50"
              >
                Block on {reservation.pmsType || 'Cloudbeds'}
              </Button>
            </div>
            <p className="text-gray-600 italic">Use Existing Rooms SaaS Tool</p>
          </section>
        )}

        {/* Events Section */}
        {((reservation.events && reservation.events.some(event => event.id && reservation.eventData?.[event.id])) || showEventsSection) && (
          <section className="bg-white rounded-lg shadow p-6 mt-4">
            <h2 className="text-lg font-semibold mb-4">Events</h2>
            <div className="flex flex-wrap gap-4">
              {reservation.events?.map((event) => {
                // Find the full event data in the reservation
                const eventData = reservation.eventData?.[event.id];
                if (!eventData) return null;

                const renderableEvent: RenderableItineraryEventOffer = {
                  eventOfferId: event.id,
                  eventOfferName: event.name,
                  startDateTime: eventData.startDateTime,
                  endDateTime: eventData.endDateTime,
                  status: eventData.status as HotelEventOfferStatus,
                  numberOfGuests: eventData.numberOfGuests,
                  imageUrl: eventData.imageUrl,
                  isEventOfferPriceEnabled: eventData.isEventOfferPriceEnabled,
                  eventOfferPriceInCents: eventData.eventOfferPriceInCents,
                  venueOffers: eventData.venueOffers.map(venue => ({
                    ...venue,
                    pricingInfo: {
                      ...venue.pricingInfo,
                      pricingType: venue.pricingInfo.pricingType as VenueOfferPricingType
                    }
                  })),
                  details: eventData.details
                };

                return (
                  <EventOfferCarouselItemSaaS
                    key={event.id}
                    eventOffer={renderableEvent}
                    onClick={({ eventOfferId, section }) => {
                      setSelectedEventId(eventOfferId);
                      setShowModifyEvent(true);
                    }}
                  />
                );
              })}
              <div 
                className="flex-none w-[240px] h-[120px] cursor-pointer"
                onClick={() => {
                  setSelectedEventId(null);
                  setShowModifyEvent(true);
                }}
              >
                <div className="h-full flex flex-col items-center justify-center gap-2 border rounded-lg hover:bg-gray-50">
                  <FaPlus className="h-6 w-6 text-gray-400" />
                  <span className="text-sm text-gray-600">Add Event</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Event Offer Drawer */}
        <ModifyEventOffer
          open={showModifyEvent}
          onOpenChange={setShowModifyEvent}
          defaultOpen={!selectedEventId}
          initialData={selectedEventId ? {
            name: reservation.events?.find(e => e.id === selectedEventId)?.name,
            status: reservation.eventData?.[selectedEventId]?.status,
            startDate: reservation.eventData?.[selectedEventId]?.startDateTime ? new Date(reservation.eventData[selectedEventId].startDateTime) : undefined,
            endDate: reservation.eventData?.[selectedEventId]?.endDateTime ? new Date(reservation.eventData[selectedEventId].endDateTime) : undefined,
            guestCount: reservation.eventData?.[selectedEventId]?.numberOfGuests,
            venues: reservation.eventData?.[selectedEventId]?.venueOffers.map(v => v.venueName),
            priceInCents: reservation.eventData?.[selectedEventId]?.eventOfferPriceInCents,
            publicNotes: reservation.eventData?.[selectedEventId]?.details.description,
            // Add additional fields for complete event data
            undiscountedPriceInCents: reservation.eventData?.[selectedEventId]?.venueOffers[0]?.pricingInfo.priceInCents,
            paymentSplitType: 'SINGLE_PAYER', // Default value since it's not stored in eventData
            visibility: 'PUBLIC' // Default value since it's not stored in eventData
          } : {
            // Default values for a new event
            name: '',
            status: HotelEventOfferStatus.PROSPECT,
            startDate: null,
            endDate: null,
            guestCount: 0,
            venues: [],
            paymentSplitType: 'SINGLE_PAYER',
            visibility: 'PUBLIC'
          }}
          onSave={(event) => {
            const currentData = getCurrentItineraryData();
            
            if (selectedEventId) {
              // Update existing event
              const updatedEventData = {
                ...currentData.eventData[selectedEventId],
                eventOfferName: event.name || 'Untitled Event',
                startDateTime: event.startDate?.toISOString() || new Date().toISOString(),
                endDateTime: event.endDate?.toISOString() || new Date().toISOString(),
                status: event.status || HotelEventOfferStatus.PROSPECT,
                numberOfGuests: event.guestCount || 0,
                imageUrl: 'https://via.placeholder.com/300x200',
                isEventOfferPriceEnabled: !!event.priceInCents,
                eventOfferPriceInCents: event.priceInCents || 0,
                venueOffers: event.venues?.map(venue => ({
                  venueOfferId: `venue-${Date.now()}-${venue}`,
                  venueName: venue,
                  pricingInfo: {
                    priceInCents: event.priceInCents || 0,
                    pricingType: VenueOfferPricingType.FIXED_COST
                  }
                })) || [],
                details: {
                  description: event.publicNotes || ''
                }
              };

              updateCurrentItineraryData({
                events: currentData.events.map(e => 
                  e.id === selectedEventId 
                    ? { ...e, name: event.name || 'Untitled Event' }
                    : e
                ),
                eventData: {
                  ...currentData.eventData,
                  [selectedEventId]: updatedEventData
                }
              });
            } else {
              // Create a new event
              const eventId = `event-${Date.now()}`;
              const eventData = {
                eventOfferName: event.name || 'Untitled Event',
                startDateTime: event.startDate?.toISOString() || new Date().toISOString(),
                endDateTime: event.endDate?.toISOString() || new Date().toISOString(),
                status: event.status || HotelEventOfferStatus.PROSPECT,
                numberOfGuests: event.guestCount || 0,
                imageUrl: 'https://via.placeholder.com/300x200',
                isEventOfferPriceEnabled: !!event.priceInCents,
                eventOfferPriceInCents: event.priceInCents || 0,
                venueOffers: event.venues?.map(venue => ({
                  venueOfferId: `venue-${Date.now()}-${venue}`,
                  venueName: venue,
                  pricingInfo: {
                    priceInCents: event.priceInCents || 0,
                    pricingType: VenueOfferPricingType.FIXED_COST
                  }
                })) || [],
                details: {
                  description: event.publicNotes || ''
                }
              };

              updateCurrentItineraryData({
                events: [...currentData.events, {
                  id: eventId,
                  name: event.name || 'New Event'
                }],
                eventData: {
                  ...currentData.eventData,
                  [eventId]: eventData
                }
              });
            }

            setShowModifyEvent(false);
          }}
          onDelete={selectedEventId ? () => handleDeleteEvent(selectedEventId) : undefined}
        />

        {/* Add-Ons Section */}
        {((reservation.addOns && reservation.addOns.some(addon => addon.id)) || showAddOnsSection) && (
          <section className="bg-white rounded-lg shadow p-6 mt-4">
            <h2 className="text-lg font-semibold mb-4">Add-Ons</h2>
            <p className="text-gray-600 italic">Coming Soon</p>
          </section>
        )}

        {/* Extras Section */}
        {(getCurrentItineraryData().extras?.length > 0 || showExtrasSection) && (
          <section className="bg-white rounded-lg shadow p-6 mt-4">
            <h2 className="text-lg font-semibold mb-4">Extras</h2>
            <div className="space-y-4">
              {/* List existing extras */}
              {getCurrentItineraryData().extras?.map((extra) => (
                <ExtraLineItem
                  key={extra.id}
                  name={extra.name}
                  description={extra.description}
                  priceInCents={extra.priceInCents}
                  onDelete={() => {
                    const currentData = getCurrentItineraryData();
                    updateCurrentItineraryData({
                      extras: currentData.extras.filter(e => e.id !== extra.id)
                    });
                  }}
                />
              ))}

              {/* Add new extra form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const nameInput = form.elements.namedItem('extraName') as HTMLInputElement;
                  const descriptionInput = form.elements.namedItem('extraDescription') as HTMLInputElement;
                  const priceInput = form.elements.namedItem('extraPrice') as HTMLInputElement;
                  
                  if (nameInput.value && priceInput.value) {
                    const currentData = getCurrentItineraryData();
                    const newExtra = {
                      id: `extra-${Date.now()}`,
                      name: nameInput.value,
                      description: descriptionInput.value || undefined,
                      priceInCents: Math.max(0, Math.round(parseFloat(priceInput.value) * 100))
                    };

                    updateCurrentItineraryData({
                      extras: [...currentData.extras, newExtra]
                    });

                    // Reset form
                    form.reset();
                  }
                }}
                className="space-y-3"
              >
                <div className="flex gap-4">
                  <input
                    type="text"
                    name="extraName"
                    placeholder="Name"
                    className="flex-grow px-3 py-2 border rounded text-sm"
                    required
                  />
                  <div className="relative w-32">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                    <input
                      type="number"
                      name="extraPrice"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      className="w-full pl-7 pr-3 py-2 border rounded text-sm"
                      defaultValue="0.00"
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <input
                    type="text"
                    name="extraDescription"
                    placeholder="Description (optional)"
                    className="flex-grow px-3 py-2 border rounded text-sm"
                  />
                  <Button type="submit" variant="outline" size="sm" className="w-32">
                    Add Extra
                  </Button>
                </div>
              </form>
            </div>
          </section>
        )}

        <div className="mt-4">
          <hr className="border-gray-200" />

          {/* Financials Section */}
          <section className="bg-white rounded-lg shadow p-6 mt-4 relative">
            <h2 className="text-lg font-semibold mb-4">Financials</h2>
            {!isCurrentItineraryActive() && (
              <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">
                    <Badge variant="outline" className="bg-gray-100 text-gray-600 border-0">DRAFT</Badge>
                  </span>
                  <span className="text-sm text-gray-600">
                    Viewing draft financials - changes will only apply when this itinerary is set as active
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSetActiveItinerary}
                  className="bg-white hover:bg-gray-50"
                >
                  Make Active
                </Button>
              </div>
            )}
            <div className="grid lg:grid-cols-[1fr,400px] gap-4">
              {/* Summary Section - Left Side */}
              <section className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-6">
                  {/* Deposits subsection */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Deposits</h4>
                    {/* Room deposits */}
                    {reservation.rooms?.map((room) => {
                      const defaultDueDate = new Date(); // TODO: Get from room block dates
                      const [isEditingDate, setIsEditingDate] = useState(false);
                      const [dueDate, setDueDate] = useState(defaultDueDate);

                      return (
                        <div key={`room-deposit-${room.id}`} className="flex items-center justify-between py-2 border-b">
                          <div className="flex flex-col">
                            <span className="text-sm">Room Block Deposit</span>
                            {isEditingDate ? (
                              <input
                                type="date"
                                value={dueDate.toISOString().split('T')[0]}
                                onChange={(e) => setDueDate(new Date(e.target.value))}
                                onBlur={() => setIsEditingDate(false)}
                                className="text-xs border rounded px-1"
                                autoFocus
                              />
                            ) : (
                              <button 
                                onClick={() => setIsEditingDate(true)}
                                className="text-xs text-gray-500 hover:text-blue-600 text-left"
                              >
                                Due {dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </button>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge 
                              variant="outline" 
                              className="bg-red-100 text-red-700 border-0"
                            >
                              Unpaid
                            </Badge>
                            <span className="font-medium">$2,500.00</span>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-xs"
                              disabled={!isCurrentItineraryActive()}
                            >
                              Request
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                    {/* Event deposits */}
                    {reservation.events?.map((event) => {
                      const eventData = reservation.eventData?.[event.id];
                      if (!eventData) return null;
                      
                      const defaultDueDate = new Date(eventData.startDateTime);
                      const [isEditingDate, setIsEditingDate] = useState(false);
                      const [dueDate, setDueDate] = useState(defaultDueDate);

                      return (
                        <div key={`event-deposit-${event.id}`} className="flex items-center justify-between py-2 border-b">
                          <div className="flex flex-col">
                            <span className="text-sm">{event.name} Deposit</span>
                            {isEditingDate ? (
                              <input
                                type="date"
                                value={dueDate.toISOString().split('T')[0]}
                                onChange={(e) => setDueDate(new Date(e.target.value))}
                                onBlur={() => setIsEditingDate(false)}
                                className="text-xs border rounded px-1"
                                autoFocus
                              />
                            ) : (
                              <button 
                                onClick={() => setIsEditingDate(true)}
                                className="text-xs text-gray-500 hover:text-blue-600 text-left"
                              >
                                Due {dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </button>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge 
                              variant="outline" 
                              className="bg-red-100 text-red-700 border-0"
                            >
                              Unpaid
                            </Badge>
                            <span className="font-medium">
                              ${((eventData.eventOfferPriceInCents || 0) * 0.25 / 100).toFixed(2)}
                            </span>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-xs"
                              disabled={!isCurrentItineraryActive()}
                            >
                              Request
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Remaining Fees subsection */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Remaining Fees</h4>
                    {/* Room Block Balance */}
                    {(() => {
                      const earliestDate = [
                        ...(reservation.events?.map(event => reservation.eventData?.[event.id]?.startDateTime) || []),
                        // TODO: Add room dates here when available
                      ]
                        .filter((date): date is string => !!date)
                        .map(date => new Date(date))
                        .sort((a, b) => a.getTime() - b.getTime())[0];

                      const defaultDueDate = earliestDate ? 
                        new Date(earliestDate.setDate(earliestDate.getDate() - 7)) : 
                        new Date();

                      const [isEditingDate, setIsEditingDate] = useState(false);
                      const [dueDate, setDueDate] = useState(defaultDueDate);

                      return (
                        <div className="flex items-center justify-between py-2 border-b">
                          <div className="flex flex-col">
                            <span className="text-sm">Room Block Balance</span>
                            {isEditingDate ? (
                              <input
                                type="date"
                                value={dueDate.toISOString().split('T')[0]}
                                onChange={(e) => setDueDate(new Date(e.target.value))}
                                onBlur={() => setIsEditingDate(false)}
                                className="text-xs border rounded px-1"
                                autoFocus
                              />
                            ) : (
                              <button 
                                onClick={() => setIsEditingDate(true)}
                                className="text-xs text-gray-500 hover:text-blue-600 text-left"
                              >
                                Due {dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </button>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge 
                              variant="outline" 
                              className="bg-red-100 text-red-700 border-0"
                            >
                              Unpaid
                            </Badge>
                            <span className="font-medium">$2,500.00</span>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-xs"
                              disabled={!isCurrentItineraryActive()}
                            >
                              Request
                            </Button>
                          </div>
                        </div>
                      );
                    })()}

                    {/* Extras Line Item */}
                    {getCurrentItineraryData().extras.length > 0 && (
                      <div className="flex items-center justify-between py-2 border-b">
                        <div className="flex flex-col">
                          <span className="text-sm">Extras</span>
                          {/* Due Date Editor */}
                          {(() => {
                            // Find the latest date from events
                            const latestDate = [
                              ...(reservation.events?.map(event => 
                                event && reservation.eventData?.[event.id]?.endDateTime
                              ) || []),
                              // TODO: Add room dates here when available
                            ]
                              .filter((date): date is string => !!date)
                              .map(date => new Date(date))
                              .sort((a, b) => b.getTime() - a.getTime())[0] || new Date();

                            const [isEditingDate, setIsEditingDate] = useState(false);
                            const [dueDate, setDueDate] = useState(latestDate);

                            return (
                              <div>
                                {isEditingDate ? (
                                  <input
                                    type="date"
                                    value={dueDate.toISOString().split('T')[0]}
                                    onChange={(e) => setDueDate(new Date(e.target.value))}
                                    onBlur={() => setIsEditingDate(false)}
                                    className="text-xs border rounded px-1"
                                    autoFocus
                                  />
                                ) : (
                                  <button 
                                    onClick={() => setIsEditingDate(true)}
                                    className="text-xs text-gray-500 hover:text-blue-600 text-left"
                                  >
                                    Due {dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                  </button>
                                )}
                              </div>
                            );
                          })()}
                          <div className="text-xs text-gray-500 mt-1">
                            {getCurrentItineraryData().extras.map((extra, index) => (
                              <div key={extra.id} className="flex justify-between">
                                <span>• {extra.name}</span>
                                <span className="ml-4">${(extra.priceInCents / 100).toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge 
                            variant="outline" 
                            className="bg-red-100 text-red-700 border-0"
                          >
                            Unpaid
                          </Badge>
                          <span className="font-medium">
                            ${(getCurrentItineraryData().extras.reduce((sum, extra) => sum + extra.priceInCents, 0) / 100).toFixed(2)}
                          </span>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-xs"
                            disabled={!isCurrentItineraryActive()}
                          >
                            Request
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* F&B Minimums subsection */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">F&B Minimums</h4>
                    {reservation.events?.map((event) => {
                      const eventData = reservation.eventData?.[event.id];
                      if (!eventData) return null;
                      
                      // Set default due date to one day after event
                      const defaultDueDate = new Date(eventData.startDateTime);
                      defaultDueDate.setDate(defaultDueDate.getDate() + 1);
                      
                      const [isEditingDate, setIsEditingDate] = useState(false);
                      const [dueDate, setDueDate] = useState(defaultDueDate);

                      return (
                        <div key={`fb-minimum-${event.id}`} className="flex items-center justify-between py-2 border-b">
                          <div className="flex flex-col">
                            <span className="text-sm">{event.name}</span>
                            {isEditingDate ? (
                              <input
                                type="date"
                                value={dueDate.toISOString().split('T')[0]}
                                onChange={(e) => setDueDate(new Date(e.target.value))}
                                onBlur={() => setIsEditingDate(false)}
                                className="text-xs border rounded px-1"
                                autoFocus
                              />
                            ) : (
                              <button 
                                onClick={() => setIsEditingDate(true)}
                                className="text-xs text-gray-500 hover:text-blue-600 text-left"
                              >
                                Due {dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </button>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge 
                              variant="outline" 
                              className="bg-red-100 text-red-700 border-0"
                            >
                              Unpaid
                            </Badge>
                            <span className="font-medium">$5,000.00</span>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-xs"
                              disabled={!isCurrentItineraryActive()}
                            >
                              Request
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* TODO @Julian: Discuss with Jason how to calculate Upsell Revenue.
                      Potential factors to consider:
                      - Additional room upgrades
                      - Extra F&B spend above minimums
                      - Add-on services
                      - Premium venue selections */}
                  {reservation.upsellRevenue && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Upsell Revenue</h4>
                      <div className="flex items-center justify-between py-2 border-b">
                        <div className="flex flex-col">
                          <span className="text-sm">Room Upgrades</span>
                          <span className="text-xs text-gray-500">Confirmed</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge 
                            variant="outline" 
                            className="bg-green-100 text-green-700 border-0"
                          >
                            Booked
                          </Badge>
                          <span className="font-medium">$1,200.00</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Total subsection */}
                  <div className="pt-4 border-t-2">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-medium text-gray-700">Total</h4>
                      <span className="text-lg font-semibold">
                        ${(() => {
                          // Calculate room deposits
                          const roomDeposits = (reservation.rooms?.length || 0) * 2500; // $2,500 per room

                          // Calculate event deposits (25% of event price)
                          const eventDeposits = reservation.events?.reduce((sum, event) => {
                            const eventData = reservation.eventData?.[event.id];
                            return sum + ((eventData?.eventOfferPriceInCents || 0) * 0.25);
                          }, 0) || 0;

                          // Calculate remaining room fees
                          const remainingRoomFees = (reservation.rooms?.length || 0) * 2500; // $2,500 per room

                          // Calculate extras total
                          const extrasTotal = getCurrentItineraryData().extras.reduce((sum, extra) => 
                            sum + extra.priceInCents, 0);

                          // Calculate F&B minimums ($5,000 per event)
                          const fbMinimums = (reservation.events?.length || 0) * 5000 * 100; // Convert to cents

                          // Sum all and convert to dollars
                          const totalCents = roomDeposits * 100 + eventDeposits + remainingRoomFees * 100 + extrasTotal + fbMinimums;
                          return (totalCents / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                        })()}
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Right Side Sections */}
              <div className="space-y-4">
                {/* Promos Section */}
                <section className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-base font-medium mb-3">Promos</h3>
                  <p className="text-gray-600 italic text-sm">Coming Soon</p>
                </section>

                {/* Contract Section */}
                <section className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-base font-medium">Contract</h3>
                    <div className="flex items-center gap-2">
                      {/* TODO @Backend: Add contract status tracking
                          - Add contractStatus field to GroupReservation type
                          - Status options: 'not_required' | 'pending' | 'on_file'
                          - Track contract document URL and signed date
                      */}
                      {reservation.contractStatus === 'on_file' ? (
                        <Badge 
                          variant="outline" 
                          className="bg-green-100 text-green-700 border-0"
                        >
                          On File
                        </Badge>
                      ) : (
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="requiresContract"
                            className="rounded border-gray-300"
                            checked={reservation.requiresContract}
                            onChange={(e) => {
                              onReservationUpdate?.({
                                ...reservation,
                                requiresContract: e.target.checked
                              });
                            }}
                          />
                          <label htmlFor="requiresContract" className="text-sm text-gray-600">
                            Requires Contract
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {reservation.requiresContract && (
                      <>
                        {/* Attrition Rate */}
                        <div className="flex items-center justify-between">
                          <label className="text-sm text-gray-600">Allowed Attrition</label>
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              min="0"
                              max="100"
                              className="w-16 px-2 py-1 text-sm border rounded"
                              value={reservation.attritionPercentage || 0}
                              onChange={(e) => {
                                const value = Math.max(0, Math.min(100, parseInt(e.target.value) || 0));
                                onReservationUpdate?.({
                                  ...reservation,
                                  attritionPercentage: value
                                });
                              }}
                            />
                            <span className="text-sm text-gray-600">%</span>
                          </div>
                        </div>

                        {/* Cancellation Deadline */}
                        <div className="flex items-center justify-between">
                          <label className="text-sm text-gray-600">Cancellation Deadline</label>
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              min="0"
                              className="w-16 px-2 py-1 text-sm border rounded"
                              value={reservation.cancellationDeadlineDays || 7}
                              onChange={(e) => {
                                const value = Math.max(0, parseInt(e.target.value) || 0);
                                onReservationUpdate?.({
                                  ...reservation,
                                  cancellationDeadlineDays: value
                                });
                              }}
                            />
                            <span className="text-sm text-gray-600">days prior</span>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Generate Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-2"
                      disabled={!reservation.requiresContract || reservation.contractStatus === 'on_file'}
                      onClick={() => {
                        // TODO: Implement contract generation
                      }}
                    >
                      {reservation.contractStatus === 'on_file' ? 'Contract On File' : 'Generate Contract'}
                    </Button>
                  </div>
                </section>

                {/* Payment Sources Section */}
                <section className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-base font-medium mb-3">Payment Sources</h3>
                  <div className="space-y-3">
                    {/* Credit Card */}
                    <div className="flex items-center justify-between py-2 border-b">
                      <div className="flex flex-col">
                        <span className="text-sm">Credit Card</span>
                        <span className="text-xs text-gray-500">Visa ending in 4242</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge 
                          variant="outline" 
                          className="bg-green-100 text-green-700 border-0"
                        >
                          On File
                        </Badge>
                      </div>
                    </div>

                    {/* ACH */}
                    <div className="flex items-center justify-between py-2 border-b">
                      <div className="flex flex-col">
                        <span className="text-sm">ACH / Bank Transfer</span>
                        <span className="text-xs text-gray-500">Not yet provided</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs"
                          disabled={!isCurrentItineraryActive()}
                        >
                          Request
                        </Button>
                      </div>
                    </div>

                    {/* Add Payment Source button */}
                    <button
                      className="w-full mt-3 text-sm text-blue-600 hover:text-blue-800 flex items-center justify-center gap-2"
                    >
                      <FaPlus className="h-3 w-3" />
                      Add Payment Source
                    </button>
                  </div>
                </section>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserSessionBody; 