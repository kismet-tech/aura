import { BifrostFormQuestionWithResponse } from "@kismet_ai/foundation";
import React from "react";
import { BifrostFormQuestionChatHistoryElement } from "./bifrostFormQuestionsInChatHistory/BifrostFormQuestionChatHistoryElement";

export interface BifrostFormChatHistoryProps {
  guestFirstName: string;
  bifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
}

export function BifrostFormChatHistory({
  guestFirstName,
  bifrostFormQuestionsWithResponses,
}: BifrostFormChatHistoryProps) {
  return (
    <div>
      {bifrostFormQuestionsWithResponses.map(
        (bifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse) => {
          return (
            <div className="pb-10">
              <BifrostFormQuestionChatHistoryElement
                key={
                  bifrostFormQuestionWithResponse.bifrostFormQuestion
                    .bifrostFormQuestionId
                }
                guestFirstName={guestFirstName}
                bifrostFormQuestionWithResponse={
                  bifrostFormQuestionWithResponse
                }
                onClick={() => {}}
              />
            </div>
          );
        }
      )}
    </div>
  );
}
