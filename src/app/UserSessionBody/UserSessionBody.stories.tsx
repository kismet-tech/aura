import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import UserSessionBody from './page';
import { HotelEventOfferStatus, VenueOfferPricingType } from "@kismet_ai/foundation";
import { MockBifrostApi } from '@/apis/bifrostApi/mockBifrostApi';

const mockApi = new MockBifrostApi();

interface ReservationDateRange {
  start?: string;
  end?: string;
  type: 'firm' | 'flexible' | 'deciding';
  alternativeDates?: Array<{
    start: string;
    end: string;
  }>;
  decidingReason?: string;
}

/**
 * Represents the data structure for a User Session, containing all information
 * about a group's reservation including booking details, contact info, itineraries,
 * and various status indicators.
 */
interface GroupReservation {
  title: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'tentative' | 'lost' | 'waitlisted';
  isTransient?: boolean;
  isLinkedTripleseat?: boolean;
  tripleseatUrl?: string;
  dateRange?: {
    start?: string;
    end?: string;
    type: 'firm' | 'flexible' | 'deciding';
    alternativeDates?: Array<{
      start: string;
      end: string;
    }>;
    decidingReason?: string;
  };
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
  accountId?: string;
  account?: {
    id: string;
    name: string;
  };
  contactHostId?: string;
  contact?: {
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
  };
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
    eventData?: Record<string, any>;
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

const StoryWrapper = () => {
  const [reservation, setReservation] = useState<GroupReservation>({
    title: "Tech Conference 2024",
    status: "pending" as const,
    isTransient: false,
    isLinkedTripleseat: true,
    tripleseatUrl: "https://tripleseat.com/events/123",
    dateRange: {
      start: "2024-06-15",
      end: "2024-06-18",
      type: "flexible",
      alternativeDates: [
        { start: "2024-07-01", end: "2024-07-04" },
        { start: "2024-07-15", end: "2024-07-18" }
      ]
    },
    leadScore: 4,
    qualificationStatus: "qualified",
    intentScore: 85,
    intentMetrics: {
      websiteVisits: 12,
      mostRecentVisit: "2024-01-15T14:30:00Z",
      lastEmailOpen: "2024-01-14T09:15:00Z",
      numberOfContacts: 3,
      researchedHotel: true
    },
    assignedSalesAgent: {
      name: "Sarah Johnson",
      id: "agent1"
    },
    publicNotes: "Client prefers evening events\nRequested vegetarian options for all meals\nInterested in sustainable practices\nNeeds AV setup for all sessions",
    privateNotes: "High-value repeat customer\nPrevious event generated significant F&B revenue\nBudget flexibility confirmed by @James Wilson\nKey decision maker is CEO\n@Maria Garcia to handle F&B coordination\n@Alex Thompson managing AV setup",
    itineraries: [
      {
        id: "itin1",
        name: "Main Itinerary",
        isActive: true,
        events: [
          { id: "event1", name: "Opening Keynote" },
          { id: "event2", name: "Networking Lunch" },
          { id: "event3", name: "Breakout Sessions" }
        ],
        eventData: {
          "event1": {
            startDateTime: "2024-06-15T09:00:00Z",
            endDateTime: "2024-06-15T11:00:00Z",
            status: HotelEventOfferStatus.DEFINITIVE,
            numberOfGuests: 400,
            imageUrl: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04",
            isEventOfferPriceEnabled: true,
            eventOfferPriceInCents: 1000000,
            deposits: [
              {
                id: "deposit1",
                name: "Initial Deposit",
                amountInCents: 250000,
                dueDateISO: "2024-02-15T00:00:00Z",
                status: "paid",
                note: "25% deposit to secure the Grand Ballroom"
              },
              {
                id: "deposit2",
                name: "Final Payment",
                amountInCents: 750000,
                dueDateISO: "2024-05-15T00:00:00Z",
                status: "pending",
                note: "Remaining balance due 30 days before event"
              }
            ],
            venueOffers: [
              {
                venueOfferId: "venue1",
                venueName: "Grand Ballroom",
                pricingInfo: {
                  priceInCents: 1000000,
                  pricingType: VenueOfferPricingType.FIXED_COST
                }
              }
            ],
            details: {
              description: "Opening keynote session with industry leaders"
            }
          },
          "event2": {
            startDateTime: "2024-06-15T12:00:00Z",
            endDateTime: "2024-06-15T14:00:00Z",
            status: HotelEventOfferStatus.DEFINITIVE,
            numberOfGuests: 200,
            imageUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
            isEventOfferPriceEnabled: true,
            eventOfferPriceInCents: 500000,
            deposits: [
              {
                id: "deposit3",
                name: "Full Payment",
                amountInCents: 500000,
                dueDateISO: "2024-05-15T00:00:00Z",
                status: "pending",
                note: "Full payment required 30 days before event"
              }
            ],
            venueOffers: [
              {
                venueOfferId: "venue2",
                venueName: "Garden Terrace",
                pricingInfo: {
                  priceInCents: 500000,
                  pricingType: VenueOfferPricingType.FIXED_COST
                }
              }
            ],
            details: {
              description: "Networking lunch with roundtable discussions"
            }
          },
          "event3": {
            startDateTime: "2024-06-16T10:00:00Z",
            endDateTime: "2024-06-16T16:00:00Z",
            status: HotelEventOfferStatus.PROSPECT,
            numberOfGuests: 150,
            imageUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205",
            isEventOfferPriceEnabled: true,
            eventOfferPriceInCents: 450000,
            deposits: [
              {
                id: "deposit4",
                name: "Initial Deposit",
                amountInCents: 112500,
                dueDateISO: "2024-02-15T00:00:00Z",
                status: "paid",
                note: "25% deposit for breakout rooms"
              },
              {
                id: "deposit5",
                name: "Final Payment",
                amountInCents: 337500,
                dueDateISO: "2024-05-15T00:00:00Z",
                status: "pending",
                note: "Remaining balance for breakout sessions"
              }
            ],
            venueOffers: [
              {
                venueOfferId: "venue3",
                venueName: "Executive Boardroom",
                pricingInfo: {
                  priceInCents: 450000,
                  pricingType: VenueOfferPricingType.FIXED_COST
                }
              }
            ],
            details: {
              description: "Multiple breakout sessions focusing on different tech tracks"
            }
          }
        }
      }
    ]
  });

  const handleReservationUpdate = async (updatedReservation: GroupReservation) => {
    try {
      // Call the mock API
      const response = await mockApi.updateGroupReservation({
        userSessionId: "mock-user-session",
        reservationId: "mock-reservation-id",
        title: updatedReservation.title,
        isTransient: updatedReservation.isTransient,
        status: updatedReservation.status,
        accountId: updatedReservation.accountId,
        contactHostId: updatedReservation.contactHostId,
        assignedSalesAgentId: updatedReservation.assignedSalesAgent?.id,
        qualificationStatus: updatedReservation.qualificationStatus,
        leadScore: updatedReservation.leadScore,
        dateRange: updatedReservation.dateRange && {
          start: updatedReservation.dateRange.start || new Date().toISOString().split('T')[0],
          end: updatedReservation.dateRange.end || new Date().toISOString().split('T')[0],
          type: updatedReservation.dateRange.type,
          alternativeDates: updatedReservation.dateRange.alternativeDates,
          decidingReason: updatedReservation.dateRange.decidingReason
        },
        publicNotes: updatedReservation.publicNotes,
        privateNotes: updatedReservation.privateNotes,
        itineraryName: updatedReservation.itineraryName,
        itineraries: updatedReservation.itineraries?.map(itinerary => ({
          ...itinerary,
          eventData: Object.fromEntries(
            Object.entries(itinerary.eventData || {}).map(([eventId, event]) => [
              eventId,
              {
                ...event,
                depositRequiredInCents: event.depositRequiredInCents,
                depositDueDateISO: event.depositDueDateISO
              }
            ])
          )
        }))
      });

      // Update local state with the response
      setReservation({
        ...updatedReservation,
        // Merge any additional fields from the API response if needed
      });
    } catch (error) {
      console.error('Failed to update reservation:', error);
    }
  };

  const EXISTING_ACCOUNTS = [
    {
      id: "acc1",
      name: "TechCorp International"
    },
    {
      id: "acc2",
      name: "Global Events Inc"
    }
  ];

  const EXISTING_CONTACTS = [
    {
      id: "contact1",
      name: "Michael Chen",
      email: "michael.chen@techcorp.com",
      phone: "+1 (415) 555-0123"
    },
    {
      id: "contact2",
      name: "Sarah Lee",
      email: "sarah.lee@example.com",
      phone: "+1 (415) 555-0124"
    }
  ];

  const handleAccountSelect = async (accountId: string) => {
    const selectedAccount = EXISTING_ACCOUNTS.find((acc: { id: string; name: string; }) => acc.id === accountId);
    if (selectedAccount) {
      const updatedReservation = {
        ...reservation,
        accountId: selectedAccount.id,
        account: {
          id: selectedAccount.id,
          name: selectedAccount.name
        }
      };
      await handleReservationUpdate(updatedReservation);
    }
  };

  const handleCreateAccount = async (accountName: string) => {
    // In a real implementation, this would create a new account
    // For now, we'll just create a mock account
    const mockAccount = {
      id: `account-${Date.now()}`,
      name: accountName
    };
    
    const updatedReservation = {
      ...reservation,
      accountId: mockAccount.id,
      account: {
        id: mockAccount.id,
        name: mockAccount.name
      }
    };
    await handleReservationUpdate(updatedReservation);
  };

  const handleHostSelect = async (contactId: string) => {
    const selectedContact = EXISTING_CONTACTS.find((contact: { id: string; name: string; email?: string; phone?: string; }) => contact.id === contactId);
    if (selectedContact) {
      const updatedReservation = {
        ...reservation,
        contactHostId: selectedContact.id,
        contact: {
          firstName: selectedContact.name.split(' ')[0],
          lastName: selectedContact.name.split(' ').slice(1).join(' '),
          email: selectedContact.email,
          phone: selectedContact.phone
        }
      };
      await handleReservationUpdate(updatedReservation);
    }
  };

  const handleCreateHost = async (nameOrEmail: string) => {
    // In a real implementation, this would create a new contact
    // For now, we'll just create a mock contact
    const mockContact = {
      id: `contact-${Date.now()}`,
      name: nameOrEmail,
      email: nameOrEmail.includes('@') ? nameOrEmail : undefined
    };
    
    const updatedReservation = {
      ...reservation,
      contactHostId: mockContact.id,
      contact: {
        firstName: mockContact.name.split(' ')[0],
        lastName: mockContact.name.split(' ').slice(1).join(' '),
        email: mockContact.email
      }
    };
    await handleReservationUpdate(updatedReservation);
  };

  const handleSalesAgentSelect = async (agentId: string) => {
    const selectedAgent = SAMPLE_SALES_AGENTS.find(agent => agent.id === agentId);
    if (selectedAgent) {
      const updatedReservation = {
        ...reservation,
        assignedSalesAgent: {
          id: selectedAgent.id,
          name: selectedAgent.name
        }
      };
      await handleReservationUpdate(updatedReservation);
    }
  };

  return (
    <UserSessionBody
      reservation={reservation}
      onReservationUpdate={handleReservationUpdate}
      contact={reservation.contact}
      onContactUpdate={() => {}}
      onHostSelect={handleHostSelect}
      onCreateHost={handleCreateHost}
      currentUser={{
        id: "user1",
        name: "Current User",
        email: "user@hotel.com"
      }}
      teamMembers={EXISTING_CONTACTS}
      existingContacts={EXISTING_CONTACTS}
      onAccountSelect={handleAccountSelect}
      onCreateAccount={handleCreateAccount}
      existingAccounts={EXISTING_ACCOUNTS}
      onSalesAgentSelect={handleSalesAgentSelect}
      salesAgents={SAMPLE_SALES_AGENTS}
    />
  );
};

const meta: Meta<typeof UserSessionBody> = {
  title: 'Pages/UserSessionBody',
  component: UserSessionBody,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <StoryWrapper />
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof UserSessionBody>;

const SAMPLE_ROOM_TYPES = [
  { id: 'king', name: 'King Room', count: 10, available: 8 },
  { id: 'double-queen', name: 'Double Queen', count: 15, available: 12 },
  { id: 'suite', name: 'Executive Suite', count: 5, available: 3 },
  { id: 'presidential', name: 'Presidential Suite', count: 1, available: 1 },
  { id: 'ocean-view', name: 'Ocean View King', count: 8, available: 4 },
  { id: 'family-suite', name: 'Family Suite', count: 6, available: 2 },
];

const SAMPLE_VENUES = [
  { id: 'grand-ballroom', name: 'Grand Ballroom', capacity: 500, priceInCents: 1000000 },
  { id: 'garden-terrace', name: 'Garden Terrace', capacity: 200, priceInCents: 500000 },
  { id: 'rooftop-lounge', name: 'Rooftop Lounge', capacity: 150, priceInCents: 750000 },
  { id: 'executive-boardroom', name: 'Executive Boardroom', capacity: 30, priceInCents: 250000 },
  { id: 'beachfront-pavilion', name: 'Beachfront Pavilion', capacity: 300, priceInCents: 850000 },
  { id: 'wine-cellar', name: 'Private Wine Cellar', capacity: 40, priceInCents: 350000 },
];

const SAMPLE_CONTACTS = [
  { 
    id: "contact1", 
    name: "Michael Chen", 
    email: "michael.chen@techcorp.com",
    phone: "+1 (415) 555-0123"
  },
  { 
    id: "contact2", 
    name: "Jennifer Wong", 
    email: "j.wong@techcorp.com",
    phone: "+1 (415) 555-0124"
  },
  { 
    id: "contact3", 
    name: "David Miller", 
    email: "d.miller@othercompany.com",
    phone: "+1 (415) 555-0125"
  },
  { 
    id: "contact4", 
    name: "Sarah Martinez", 
    email: "s.martinez@innovateconf.com",
    phone: "+1 (415) 555-0126"
  },
  { 
    id: "contact5", 
    name: "Robert Kim", 
    email: "r.kim@globalevents.com",
    phone: "+1 (415) 555-0127"
  },
  { 
    id: "contact6", 
    name: "Emily Johnson", 
    email: "e.johnson@eventpro.com",
    phone: "+1 (415) 555-0128"
  }
];

const SAMPLE_ACCOUNTS = [
  { 
    id: "acc1", 
    name: "TechCorp International"
  },
  { 
    id: "acc2", 
    name: "Global Events Ltd"
  },
  { 
    id: "acc3", 
    name: "Innovate Conferences"
  },
  { 
    id: "acc4", 
    name: "EventPro Solutions"
  },
  { 
    id: "acc5", 
    name: "Summit Series"
  },
  { 
    id: "acc6", 
    name: "Corporate Gatherings Inc"
  }
];

const SAMPLE_SALES_AGENTS = [
  { 
    id: "agent1", 
    name: "Sarah Johnson", 
    email: "sarah.j@hotel.com",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
  },
  { 
    id: "agent2", 
    name: "James Wilson", 
    email: "james.w@hotel.com",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
  },
  { 
    id: "agent3", 
    name: "Emily Davis", 
    email: "emily.d@hotel.com",
    avatarUrl: "https://images.unsplash.com/photo-1438761681681033-6461ffad8d80"
  },
  { 
    id: "agent4", 
    name: "Michael Roberts", 
    email: "michael.r@hotel.com",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
  },
  { 
    id: "agent5", 
    name: "Lisa Chen", 
    email: "lisa.c@hotel.com",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2"
  }
];

// Default story with tech conference example
export const Default: Story = {
  args: {
    reservation: {
      title: "Tech Conference 2024",
      status: "pending",
      isTransient: false,
      isLinkedTripleseat: true,
      tripleseatUrl: "https://tripleseat.com/events/123",
      dateRange: {
        start: "2024-06-15",
        end: "2024-06-18",
        type: "flexible",
        alternativeDates: [
          { start: "2024-07-01", end: "2024-07-04" },
          { start: "2024-07-15", end: "2024-07-18" }
        ]
      },
      leadScore: 4,
      qualificationStatus: "qualified",
      intentScore: 85,
      intentMetrics: {
        websiteVisits: 12,
        mostRecentVisit: "2024-01-15T14:30:00Z",
        lastEmailOpen: "2024-01-14T09:15:00Z",
        numberOfContacts: 3,
        researchedHotel: true
      },
      assignedSalesAgent: {
        name: "Sarah Johnson",
        id: "agent1"
      },
      publicNotes: "Client prefers evening events\nRequested vegetarian options for all meals\nInterested in sustainable practices\nNeeds AV setup for all sessions",
      privateNotes: "High-value repeat customer\nPrevious event generated significant F&B revenue\nBudget flexibility confirmed by @James Wilson\nKey decision maker is CEO\n@Maria Garcia to handle F&B coordination\n@Alex Thompson managing AV setup",
      itineraryName: "Main Itinerary",
      pmsType: "Cloudbeds",
      itineraries: [
        {
          id: "itin1",
          name: "Main Itinerary",
          isActive: true,
          rooms: SAMPLE_ROOM_TYPES.map(room => ({ id: room.id, name: room.name })),
          events: [
            { id: "event1", name: "Opening Keynote" },
            { id: "event2", name: "Networking Lunch" },
            { id: "event3", name: "Breakout Sessions" },
            { id: "event4", name: "Innovation Showcase" },
            { id: "event5", name: "Closing Reception" }
          ],
          extras: [
            { 
              id: "extra1", 
              name: "Welcome Gift Bags",
              description: "Custom branded tote bags with local snacks",
              priceInCents: 2500
            },
            {
              id: "extra2",
              name: "Professional Photography",
              description: "Full event coverage with same-day delivery",
              priceInCents: 150000
            },
            {
              id: "extra3",
              name: "VIP Transportation",
              description: "Luxury vehicle service for keynote speakers",
              priceInCents: 75000
            }
          ],
          eventData: {
            "event1": {
              startDateTime: "2024-06-15T09:00:00Z",
              endDateTime: "2024-06-15T11:00:00Z",
              status: HotelEventOfferStatus.DEFINITIVE,
              numberOfGuests: 400,
              imageUrl: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04",
              isEventOfferPriceEnabled: true,
              eventOfferPriceInCents: 1000000,
              deposits: [
                {
                  id: "deposit1",
                  name: "Initial Deposit",
                  amountInCents: 250000,
                  dueDateISO: "2024-02-15T00:00:00Z",
                  status: "paid",
                  note: "25% deposit to secure the Grand Ballroom"
                },
                {
                  id: "deposit2",
                  name: "Final Payment",
                  amountInCents: 750000,
                  dueDateISO: "2024-05-15T00:00:00Z",
                  status: "pending",
                  note: "Remaining balance due 30 days before event"
                }
              ],
              venueOffers: [
                {
                  venueOfferId: "venue1",
                  venueName: "Grand Ballroom",
                  pricingInfo: {
                    priceInCents: 1000000,
                    pricingType: VenueOfferPricingType.FIXED_COST
                  }
                }
              ],
              details: {
                description: "Opening keynote session with industry leaders and tech innovators"
              }
            },
            "event2": {
              startDateTime: "2024-06-15T12:00:00Z",
              endDateTime: "2024-06-15T14:00:00Z",
              status: HotelEventOfferStatus.DEFINITIVE,
              numberOfGuests: 400,
              imageUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
              isEventOfferPriceEnabled: true,
              eventOfferPriceInCents: 500000,
              deposits: [
                {
                  id: "deposit3",
                  name: "Full Payment",
                  amountInCents: 500000,
                  dueDateISO: "2024-05-15T00:00:00Z",
                  status: "pending",
                  note: "Full payment required 30 days before event"
                }
              ],
              venueOffers: [
                {
                  venueOfferId: "venue2",
                  venueName: "Garden Terrace",
                  pricingInfo: {
                    priceInCents: 500000,
                    pricingType: VenueOfferPricingType.FIXED_COST
                  }
                }
              ],
              details: {
                description: "Networking lunch with roundtable discussions and local cuisine"
              }
            },
            "event3": {
              startDateTime: "2024-06-16T10:00:00Z",
              endDateTime: "2024-06-16T16:00:00Z",
              status: HotelEventOfferStatus.PROSPECT,
              numberOfGuests: 150,
              imageUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205",
              isEventOfferPriceEnabled: true,
              eventOfferPriceInCents: 450000,
              deposits: [
                {
                  id: "deposit4",
                  name: "Initial Deposit",
                  amountInCents: 112500,
                  dueDateISO: "2024-02-15T00:00:00Z",
                  status: "paid",
                  note: "25% deposit for breakout rooms"
                },
                {
                  id: "deposit5",
                  name: "Final Payment",
                  amountInCents: 337500,
                  dueDateISO: "2024-05-15T00:00:00Z",
                  status: "pending",
                  note: "Remaining balance for breakout sessions"
                }
              ],
              venueOffers: [
                {
                  venueOfferId: "venue3",
                  venueName: "Executive Boardroom",
                  pricingInfo: {
                    priceInCents: 450000,
                    pricingType: VenueOfferPricingType.FIXED_COST
                  }
                }
              ],
              details: {
                description: "Multiple breakout sessions focusing on different tech tracks"
              }
            },
            "event4": {
              startDateTime: "2024-06-17T13:00:00Z",
              endDateTime: "2024-06-17T17:00:00Z",
              status: HotelEventOfferStatus.PROSPECT,
              numberOfGuests: 300,
              imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
              isEventOfferPriceEnabled: true,
              eventOfferPriceInCents: 650000,
              deposits: [
                {
                  id: "deposit6",
                  name: "Initial Deposit",
                  amountInCents: 162500,
                  dueDateISO: "2024-02-15T00:00:00Z",
                  status: "paid",
                  note: "25% deposit for showcase space"
                },
                {
                  id: "deposit7",
                  name: "Final Payment",
                  amountInCents: 487500,
                  dueDateISO: "2024-05-15T00:00:00Z",
                  status: "pending",
                  note: "Remaining balance for showcase"
                }
              ],
              venueOffers: [
                {
                  venueOfferId: "venue4",
                  venueName: "Beachfront Pavilion",
                  pricingInfo: {
                    priceInCents: 650000,
                    pricingType: VenueOfferPricingType.FIXED_COST
                  }
                }
              ],
              details: {
                description: "Interactive showcase of latest tech innovations and startups"
              }
            },
            "event5": {
              startDateTime: "2024-06-18T17:00:00Z",
              endDateTime: "2024-06-18T20:00:00Z",
              status: HotelEventOfferStatus.PROSPECT,
              numberOfGuests: 400,
              imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865",
              isEventOfferPriceEnabled: true,
              eventOfferPriceInCents: 750000,
              deposits: [
                {
                  id: "deposit8",
                  name: "Initial Deposit",
                  amountInCents: 187500,
                  dueDateISO: "2024-02-15T00:00:00Z",
                  status: "paid",
                  note: "25% deposit for closing reception"
                },
                {
                  id: "deposit9",
                  name: "Final Payment",
                  amountInCents: 562500,
                  dueDateISO: "2024-05-15T00:00:00Z",
                  status: "pending",
                  note: "Remaining balance for closing reception"
                }
              ],
              venueOffers: [
                {
                  venueOfferId: "venue5",
                  venueName: "Rooftop Lounge",
                  pricingInfo: {
                    priceInCents: 750000,
                    pricingType: VenueOfferPricingType.FIXED_COST
                  }
                }
              ],
              details: {
                description: "Closing reception with awards ceremony and entertainment"
              }
            }
          }
        },
        {
          id: "itin2",
          name: "Budget-Friendly Alternative",
          isActive: false,
          rooms: SAMPLE_ROOM_TYPES.slice(0, 3).map(room => ({ id: room.id, name: room.name })),
          events: [
            { id: "event6", name: "Welcome Reception" },
            { id: "event7", name: "Main Conference Day" },
            { id: "event8", name: "Farewell Lunch" }
          ],
          eventData: {
            "event6": {
              startDateTime: "2024-07-01T18:00:00Z",
              endDateTime: "2024-07-01T21:00:00Z",
              status: HotelEventOfferStatus.PROSPECT,
              numberOfGuests: 200,
              imageUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
              isEventOfferPriceEnabled: true,
              eventOfferPriceInCents: 350000,
              deposits: [
                {
                  id: "deposit10",
                  name: "Full Payment",
                  amountInCents: 350000,
                  dueDateISO: "2024-06-01T00:00:00Z",
                  status: "pending",
                  note: "Full payment for welcome reception"
                }
              ],
              venueOffers: [
                {
                  venueOfferId: "venue6",
                  venueName: "Garden Terrace",
                  pricingInfo: {
                    priceInCents: 350000,
                    pricingType: VenueOfferPricingType.FIXED_COST
                  }
                }
              ],
              details: {
                description: "Welcome reception with light refreshments"
              }
            },
            "event7": {
              startDateTime: "2024-07-02T09:00:00Z",
              endDateTime: "2024-07-02T17:00:00Z",
              status: HotelEventOfferStatus.PROSPECT,
              numberOfGuests: 200,
              imageUrl: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04",
              isEventOfferPriceEnabled: true,
              eventOfferPriceInCents: 650000,
              deposits: [
                {
                  id: "deposit11",
                  name: "Initial Deposit",
                  amountInCents: 162500,
                  dueDateISO: "2024-03-01T00:00:00Z",
                  status: "pending",
                  note: "25% deposit for main conference day"
                },
                {
                  id: "deposit12",
                  name: "Final Payment",
                  amountInCents: 487500,
                  dueDateISO: "2024-06-01T00:00:00Z",
                  status: "pending",
                  note: "Remaining balance for main conference"
                }
              ],
              venueOffers: [
                {
                  venueOfferId: "venue7",
                  venueName: "Grand Ballroom",
                  pricingInfo: {
                    priceInCents: 650000,
                    pricingType: VenueOfferPricingType.FIXED_COST
                  }
                }
              ],
              details: {
                description: "Full day conference with keynote and breakout sessions"
              }
            },
            "event8": {
              startDateTime: "2024-07-03T12:00:00Z",
              endDateTime: "2024-07-03T14:00:00Z",
              status: HotelEventOfferStatus.PROSPECT,
              numberOfGuests: 200,
              imageUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
              isEventOfferPriceEnabled: true,
              eventOfferPriceInCents: 300000,
              deposits: [
                {
                  id: "deposit13",
                  name: "Full Payment",
                  amountInCents: 300000,
                  dueDateISO: "2024-06-01T00:00:00Z",
                  status: "pending",
                  note: "Full payment for farewell lunch"
                }
              ],
              venueOffers: [
                {
                  venueOfferId: "venue8",
                  venueName: "Garden Terrace",
                  pricingInfo: {
                    priceInCents: 300000,
                    pricingType: VenueOfferPricingType.FIXED_COST
                  }
                }
              ],
              details: {
                description: "Closing lunch with networking"
              }
            }
          }
        }
      ],
      account: {
        id: "acc1",
        name: "TechCorp International"
      },
      upsellRevenue: {
        roomUpgrades: 1200
      },
      requiresContract: true,
      attritionPercentage: 15,
      cancellationDeadlineDays: 30,
      contractStatus: 'pending'
    },
    contact: {
      firstName: "Michael",
      lastName: "Chen",
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      email: "michael.chen@techcorp.com",
      phone: "+1 (415) 555-0123",
      address: "123 Innovation Way, San Francisco, CA 94105",
      company: "TechCorp International",
      role: "Global Events Director",
      dataSources: [
        { type: "LinkedIn", url: "https://linkedin.com/in/michaelchen" },
        { type: "WhatsApp", url: "https://wa.me/14155550123" }
      ],
      lastContact: "2024-01-15",
      preferredContactMethod: "email",
      timezone: "America/Los_Angeles",
      notes: "Prefers early morning meetings\nAlways brings team of 3-4 for site visits",
      bio: "Experienced events director specializing in tech conferences. 15+ years in event management with focus on sustainable practices."
    },
    currentUser: {
      id: "user1",
      name: "Sarah Johnson",
      email: "sarah.j@hotel.com",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
    },
    teamMembers: [
      { 
        id: "user2", 
        name: "Alex Thompson", 
        email: "alex.t@hotel.com",
        avatarUrl: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef"
      },
      { 
        id: "user3", 
        name: "Maria Garcia", 
        email: "maria.g@hotel.com",
        avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
      },
      { 
        id: "user4", 
        name: "James Wilson", 
        email: "james.w@hotel.com",
        avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
      }
    ],
    existingContacts: SAMPLE_CONTACTS,
    existingAccounts: SAMPLE_ACCOUNTS,
    salesAgents: SAMPLE_SALES_AGENTS
  }
};

// Empty state story
export const EmptyState: Story = {
  args: {
    reservation: {
      title: "",
      status: "pending",
      isTransient: false,
      leadScore: 0,
      qualificationStatus: "pending",
      intentScore: 0,
      assignedSalesAgent: {
        name: "Sarah Johnson",
        id: "agent1"
      },
      publicNotes: "",
      privateNotes: ""
    },
    currentUser: {
      id: "user1",
      name: "Sarah Johnson",
      email: "sarah.j@hotel.com",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
    },
    salesAgents: [
      { 
        id: "agent1", 
        name: "Sarah Johnson", 
        email: "sarah.j@hotel.com",
        avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
      },
      { 
        id: "agent2", 
        name: "James Wilson", 
        email: "james.w@hotel.com",
        avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
      },
      { 
        id: "agent3", 
        name: "Emily Davis", 
        email: "emily.d@hotel.com",
        avatarUrl: "https://images.unsplash.com/photo-1438761681681033-6461ffad8d80"
      }
    ]
  }
};

// Story with various event statuses and scenarios
export const WithEventVariations: Story = {
  args: {
    reservation: {
      title: "Annual Sales Summit 2024",
      status: "confirmed",
      isTransient: false,
      isLinkedTripleseat: true,
      tripleseatUrl: "https://tripleseat.com/events/456",
      dateRange: {
        start: "2024-09-10",
        end: "2024-09-13",
        type: "firm",
      },
      leadScore: 5,
      qualificationStatus: "qualified",
      intentScore: 95,
      intentMetrics: {
        websiteVisits: 20,
        mostRecentVisit: "2024-01-20T10:30:00Z",
        lastEmailOpen: "2024-01-19T15:45:00Z",
        numberOfContacts: 5,
        researchedHotel: true
      },
      assignedSalesAgent: {
        name: "Emily Davis",
        id: "agent3"
      },
      publicNotes: "VIP attendees require special accommodations\nStrict dietary requirements for all meals\nRequires high-speed internet in all venues",
      privateNotes: "Platinum tier client\nPrevious events averaged 150% of F&B minimum\nCEO is personal friend of hotel owner\n@Sarah Johnson handling VIP arrangements\n@Maria Garcia coordinating menu planning\n@Alex Thompson managing venue tech setup",
      itineraryName: "Primary Itinerary",
      pmsType: "Mews",
      itineraries: [
        {
          id: "itin1",
          name: "Primary Itinerary",
          isActive: true,
          rooms: SAMPLE_ROOM_TYPES.map(room => ({ id: room.id, name: room.name })),
          events: [
            { id: "event1", name: "VIP Welcome Reception" },
            { id: "event2", name: "General Session" },
            { id: "event3", name: "Regional Breakouts" },
            { id: "event4", name: "Awards Dinner" },
            { id: "event5", name: "Farewell Brunch" }
          ],
          extras: [
            { 
              id: "extra1", 
              name: "VIP Gift Suite",
              description: "Luxury gift selection for top performers",
              priceInCents: 500000
            },
            {
              id: "extra2",
              name: "Event App",
              description: "Custom mobile app for agenda and networking",
              priceInCents: 250000
            }
          ],
          eventData: {
            "event1": {
              startDateTime: "2024-09-10T18:00:00Z",
              endDateTime: "2024-09-10T21:00:00Z",
              status: HotelEventOfferStatus.DEFINITIVE,
              numberOfGuests: 50,
              imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865",
              isEventOfferPriceEnabled: true,
              eventOfferPriceInCents: 750000,
              deposits: [
                {
                  id: "deposit14",
                  name: "Initial Deposit",
                  amountInCents: 187500,
                  dueDateISO: "2024-02-15T00:00:00Z",
                  status: "paid",
                  note: "25% deposit for welcome reception"
                },
                {
                  id: "deposit15",
                  name: "Final Payment",
                  amountInCents: 562500,
                  dueDateISO: "2024-05-15T00:00:00Z",
                  status: "pending",
                  note: "Remaining balance for welcome reception"
                }
              ],
              venueOffers: [
                {
                  venueOfferId: "venue1",
                  venueName: "Wine Cellar",
                  pricingInfo: {
                    priceInCents: 750000,
                    pricingType: VenueOfferPricingType.FIXED_COST
                  }
                }
              ],
              details: {
                description: "Exclusive welcome reception for VIP attendees and executives"
              }
            },
            "event2": {
              startDateTime: "2024-09-11T09:00:00Z",
              endDateTime: "2024-09-11T17:00:00Z",
              status: HotelEventOfferStatus.DEFINITIVE,
              numberOfGuests: 300,
              imageUrl: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04",
              isEventOfferPriceEnabled: true,
              eventOfferPriceInCents: 1000000,
              deposits: [
                {
                  id: "deposit16",
                  name: "Initial Deposit",
                  amountInCents: 162500,
                  dueDateISO: "2024-03-01T00:00:00Z",
                  status: "pending",
                  note: "25% deposit for main conference day"
                },
                {
                  id: "deposit17",
                  name: "Final Payment",
                  amountInCents: 487500,
                  dueDateISO: "2024-06-01T00:00:00Z",
                  status: "pending",
                  note: "Remaining balance for main conference"
                }
              ],
              venueOffers: [
                {
                  venueOfferId: "venue2",
                  venueName: "Grand Ballroom",
                  pricingInfo: {
                    priceInCents: 1000000,
                    pricingType: VenueOfferPricingType.FIXED_COST
                  }
                }
              ],
              details: {
                description: "Main session with keynote speakers and company updates"
              }
            },
            "event3": {
              startDateTime: "2024-09-12T10:00:00Z",
              endDateTime: "2024-09-12T15:00:00Z",
              status: HotelEventOfferStatus.TENTATIVE,
              numberOfGuests: 75,
              imageUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205",
              isEventOfferPriceEnabled: true,
              eventOfferPriceInCents: 250000,
              deposits: [
                {
                  id: "deposit18",
                  name: "Initial Deposit",
                  amountInCents: 112500,
                  dueDateISO: "2024-02-15T00:00:00Z",
                  status: "paid",
                  note: "25% deposit for breakout rooms"
                },
                {
                  id: "deposit19",
                  name: "Final Payment",
                  amountInCents: 337500,
                  dueDateISO: "2024-05-15T00:00:00Z",
                  status: "pending",
                  note: "Remaining balance for breakout sessions"
                }
              ],
              venueOffers: [
                {
                  venueOfferId: "venue3",
                  venueName: "Executive Boardroom",
                  pricingInfo: {
                    priceInCents: 250000,
                    pricingType: VenueOfferPricingType.FIXED_COST
                  }
                }
              ],
              details: {
                description: "Regional team breakout sessions and planning"
              }
            },
            "event4": {
              startDateTime: "2024-09-12T19:00:00Z",
              endDateTime: "2024-09-12T23:00:00Z",
              status: HotelEventOfferStatus.WAITLISTED,
              numberOfGuests: 300,
              imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
              isEventOfferPriceEnabled: true,
              eventOfferPriceInCents: 850000,
              deposits: [
                {
                  id: "deposit20",
                  name: "Initial Deposit",
                  amountInCents: 162500,
                  dueDateISO: "2024-02-15T00:00:00Z",
                  status: "paid",
                  note: "25% deposit for showcase space"
                },
                {
                  id: "deposit21",
                  name: "Final Payment",
                  amountInCents: 487500,
                  dueDateISO: "2024-05-15T00:00:00Z",
                  status: "pending",
                  note: "Remaining balance for showcase"
                }
              ],
              venueOffers: [
                {
                  venueOfferId: "venue4",
                  venueName: "Beachfront Pavilion",
                  pricingInfo: {
                    priceInCents: 850000,
                    pricingType: VenueOfferPricingType.FIXED_COST
                  }
                }
              ],
              details: {
                description: "Formal awards dinner and entertainment"
              }
            },
            "event5": {
              startDateTime: "2024-09-13T10:00:00Z",
              endDateTime: "2024-09-13T13:00:00Z",
              status: HotelEventOfferStatus.LOST,
              numberOfGuests: 300,
              imageUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
              isEventOfferPriceEnabled: true,
              eventOfferPriceInCents: 500000,
              deposits: [
                {
                  id: "deposit22",
                  name: "Initial Deposit",
                  amountInCents: 187500,
                  dueDateISO: "2024-02-15T00:00:00Z",
                  status: "paid",
                  note: "25% deposit for closing reception"
                },
                {
                  id: "deposit23",
                  name: "Final Payment",
                  amountInCents: 562500,
                  dueDateISO: "2024-05-15T00:00:00Z",
                  status: "pending",
                  note: "Remaining balance for closing reception"
                }
              ],
              venueOffers: [
                {
                  venueOfferId: "venue5",
                  venueName: "Garden Terrace",
                  pricingInfo: {
                    priceInCents: 500000,
                    pricingType: VenueOfferPricingType.FIXED_COST
                  }
                }
              ],
              details: {
                description: "Farewell brunch cancelled due to budget constraints"
              }
            }
          }
        },
        {
          id: "itin2",
          name: "Backup Rain Plan",
          isActive: false,
          rooms: SAMPLE_ROOM_TYPES.map(room => ({ id: room.id, name: room.name })),
          events: [
            { id: "event6", name: "Indoor Welcome Reception" },
            { id: "event7", name: "General Session" },
            { id: "event8", name: "Regional Breakouts" },
            { id: "event9", name: "Indoor Awards Dinner" }
          ],
          eventData: {
            "event6": {
              startDateTime: "2024-09-10T18:00:00Z",
              endDateTime: "2024-09-10T21:00:00Z",
              status: HotelEventOfferStatus.PROSPECT,
              numberOfGuests: 50,
              imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865",
              isEventOfferPriceEnabled: true,
              eventOfferPriceInCents: 750000,
              deposits: [
                {
                  id: "deposit24",
                  name: "Initial Deposit",
                  amountInCents: 187500,
                  dueDateISO: "2024-02-15T00:00:00Z",
                  status: "paid",
                  note: "25% deposit for welcome reception"
                },
                {
                  id: "deposit25",
                  name: "Final Payment",
                  amountInCents: 562500,
                  dueDateISO: "2024-05-15T00:00:00Z",
                  status: "pending",
                  note: "Remaining balance for welcome reception"
                }
              ],
              venueOffers: [
                {
                  venueOfferId: "venue6",
                  venueName: "Wine Cellar",
                  pricingInfo: {
                    priceInCents: 750000,
                    pricingType: VenueOfferPricingType.FIXED_COST
                  }
                }
              ],
              details: {
                description: "Indoor backup for welcome reception"
              }
            },
            "event7": {
              startDateTime: "2024-09-11T09:00:00Z",
              endDateTime: "2024-09-11T17:00:00Z",
              status: HotelEventOfferStatus.PROSPECT,
              numberOfGuests: 300,
              imageUrl: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04",
              isEventOfferPriceEnabled: true,
              eventOfferPriceInCents: 1000000,
              deposits: [
                {
                  id: "deposit26",
                  name: "Initial Deposit",
                  amountInCents: 162500,
                  dueDateISO: "2024-03-01T00:00:00Z",
                  status: "pending",
                  note: "25% deposit for main conference day"
                },
                {
                  id: "deposit27",
                  name: "Final Payment",
                  amountInCents: 487500,
                  dueDateISO: "2024-06-01T00:00:00Z",
                  status: "pending",
                  note: "Remaining balance for main conference"
                }
              ],
              venueOffers: [
                {
                  venueOfferId: "venue7",
                  venueName: "Grand Ballroom",
                  pricingInfo: {
                    priceInCents: 1000000,
                    pricingType: VenueOfferPricingType.FIXED_COST
                  }
                }
              ],
              details: {
                description: "Main session (no changes needed - already indoors)"
              }
            },
            "event8": {
              startDateTime: "2024-09-12T10:00:00Z",
              endDateTime: "2024-09-12T15:00:00Z",
              status: HotelEventOfferStatus.PROSPECT,
              numberOfGuests: 75,
              imageUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205",
              isEventOfferPriceEnabled: true,
              eventOfferPriceInCents: 250000,
              deposits: [
                {
                  id: "deposit28",
                  name: "Initial Deposit",
                  amountInCents: 112500,
                  dueDateISO: "2024-02-15T00:00:00Z",
                  status: "paid",
                  note: "25% deposit for breakout rooms"
                },
                {
                  id: "deposit29",
                  name: "Final Payment",
                  amountInCents: 337500,
                  dueDateISO: "2024-05-15T00:00:00Z",
                  status: "pending",
                  note: "Remaining balance for breakout sessions"
                }
              ],
              venueOffers: [
                {
                  venueOfferId: "venue8",
                  venueName: "Executive Boardroom",
                  pricingInfo: {
                    priceInCents: 250000,
                    pricingType: VenueOfferPricingType.FIXED_COST
                  }
                }
              ],
              details: {
                description: "Regional breakouts (no changes needed - already indoors)"
              }
            },
            "event9": {
              startDateTime: "2024-09-12T19:00:00Z",
              endDateTime: "2024-09-12T23:00:00Z",
              status: HotelEventOfferStatus.PROSPECT,
              numberOfGuests: 300,
              imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
              isEventOfferPriceEnabled: true,
              eventOfferPriceInCents: 850000,
              deposits: [
                {
                  id: "deposit30",
                  name: "Initial Deposit",
                  amountInCents: 162500,
                  dueDateISO: "2024-02-15T00:00:00Z",
                  status: "paid",
                  note: "25% deposit for showcase space"
                },
                {
                  id: "deposit31",
                  name: "Final Payment",
                  amountInCents: 487500,
                  dueDateISO: "2024-05-15T00:00:00Z",
                  status: "pending",
                  note: "Remaining balance for showcase"
                }
              ],
              venueOffers: [
                {
                  venueOfferId: "venue9",
                  venueName: "Grand Ballroom",
                  pricingInfo: {
                    priceInCents: 850000,
                    pricingType: VenueOfferPricingType.FIXED_COST
                  }
                }
              ],
              details: {
                description: "Indoor backup for awards dinner"
              }
            }
          }
        }
      ],
      account: {
        id: "acc2",
        name: "Global Events Ltd"
      },
      upsellRevenue: {
        roomUpgrades: 2500
      },
      requiresContract: true,
      attritionPercentage: 20,
      cancellationDeadlineDays: 45,
      contractStatus: 'on_file'
    },
    contact: {
      firstName: "Sarah",
      lastName: "Martinez",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      email: "s.martinez@globalevents.com",
      phone: "+1 (415) 555-0126",
      address: "456 Event Plaza, San Francisco, CA 94105",
      company: "Global Events Ltd",
      role: "Senior Event Planner",
      dataSources: [
        { type: "LinkedIn", url: "https://linkedin.com/in/smartinez" },
        { type: "WhatsApp", url: "https://wa.me/14155550126" }
      ],
      lastContact: "2024-01-20",
      preferredContactMethod: "WhatsApp",
      timezone: "America/Los_Angeles",
      notes: "Prefers afternoon meetings\nRequires detailed documentation for all changes",
      bio: "Award-winning event planner with 10+ years experience in corporate events and luxury experiences."
    },
    currentUser: {
      id: "agent3",
      name: "Emily Davis",
      email: "emily.d@hotel.com",
      avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
    },
    teamMembers: [
      { 
        id: "user2", 
        name: "Alex Thompson", 
        email: "alex.t@hotel.com",
        avatarUrl: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef"
      },
      { 
        id: "user3", 
        name: "Maria Garcia", 
        email: "maria.g@hotel.com",
        avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
      },
      { 
        id: "user4", 
        name: "James Wilson", 
        email: "james.w@hotel.com",
        avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
      }
    ],
    existingContacts: SAMPLE_CONTACTS,
    existingAccounts: SAMPLE_ACCOUNTS,
    salesAgents: SAMPLE_SALES_AGENTS
  }
}; 