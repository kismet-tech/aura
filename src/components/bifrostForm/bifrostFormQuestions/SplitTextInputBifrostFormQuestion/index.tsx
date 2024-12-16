import React, { useEffect, useState } from "react";
import { RenderableSplitTextInputBifrostFormQuestion } from "@kismet_ai/foundation";
import { TextInputBifrostFormQuestion } from "../TextInputBifrostFormQuestion";
import { KismetSectionHeader } from "@/components/atoms/KismetSectionHeader";

export interface SplitTextInputBifrostFormQuestionProps {
  renderableSplitTextInputBifrostFormQuestion: RenderableSplitTextInputBifrostFormQuestion;
  leftValue: string;
  setLeftValue: ({ updatedValue }: { updatedValue: string }) => void;
  rightValue: string;
  setRightValue: ({ updatedValue }: { updatedValue: string }) => void;
  setIsResponseValid: ({
    isResponseValid,
  }: {
    isResponseValid: boolean;
  }) => void;
  setHasQuestionBeenRespondedTo: ({
    hasQuestionBeenRespondedTo,
  }: {
    hasQuestionBeenRespondedTo: boolean;
  }) => void;
}

export function SplitTextInputBifrostFormQuestion({
  renderableSplitTextInputBifrostFormQuestion,
  leftValue,
  setLeftValue,
  rightValue,
  setRightValue,
  setIsResponseValid,
  setHasQuestionBeenRespondedTo,
}: SplitTextInputBifrostFormQuestionProps) {
  const [isLeftResponseValid, setIsLeftResponseValid] = useState(true);
  const [isRightResponseValid, setIsRightResponseValid] = useState(true);

  const [hasLeftQuestionBeenRespondedTo, setHasLeftQuestionBeenRespondedTo] =
    useState(false);
  const [hasRightQuestionBeenRespondedTo, setHasRightQuestionBeenRespondedTo] =
    useState(false);

  useEffect(() => {
    if (!isLeftResponseValid || !isRightResponseValid) {
      setIsResponseValid({ isResponseValid: false });
    } else {
      setIsResponseValid({ isResponseValid: true });
    }

    if (!hasLeftQuestionBeenRespondedTo || !hasRightQuestionBeenRespondedTo) {
      setHasQuestionBeenRespondedTo({ hasQuestionBeenRespondedTo: false });
    } else {
      setHasQuestionBeenRespondedTo({ hasQuestionBeenRespondedTo: true });
    }
  }, [
    isLeftResponseValid,
    isRightResponseValid,
    setIsResponseValid,
    hasLeftQuestionBeenRespondedTo,
    hasRightQuestionBeenRespondedTo,
    setHasQuestionBeenRespondedTo,
  ]);

  useEffect(() => {
    // Cleanup function to set `isValid` to true on unmount
    return () => {
      setIsResponseValid({ isResponseValid: true });
      setHasQuestionBeenRespondedTo({ hasQuestionBeenRespondedTo: true });
    };
  }, [setIsResponseValid]);

  return (
    <div>
      <KismetSectionHeader>
        {renderableSplitTextInputBifrostFormQuestion.label}
      </KismetSectionHeader>

      <div className="flex flex-wrap gap-4 [&>*]:flex-1 [&>*]:min-w-[150px]">
        <TextInputBifrostFormQuestion
          renderableTextInputBifrostFormQuestion={
            renderableSplitTextInputBifrostFormQuestion.left
          }
          value={leftValue}
          setValue={setLeftValue}
          setIsResponseValid={({
            isResponseValid,
          }: {
            isResponseValid: boolean;
          }) => {
            setIsLeftResponseValid(isResponseValid);
          }}
          setHasQuestionBeenRespondedTo={({
            hasQuestionBeenRespondedTo,
          }: {
            hasQuestionBeenRespondedTo: boolean;
          }) => {
            setHasLeftQuestionBeenRespondedTo(hasQuestionBeenRespondedTo);
          }}
        />
        <TextInputBifrostFormQuestion
          renderableTextInputBifrostFormQuestion={
            renderableSplitTextInputBifrostFormQuestion.right
          }
          value={rightValue}
          setValue={setRightValue}
          setIsResponseValid={({
            isResponseValid,
          }: {
            isResponseValid: boolean;
          }) => {
            setIsRightResponseValid(isResponseValid);
          }}
          setHasQuestionBeenRespondedTo={({
            hasQuestionBeenRespondedTo,
          }: {
            hasQuestionBeenRespondedTo: boolean;
          }) => {
            setHasRightQuestionBeenRespondedTo(hasQuestionBeenRespondedTo);
          }}
        />
      </div>
    </div>
  );
}
