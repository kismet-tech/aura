import { RenderablePendingItinerary } from "../../components/bifrostForm/PendingItineraryPlanner/models/RenderablePendingItinerary";

export const mockRenderablePendingItineraryOne: RenderablePendingItinerary = {
  itineraryName: "Gustave’s Wedding Block",
  guestFirstName: "Gustave",
  countOfHotelRoomsInItinerary: undefined,
  calendarDateRangesInItinerary: undefined,
  itineraryImageUrl:
    "https://www.doylecollection.com/var/doyle/storage/images/media/2-double-river-lee/805884-1-eng-US/2-double-river-lee_block_high_1_of_3.jpg",
};

export const mockRenderablePendingItineraryTwo: RenderablePendingItinerary = {
  itineraryName: "Gustave’s Wedding Block",
  guestFirstName: "Gustave",
  countOfHotelRoomsInItinerary: 12,
  calendarDateRangesInItinerary: [
    {
      startCalendarDate: {
        month: 12,
        day: 14,
        year: 2025,
      },
      endCalendarDate: {
        month: 12,
        day: 17,
        year: 2025,
      },
    },
  ],
  itineraryImageUrl:
    "https://www.doylecollection.com/var/doyle/storage/images/media/2-double-river-lee/805884-1-eng-US/2-double-river-lee_block_high_1_of_3.jpg",
};
