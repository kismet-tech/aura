import React, { useEffect, useState } from "react";
import { RenderableSplitTextInputBifrostFormQuestion } from "@/models/BifrostFormQuestions/BifrostFormQuestion";
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
}

export function SplitTextInputBifrostFormQuestion({
  renderableSplitTextInputBifrostFormQuestion,
  leftValue,
  setLeftValue,
  rightValue,
  setRightValue,
  setIsResponseValid,
}: SplitTextInputBifrostFormQuestionProps) {
  const [isLeftResponseValid, setIsLeftResponseValid] = useState(true);
  const [isRightResponseValid, setIsRightResponseValid] = useState(true);

  useEffect(() => {
    if (!isLeftResponseValid || !isRightResponseValid) {
      setIsResponseValid({ isResponseValid: false });
    } else {
      setIsResponseValid({ isResponseValid: true });
    }
  }, [isLeftResponseValid, isRightResponseValid, setIsResponseValid]);

  useEffect(() => {
    // Cleanup function to set `isValid` to true on unmount
    return () => {
      setIsResponseValid({ isResponseValid: true });
    };
  }, [setIsResponseValid]);

  return (
    <div>
      <KismetSectionHeader>
        {renderableSplitTextInputBifrostFormQuestion.label}
      </KismetSectionHeader>

      <div className="flex flex-wrap gap-4 [&>*]:flex-1">
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
        />
      </div>
    </div>
  );
}
