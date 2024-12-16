import { KismetHeader } from "@/components/atoms";
import React, { useEffect, useState } from "react";
import {
  BifrostFormQuestionWithResponse,
  CalendarDateRange,
} from "@kismet_ai/foundation";
import { ActiveBifrostFormQuestions } from "@/components/bifrostForm/ActiveBifrostFormQuestions";
import { NavigationButton } from "@/components/atoms/NavigationButton";

export interface BifrostFormLaunchScreenProps {
  activeBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
  setBifrostFormQuestionWithResponse: ({
    updatedBifrostFormQuestionWithResponse,
  }: {
    updatedBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
  }) => void;
  handleProgressForward: () => void;
  suggestCalendarDateRangesFromConstraints: ({
    descriptionOfPotentialCalendarDates,
  }: {
    descriptionOfPotentialCalendarDates: string;
  }) => Promise<CalendarDateRange[]>;
}

export function BifrostFormLaunchScreen({
  activeBifrostFormQuestionsWithResponses,
  setBifrostFormQuestionWithResponse,
  handleProgressForward,
  suggestCalendarDateRangesFromConstraints,
}: BifrostFormLaunchScreenProps) {
  const [allResponsesAreValid, setAllResponsesAreValid] =
    useState<boolean>(false);

  const [allQuestionBeenRespondedTo, setAllQuestionBeenRespondedTo] =
    useState<boolean>(false);

  useEffect(() => {
    if (allResponsesAreValid) {
      handleProgressForward();
    }
  }, [allResponsesAreValid]);

  return (
    <div>
      <div className="mb-3">
        <KismetHeader>Get started creating your custom itinerary</KismetHeader>
      </div>
      <div>
        <ActiveBifrostFormQuestions
          activeBifrostFormQuestionsWithResponses={
            activeBifrostFormQuestionsWithResponses
          }
          setBifrostFormQuestionWithResponse={
            setBifrostFormQuestionWithResponse
          }
          setBifrostFormQuestionIdsWithValidResponses={({
            bifrostFormQuestionIdsWithValidResponses,
          }: {
            bifrostFormQuestionIdsWithValidResponses: string[];
          }) => {
            setAllResponsesAreValid(
              bifrostFormQuestionIdsWithValidResponses.length > 0 &&
                activeBifrostFormQuestionsWithResponses.every(
                  (
                    activeBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse
                  ) => {
                    return bifrostFormQuestionIdsWithValidResponses.includes(
                      activeBifrostFormQuestionWithResponse.bifrostFormQuestion
                        .bifrostFormQuestionId
                    );
                  }
                )
            );
          }}
          setBifrostFormQuestionIdsRespondedTo={({
            bifrostFormQuestionIdsRespondedTo,
          }: {
            bifrostFormQuestionIdsRespondedTo: string[];
          }) => {
            setAllQuestionBeenRespondedTo(
              bifrostFormQuestionIdsRespondedTo.length > 0 &&
                activeBifrostFormQuestionsWithResponses.every(
                  (
                    activeBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse
                  ) => {
                    return bifrostFormQuestionIdsRespondedTo.includes(
                      activeBifrostFormQuestionWithResponse.bifrostFormQuestion
                        .bifrostFormQuestionId
                    );
                  }
                )
            );
          }}
          suggestCalendarDateRangesFromConstraints={
            suggestCalendarDateRangesFromConstraints
          }
        />
      </div>
      <div className="flex justify-end">
        <NavigationButton
          onClick={handleProgressForward}
          isEnabled={allResponsesAreValid}
        >
          Start Planning
        </NavigationButton>
      </div>
    </div>
  );
}
