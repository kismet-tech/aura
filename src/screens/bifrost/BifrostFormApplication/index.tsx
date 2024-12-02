import { BifrostFooter } from "@/components/atoms/BifrostFooter";
import { useBifrostFormState } from "@/providers/BifrostFormStateProvider/useBifrostFormState";
import React from "react";
import { BifrostFormLaunchScreen } from "../BifrostFormLaunchScreen";
import { BifrostFormQuestionWithResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import { BifrostFormApplicationStage } from "@/providers/BifrostFormStateProvider/models/BifrostFormApplicationStage";
import { BifrostFormInteractiveLoopScreen } from "../BifrostFormInteractiveLoopScreen";
import { BifrostItineraryOfferPresentationScreen } from "../BifrostItineraryOfferPresentationScreen";
import { RenderableItineraryOffer } from "@/models/bifrost/RenderableItineraryOffer";

export function BifrostFormApplication() {
  const {
    bifrostFormApplicationStage,
    activeBifrostFormQuestionsWithResponses,
    setBifrostFormQuestionWithResponse,
    renderablePendingItinerary,
    historicalBifrostFormQuestionsWithResponses,
    submitBifrostFormQuestion,
    renderableItineraryOffersFromKismetAI,
    customRenderableItineraryOfferFromGuest,
    paymentsPageUrl,
    updateItineraryOfferHotelRoomCount,
    beginUserSession,
  } = useBifrostFormState();

  let renderedScreen: JSX.Element;
  if (
    bifrostFormApplicationStage === BifrostFormApplicationStage.LAUNCH_SCREEN
  ) {
    renderedScreen = (
      <BifrostFormLaunchScreen
        bifrostFormQuestionsWithResponses={
          activeBifrostFormQuestionsWithResponses
        }
        setBifrostFormQuestionWithResponse={({
          updatedBifrostFormQuestionWithResponse,
        }: {
          updatedBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
        }) => {
          setBifrostFormQuestionWithResponse({
            updatedBifrostFormQuestionWithResponse,
          });
        }}
        handleProgressForward={() => {
          beginUserSession();
        }}
      />
    );
  } else if (
    bifrostFormApplicationStage ===
    BifrostFormApplicationStage.INTERACTIVE_LOOP_SCREEN
  ) {
    renderedScreen = (
      <BifrostFormInteractiveLoopScreen
        activeBifrostFormQuestionsWithResponses={
          activeBifrostFormQuestionsWithResponses
        }
        historicalBifrostFormQuestionsWithResponses={
          historicalBifrostFormQuestionsWithResponses
        }
        setBifrostFormQuestionWithResponse={({
          updatedBifrostFormQuestionWithResponse,
        }: {
          updatedBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
        }) => {
          setBifrostFormQuestionWithResponse({
            updatedBifrostFormQuestionWithResponse,
          });
        }}
        renderablePendingItinerary={renderablePendingItinerary}
        submitBifrostFormQuestion={submitBifrostFormQuestion}
      />
    );
  } else if (
    bifrostFormApplicationStage ===
    BifrostFormApplicationStage.ITINERARY_OFFER_PRESENTATION_SCREEN
  ) {
    renderableItineraryOffersFromKismetAI;
    customRenderableItineraryOfferFromGuest;

    const renderableItineraryOffers: RenderableItineraryOffer[] = [];
    if (renderableItineraryOffersFromKismetAI) {
      renderableItineraryOffers.push(...renderableItineraryOffersFromKismetAI);
    }
    if (customRenderableItineraryOfferFromGuest) {
      renderableItineraryOffers.push(customRenderableItineraryOfferFromGuest);
    }

    renderedScreen = (
      <BifrostItineraryOfferPresentationScreen
        renderableItineraryOffers={renderableItineraryOffers}
        renderablePendingItinerary={renderablePendingItinerary}
        paymentsPageUrl={paymentsPageUrl}
        onClickUpdateItineraryOfferHotelRoomCount={async ({
          itineraryOfferId,
          hotelRoomId,
          updatedCountOffered,
        }: {
          itineraryOfferId: string;
          hotelRoomId: string;
          updatedCountOffered: number;
        }): Promise<{ updatedItineraryOfferId: string }> => {
          const { updatedItineraryOfferId } =
            await updateItineraryOfferHotelRoomCount({
              itineraryOfferId,
              hotelRoomId,
              updatedCountOffered,
            });
          return { updatedItineraryOfferId };
        }}
      />
    );
  } else {
    renderedScreen = <></>;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">{renderedScreen}</div>
      <div className="sticky bottom-0">
        <BifrostFooter />
      </div>
    </div>
  );
}
