import { BifrostApiInterface } from "@/apis/bifrostApi/models";
import {
  ItineraryOfferOriginatorType,
  RenderableItineraryHotelRoomOffer,
  RenderableItineraryOffer,
} from "@/models/bifrost/RenderableItineraryOffer";
import { deepEqual } from "@/utilities/core/deepEqual";

interface HandleUpdateItineraryOfferHotelRoomCountProps {
  userSessionId: string;
  itineraryOfferId: string;
  hotelRoomId: string;
  updatedCountOffered: number;
  renderableItineraryOffersFromKismetAI: RenderableItineraryOffer[] | undefined;
  customRenderableItineraryOfferFromGuest: RenderableItineraryOffer | undefined;
  setCustomRenderableItineraryOfferFromGuest: React.Dispatch<
    React.SetStateAction<RenderableItineraryOffer | undefined>
  >;
  bifrostApi: BifrostApiInterface;
}

export const handleUpdateItineraryOfferHotelRoomCount = async ({
  userSessionId,
  itineraryOfferId,
  hotelRoomId,
  updatedCountOffered,
  renderableItineraryOffersFromKismetAI,
  customRenderableItineraryOfferFromGuest,
  setCustomRenderableItineraryOfferFromGuest,
  bifrostApi,
}: HandleUpdateItineraryOfferHotelRoomCountProps): Promise<{
  updatedItineraryOfferId: string;
}> => {
  const {
    itineraryOfferId: updatedItineraryOfferId,
    updatedCountOffered: updatedCountOfferedFromApi,
  } =
    await bifrostApi.guestUpdateCustomRenderableItineraryOfferHotelRoomOfferCount(
      {
        userSessionId,
        itineraryOfferId,
        hotelRoomId,
        updatedCountOffered,
      }
    );

  if (customRenderableItineraryOfferFromGuest) {
    setCustomRenderableItineraryOfferFromGuest(
      (
        previousCustomRenderableItineraryOfferFromGuest:
          | RenderableItineraryOffer
          | undefined
      ) => {
        const updatedCustomRenderableItineraryOfferFromGuest: RenderableItineraryOffer =
          {
            ...(previousCustomRenderableItineraryOfferFromGuest as RenderableItineraryOffer),
            itineraryOfferId: updatedItineraryOfferId,
          };

        updatedCustomRenderableItineraryOfferFromGuest.hotelRoomOffers =
          updatedCustomRenderableItineraryOfferFromGuest.hotelRoomOffers.map(
            (hotelRoomOffer: RenderableItineraryHotelRoomOffer) => {
              if (hotelRoomOffer.hotelRoomId === hotelRoomId) {
                return {
                  ...hotelRoomOffer,
                  countOffered: updatedCountOffered,
                };
              } else {
                return hotelRoomOffer;
              }
            }
          );

        if (
          deepEqual(
            previousCustomRenderableItineraryOfferFromGuest,
            updatedCustomRenderableItineraryOfferFromGuest
          )
        ) {
          return previousCustomRenderableItineraryOfferFromGuest;
        } else {
          return updatedCustomRenderableItineraryOfferFromGuest;
        }
      }
    );
  } else {
    const baseRenderableItineraryOfferFromKismetAI =
      renderableItineraryOffersFromKismetAI!.find(
        (renderableItineraryOfferElement: RenderableItineraryOffer) => {
          return (
            renderableItineraryOfferElement.itineraryOfferId ===
            itineraryOfferId
          );
        }
      ) as RenderableItineraryOffer;

    const updatedCustomRenderableItineraryOfferFromGuest: RenderableItineraryOffer =
      {
        ...baseRenderableItineraryOfferFromKismetAI,
        itineraryOfferId: updatedItineraryOfferId,
        originatorType: ItineraryOfferOriginatorType.GUEST,
      };

    updatedCustomRenderableItineraryOfferFromGuest.hotelRoomOffers =
      updatedCustomRenderableItineraryOfferFromGuest.hotelRoomOffers.map(
        (hotelRoomOffer: RenderableItineraryHotelRoomOffer) => {
          if (hotelRoomOffer.hotelRoomId === hotelRoomId) {
            return {
              ...hotelRoomOffer,
              countOffered: updatedCountOffered,
            };
          } else {
            return hotelRoomOffer;
          }
        }
      );

    setCustomRenderableItineraryOfferFromGuest(
      (
        previousCustomRenderableItineraryOfferFromGuest:
          | RenderableItineraryOffer
          | undefined
      ) => {
        if (
          deepEqual(
            previousCustomRenderableItineraryOfferFromGuest,
            updatedCustomRenderableItineraryOfferFromGuest
          )
        ) {
          return previousCustomRenderableItineraryOfferFromGuest;
        } else {
          return updatedCustomRenderableItineraryOfferFromGuest;
        }
      }
    );
  }

  return { updatedItineraryOfferId };
};
