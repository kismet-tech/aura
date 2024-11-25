import { BifrostFooter } from "@/components/atoms/BifrostFooter";
import { useBifrostFormState } from "@/providers/BifrostFormStateProvider/useBifrostFormState";
import React from "react";
import { BifrostFormLaunchScreen } from "../BifrostFormLaunchScreen";
import { BifrostFormQuestionWithResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import { BifrostFormApplicationStage } from "@/providers/BifrostFormStateProvider/models/BifrostFormApplicationStage";
import { BifrostFormQuestionLoopScreen } from "../BifrostFormQuestionLoopScreen";
import { BifrostItineraryOfferPresentationScreen } from "../BifrostItineraryOfferPresentationScreen";

export function BifrostFormApplication() {
  const {
    bifrostFormApplicationStage,
    activeBifrostFormQuestionsWithResponses,
    progressToNextBifrostFormApplicationStage,
    setBifrostFormQuestionWithResponse,
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
        handleProgressForward={progressToNextBifrostFormApplicationStage}
      />
    );
  } else if (
    bifrostFormApplicationStage ===
    BifrostFormApplicationStage.QUESTION_LOOP_SCREEN
  ) {
    renderedScreen = (
      <BifrostFormQuestionLoopScreen
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
        handleProgressForward={progressToNextBifrostFormApplicationStage}
      />
    );
  } else if (
    bifrostFormApplicationStage ===
    BifrostFormApplicationStage.ITINERARY_OFFER_PRESENTATION_SCREEN
  ) {
    renderedScreen = <BifrostItineraryOfferPresentationScreen />;
  } else {
    renderedScreen = <></>;
  }

  return (
    <div>
      <div>{renderedScreen}</div>
      <BifrostFooter />
    </div>
  );
}
