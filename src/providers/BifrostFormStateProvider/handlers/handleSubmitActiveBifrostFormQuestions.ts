import { BifrostApiInterface } from "../../../apis/bifrostApi/models";
import { BifrostFormQuestionWithResponse } from "@kismet_ai/foundation";
import { handleSetActiveBifrostFormQuestionsWithResponses } from "./handleSetActiveBifrostFormQuestionsWithResponses";
import { RenderableItineraryOffer } from "@kismet_ai/foundation";
import { BifrostFormApplicationStage } from "../models/BifrostFormApplicationStage";

interface HandleSubmitBifrostFormQuestionProps {
  userSessionId: string;
  bifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
  activeBifrostFormQuestionIds: string[];
  setBifrostFormQuestionsWithResponses: React.Dispatch<
    React.SetStateAction<BifrostFormQuestionWithResponse[]>
  >;
  setActiveBifrostFormQuestionIds: React.Dispatch<
    React.SetStateAction<string[]>
  >;
  setRenderableItineraryOffersFromKismetAI: React.Dispatch<
    React.SetStateAction<RenderableItineraryOffer[] | undefined>
  >;
  setBifrostFormApplicationStage: React.Dispatch<
    React.SetStateAction<BifrostFormApplicationStage>
  >;

  hotelId: string;
  bifrostApi: BifrostApiInterface;
}

export const handleSubmitBifrostFormQuestion = ({
  userSessionId,
  bifrostFormQuestionsWithResponses,
  activeBifrostFormQuestionIds,
  setBifrostFormQuestionsWithResponses,
  setActiveBifrostFormQuestionIds,
  setRenderableItineraryOffersFromKismetAI,
  setBifrostFormApplicationStage,
  hotelId,
  bifrostApi,
}: HandleSubmitBifrostFormQuestionProps) => {
  bifrostApi
    .submitBifrostFormQuestionWithResponse({
      hotelId,
      userSessionId,
      bifrostFormQuestionsWithResponses,
    })
    .then(({ nextQuestionWithResponse }) => {
      if (nextQuestionWithResponse) {
        handleSetActiveBifrostFormQuestionsWithResponses({
          updatedActiveBifrostFormQuestionsWithResponses: [
            nextQuestionWithResponse,
          ],
          setBifrostFormQuestionsWithResponses,
          setActiveBifrostFormQuestionIds,
        });
      } else {
        setBifrostFormApplicationStage(
          BifrostFormApplicationStage.ITINERARY_OFFER_PRESENTATION_SCREEN
        );

        bifrostApi
          .getBifrostFormItineraryOffers({
            hotelId,
            userSessionId,
            bifrostFormQuestionsWithResponses,
          })
          .then(({ renderableItineraryOffers }) => {
            setRenderableItineraryOffersFromKismetAI(renderableItineraryOffers);
          });

        setActiveBifrostFormQuestionIds([]);
      }
    });
};
