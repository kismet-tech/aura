import { FormField } from "@/components/atoms/forms/FormField";
import { FormLabel } from "@/components/atoms/forms/FormLabel";
import { KismetInput } from "@/components/atoms/KismetInput";
import {
  EitherResponse,
  isUrlValid,
  IsUrlValidErrorReason,
} from "@kismet_ai/foundation";
import React, { useEffect, useState } from "react";

interface MultiStageReasonForTravelQuestionWebsiteUrlInputProps {
  value: string;
  setValue: ({ updatedValue }: { updatedValue: string }) => void;
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

export function MultiStageReasonForTravelQuestionWebsiteUrlInput({
  value,
  setValue,
  setIsResponseValid,
  setHasQuestionBeenRespondedTo,
}: MultiStageReasonForTravelQuestionWebsiteUrlInputProps) {
  const inputId = `TextInputBifrostFormMultiStageReasonForTravelQuestionWebsiteUrlInput`;

  const [isFocused, setIsFocused] = useState(false);
  const [isLocallyValid, setIsLocallyValid] = useState(false);

  useEffect(() => {
    async function checkForValidUrl(value: string) {
      const isUrlValidResponse: EitherResponse<boolean, IsUrlValidErrorReason> =
        await isUrlValid({
          url: value,
        });

      if ("error" in isUrlValidResponse) {
        setIsLocallyValid(false);
        setIsResponseValid({ isResponseValid: false });
        setHasQuestionBeenRespondedTo({ hasQuestionBeenRespondedTo: false });
      } else {
        setIsLocallyValid(true);
        setIsResponseValid({ isResponseValid: true });
        setHasQuestionBeenRespondedTo({ hasQuestionBeenRespondedTo: true });
      }
    }

    checkForValidUrl(value);
  }, [value, setIsLocallyValid, setIsResponseValid]);

  useEffect(() => {
    setIsResponseValid({
      isResponseValid: value !== "",
    });

    setHasQuestionBeenRespondedTo({
      hasQuestionBeenRespondedTo: !!value && !isFocused,
    });

    return () => {
      setIsResponseValid({ isResponseValid: true });
      setHasQuestionBeenRespondedTo({ hasQuestionBeenRespondedTo: true });
    };
  }, [value, isFocused, setIsResponseValid, setHasQuestionBeenRespondedTo]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ updatedValue: event.target.value });

    setIsResponseValid({ isResponseValid: event.target.value !== "" });
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <FormField>
      <div className="flex items-center">
        <KismetInput
          onChange={handleOnChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          type={"text"}
          id={inputId}
          placeholder={""}
          value={value}
        />

        {/* <button
          type="button"
          className={`ml-2 p-2 border border-black rounded-[12px] ${
            isLocallyValid ? "bg-black text-white" : "bg-transparent text-black"
          }`}
        >
          ✓
        </button>
        <button
          type="button"
          className={`ml-2 p-2 border border-black rounded-[12px] ${
            isLocallyValid ? "bg-transparent text-black" : "bg-black text-white"
          }`}
        >
          ✕
        </button> */}
      </div>

      <div className="gap-8">
        <FormLabel htmlFor={inputId}>Website</FormLabel>
      </div>
    </FormField>
  );
}
