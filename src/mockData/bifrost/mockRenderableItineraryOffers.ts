import {
  RenderableItineraryHotelRoomOffer,
  RenderableItineraryOffer,
  RenderableItineraryOfferCriterion,
} from "../../models/RenderableItineraryOffer";
import { mockRenderableItineraryEventOfferOne } from "./mockRenderableItineraryEventOffers";

const mockRenderableItineraryOfferCriterionOne: RenderableItineraryOfferCriterion =
  {
    criterionName: "Space for 12 guests",
    doesMatchCriterion: true,
  };

const mockRenderableItineraryOfferCriterionTwo: RenderableItineraryOfferCriterion =
  {
    criterionName: "Guest House and suites available",
    doesMatchCriterion: true,
  };

export const mockRenderableItineraryHotelRoomOfferOne: RenderableItineraryHotelRoomOffer =
  {
    hotelRoomId: `123456`,
    countOffered: 2,
    countAvailable: 2,
    offerPriceInCents: 150000,
    listPriceInCents: 180000,
    hotelRoomName: `Superior King`,
    hotelRoomDescription: `A spacious room with a king-size bed and city views.`,
    verboseHotelRoomDescription: `A spacious room with a king-size bed and city views. This room is perfect for a couple or a solo traveler looking for a luxurious stay in the heart of the city.`,
    heroImageUrl: `https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg`,
    hotelRoomImageUrls: [
      `https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg`,
      `https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg`,
      `https://hotel.hardrock.com/files/5829/23496346_ImageLargeWidth.avif`,
      `https://images.unsplash.com/photo-1507679799987-c73779587ccf`,
      `https://imagery.hoteltonight.com/mobile_web/homepage/homepage-2-v3.jpg?&fit=crop&dpr=1&fm=pjpg&q=25&w=412&h=400&auto=compress`,
    ],
  };

export const mockRenderableItineraryHotelRoomOfferTwo: RenderableItineraryHotelRoomOffer =
  {
    hotelRoomId: `234567`,
    countOffered: 3,
    countAvailable: 3,
    offerPriceInCents: 100000,
    listPriceInCents: 130000,
    hotelRoomName: `Standard Twin`,
    hotelRoomDescription: `A comfortable room with two twin beds.`,
    verboseHotelRoomDescription: `A comfortable room with two twin beds. This room is perfect for friends or family members traveling together.`,
    heroImageUrl: `https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg`,
    hotelRoomImageUrls: [
      `https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg`,
    ],
  };

export const mockRenderableItineraryHotelRoomOfferThree: RenderableItineraryHotelRoomOffer =
  {
    hotelRoomId: `345678`,
    countOffered: 3,
    countAvailable: 3,
    offerPriceInCents: 120000,
    listPriceInCents: 160000,
    hotelRoomName: `Deluxe King`,
    hotelRoomDescription: `A luxurious king room with mountain views.`,
    verboseHotelRoomDescription: `A luxurious king room with mountain views. This room is perfect for a couple or a solo traveler looking for a luxurious stay in the mountains.`,
    heroImageUrl: `https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg`,
    hotelRoomImageUrls: [
      `https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg`,
    ],
  };

export const mockRenderableItineraryHotelRoomOfferFour: RenderableItineraryHotelRoomOffer =
  {
    hotelRoomId: `456789`,
    countOffered: 4,
    countAvailable: 4,
    offerPriceInCents: 90000,
    listPriceInCents: 120000,
    hotelRoomName: `Standard Double`,
    hotelRoomDescription: `A cozy room with two double beds.`,
    verboseHotelRoomDescription: `A cozy room with two double beds. This room is perfect for friends or family members traveling together.`,
    heroImageUrl: `https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg`,
    hotelRoomImageUrls: [
      `https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg`,
    ],
  };

export const mockRenderableItineraryHotelRoomOfferFive: RenderableItineraryHotelRoomOffer =
  {
    hotelRoomId: `567890`,
    countOffered: 2,
    countAvailable: 2,
    offerPriceInCents: 180000,
    listPriceInCents: 220000,
    hotelRoomName: `Executive Suite`,
    hotelRoomDescription: `An executive suite with a private living room.`,
    verboseHotelRoomDescription: `An executive suite with a private living room. This suite is perfect for a couple or a solo traveler looking for a luxurious stay in the city.`,
    heroImageUrl: `https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg`,
    hotelRoomImageUrls: [
      `https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg`,
    ],
  };

export const mockRenderableItineraryHotelRoomOfferSix: RenderableItineraryHotelRoomOffer =
  {
    hotelRoomId: `678901`,
    countOffered: 1,
    countAvailable: 1,
    offerPriceInCents: 300000,
    listPriceInCents: 350000,
    hotelRoomName: `Presidential Suite`,
    hotelRoomDescription: `A luxurious suite fit for royalty.`,
    verboseHotelRoomDescription: `A luxurious suite fit for royalty. This suite is perfect for a couple or a solo traveler looking for a luxurious stay in the city.`,
    heroImageUrl: `https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg`,
    hotelRoomImageUrls: [
      `https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg`,
    ],
  };

export const mockRenderableItineraryHotelRoomOfferSeven: RenderableItineraryHotelRoomOffer =
  {
    hotelRoomId: `789012`,
    countOffered: 5,
    countAvailable: 5,
    offerPriceInCents: 80000,
    listPriceInCents: 100000,
    hotelRoomName: `Classic Queen`,
    hotelRoomDescription: `A classic room with a queen-size bed.`,
    verboseHotelRoomDescription: `A classic room with a queen-size bed. This room is perfect for a couple or a solo traveler looking for a comfortable stay in the city.`,
    heroImageUrl: `https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg`,
    hotelRoomImageUrls: [
      `https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg`,
    ],
  };

