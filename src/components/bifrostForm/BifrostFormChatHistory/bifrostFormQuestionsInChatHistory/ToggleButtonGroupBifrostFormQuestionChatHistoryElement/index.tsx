import { BifrostChatText } from "@/components/atoms/BifrostChatText";
import React from "react";
import { KismetChatHistoryMessage } from "../../KismetChatHistoryMessage";
import { GuestChatHistoryMessage } from "../../GuestChatHistoryMessage";
import { BifrostToggleButtonGroupFormQuestionWithTextResponse } from "@kismet_ai/foundation";

export interface ToggleButtonGroupBifrostFormQuestionChatHistoryElementProps {
  guestFirstName: string;
  bifrostToggleButtonGroupFormQuestionWithTextResponse: BifrostToggleButtonGroupFormQuestionWithTextResponse;
  onClick: () => void;
}

export function ToggleButtonGroupBifrostFormQuestionChatHistoryElement({
  guestFirstName,
  bifrostToggleButtonGroupFormQuestionWithTextResponse,
  onClick,
}: ToggleButtonGroupBifrostFormQuestionChatHistoryElementProps) {
  return (
    <div onClick={onClick}>
      <KismetChatHistoryMessage>
        <BifrostChatText>
          {
            bifrostToggleButtonGroupFormQuestionWithTextResponse
              .bifrostFormQuestion.chatLabel
          }
        </BifrostChatText>
      </KismetChatHistoryMessage>

      <GuestChatHistoryMessage guestName={guestFirstName}>
        <BifrostChatText>
          <div>
            {
              bifrostToggleButtonGroupFormQuestionWithTextResponse.responseData
                .responseValue
            }
          </div>
        </BifrostChatText>
      </GuestChatHistoryMessage>
    </div>
  );
}
