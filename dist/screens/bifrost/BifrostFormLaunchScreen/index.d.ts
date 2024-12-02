import React from "react";
import { BifrostFormQuestionWithResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionWithResponse";
export interface BifrostFormLaunchScreenProps {
    bifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
    setBifrostFormQuestionWithResponse: ({ updatedBifrostFormQuestionWithResponse, }: {
        updatedBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
    }) => void;
    handleProgressForward: () => void;
}
export declare function BifrostFormLaunchScreen({ bifrostFormQuestionsWithResponses, setBifrostFormQuestionWithResponse, handleProgressForward, }: BifrostFormLaunchScreenProps): React.JSX.Element;
