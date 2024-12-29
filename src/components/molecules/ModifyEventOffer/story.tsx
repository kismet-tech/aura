import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ModifyEventOffer } from './index';
import type { EventData } from './index';
import { HotelEventOfferStatus, VenueOfferPricingType, RenderableItineraryEventOffer } from "@kismet_ai/foundation";
import { EventOfferCarouselItemSaaS } from '@/components/atoms/EventOfferCarouselItemSaaS';

const meta = {
  title: 'Molecules/ModifyEventOffer',
  component: ModifyEventOffer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="h-screen w-screen">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ModifyEventOffer>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleEvent: RenderableItineraryEventOffer = {
  eventOfferId: "event-123",
  eventOfferName: "Sample Event",
  startDateTime: new Date().toISOString(),
  endDateTime: new Date(Date.now() + 3600000).toISOString(),
  status: HotelEventOfferStatus.PROSPECT,
  numberOfGuests: 50,
  imageUrl: "https://via.placeholder.com/300x200",
  isEventOfferPriceEnabled: true,
  eventOfferPriceInCents: 150000,
  venueOffers: [
    {
      venueOfferId: "venue-1",
      venueName: "Main Hall",
      pricingInfo: {
        priceInCents: 150000,
        pricingType: VenueOfferPricingType.FIXED_COST
      }
    },
    {
      venueOfferId: "venue-2",
      venueName: "Garden",
      pricingInfo: {
        priceInCents: 150000,
        pricingType: VenueOfferPricingType.FIXED_COST
      }
    }
  ],
  details: {
    description: "Sample public notes for the event" as string
  }
};

export const AddNew: Story = {
  name: 'Add New Event',
  args: {
    open: true,
    defaultOpen: true,
    onOpenChange: () => {},
    onSave: (data) => console.log('Save:', data),
  },
};

export const EditExisting: Story = {
  name: 'Edit Existing Event',
  args: {
    open: true,
    defaultOpen: false,
    onOpenChange: () => {},
    onSave: (data) => console.log('Save:', data),
    onDelete: () => console.log('Delete'),
    initialData: {
      name: sampleEvent.eventOfferName,
      status: sampleEvent.status,
      startDate: new Date(sampleEvent.startDateTime),
      endDate: new Date(sampleEvent.endDateTime),
      guestCount: sampleEvent.numberOfGuests,
      venues: sampleEvent.venueOffers.map(v => v.venueName),
      priceInCents: sampleEvent.eventOfferPriceInCents,
      undiscountedPriceInCents: sampleEvent.venueOffers[0].pricingInfo.priceInCents,
      paymentSplitType: 'SINGLE_PAYER',
      visibility: 'PUBLIC',
      publicNotes: (sampleEvent.details?.description as string) || "",
      privateNotes: "Sample private notes"
    }
  },
};

export const WithCarouselItem: Story = {
  name: 'With Event Carousel Item',
  args: {
    open: false,
    onOpenChange: () => {},
  },
  render: (args) => {
    const [showModifyEvent, setShowModifyEvent] = React.useState(args.open);
    
    return (
      <div className="p-4">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Click the event card to edit:</h3>
          <EventOfferCarouselItemSaaS
            eventOffer={sampleEvent}
            onClick={() => setShowModifyEvent(true)}
          />
        </div>
        
        <ModifyEventOffer
          open={showModifyEvent}
          onOpenChange={setShowModifyEvent}
          defaultOpen={false}
          onSave={(data) => console.log('Save:', data)}
          onDelete={() => console.log('Delete')}
          initialData={{
            name: sampleEvent.eventOfferName,
            status: sampleEvent.status,
            startDate: new Date(sampleEvent.startDateTime),
            endDate: new Date(sampleEvent.endDateTime),
            guestCount: sampleEvent.numberOfGuests,
            venues: sampleEvent.venueOffers.map(v => v.venueName),
            priceInCents: sampleEvent.eventOfferPriceInCents,
            undiscountedPriceInCents: sampleEvent.venueOffers[0].pricingInfo.priceInCents,
            paymentSplitType: 'SINGLE_PAYER',
            visibility: 'PUBLIC',
            publicNotes: (sampleEvent.details?.description as string) || "",
            privateNotes: "Sample private notes"
          }}
        />
      </div>
    );
  }
}; 