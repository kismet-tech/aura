import { BifrostChatText } from "@/components/atoms/BifrostChatText";
import React from "react";
import { KismetChatHistoryMessage } from "../../KismetChatHistoryMessage";
import { GuestChatHistoryMessage } from "../../GuestChatHistoryMessage";
import { BifrostTextAreaFormQuestionWithTextResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";

export interface TextAreaInputBifrostFormQuestionChatHistoryElementProps {
  guestFirstName: string;
  bifrostTextAreaFormQuestionWithTextResponse: BifrostTextAreaFormQuestionWithTextResponse;
  onClick: () => void;
}

export function TextAreaInputBifrostFormQuestionChatHistoryElement({
  guestFirstName,
  bifrostTextAreaFormQuestionWithTextResponse,
  onClick,
}: TextAreaInputBifrostFormQuestionChatHistoryElementProps) {
  return (
    <div onClick={onClick}>
      <KismetChatHistoryMessage>
        <BifrostChatText>
          {
            bifrostTextAreaFormQuestionWithTextResponse.bifrostFormQuestion
              .chatLabel
          }
        </BifrostChatText>
      </KismetChatHistoryMessage>

      <GuestChatHistoryMessage guestName={guestFirstName}>
        <BifrostChatText>
          <div>
            {
              bifrostTextAreaFormQuestionWithTextResponse.responseData
                .responseValue
            }
          </div>
        </BifrostChatText>
      </GuestChatHistoryMessage>
    </div>
  );
}
