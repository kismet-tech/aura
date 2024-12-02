import { BifrostFormQuestionResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionResponse";
import { BifrostFormQuestionWithResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import React, { useCallback, useEffect, useState } from "react";
import {
  RenderedBifrostFormQuestion,
  RenderedBifrostFormQuestionProps,
} from "../bifrostFormQuestions/RenderedBifrostFormQuestion";
import { updateBifrostFormQuestionWithResponse } from "@/utilities/bifrostFormQuestions/updateBifrostFormQuestionWithResponse";
import { deepEqual } from "@/utilities/core/deepEqual";

export interface ActiveBifrostFormQuestionsProps {
  bifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
  setBifrostFormQuestionWithResponse: ({
    updatedBifrostFormQuestionWithResponse,
  }: {
    updatedBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
  }) => void;
  setAreAllResponsesValid: ({
    areAllResponsesValid,
  }: {
    areAllResponsesValid: boolean;
  }) => void;
}

const MemoizedRenderedBifrostFormQuestion = React.memo(
  RenderedBifrostFormQuestion,
  (
    prevProps: Readonly<RenderedBifrostFormQuestionProps>,
    nextProps: Readonly<RenderedBifrostFormQuestionProps>
  ): boolean => deepEqual(prevProps, nextProps)
);

export function ActiveBifrostFormQuestions({
  bifrostFormQuestionsWithResponses,
  setBifrostFormQuestionWithResponse,
  setAreAllResponsesValid,
}: ActiveBifrostFormQuestionsProps) {
  const [questionValidities, setQuestionValidities] = useState<boolean[]>(
    Array(bifrostFormQuestionsWithResponses.length).fill(true)
  );

  const areAllFormQuestionResponsesValid = questionValidities.every(
    (isValid) => isValid
  );

  useEffect(() => {
    setAreAllResponsesValid({
      areAllResponsesValid: areAllFormQuestionResponsesValid,
    });
  }, [areAllFormQuestionResponsesValid, setAreAllResponsesValid]);

  const handleSetIsResponseValid = useCallback(
    ({
      index,
      isResponseValid,
    }: {
      index: number;
      isResponseValid: boolean;
    }) => {
      setQuestionValidities((prevValidities) => {
        const newValidities = [...prevValidities];
        newValidities[index] = isResponseValid;

        if (deepEqual(prevValidities, newValidities)) {
          return prevValidities;
        }

        return newValidities;
      });
    },
    []
  );

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
                setIsResponseValid={({
                  isResponseValid,
                }: {
                  isResponseValid: boolean;
                }) => handleSetIsResponseValid({ index, isResponseValid })}
              />
            </div>
          );
        }
      )}
    </>
  );
}
