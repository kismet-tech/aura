import { BifrostApiInterface } from "@/apis/bifrostApi/models";
import { BifrostFormQuestionWithResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import { handleSetActiveBifrostFormQuestionsWithResponses } from "./handleSetActiveBifrostFormQuestionsWithResponses";
import { BifrostFormApplicationStage } from "../models/BifrostFormApplicationStage";
import { useReactStateCache } from "@/utilities/core/react/useReactStateCache";

interface HandleBeginUserSessionProps {
  setBifrostFormApplicationStage: React.Dispatch<
    React.SetStateAction<BifrostFormApplicationStage>
  >;

  bifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];

  setBifrostFormQuestionsWithResponses: React.Dispatch<
    React.SetStateAction<BifrostFormQuestionWithResponse[]>
  >;

  setActiveBifrostFormQuestionIds: React.Dispatch<
    React.SetStateAction<string[]>
  >;

  setUserSessionId: React.Dispatch<React.SetStateAction<string | undefined>>;
  hotelId: string;
  bifrostApi: BifrostApiInterface;
}

export const handleBeginUserSession = async ({
  setBifrostFormApplicationStage,
  bifrostFormQuestionsWithResponses,

  setBifrostFormQuestionsWithResponses,
  setActiveBifrostFormQuestionIds,

  setUserSessionId,
  hotelId,
  bifrostApi,
}: HandleBeginUserSessionProps): Promise<void> => {
  const { userSessionId, nextQuestionWithResponse } =
    await bifrostApi.createUserSessionFromBifrost({
      hotelId,
      bifrostFormQuestionsWithResponses,
    });

  setBifrostFormApplicationStage(
    () => BifrostFormApplicationStage.INTERACTIVE_LOOP_SCREEN
  );

  console.log(`userSessionId: ${userSessionId}`);
  setUserSessionId(() => userSessionId);

  setBifrostFormQuestionsWithResponses(
    (
      previousBifrostFormQuestionWithResponses: BifrostFormQuestionWithResponse[]
    ) => {
      const updatedBifrostFormQuestionWithResponses: BifrostFormQuestionWithResponse[] =
        [...previousBifrostFormQuestionWithResponses, nextQuestionWithResponse];
      return useReactStateCache({
        previousValue: previousBifrostFormQuestionWithResponses,
        updatedValue: updatedBifrostFormQuestionWithResponses,
      });
    }
  );

  setActiveBifrostFormQuestionIds([
    nextQuestionWithResponse.bifrostFormQuestion.bifrostFormQuestionId,
  ]);

  // .then(
  //   ({
  //     userSessionId,
  //     nextQuestionWithResponse,
  //   }: {
  //     userSessionId: string;
  //     nextQuestionWithResponse: BifrostFormQuestionWithResponse;
  //   }) => {
  //     // console.log(
  //     //   `nextQuestionWithResponse: ${JSON.stringify(
  //     //     nextQuestionWithResponse,
  //     //     null,
  //     //     4
  //     //   )}`
  //     // );
  //     console.log(`userSessionId: ${userSessionId}`);
  //     setUserSessionId(userSessionId);
  //     // setBifrostFormQuestionsWithResponses(
  //     //   (
  //     //     previousBifrostFormQuestionWithResponses: BifrostFormQuestionWithResponse[]
  //     //   ) => {
  //     //     const updatedBifrostFormQuestionWithResponses: BifrostFormQuestionWithResponse[] =
  //     //       [
  //     //         // ...previousBifrostFormQuestionWithResponses,
  //     //         nextQuestionWithResponse,
  //     //       ];
  //     //     return useReactStateCache({
  //     //       previousValue: previousBifrostFormQuestionWithResponses,
  //     //       updatedValue: updatedBifrostFormQuestionWithResponses,
  //     //     });
  //     //   }
  //     // );
  //     // setActiveBifrostFormQuestionIds([
  //     //   nextQuestionWithResponse.bifrostFormQuestion.bifrostFormQuestionId,
  //     // ]);
  //     // // handleSetActiveBifrostFormQuestionsWithResponses({
  //     // //   updatedActiveBifrostFormQuestionsWithResponses: [
  //     // //     nextQuestionWithResponse,
  //     // //   ],
  //     // //   setBifrostFormQuestionsWithResponses,
  //     // //   setActiveBifrostFormQuestionIds,
  //     // // });
  //     setBifrostFormApplicationStage(
  //       BifrostFormApplicationStage.INTERACTIVE_LOOP_SCREEN
  //     );
  // }
  // );
};
