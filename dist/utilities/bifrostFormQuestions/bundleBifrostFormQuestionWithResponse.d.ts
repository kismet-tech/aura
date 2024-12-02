import { BifrostFormQuestion } from "@/models";
import { BifrostFormQuestionWithResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionWithResponse";
interface BundleBifrostFormQuestionWithResponseProps {
    bifrostFormQuestion: BifrostFormQuestion;
}
export declare const bundleBifrostFormQuestionWithResponse: ({ bifrostFormQuestion, }: BundleBifrostFormQuestionWithResponseProps) => {
    bifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
};
export {};
