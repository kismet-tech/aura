import { EitherResponseType } from "@kismet_ai/foundation";

//////////////////////////////////////////////////
// REQUEST ///////////////////////////////////////
//////////////////////////////////////////////////

export interface UpdateGroupReservationRequestDto {
  userSessionId: string;
  reservationId: string;
  
  // Basic Info
  title?: string;
  isTransient?: boolean;
  status?: 'pending' | 'confirmed' | 'cancelled' | 'tentative' | 'lost' | 'waitlisted';
  
  // Account & Contact
  accountId?: string;
  contactHostId?: string;
  
  // Sales & Qualification
  assignedSalesAgentId?: string;
  qualificationStatus?: 'pending' | 'qualified' | 'not_qualified';
  leadScore?: number;
  
  // Dates
  dateRange?: {
    start: string;
    end: string;
    type: 'firm' | 'flexible' | 'deciding';
    alternativeDates?: Array<{
      start: string;
      end: string;
    }>;
    decidingReason?: string;
  };
  
  // Notes
  publicNotes?: string;
  privateNotes?: string;
  
  // Itineraries
  itineraryName?: string;
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
      status: string;
      numberOfGuests: number;
      imageUrl: string;
      isEventOfferPriceEnabled: boolean;
      eventOfferPriceInCents: number;
      depositRequiredInCents?: number;
      depositDueDateISO?: string;
      venueOffers: Array<{
        venueOfferId: string;
        venueName: string;
        pricingInfo: {
          priceInCents: number;
          pricingType: string;
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
}

//////////////////////////////////////////////////
// RESPONSE //////////////////////////////////////
//////////////////////////////////////////////////

export interface UpdateGroupReservationSuccessResponseDataDto {
  reservationId: string;
  // Return the full updated reservation data
  reservation: {
    title: string;
    isTransient: boolean;
    status: string;
    accountId?: string;
    contactHostId?: string;
    assignedSalesAgentId?: string;
    qualificationStatus: string;
    leadScore: number;
    dateRange?: {
      start: string;
      end: string;
      type: string;
      alternativeDates?: Array<{
        start: string;
        end: string;
      }>;
      decidingReason?: string;
    };
    publicNotes: string;
    privateNotes: string;
    itineraryName?: string;
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
        status: string;
        numberOfGuests: number;
        imageUrl: string;
        isEventOfferPriceEnabled: boolean;
        eventOfferPriceInCents: number;
        depositRequiredInCents?: number;
        depositDueDateISO?: string;
        venueOffers: Array<{
          venueOfferId: string;
          venueName: string;
          pricingInfo: {
            priceInCents: number;
            pricingType: string;
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
  };
}

export interface UpdateGroupReservationSuccessResponseDto {
  type: EitherResponseType.SUCCESS;
  success: UpdateGroupReservationSuccessResponseDataDto;
} 