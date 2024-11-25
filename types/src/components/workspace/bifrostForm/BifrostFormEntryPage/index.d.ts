import React from "react";
import { BifrostFormQuestionWithResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";
export interface BifrostFormEntryPageProps {
    bifrostFormQuestionWithResponses: BifrostFormQuestionWithResponse[];
    handleProgressForward: () => void;
}
export declare function BifrostFormEntryPage({ bifrostFormQuestionWithResponses, handleProgressForward, }: BifrostFormEntryPageProps): React.JSX.Element;
