import React, { useEffect } from "react";
import { useBifrostFormState } from "@/providers/BifrostFormStateProvider/useBifrostFormState";
import { BifrostFormQuestionWithResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";

interface MockBifrostFormStateProviderProps {
  mockActiveBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
  children: React.ReactNode;
}

export const MockBifrostFormStateProvider = React.memo(
  ({
    mockActiveBifrostFormQuestionsWithResponses,
    children,
  }: MockBifrostFormStateProviderProps) => {
    const { setActiveBifrostFormQuestionsWithResponses } =
      useBifrostFormState();

    useEffect(() => {
      console.log("MockBifrostFormStateProvider is Rerendering");
      setActiveBifrostFormQuestionsWithResponses({
        updatedActiveBifrostFormQuestionsWithResponses:
          mockActiveBifrostFormQuestionsWithResponses,
      });
    }, [
      mockActiveBifrostFormQuestionsWithResponses,
      setActiveBifrostFormQuestionsWithResponses,
    ]);

    return <>{children}</>;
  }
);
