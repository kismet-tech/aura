import {
  BifrostFormQuestionMultiStageReasonForTravelResponseValue,
  RenderableMultiStageReasonForTravelBifrostFormQuestion,
  ReservedBifrostReasonForTravelOptionValues,
} from "@kismet_ai/foundation";
import React from "react";
import { MultiStageReasonForTravelQuestionReasonForTravelCategorySelector } from "./MultiStageReasonForTravelQuestionReasonForTravelCategorySelector";
import { MultiStageReasonForTravelQuestionCompanyNameInput } from "./MultiStageReasonForTravelQuestionCompanyNameInput";
import { MultiStageReasonForTravelQuestionWebsiteUrlInput } from "./MultiStageReasonForTravelQuestionWebsiteUrlInput";

export interface MultiStageReasonForTravelQuestionProps {
  renderableMultiStageReasonForTravelBifrostFormQuestion: RenderableMultiStageReasonForTravelBifrostFormQuestion;
  value: BifrostFormQuestionMultiStageReasonForTravelResponseValue;
  setValue: ({
    updatedValue,
  }: {
    updatedValue: BifrostFormQuestionMultiStageReasonForTravelResponseValue;
  }) => void;
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

export function MultiStageReasonForTravelQuestion({
  value,
  setValue,
  setIsResponseValid,
  setHasQuestionBeenRespondedTo,
}: MultiStageReasonForTravelQuestionProps) {
  const reasonForTravelCategoryQuestion: React.JSX.Element = (
    <MultiStageReasonForTravelQuestionReasonForTravelCategorySelector
      value={value.reasonForTravel}
      setValue={({
        updatedValue,
      }: {
        updatedValue: ReservedBifrostReasonForTravelOptionValues | undefined;
      }) => {
        if (
          updatedValue !== undefined &&
          updatedValue !== ReservedBifrostReasonForTravelOptionValues.BUSINESS
        ) {
          setIsResponseValid({
            isResponseValid: true,
          });
          setHasQuestionBeenRespondedTo({
            hasQuestionBeenRespondedTo: true,
          });
        }

        setValue({
          updatedValue: {
            ...value,
            reasonForTravel: updatedValue,
          },
        });
      }}
    />
  );

  const companyNameQuestion: React.JSX.Element =
    value.reasonForTravel ===
    ReservedBifrostReasonForTravelOptionValues.BUSINESS ? (
      <MultiStageReasonForTravelQuestionCompanyNameInput
        value={value.companyName || ""}
        setValue={({ updatedValue }: { updatedValue: string }) => {
          setValue({
            updatedValue: {
              ...value,
              companyName: updatedValue,
            },
          });
        }}
        setIsResponseValid={({
          isResponseValid,
        }: {
          isResponseValid: boolean;
        }) => {}}
        setHasQuestionBeenRespondedTo={({
          hasQuestionBeenRespondedTo,
        }: {
          hasQuestionBeenRespondedTo: boolean;
        }) => {}}
      />
    ) : (
      <></>
    );

  const websiteUrlQuestion: React.JSX.Element =
    value.reasonForTravel ===
      ReservedBifrostReasonForTravelOptionValues.BUSINESS &&
    value.companyName &&
    value.companyName.length > 0 ? (
      <MultiStageReasonForTravelQuestionWebsiteUrlInput
        value={value.websiteUrl || ""}
        setValue={({ updatedValue }: { updatedValue: string }) => {
          setValue({
            updatedValue: {
              ...value,
              websiteUrl: updatedValue,
            },
          });
        }}
        setIsResponseValid={({
          isResponseValid,
        }: {
          isResponseValid: boolean;
        }) => {
          setIsResponseValid({
            isResponseValid,
          });
        }}
        setHasQuestionBeenRespondedTo={({
          hasQuestionBeenRespondedTo,
        }: {
          hasQuestionBeenRespondedTo: boolean;
        }) => {
          setHasQuestionBeenRespondedTo({
            hasQuestionBeenRespondedTo,
          });
        }}
      />
    ) : (
      <></>
    );

  return (
    <div>
      <div>{reasonForTravelCategoryQuestion}</div>
      <div className="pt-5">{companyNameQuestion}</div>
      <div className="pt-5">{websiteUrlQuestion}</div>
    </div>
  );
}
