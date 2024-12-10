import React, { useState, useEffect, useRef } from "react";
import { BifrostFormQuestionWithResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import { PendingItineraryPlannerHeader } from "@/components/bifrostForm/PendingItineraryPlanner/components/PendingItineraryPlannerHeader";
import { RenderablePendingItinerary } from "@/components/bifrostForm/PendingItineraryPlanner/models/RenderablePendingItinerary";
import { BifrostFormInteractionHistory } from "@/components/bifrostForm/BifrostFormInteractionHistory";
import { NavigationButton } from "@/components/atoms/NavigationButton";
import { deepEqual } from "@/utilities/core/deepEqual";
import { ActiveBifrostFormQuestions } from "@/components/bifrostForm/ActiveBifrostFormQuestions";

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
}

export function BifrostFormInteractiveLoopScreen({
  historicalBifrostFormQuestionsWithResponses,
  activeBifrostFormQuestionsWithResponses,
  renderablePendingItinerary,
  setBifrostFormQuestionWithResponse,
  submitBifrostFormQuestion,
}: BifrostFormInteractiveLoopScreenProps) {
  const [allResponsesAreValid, setAllResponsesAreValid] = useState(false);
  const [
    bifrostFormQuestionIdsRespondedTo,
    setBifrostFormQuestionIdsRespondedTo,
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
      allResponsesAreValid &&
      activeBifrostFormQuestionsWithResponses.length > 0 &&
      bifrostFormQuestionIdsRespondedTo.length ===
        activeBifrostFormQuestionsWithResponses.length &&
      activeBifrostFormQuestionsWithResponses.every(
        (activeBifrostFormQuestionWithResponse) => {
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
    allResponsesAreValid,
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

    console.log(
      `activeBifrostFormQuestionsWithResponses: ${JSON.stringify(
        activeBifrostFormQuestionsWithResponses,
        null,
        4
      )}`
    );
    console.log(`allResponsesAreValid: ${allResponsesAreValid}`);

    if (
      allResponsesAreValid &&
      activeBifrostFormQuestionsWithResponses.length > 0 &&
      bifrostFormQuestionIdsRespondedTo.length ===
        activeBifrostFormQuestionsWithResponses.length &&
      activeBifrostFormQuestionsWithResponses.every(
        (activeBifrostFormQuestionWithResponse) => {
          return bifrostFormQuestionIdsRespondedTo.includes(
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
        <PendingItineraryPlannerHeader
          renderablePendingItinerary={renderablePendingItinerary}
        />
      </div>

      <div className="flex-grow overflow-y-auto min-h-0" ref={scrollableRef}>
        {/* Inner Container */}
        <div className="space-y-4 p-4">
          <BifrostFormInteractionHistory
            bifrostFormQuestionsWithResponses={
              historicalBifrostFormQuestionsWithResponses
            }
            setBifrostFormQuestionWithResponse={() => {}}
          />
          <div ref={activeQuestionsRef}>
            <ActiveBifrostFormQuestions
              activeBifrostFormQuestionsWithResponses={
                activeBifrostFormQuestionsWithResponses
              }
              setBifrostFormQuestionWithResponse={
                setBifrostFormQuestionWithResponse
              }
              setAreAllResponsesValid={({
                areAllResponsesValid,
              }: {
                areAllResponsesValid: boolean;
              }) => {
                setAllResponsesAreValid(areAllResponsesValid);
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
            allResponsesAreValid &&
            bifrostFormQuestionIdsRespondedTo.length ===
              activeBifrostFormQuestionsWithResponses.length &&
            activeBifrostFormQuestionsWithResponses.every(
              (activeBifrostFormQuestionWithResponse) => {
                return bifrostFormQuestionIdsRespondedTo.includes(
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
