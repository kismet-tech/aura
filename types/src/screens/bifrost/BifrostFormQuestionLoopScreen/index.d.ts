import React from "react";
import { BifrostFormQuestionWithResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";
export interface BifrostFormQuestionLoopScreenProps {
    bifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
    setBifrostFormQuestionWithResponse: ({ updatedBifrostFormQuestionWithResponse, }: {
        updatedBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
    }) => void;
    handleProgressForward: () => void;
}
export declare function BifrostFormQuestionLoopScreen({ bifrostFormQuestionsWithResponses, setBifrostFormQuestionWithResponse, handleProgressForward, }: BifrostFormQuestionLoopScreenProps): React.JSX.Element;
