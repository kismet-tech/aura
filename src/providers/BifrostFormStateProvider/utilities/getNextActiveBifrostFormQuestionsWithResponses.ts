import {
  mockBifrostFormQuestionWithTextResponseFour,
  mockBifrostFormQuestionWithTextResponseTwo,
} from "@/mockData/bifrost/bifrostFormQuestions/mockBifrostFormQuestionWithResponses";
import { BifrostFormQuestionWithResponse } from "@kismet_ai/foundation";

interface GetNextActiveBifrostFormQuestionsWithResponsesProps {}

export const getNextActiveBifrostFormQuestionsWithResponses = async (): Promise<
  BifrostFormQuestionWithResponse[]
> => {
  return [
    mockBifrostFormQuestionWithTextResponseTwo,
    mockBifrostFormQuestionWithTextResponseFour,
  ];
};
