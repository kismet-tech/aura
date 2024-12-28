import { Meta, StoryObj } from "@storybook/react";
import { DescriptionAccordion } from ".";
import React from "react";
import { AppViewport } from "../AppViewport";

const meta: Meta<typeof DescriptionAccordion> = {
  title: "Atoms/DescriptionAccordion",
  component: DescriptionAccordion,
};
export default meta;

const mockRenderableItineraryHotelRoomOffer = {
  hotelRoomName: "Deluxe Room",
  hotelRoomDescription:
    "Luxurious oceanfront room featuring floor-to-ceiling windows with panoramic views of the Pacific. The spacious 45 sq.m. interior boasts contemporary design with local artisan touches, a plush king-size bed, and a marble bathroom complete with deep soaking tub. Private furnished balcony perfect for watching spectacular sunsets. Modern amenities include smart TV, Nespresso machine, and high-speed WiFi.",
  calendarDateRange: {
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 86400000).toISOString() // tomorrow
  },
};

type Story = StoryObj<typeof DescriptionAccordion>;

export const Example_One: Story = {
  render: () => {
    return (
      <AppViewport>
        <DescriptionAccordion
          renderableItineraryHotelRoomOffer={{
            ...mockRenderableItineraryHotelRoomOffer,
            hotelRoomOfferId: "mock-id",
            countOffered: 1,
            countAvailable: 1,
            offerPriceInCents: 10000,
            listPriceInCents: 12000,
            runOfHouseDetails: {
              isRunOfHouse: false,
              runOfHouseRoomTypes: [],
            },
            verboseHotelRoomDescription:
              "Luxurious oceanfront room featuring floor-to-ceiling windows with panoramic views of the Pacific. The spacious 45 sq.m. interior boasts contemporary design with local artisan touches, a plush king-size bed, and a marble bathroom complete with deep soaking tub. Private furnished balcony perfect for watching spectacular sunsets. Modern amenities include smart TV, Nespresso machine, and high-speed WiFi.",
            heroImageUrl: "https://example.com/hero.jpg",
            hotelRoomImageUrls: ["https://example.com/hero.jpg"],
          }}
        />
      </AppViewport>
    );
  },
};