export const mockRenderableItineraryHotelRoomOfferEight: RenderableItineraryHotelRoomOffer =
  {
    hotelRoomId: `890123`,
    countOffered: 6,
    countAvailable: 6,
    offerPriceInCents: 60000,
    listPriceInCents: 80000,
    hotelRoomName: `Economy Room`,
    hotelRoomDescription: `A budget-friendly option with all essentials.`,
    verboseHotelRoomDescription: `A budget-friendly option with all essentials. This room is perfect for a couple or a solo traveler looking for a comfortable stay in the city.`,
    heroImageUrl: `https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg`,
    hotelRoomImageUrls: [
      `https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg`,
    ],
  };

export const mockRenderableItineraryOfferOne: RenderableItineraryOffer = {
  itineraryOfferId: `1234567890`,
  heroImageUrl: `https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg`,
  guestCount: 5,
  startCalendarDate: {
    year: 2025,
    month: 3,
    day: 10,
  },
  endCalendarDate: {
    year: 2025,
    month: 3,
    day: 15,
  },
  itineraryOfferName: `Spring Escape`,
  itineraryOfferDescription: `A refreshing spring getaway.`,

  descriptionOfAllHotelRoomOffers:
    "A variety of room types individually bookable by guests of the wedding",
  hotelRoomOffers: [
    mockRenderableItineraryHotelRoomOfferOne,
    mockRenderableItineraryHotelRoomOfferTwo,
  ],
  descriptionOfAllEventOffers:
    "Welcome reception for guests of the wedding on Friday 12/15 is pending. Someone will be in touch soon.",
  eventOffers: [mockRenderableItineraryEventOfferOne],

  criteria: [
    mockRenderableItineraryOfferCriterionOne,
    mockRenderableItineraryOfferCriterionTwo,
  ],
};

export const mockRenderableItineraryOfferTwo: RenderableItineraryOffer = {
  itineraryOfferId: `2384783921`,
  heroImageUrl: `https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg`,
  guestCount: 10,
  startCalendarDate: {
    year: 2025,
    month: 5,
    day: 15,
  },
  endCalendarDate: {
    year: 2025,
    month: 5,
    day: 18,
  },
  itineraryOfferName: `Beach Getaway`,
  itineraryOfferDescription: `A relaxing weekend by the beach.`,

  descriptionOfAllHotelRoomOffers:
    "A variety of room types individually bookable by guests of the wedding",
  hotelRoomOffers: [
    mockRenderableItineraryHotelRoomOfferThree,
    mockRenderableItineraryHotelRoomOfferFour,
  ],
  descriptionOfAllEventOffers:
    "Welcome reception for guests of the wedding on Friday 12/15 is pending. Someone will be in touch soon.",
  eventOffers: [mockRenderableItineraryEventOfferOne],

  criteria: [
    mockRenderableItineraryOfferCriterionOne,
    mockRenderableItineraryOfferCriterionTwo,
  ],
};

export const mockRenderableItineraryOfferThree: RenderableItineraryOffer = {
  itineraryOfferId: `3428734783`,
  heroImageUrl: `https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg`,
  guestCount: 8,
  startCalendarDate: {
    year: 2025,
    month: 9,
    day: 10,
  },
  endCalendarDate: {
    year: 2025,
    month: 9,
    day: 14,
  },
  itineraryOfferName: `Mountain Retreat`,
  itineraryOfferDescription: `An adventurous escape to the mountains.`,
  descriptionOfAllHotelRoomOffers:
    "A variety of room types individually bookable by guests of the wedding",
  hotelRoomOffers: [
    mockRenderableItineraryHotelRoomOfferFive,
    mockRenderableItineraryHotelRoomOfferSix,
  ],
  descriptionOfAllEventOffers:
    "Welcome reception for guests of the wedding on Friday 12/15 is pending. Someone will be in touch soon.",
  eventOffers: [mockRenderableItineraryEventOfferOne],

  criteria: [
    mockRenderableItineraryOfferCriterionOne,
    mockRenderableItineraryOfferCriterionTwo,
  ],
};

export const mockRenderableItineraryOfferFour: RenderableItineraryOffer = {
  itineraryOfferId: `4738293928`,
  heroImageUrl: `https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg`,
  guestCount: 20,
  startCalendarDate: {
    year: 2025,
    month: 11,
    day: 20,
  },
  endCalendarDate: {
    year: 2025,
    month: 11,
    day: 24,
  },
  itineraryOfferName: `City Break`,
  itineraryOfferDescription: `Explore the sights and sounds of the city.`,

  descriptionOfAllHotelRoomOffers:
    "A variety of room types individually bookable by guests of the wedding",
  hotelRoomOffers: [
    mockRenderableItineraryHotelRoomOfferSeven,
    mockRenderableItineraryHotelRoomOfferEight,
  ],
  descriptionOfAllEventOffers:
    "Welcome reception for guests of the wedding on Friday 12/15 is pending. Someone will be in touch soon.",
  eventOffers: [mockRenderableItineraryEventOfferOne],

  criteria: [
    mockRenderableItineraryOfferCriterionOne,
    mockRenderableItineraryOfferCriterionTwo,
  ],
};
