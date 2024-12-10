import React from "react";
import { BifrostFormQuestionWithResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionWithResponse";
export interface BifrostFormLaunchScreenProps {
    activeBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
    setBifrostFormQuestionWithResponse: ({ updatedBifrostFormQuestionWithResponse, }: {
        updatedBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
    }) => void;
    handleProgressForward: () => void;
}
export declare function BifrostFormLaunchScreen({ activeBifrostFormQuestionsWithResponses, setBifrostFormQuestionWithResponse, handleProgressForward, }: BifrostFormLaunchScreenProps): React.JSX.Element;
