import { KismetHeader } from "@/components/atoms";
import React, { useState } from "react";
import { BifrostFormQuestionWithResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import { ActiveBifrostFormQuestions } from "@/components/bifrostForm/ActiveBifrostFormQuestions";
import { NavigationButton } from "@/components/atoms/NavigationButton";

export interface BifrostFormLaunchScreenProps {
  bifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
  setBifrostFormQuestionWithResponse: ({
    updatedBifrostFormQuestionWithResponse,
  }: {
    updatedBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
  }) => void;
  handleProgressForward: () => void;
}

export function BifrostFormLaunchScreen({
  bifrostFormQuestionsWithResponses,
  setBifrostFormQuestionWithResponse,
  handleProgressForward,
}: BifrostFormLaunchScreenProps) {
  const [allResponsesAreValid, setAllResponsesAreValid] = useState(false);

  return (
    <div>
      <div className="mb-3">
        <KismetHeader>Get started creating your custom itinerary</KismetHeader>
      </div>
      <div>
        <ActiveBifrostFormQuestions
          bifrostFormQuestionsWithResponses={bifrostFormQuestionsWithResponses}
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
