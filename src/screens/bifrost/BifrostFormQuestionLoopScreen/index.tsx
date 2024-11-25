import React, { useState } from "react";
import { BifrostFormQuestionWithResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import { ActiveBifrostFormQuestions } from "@/components/bifrostForm/ActiveBifrostFormQuestions";
import { NavigationButton } from "@/components/atoms/NavigationButton";

export interface BifrostFormQuestionLoopScreenProps {
  bifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
  setBifrostFormQuestionWithResponse: ({
    updatedBifrostFormQuestionWithResponse,
  }: {
    updatedBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
  }) => void;
  handleProgressForward: () => void;
}

export function BifrostFormQuestionLoopScreen({
  bifrostFormQuestionsWithResponses,
  setBifrostFormQuestionWithResponse,
  handleProgressForward,
}: BifrostFormQuestionLoopScreenProps) {
  const [allResponsesAreValid, setAllResponsesAreValid] = useState(false);

  return (
    <div>
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
