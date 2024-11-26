import { BifrostChatText } from "@/components/atoms/BifrostChatText";
import React from "react";
import { KismetChatHistoryMessage } from "../../KismetChatHistoryMessage";
import { GuestChatHistoryMessage } from "../../GuestChatHistoryMessage";
import { BifrostFormQuestionWithSplitTextResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";

export interface SplitTextInputBifrostFormQuestionChatHistoryElementProps {
  guestFirstName: string;
  bifrostFormQuestionWithSplitTextResponse: BifrostFormQuestionWithSplitTextResponse;
  onClick: () => void;
}

export function SplitTextInputBifrostFormQuestionChatHistoryElement({
  guestFirstName,
  bifrostFormQuestionWithSplitTextResponse,
  onClick,
}: SplitTextInputBifrostFormQuestionChatHistoryElementProps) {
  return (
    <div onClick={onClick}>
      <KismetChatHistoryMessage>
        <BifrostChatText>
          {
            bifrostFormQuestionWithSplitTextResponse.bifrostFormQuestion
              .chatLabel
          }
        </BifrostChatText>
      </KismetChatHistoryMessage>

      <GuestChatHistoryMessage guestName={guestFirstName}>
        <BifrostChatText>
          <div>
            {
              bifrostFormQuestionWithSplitTextResponse.responseData
                .responseValue.left
            }
          </div>
          <div>
            {
              bifrostFormQuestionWithSplitTextResponse.responseData
                .responseValue.right
            }
          </div>
        </BifrostChatText>
      </GuestChatHistoryMessage>
    </div>
  );
}
