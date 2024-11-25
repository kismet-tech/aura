import {
  RenderableItineraryOffer,
  RenderableItineraryHotelRoomOffer,
} from "../../../models/RenderableItineraryOffer";
import { getDaysBetweenCalendarDates } from "../../dates/getDaysBetweenCalendarDates";

interface GetTotalListPriceInCentsFromRenderableItineraryOfferProps {
  renderableItineraryOffer: RenderableItineraryOffer;
}

export const getTotalListPriceInCentsFromRenderableItineraryOffer = ({
  renderableItineraryOffer,
}: GetTotalListPriceInCentsFromRenderableItineraryOfferProps): {
  totalListPriceInCents: number;
} => {
  const { startCalendarDate, endCalendarDate, hotelRoomOffers } =
    renderableItineraryOffer;

  const { days: nightsInOffer } = getDaysBetweenCalendarDates({
    startCalendarDate,
    endCalendarDate,
  });

  const totalListPriceInCents = hotelRoomOffers.reduce(
    (acc: number, hotelRoomOffer: RenderableItineraryHotelRoomOffer) => {
      return (
        acc +
        hotelRoomOffer.countOffered *
          nightsInOffer *
          hotelRoomOffer.listPriceInCents
      );
    },
    0
  );

  return { totalListPriceInCents };
};
