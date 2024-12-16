import {
  RenderableItineraryEventOffer,
  RenderableItineraryEventOfferApprovalStatus,
} from "@kismet_ai/foundation";

export const mockRenderableItineraryEventOfferOne: RenderableItineraryEventOffer =
  {
    eventOfferId: "1232341",
    eventName: "Welcome Reception",
    calendarDateRange: {
      startCalendarDate: {
        year: 2024,
        month: 12,
        day: 15,
      },
      endCalendarDate: {
        year: 2024,
        month: 12,
        day: 15,
      },
    },
    approvalStatus: RenderableItineraryEventOfferApprovalStatus.PENDING,
    imageUrl:
      "https://nypost.com/wp-content/uploads/sites/2/2022/04/melodys-piano-bar-1.jpg?quality=75&strip=all",
  };
