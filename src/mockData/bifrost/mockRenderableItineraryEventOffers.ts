import {
  RenderableItineraryEventOffer,
  HotelEventOfferStatus,
  VenueOfferPricingType,
} from "@kismet_ai/foundation";

export const mockRenderableItineraryEventOfferOne: RenderableItineraryEventOffer =
{
  eventOfferId: "1232341",
  eventOfferName: "Welcome Reception",
  eventOfferPriceInCents: 15000,
  isEventOfferPriceEnabled: false,
  imageUrl:
    "https://nypost.com/wp-content/uploads/sites/2/2022/04/melodys-piano-bar-1.jpg?quality=75&strip=all",
  startDateTime: "2024-12-15T18:00:00Z",
  endDateTime: "2024-12-15T21:00:00Z",
  numberOfGuests: 2,
  status: HotelEventOfferStatus.DEFINITIVE,
  venueOffers: [
    {
      venueOfferId: "venue-offer-1",
      venueName: "The Ballroom",
      pricingInfo: {
        pricingType: VenueOfferPricingType.PER_HOUR,
        priceInCents: 5000
      },
    },
    {
      venueOfferId: "venue-offer-2",
      venueName: "Melody's Piano Bar",
      pricingInfo: {
        pricingType: VenueOfferPricingType.PER_HOUR,
        priceInCents: 6000
      },
    }
  ],
  details: {
    description: "Join us for a welcome cocktail reception with hors d'oeuvres",
    location: "The Ballroom, Melody's Piano Bar",
    address: "123 Main Street, New York, NY 10001",
    inclusions: ["Welcome drink", "Light appetizers", "Live piano music"],
    notes: "Smart casual dress code"
  }
};
