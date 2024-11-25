import React from "react";
import { BifrostFormQuestionWithResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";
interface MockBifrostFormStateProviderProps {
    mockActiveBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
    children: React.ReactNode;
}
export declare const MockBifrostFormStateProvider: React.MemoExoticComponent<({ mockActiveBifrostFormQuestionsWithResponses, children, }: MockBifrostFormStateProviderProps) => React.JSX.Element>;
export {};
