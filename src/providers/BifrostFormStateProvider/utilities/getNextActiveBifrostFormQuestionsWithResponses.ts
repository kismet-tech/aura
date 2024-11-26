import {
  mockBifrostFormQuestionWithTextResponseFour,
  mockBifrostFormQuestionWithTextResponseTwo,
} from "@/mockData/bifrost/bifrostFormQuestions/mockBifrostFormQuestionWithResponses";
import { BifrostFormQuestionWithResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";

interface GetNextActiveBifrostFormQuestionsWithResponsesProps {}

export const getNextActiveBifrostFormQuestionsWithResponses = async (): Promise<
  BifrostFormQuestionWithResponse[]
> => {
  return [
    mockBifrostFormQuestionWithTextResponseTwo,
    mockBifrostFormQuestionWithTextResponseFour,
  ];
};
