import React, { useState, useEffect, useRef } from "react";
import { BifrostFormQuestionWithResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import { ActiveBifrostFormQuestions } from "@/components/bifrostForm/ActiveBifrostFormQuestions";
import { PendingItineraryPlannerHeader } from "@/components/bifrostForm/PendingItineraryPlanner/components/PendingItineraryPlannerHeader";
import { RenderablePendingItinerary } from "@/components/bifrostForm/PendingItineraryPlanner/models/RenderablePendingItinerary";
import { BifrostFormChatHistory } from "@/components/bifrostForm/BifrostFormChatHistory";

export interface BifrostFormQuestionLoopScreenProps {
  historicalBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
  activeBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
  renderablePendingItinerary: RenderablePendingItinerary;
  setBifrostFormQuestionWithResponse: ({
    updatedBifrostFormQuestionWithResponse,
  }: {
    updatedBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
  }) => void;
}

export function BifrostFormQuestionLoopScreen({
  historicalBifrostFormQuestionsWithResponses,
  activeBifrostFormQuestionsWithResponses,
  renderablePendingItinerary,
  setBifrostFormQuestionWithResponse,
}: BifrostFormQuestionLoopScreenProps) {
  const [allResponsesAreValid, setAllResponsesAreValid] = useState(false);

  // Create a ref for the scrollable content
  const scrollableRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom when the component mounts or when content changes
  useEffect(() => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
    }
  }, [
    historicalBifrostFormQuestionsWithResponses,
    activeBifrostFormQuestionsWithResponses,
  ]);

  return (
    <div className="flex flex-col flex-1 h-full overflow-hidden">
      {/* Header */}
      <div className="pb-4 flex-shrink-0">
        <PendingItineraryPlannerHeader
          renderablePendingItinerary={renderablePendingItinerary}
        />
      </div>

      {/* Scrollable Content */}
      <div className="flex-grow overflow-y-auto min-h-0" ref={scrollableRef}>
        <div className="space-y-4 p-4">
          <BifrostFormChatHistory
            bifrostFormQuestionsWithResponses={
              historicalBifrostFormQuestionsWithResponses
            }
            guestFirstName={renderablePendingItinerary.guestFirstName}
          />
          <BifrostFormChatHistory
            bifrostFormQuestionsWithResponses={
              historicalBifrostFormQuestionsWithResponses
            }
            guestFirstName={renderablePendingItinerary.guestFirstName}
          />
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
      </div>
    </div>
  );
}
