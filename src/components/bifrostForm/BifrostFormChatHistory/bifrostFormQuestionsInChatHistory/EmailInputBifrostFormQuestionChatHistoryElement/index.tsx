import { BifrostChatText } from "@/components/atoms/BifrostChatText";
import React from "react";
import { KismetChatHistoryMessage } from "../../KismetChatHistoryMessage";
import { GuestChatHistoryMessage } from "../../GuestChatHistoryMessage";
import { BifrostFormQuestionWithEmailResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";

export interface EmailInputBifrostFormQuestionChatHistoryElementProps {
  guestFirstName: string;
  bifrostFormQuestionWithEmailResponse: BifrostFormQuestionWithEmailResponse;
  onClick: () => void;
}

export function EmailInputBifrostFormQuestionChatHistoryElement({
  guestFirstName,
  bifrostFormQuestionWithEmailResponse,
  onClick,
}: EmailInputBifrostFormQuestionChatHistoryElementProps) {
  return (
    <div onClick={onClick}>
      <KismetChatHistoryMessage>
        <BifrostChatText>
          {bifrostFormQuestionWithEmailResponse.bifrostFormQuestion.chatLabel}
        </BifrostChatText>
      </KismetChatHistoryMessage>

      <GuestChatHistoryMessage guestName={guestFirstName}>
        <BifrostChatText>
          <div>
            {bifrostFormQuestionWithEmailResponse.responseData.responseValue}
          </div>
        </BifrostChatText>
      </GuestChatHistoryMessage>
    </div>
  );
}
