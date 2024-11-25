import React from "react";
import { BifrostFormQuestionWithResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";
export interface BifrostFormEntryPageProps {
    bifrostFormQuestionWithResponses: BifrostFormQuestionWithResponse[];
    setBifrostFormQuestionWithResponse: ({ bifrostFormQuestionWithResponse, }: {
        bifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
    }) => void;
    handleProgressForward: () => void;
}
export declare function BifrostFormEntryPage({ bifrostFormQuestionWithResponses, setBifrostFormQuestionWithResponse, handleProgressForward, }: BifrostFormEntryPageProps): React.JSX.Element;
