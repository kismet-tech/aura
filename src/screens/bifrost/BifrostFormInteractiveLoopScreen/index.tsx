import React, { useState, useEffect, useRef } from "react";
import { BifrostFormQuestionWithResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import { ActiveBifrostFormQuestions } from "@/components/bifrostForm/ActiveBifrostFormQuestions";
import { PendingItineraryPlannerHeader } from "@/components/bifrostForm/PendingItineraryPlanner/components/PendingItineraryPlannerHeader";
import { RenderablePendingItinerary } from "@/components/bifrostForm/PendingItineraryPlanner/models/RenderablePendingItinerary";
import { BifrostFormInteractionHistory } from "@/components/bifrostForm/BifrostFormInteractionHistory";
import { NavigationButton } from "@/components/atoms/NavigationButton";

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

  console.log(`BifrostFormInteractiveLoopScreen`);
  console.log(
    JSON.stringify(
      {
        historicalBifrostFormQuestionsWithResponses,
        activeBifrostFormQuestionsWithResponses,
        renderablePendingItinerary,
      },
      null,
      4
    )
  );

  // Create refs
  const scrollableRef = useRef<HTMLDivElement>(null);
  const activeQuestionsRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);

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
              bifrostFormQuestionsWithResponses={
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
            />
          </div>
          {/* Spacer div */}
          <div ref={spacerRef} />
        </div>
      </div>

      <div className="flex justify-end flex-shrink-0 p-4">
        <NavigationButton
          onClick={async () => {
            await submitBifrostFormQuestion();
          }}
          isEnabled={allResponsesAreValid}
        >
          Next {">"}
        </NavigationButton>
      </div>
    </div>
  );
}
