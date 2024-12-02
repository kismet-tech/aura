import { BifrostChatText } from "@/components/atoms/BifrostChatText";
import React from "react";
import { KismetChatHistoryMessage } from "../../KismetChatHistoryMessage";
import { GuestChatHistoryMessage } from "../../GuestChatHistoryMessage";
import { BifrostTextInputFormQuestionWithTextResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionWithResponse";

export interface TextInputBifrostFormQuestionChatHistoryElementProps {
  guestFirstName: string;
  bifrostTextInputFormQuestionWithTextResponse: BifrostTextInputFormQuestionWithTextResponse;
  onClick: () => void;
}

export function TextInputBifrostFormQuestionChatHistoryElement({
  guestFirstName,
  bifrostTextInputFormQuestionWithTextResponse,
  onClick,
}: TextInputBifrostFormQuestionChatHistoryElementProps) {
  return (
    <div onClick={onClick}>
      <KismetChatHistoryMessage>
        <BifrostChatText>
          {
            bifrostTextInputFormQuestionWithTextResponse.bifrostFormQuestion
              .chatLabel
          }
        </BifrostChatText>
      </KismetChatHistoryMessage>

      <GuestChatHistoryMessage guestName={guestFirstName}>
        <BifrostChatText>
          <div>
            {
              bifrostTextInputFormQuestionWithTextResponse.responseData
                .responseValue
            }
          </div>
        </BifrostChatText>
      </GuestChatHistoryMessage>
    </div>
  );
}
