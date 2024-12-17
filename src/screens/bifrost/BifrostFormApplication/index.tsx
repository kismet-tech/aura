import { BifrostFooter } from "@/components/atoms/BifrostFooter";
import { useBifrostFormState } from "@/providers/BifrostFormStateProvider/useBifrostFormState";
import React from "react";
import { BifrostFormLaunchScreen } from "../BifrostFormLaunchScreen";
import { BifrostFormQuestionWithResponse } from "@kismet_ai/foundation";
import { BifrostFormApplicationStage } from "@/providers/BifrostFormStateProvider/models/BifrostFormApplicationStage";
import { BifrostFormInteractiveLoopScreen } from "../BifrostFormInteractiveLoopScreen";
import { BifrostItineraryOfferPresentationScreen } from "../BifrostItineraryOfferPresentationScreen";
import { RenderableItineraryOffer } from "@kismet_ai/foundation";

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
    updateItineraryOfferHotelRoomCount,
    beginUserSession,
    paymentsPageUrl,
    selectItineraryOffer,
    suggestCalendarDateRangesFromConstraints,
    bifrostFormMetadata,
  } = useBifrostFormState();

  console.log(
    `activeBifrostFormQuestionsWithResponses: ${JSON.stringify(
      activeBifrostFormQuestionsWithResponses,
      null,
      4
    )}`
  );

  let renderedScreen: JSX.Element;
  if (
    bifrostFormApplicationStage === BifrostFormApplicationStage.LAUNCH_SCREEN
  ) {
    renderedScreen = (
      <BifrostFormLaunchScreen
        bifrostFormMetadata={bifrostFormMetadata}
        activeBifrostFormQuestionsWithResponses={
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
        suggestCalendarDateRangesFromConstraints={
          suggestCalendarDateRangesFromConstraints
        }
      />
    );
  } else if (
    bifrostFormApplicationStage ===
    BifrostFormApplicationStage.INTERACTIVE_LOOP_SCREEN
  ) {
    renderedScreen = (
      <BifrostFormInteractiveLoopScreen
        bifrostFormMetadata={bifrostFormMetadata}
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
          console.log(
            `updatedBifrostFormQuestionWithResponse: ${JSON.stringify(
              updatedBifrostFormQuestionWithResponse,
              null,
              4
            )}`
          );

          setBifrostFormQuestionWithResponse({
            updatedBifrostFormQuestionWithResponse,
          });
        }}
        renderablePendingItinerary={renderablePendingItinerary}
        submitBifrostFormQuestion={async () => {
          console.log("submitBifrostFormQuestion");

          await submitBifrostFormQuestion();
        }}
        suggestCalendarDateRangesFromConstraints={
          suggestCalendarDateRangesFromConstraints
        }
      />
    );
  } else if (
    bifrostFormApplicationStage ===
    BifrostFormApplicationStage.ITINERARY_OFFER_PRESENTATION_SCREEN
  ) {
    renderableItineraryOffersFromKismetAI;
    customRenderableItineraryOfferFromGuest;

    let renderableItineraryOffers: RenderableItineraryOffer[] | undefined =
      undefined;

    if (
      !!renderableItineraryOffersFromKismetAI ||
      !!customRenderableItineraryOfferFromGuest
    ) {
      renderableItineraryOffers = [];

      if (renderableItineraryOffersFromKismetAI) {
        renderableItineraryOffers.push(
          ...renderableItineraryOffersFromKismetAI
        );
      }

      if (customRenderableItineraryOfferFromGuest) {
        renderableItineraryOffers.push(customRenderableItineraryOfferFromGuest);
      }
    }

    renderedScreen = (
      <BifrostItineraryOfferPresentationScreen
        renderableItineraryOffers={renderableItineraryOffers}
        renderablePendingItinerary={renderablePendingItinerary}
        onClickUpdateItineraryOfferHotelRoomCount={async ({
          itineraryOfferId,
          hotelRoomOfferId,
          updatedCountOffered,
        }: {
          itineraryOfferId: string;
          hotelRoomOfferId: string;
          updatedCountOffered: number;
        }): Promise<{ updatedItineraryOfferId: string }> => {
          const { updatedItineraryOfferId } =
            await updateItineraryOfferHotelRoomCount({
              itineraryOfferId,
              hotelRoomOfferId,
              updatedCountOffered,
            });
          return { updatedItineraryOfferId };
        }}
        onClickSelectItineraryOfferAndGoToPaymentsPage={async ({
          itineraryOfferId,
        }: {
          itineraryOfferId: string;
        }): Promise<void> => {
          selectItineraryOffer({ itineraryOfferId });
          window.location.href = paymentsPageUrl;
        }}
        bifrostFormMetadata={bifrostFormMetadata}
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
