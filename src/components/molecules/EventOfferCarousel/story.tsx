import type { Meta, StoryObj } from "@storybook/react";
import { EventOfferCarousel } from "./index";
import { RenderableItineraryEventOffer, HotelEventOfferStatus, VenueOfferPricingType } from "@kismet_ai/foundation";

const meta = {
    title: "Molecules/EventOfferCarousel",
    component: EventOfferCarousel,
    tags: ['autodocs'],
    parameters: {
        layout: "padded",
    },
} satisfies Meta<typeof EventOfferCarousel>;

export default meta;
type Story = StoryObj<typeof EventOfferCarousel>;

const mockEventOffer: RenderableItineraryEventOffer = {
    eventOfferId: "1",
    eventOfferName: "Sample Event",
    imageUrl: "https://picsum.photos/800/600",
    status: HotelEventOfferStatus.PROSPECT,
    startDateTime: new Date().toISOString(),
    endDateTime: new Date(Date.now() + 3600000).toISOString(),
    numberOfGuests: 4,
    isEventOfferPriceEnabled: true,
    eventOfferPriceInCents: 15000,
    eventOfferListPriceInCents: 15000,
    venueOffers: [
        {
            venueOfferId: "venue-1",
            venueName: "Sample Venue",
            pricingInfo: null,
        },
    ],
    details: {
        description: "A sample event description",
        inclusions: ["Sample inclusion 1", "Sample inclusion 2"],
        additionalNotes: "Sample additional notes",
    },
};

export const Default: Story = {
    name: 'Default View',
    args: {
        items: Array(6).fill(null).map((_, index) => ({
            eventOffer: {
                ...mockEventOffer,
                eventOfferId: `event-${index + 1}`,
                eventOfferName: `Sample Event ${index + 1}`,
            },
            onClick: ({ eventOfferId }) => console.log("Clicked event:", eventOfferId),
        })),
    },
};

export const SingleItem: Story = {
    name: 'Single Item',
    args: {
        items: [{
            eventOffer: mockEventOffer,
            onClick: ({ eventOfferId }) => console.log("Clicked event:", eventOfferId),
        }],
    },
};