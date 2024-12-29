import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import UserSessionBody from './page';
import { useArgs } from '@storybook/preview-api';
import { HotelEventOfferStatus, VenueOfferPricingType, RenderableItineraryEventOffer } from "@kismet_ai/foundation";

const meta: Meta<typeof UserSessionBody> = {
  title: 'Pages/UserSessionBody',
  component: UserSessionBody,
  parameters: {
    layout: 'fullscreen',
  },
  render: function Render(args) {
    const [{ contact, reservation }, updateArgs] = useArgs();

    const handleContactUpdate = (updatedContact: NonNullable<typeof contact>) => {
      updateArgs({ contact: updatedContact });
    };

    const handleReservationUpdate = (updatedReservation: typeof reservation) => {
      updateArgs({ reservation: updatedReservation });
    };

    const handleAccountSelect = (accountId: string) => {
      const selectedAccount = defaultData.existingAccounts.find(a => a.id === accountId);
      if (selectedAccount) {
        updateArgs({
          reservation: {
            ...reservation,
            account: selectedAccount
          }
        });
      }
    };

    const handleCreateAccount = (accountName: string) => {
      const newAccount = {
        id: `new-${Date.now()}`,
        name: accountName,
      };
      updateArgs({
        reservation: {
          ...reservation,
          account: newAccount
        }
      });
    };

    const handleHostSelect = (contactId: string) => {
      const selectedContact = defaultData.existingContacts.find(c => c.id === contactId);
      if (selectedContact) {
        // Convert the selected contact to the full contact format
        updateArgs({
          contact: {
            firstName: selectedContact.name.split(' ')[0],
            lastName: selectedContact.name.split(' ')[1] || '',
            email: selectedContact.email,
            imageUrl: `https://i.pravatar.cc/300?u=${selectedContact.email}`,
            phone: selectedContact.phone || '+1 (555) 000-0000',
          }
        });
      }
    };

    const handleCreateHost = (nameOrEmail: string) => {
      // Determine if input is email or name
      const isEmail = nameOrEmail.includes('@');
      
      if (isEmail) {
        // If email was provided, only include email
        updateArgs({
          contact: {
            email: nameOrEmail,
            // firstName/lastName will be undefined, triggering "add name" in the UI
          }
        });
      } else {
        // If name was provided, parse it into first/last name
        const parts = nameOrEmail.split(' ');
        updateArgs({
          contact: {
            firstName: parts[0],
            lastName: parts[1] || '',
            // email will be undefined, triggering "add email" in the UI
          }
        });
      }
    };

    return (
      <div className="p-4">
        <UserSessionBody 
          {...args} 
          onHostSelect={handleHostSelect}
          onCreateHost={handleCreateHost}
          onContactUpdate={handleContactUpdate}
          onReservationUpdate={handleReservationUpdate}
          onAccountSelect={handleAccountSelect}
          onCreateAccount={handleCreateAccount}
          onSalesAgentSelect={(agentId) => {
            const selectedAgent = defaultData.salesAgents.find(a => a.id === agentId);
            if (selectedAgent) {
              updateArgs({
                reservation: {
                  ...reservation,
                  assignedSalesAgent: {
                    id: selectedAgent.id,
                    name: selectedAgent.name,
                  },
                },
              });
            }
          }}
          currentUser={{
            id: "1",
            name: "Sarah Johnson",
            email: "sarah.j@example.com",
            avatarUrl: "https://i.pravatar.cc/300?u=sarah.j@example.com"
          }}
          existingAccounts={defaultData.existingAccounts}
          salesAgents={defaultData.salesAgents}
        />
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof UserSessionBody>;

const sampleEvents = [
  {
    id: "event-123",
    name: "Opening Keynote",
    eventOfferName: "Opening Keynote"
  },
  {
    id: "event-124",
    name: "Networking Reception",
    eventOfferName: "Networking Reception"
  }
];

type EventDataType = {
  startDateTime: string;
  endDateTime: string;
  status: HotelEventOfferStatus;
  numberOfGuests: number;
  imageUrl: string;
  isEventOfferPriceEnabled: boolean;
  eventOfferPriceInCents: number;
  eventOfferName: string;
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
};

const sampleEventData: Record<string, EventDataType> = {
  "event-123": {
    startDateTime: "2024-07-15T09:00:00Z",
    endDateTime: "2024-07-15T12:00:00Z",
    status: HotelEventOfferStatus.PROSPECT,
    numberOfGuests: 500,
    imageUrl: "https://via.placeholder.com/300x200",
    isEventOfferPriceEnabled: true,
    eventOfferPriceInCents: 250000,
    eventOfferName: "Opening Keynote",
    venueOffers: [
      {
        venueOfferId: "venue-1",
        venueName: "Grand Ballroom",
        pricingInfo: {
          priceInCents: 250000,
          pricingType: VenueOfferPricingType.FIXED_COST
        }
      }
    ],
    details: {
      description: "Opening keynote session with industry leaders"
    }
  },
  "event-124": {
    startDateTime: "2024-07-15T18:00:00Z",
    endDateTime: "2024-07-15T21:00:00Z",
    status: HotelEventOfferStatus.PROSPECT,
    numberOfGuests: 300,
    imageUrl: "https://via.placeholder.com/300x200",
    isEventOfferPriceEnabled: true,
    eventOfferPriceInCents: 150000,
    eventOfferName: "Networking Reception",
    venueOffers: [
      {
        venueOfferId: "venue-2",
        venueName: "Garden Terrace",
        pricingInfo: {
          priceInCents: 150000,
          pricingType: VenueOfferPricingType.FIXED_COST
        }
      }
    ],
    details: {
      description: "Evening networking reception with refreshments"
    }
  }
};

// Transform eventData to match ModifyEventOffer's expected format
const transformEventData = (eventId: string, data: EventDataType) => ({
  name: data.eventOfferName,
  status: data.status,
  startDate: new Date(data.startDateTime),
  endDate: new Date(data.endDateTime),
  guestCount: data.numberOfGuests,
  venues: data.venueOffers.map((v: { venueName: string }) => v.venueName),
  priceInCents: data.eventOfferPriceInCents,
  undiscountedPriceInCents: data.venueOffers[0]?.pricingInfo.priceInCents,
  paymentSplitType: 'SINGLE_PAYER' as const,
  visibility: 'PUBLIC' as const,
  publicNotes: data.details.description,
});

const defaultData = {
  reservation: {
    title: "Summer Conference 2024",
    status: "confirmed" as const,
    dateRange: {
      start: "2024-07-15",
      end: "2024-07-20",
      type: "firm" as const,
    },
    leadScore: 3,
    qualificationStatus: 'qualified' as const,
    intentScore: 90,
    assignedSalesAgent: {
      name: "Sarah Johnson",
      id: "sj123",
    },
    publicNotes: "Large tech conference with specific AV requirements. Attendees coming from multiple countries.",
    privateNotes: "VIP client - ensure premium service. Previous successful events in 2022 and 2023.",
    account: {
      id: "tc123",
      name: "TechCorp International",
    },
    events: sampleEvents,
    eventData: sampleEventData,
    getEventInitialData: (eventId: string) => {
      const data = sampleEventData[eventId];
      return data ? transformEventData(eventId, data) : undefined;
    }
  },
  contact: {
    firstName: "Michael",
    lastName: "Chen",
    imageUrl: "https://i.pravatar.cc/300?u=michael_chen",
    dataSources: [
      { type: "LinkedIn" as const, url: "https://linkedin.com/in/michaelchen" },
      { type: "WhatsApp" as const, url: "https://wa.me/1234567890" },
    ],
    phone: "+1 (555) 123-4567",
    email: "michael.chen@techcorp.com",
    address: "123 Innovation Drive, Silicon Valley, CA 94025",
    company: "TechCorp International",
    role: "Director of Events",
    lastContact: "2024-01-15",
    preferredContactMethod: "Email",
    timezone: "PST",
    bio: "Experienced event coordinator with over 10 years in the tech industry. Specializes in large-scale conferences and corporate events.",
    notes: "Prefers early morning meetings. Has specific requirements for AV setup.",
  },
  existingContacts: [
    {
      id: "1",
      name: "Michael Chen",
      email: "michael.chen@techcorp.com",
      phone: "+1 (555) 123-4567",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 (555) 234-5678",
    },
    {
      id: "3",
      name: "Robert Johnson",
      email: "robert.j@company.com",
      phone: "+1 (555) 345-6789",
    },
  ],
  existingAccounts: [
    {
      id: "tc123",
      name: "TechCorp International",
    },
    {
      id: "gc456",
      name: "Global Conferences Ltd",
    },
    {
      id: "ie789",
      name: "Innovation Events Co",
    },
  ],
  salesAgents: [
    {
      id: "sj123",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      avatarUrl: "https://i.pravatar.cc/300?u=sarah.j@example.com",
    },
    {
      id: "mk456",
      name: "Mike Kim",
      email: "mike.k@example.com",
      avatarUrl: "https://i.pravatar.cc/300?u=mike.k@example.com",
    },
    {
      id: "al789",
      name: "Amy Lee",
      email: "amy.l@example.com",
      avatarUrl: "https://i.pravatar.cc/300?u=amy.l@example.com",
    },
  ],
};

export const Default: Story = {
  args: defaultData,
};

export const PendingReservation: Story = {
  args: {
    ...defaultData,
    reservation: {
      ...defaultData.reservation,
      status: "pending",
      leadScore: 2,
      qualificationStatus: 'pending',
      intentScore: 45,
    },
  },
};

export const NoDateRange: Story = {
  args: {
    ...defaultData,
    reservation: {
      ...defaultData.reservation,
      dateRange: {
        type: "flexible" as const,
      },
    },
  },
};

export const NoEvents: Story = {
  args: {
    ...defaultData,
    reservation: {
      ...defaultData.reservation,
      events: [],
      eventData: {},
    },
  },
};

// Update the default data to ensure the Kismet logo is available
const KISMET_LOGO_URL = 'https://storage.googleapis.com/kismet-assets/logoKismet.png'; 