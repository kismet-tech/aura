import React, { useState, useEffect, useRef } from "react";
import {
  BifrostFormQuestionWithResponse,
  CalendarDateRange,
} from "@kismet_ai/foundation";
import { RenderablePendingItinerary } from "@/components/bifrostForm/PendingItineraryPlanner/models/RenderablePendingItinerary";
import { BifrostFormInteractionHistory } from "@/components/bifrostForm/BifrostFormInteractionHistory";
import { NavigationButton } from "@/components/atoms/NavigationButton";
import { deepEqual } from "@/utilities/core/deepEqual";
import { ActiveBifrostFormQuestions } from "@/components/bifrostForm/ActiveBifrostFormQuestions";
import { PendingItineraryPlannerHeaderClosed } from "@/components/bifrostForm/PendingItineraryPlanner/components/PendingItineraryPlannerHeaderClosed";

export interface BifrostFormInteractiveLoopScreenProps {
  historicalBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
  activeBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
  renderablePendingItinerary: RenderablePendingItinerary;
  setBifrostFormQuestionWithResponse: ({
    updatedBifrostFormQuestionWithResponse,
  }: {
    updatedBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
  }) => void;
  submitBifrostFormQuestion: () => Promise<void>;
  suggestCalendarDateRangesFromConstraints: ({
    descriptionOfPotentialCalendarDates,
  }: {
    descriptionOfPotentialCalendarDates: string;
  }) => Promise<CalendarDateRange[]>;
}

