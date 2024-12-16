import {
  RenderableItineraryHotelRoomOffer,
  RenderableItineraryOffer,
} from "@kismet_ai/foundation";
import { getDaysBetweenCalendarDates } from "../../dates/getDaysBetweenCalendarDates";

interface GetTotalOfferPriceInCentsFromRenderableItineraryOfferProps {
  renderableItineraryOffer: RenderableItineraryOffer;
}

export const getTotalOfferPriceInCentsFromRenderableItineraryOffer = ({
  renderableItineraryOffer,
}: GetTotalOfferPriceInCentsFromRenderableItineraryOfferProps): {
  totalOfferPriceInCents: number;
} => {
  const { startCalendarDate, endCalendarDate, hotelRoomOffers } =
    renderableItineraryOffer;

  const { days: nightsInOffer } = getDaysBetweenCalendarDates({
    startCalendarDate,
    endCalendarDate,
  });

  const totalOfferPriceInCents = hotelRoomOffers.reduce(
    (acc: number, hotelRoomOffer: RenderableItineraryHotelRoomOffer) => {
      return (
        acc +
        hotelRoomOffer.countOffered *
          nightsInOffer *
          hotelRoomOffer.offerPriceInCents
      );
    },
    0
  );

  return { totalOfferPriceInCents };
};
