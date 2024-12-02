import { BifrostApiInterface } from "@/apis/bifrostApi/models";
import { BifrostFormQuestionWithResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import { handleSetActiveBifrostFormQuestionsWithResponses } from "./handleSetActiveBifrostFormQuestionsWithResponses";
import { RenderableItineraryOffer } from "@/models/bifrost/RenderableItineraryOffer";
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
  bifrostApi,
}: HandleSubmitBifrostFormQuestionProps) => {
  const bifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse =
    bifrostFormQuestionsWithResponses.find(
      (bifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse) => {
        return (
          bifrostFormQuestionWithResponse.bifrostFormQuestion
            .bifrostFormQuestionId === activeBifrostFormQuestionIds[0]
        );
      }
    ) as BifrostFormQuestionWithResponse;

  bifrostApi
    .submitBifrostFormQuestionWithResponse({
      userSessionId,
      bifrostFormQuestionWithResponse,
    })
    .then(({ nextQuestionWithResponse, renderableItineraryOffers }) => {
      if (nextQuestionWithResponse) {
        handleSetActiveBifrostFormQuestionsWithResponses({
          updatedActiveBifrostFormQuestionsWithResponses: [
            nextQuestionWithResponse,
          ],
          setBifrostFormQuestionsWithResponses,
          setActiveBifrostFormQuestionIds,
        });
      } else {
        setActiveBifrostFormQuestionIds([]);
      }

      if (renderableItineraryOffers) {
        setRenderableItineraryOffersFromKismetAI(renderableItineraryOffers);
        setBifrostFormApplicationStage(
          BifrostFormApplicationStage.ITINERARY_OFFER_PRESENTATION_SCREEN
        );
      }
    });
};