export function BifrostFormInteractiveLoopScreen({
  historicalBifrostFormQuestionsWithResponses,
  activeBifrostFormQuestionsWithResponses,
  renderablePendingItinerary,
  setBifrostFormQuestionWithResponse,
  submitBifrostFormQuestion,
  suggestCalendarDateRangesFromConstraints,
}: BifrostFormInteractiveLoopScreenProps) {
  const [
    bifrostFormQuestionIdsRespondedTo,
    setBifrostFormQuestionIdsRespondedTo,
  ] = useState<string[]>([]);

  const [
    bifrostFormQuestionIdsWithValidResponses,
    setBifrostFormQuestionIdsWithValidResponses,
  ] = useState<string[]>([]);

  // Create refs
  const scrollableRef = useRef<HTMLDivElement>(null);
  const activeQuestionsRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);

  const previousActiveQuestionsRef = useRef<
    BifrostFormQuestionWithResponse[] | null
  >(null);

  useEffect(() => {
    if (
      activeBifrostFormQuestionsWithResponses.length > 0 &&
      bifrostFormQuestionIdsWithValidResponses.length > 0 &&
      activeBifrostFormQuestionsWithResponses.length ===
        bifrostFormQuestionIdsWithValidResponses.length &&
      activeBifrostFormQuestionsWithResponses.every(
        (
          activeBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse
        ) => {
          return bifrostFormQuestionIdsWithValidResponses.includes(
            activeBifrostFormQuestionWithResponse.bifrostFormQuestion
              .bifrostFormQuestionId
          );
        }
      ) &&
      bifrostFormQuestionIdsRespondedTo.length ===
        activeBifrostFormQuestionsWithResponses.length &&
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
    ) {
      submitBifrostFormQuestion();
    }
  }, [
    bifrostFormQuestionIdsWithValidResponses,
    bifrostFormQuestionIdsRespondedTo,
    activeBifrostFormQuestionsWithResponses,
  ]);

  const handleSubmitBifrostFormQuestion = async () => {
    const haveActiveQuestionsChanged = (
      prev: BifrostFormQuestionWithResponse[] | null,
      current: BifrostFormQuestionWithResponse[]
    ): boolean => {
      if (prev === null) return true;

      return !deepEqual(prev, current);
    };

    if (
      activeBifrostFormQuestionsWithResponses.length > 0 &&
      bifrostFormQuestionIdsWithValidResponses.length > 0 &&
      activeBifrostFormQuestionsWithResponses.length ===
        bifrostFormQuestionIdsWithValidResponses.length &&
      activeBifrostFormQuestionsWithResponses.every(
        (
          activeBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse
        ) => {
          return bifrostFormQuestionIdsWithValidResponses.includes(
            activeBifrostFormQuestionWithResponse.bifrostFormQuestion
              .bifrostFormQuestionId
          );
        }
      ) &&
      haveActiveQuestionsChanged(
        previousActiveQuestionsRef.current,
        activeBifrostFormQuestionsWithResponses
      )
    ) {
      // Update the ref before calling the submit function to prevent multiple calls
      previousActiveQuestionsRef.current =
        activeBifrostFormQuestionsWithResponses;

      await submitBifrostFormQuestion();
    }
  };

  return (
    <div className="flex flex-col flex-1 h-full overflow-hidden">
      {/* Header */}
      <div className="pb-4 flex-shrink-0">
        <PendingItineraryPlannerHeaderClosed
          renderablePendingItinerary={renderablePendingItinerary}
        />
      </div>

      <div className="flex-grow overflow-y-auto min-h-0" ref={scrollableRef}>
        {/* Inner Container */}
        <div className="space-y-0 p-0">
          <div className="px-1 py-4">
            <BifrostFormInteractionHistory
              bifrostFormQuestionsWithResponses={
                historicalBifrostFormQuestionsWithResponses
              }
              setBifrostFormQuestionWithResponse={() => {}}
              suggestCalendarDateRangesFromConstraints={
                suggestCalendarDateRangesFromConstraints
              }
            />
          </div>
          <div ref={activeQuestionsRef} className="px-1">
            <ActiveBifrostFormQuestions
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
              setBifrostFormQuestionIdsWithValidResponses={({
                bifrostFormQuestionIdsWithValidResponses,
              }: {
                bifrostFormQuestionIdsWithValidResponses: string[];
              }) => {
                setBifrostFormQuestionIdsWithValidResponses(
                  (
                    previousBifrostFormQuestionIdsWithValidResponses: string[]
                  ): string[] => {
                    if (
                      deepEqual(
                        bifrostFormQuestionIdsWithValidResponses,
                        previousBifrostFormQuestionIdsWithValidResponses
                      )
                    ) {
                      return previousBifrostFormQuestionIdsWithValidResponses;
                    }
                    return bifrostFormQuestionIdsWithValidResponses;
                  }
                );
              }}
              setBifrostFormQuestionIdsRespondedTo={({
                bifrostFormQuestionIdsRespondedTo,
              }: {
                bifrostFormQuestionIdsRespondedTo: string[];
              }) => {
                setBifrostFormQuestionIdsRespondedTo(
                  (
                    previousBifrostFormQuestionIdsRespondedTo: string[]
                  ): string[] => {
                    if (
                      deepEqual(
                        bifrostFormQuestionIdsRespondedTo,
                        previousBifrostFormQuestionIdsRespondedTo
                      )
                    ) {
                      return previousBifrostFormQuestionIdsRespondedTo;
                    }
                    return bifrostFormQuestionIdsRespondedTo;
                  }
                );
              }}
              suggestCalendarDateRangesFromConstraints={
                suggestCalendarDateRangesFromConstraints
              }
            />
          </div>
          {/* Spacer div */}
          <div ref={spacerRef} />
        </div>
      </div>

      <div className="flex justify-end flex-shrink-0 p-4">
        <NavigationButton
          onClick={async () => {
            await handleSubmitBifrostFormQuestion();
          }}
          isEnabled={
            activeBifrostFormQuestionsWithResponses.length > 0 &&
            bifrostFormQuestionIdsWithValidResponses.length > 0 &&
            activeBifrostFormQuestionsWithResponses.length ===
              bifrostFormQuestionIdsWithValidResponses.length &&
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
          }
        >
          Next {">"}
        </NavigationButton>
      </div>
    </div>
  );
}
