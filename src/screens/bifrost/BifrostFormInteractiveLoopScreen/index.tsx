import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  BifrostFormQuestionWithResponse,
  CalendarDateRange,
  HotelBifrostFormMetadata,
} from "@kismet_ai/foundation";
import { RenderablePendingItinerary } from "../../../components/bifrostForm/PendingItineraryPlanner/models/RenderablePendingItinerary";
import { BifrostFormInteractionHistory } from "@/components/bifrostForm/BifrostFormInteractionHistory";
import { NavigationButton } from "@/components/atoms/NavigationButton";
import { deepEqual } from "@/utilities/core/deepEqual";
import { ActiveBifrostFormQuestions } from "@/components/bifrostForm/ActiveBifrostFormQuestions";
import { PendingItineraryPlannerHeaderClosed } from "@/components/bifrostForm/PendingItineraryPlanner/components/PendingItineraryPlannerHeaderClosed";

export interface BifrostFormInteractiveLoopScreenProps {
  bifrostFormMetadata: HotelBifrostFormMetadata;
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
  bifrostFormMetadata,
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

  // QUESTION SCROLLING
  ////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////
  const questionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const scrollToBifrostFormQuestion: ({
    formQuestionId,
  }: {
    formQuestionId: string;
  }) => void = useCallback(({ formQuestionId }: { formQuestionId: string }) => {
    const questionElement = questionRefs.current[formQuestionId];
    if (questionElement) {
      questionElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const onMountBifrostFormQuestion: ({
    bifrostFormQuestionId,
    element,
  }: {
    bifrostFormQuestionId: string;
    element: HTMLDivElement | null;
  }) => void = useCallback(
    ({
      bifrostFormQuestionId,
      element,
    }: {
      bifrostFormQuestionId: string;
      element: HTMLDivElement | null;
    }) => {
      questionRefs.current[bifrostFormQuestionId] = element;
    },
    []
  );

  ////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////

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

  const handleSubmitBifrostFormQuestion = async ({
    forceRequest,
  }: {
    forceRequest: boolean;
  }) => {
    const haveActiveQuestionsChanged = (
      prev: BifrostFormQuestionWithResponse[] | null,
      current: BifrostFormQuestionWithResponse[]
    ): boolean => {
      if (prev === null) return true;

      return !deepEqual(prev, current);
    };

    if (
      forceRequest ||
      (activeBifrostFormQuestionsWithResponses.length > 0 &&
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
        ))
    ) {
      // Update the ref before calling the submit function to prevent multiple calls
      previousActiveQuestionsRef.current =
        activeBifrostFormQuestionsWithResponses;

      console.log("tHIS IS HIT 44");

      await submitBifrostFormQuestion();
    }
  };

  return (
    <div className="flex flex-col flex-1 h-full overflow-hidden">
      {/* Header */}
      <div className="pb-4 flex-shrink-0">
        <PendingItineraryPlannerHeaderClosed
          renderablePendingItinerary={renderablePendingItinerary}
          scrollToBifrostFormQuestion={scrollToBifrostFormQuestion}
        />
      </div>

      <div className="flex-grow overflow-y-auto min-h-0" ref={scrollableRef}>
        {/* Inner Container */}
        <div className="space-y-0 p-0">
          <div className="px-1 py-4">
            <BifrostFormInteractionHistory
              bifrostFormMetadata={bifrostFormMetadata}
              bifrostFormQuestionsWithResponses={
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
              suggestCalendarDateRangesFromConstraints={
                suggestCalendarDateRangesFromConstraints
              }
              onMountBifrostFormQuestion={onMountBifrostFormQuestion}
            />
          </div>
          <div ref={activeQuestionsRef} className="px-1">
            <ActiveBifrostFormQuestions
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
              onMountBifrostFormQuestion={onMountBifrostFormQuestion}
            />
          </div>
          {/* Spacer div */}
          <div ref={spacerRef} />
        </div>
      </div>

      <div className="flex justify-end flex-shrink-0 p-4">
        <NavigationButton
          onClickMoveForward={async () => {
            await handleSubmitBifrostFormQuestion({ forceRequest: true });
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
          moveForwardChildren={<>Next {">"}</>}
          disabledChildren={<>Skip {">"}</>}
        />
      </div>
    </div>
  );
}
