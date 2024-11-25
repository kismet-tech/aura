import { BifrostFormQuestionWithResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import { BifrostFormApplicationStage } from "../models/BifrostFormApplicationStage";
import { getNextActiveBifrostFormQuestionsWithResponses } from "../utilities/getNextActiveBifrostFormQuestionsWithResponses";
import { handleSetActiveBifrostFormQuestionsWithResponses } from "./handleSetActiveBifrostFormQuestionsWithResponses";

interface HandleProgressToNextBifrostFormApplicationStageProps {
  setBifrostFormApplicationStage: React.Dispatch<
    React.SetStateAction<BifrostFormApplicationStage>
  >;
  setActiveBifrostFormQuestionIds: React.Dispatch<
    React.SetStateAction<string[]>
  >;
  setBifrostFormQuestionsWithResponses: React.Dispatch<
    React.SetStateAction<BifrostFormQuestionWithResponse[]>
  >;
}

export const handleProgressToNextBifrostFormApplicationStage = ({
  setBifrostFormApplicationStage,
  setActiveBifrostFormQuestionIds,
  setBifrostFormQuestionsWithResponses,
}: HandleProgressToNextBifrostFormApplicationStageProps) => {
  getNextActiveBifrostFormQuestionsWithResponses();

  setBifrostFormApplicationStage((previousBifrostFormApplicationStage) => {
    let updatedBifrostFormApplicationStage =
      previousBifrostFormApplicationStage;

    if (
      previousBifrostFormApplicationStage ===
      BifrostFormApplicationStage.LAUNCH_SCREEN
    ) {
      updatedBifrostFormApplicationStage =
        BifrostFormApplicationStage.QUESTION_LOOP_SCREEN;
    } else if (
      previousBifrostFormApplicationStage ===
      BifrostFormApplicationStage.QUESTION_LOOP_SCREEN
    ) {
      updatedBifrostFormApplicationStage =
        BifrostFormApplicationStage.ITINERARY_OFFER_PRESENTATION_SCREEN;
    }

    if (
      [
        BifrostFormApplicationStage.LAUNCH_SCREEN,
        BifrostFormApplicationStage.QUESTION_LOOP_SCREEN,
      ].includes(previousBifrostFormApplicationStage)
    ) {
      getNextActiveBifrostFormQuestionsWithResponses().then(
        (
          nextActiveBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[]
        ) => {
          console.log(`REQUESTING TO PROGRESS TO NEXT STAGE OUTER`);
          console.log(
            JSON.stringify(
              {
                nextActiveBifrostFormQuestionsWithResponses,
              },
              null,
              4
            )
          );

          handleSetActiveBifrostFormQuestionsWithResponses({
            updatedActiveBifrostFormQuestionsWithResponses:
              nextActiveBifrostFormQuestionsWithResponses,
            setBifrostFormQuestionsWithResponses,
            setActiveBifrostFormQuestionIds,
          });
        }
      );
    }

    return updatedBifrostFormApplicationStage;
  });
};
