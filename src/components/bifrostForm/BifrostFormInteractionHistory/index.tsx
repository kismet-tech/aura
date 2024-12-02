import { BifrostFormQuestionWithResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import React, { useCallback } from "react";
import {
  RenderedBifrostFormQuestion,
  RenderedBifrostFormQuestionProps,
} from "../bifrostFormQuestions/RenderedBifrostFormQuestion";
import { deepEqual } from "@/utilities/core/deepEqual";
import { BifrostFormQuestionResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionResponse";
import { updateBifrostFormQuestionWithResponse } from "@/utilities/bifrostFormQuestions/updateBifrostFormQuestionWithResponse";

export interface BifrostFormInteractionHistoryProps {
  bifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
  setBifrostFormQuestionWithResponse: ({
    updatedBifrostFormQuestionWithResponse,
  }: {
    updatedBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
  }) => void;
}

const MemoizedRenderedBifrostFormQuestion = React.memo(
  RenderedBifrostFormQuestion,
  (
    prevProps: Readonly<RenderedBifrostFormQuestionProps>,
    nextProps: Readonly<RenderedBifrostFormQuestionProps>
  ): boolean => deepEqual(prevProps, nextProps)
);

export function BifrostFormInteractionHistory({
  bifrostFormQuestionsWithResponses,
  setBifrostFormQuestionWithResponse,
}: BifrostFormInteractionHistoryProps) {
  const handleSetBifrostFormQuestionResponse = useCallback(
    (
        previousBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse
      ) =>
      ({
        updatedBifrostFormQuestionResponse,
      }: {
        updatedBifrostFormQuestionResponse: BifrostFormQuestionResponse;
      }) => {
        const updatedBifrostFormQuestionWithResponse =
          updateBifrostFormQuestionWithResponse({
            previousBifrostFormQuestionWithResponse,
            updatedBifrostFormQuestionResponse,
          });

        setBifrostFormQuestionWithResponse({
          updatedBifrostFormQuestionWithResponse,
        });
      },
    [bifrostFormQuestionsWithResponses, setBifrostFormQuestionWithResponse]
  );

  return (
    <>
      {bifrostFormQuestionsWithResponses.map(
        (
          bifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse,
          index: number
        ) => {
          return (
            <div
              className="mb-4"
              key={
                bifrostFormQuestionWithResponse.bifrostFormQuestion
                  .bifrostFormQuestionId
              }
            >
              <MemoizedRenderedBifrostFormQuestion
                bifrostFormQuestionWithResponse={
                  bifrostFormQuestionWithResponse
                }
                setBifrostFormQuestionResponse={handleSetBifrostFormQuestionResponse(
                  bifrostFormQuestionWithResponse
                )}
                setIsResponseValid={() => {}}
              />
            </div>
          );
        }
      )}
    </>
  );
}
