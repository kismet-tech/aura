import { BifrostApiInterface } from "@/apis/bifrostApi/models";
import { BifrostFormQuestionWithResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import { handleSetActiveBifrostFormQuestionsWithResponses } from "./handleSetActiveBifrostFormQuestionsWithResponses";
import { BifrostFormApplicationStage } from "../models/BifrostFormApplicationStage";
import { useReactStateCache } from "@/utilities/core/react/useReactStateCache";
import { mockRenderableSplitTextInputBifrostFormQuestionOne } from "@/mockData/bifrost/bifrostFormQuestions/mockRenderableBifrostFormQuestions";
import {
  BifrostFormQuestionEmailResponse,
  BifrostFormQuestionPhoneNumberResponse,
  BifrostFormQuestionSplitTextResponse,
} from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionResponse";
import { ReservedBifrostFormQuestionIds } from "@/models/bifrost/BifrostFormQuestions/ReservedBifrostFormQuestionIds";

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
  bifrostTravelerId?: string;
  bifrostApi: BifrostApiInterface;
}

export const handleBeginUserSession = async ({
  setBifrostFormApplicationStage,
  bifrostFormQuestionsWithResponses,

  setBifrostFormQuestionsWithResponses,
  setActiveBifrostFormQuestionIds,

  setUserSessionId,
  hotelId,
  bifrostTravelerId,
  bifrostApi,
}: HandleBeginUserSessionProps): Promise<void> => {
  const splitNameQuestion = bifrostFormQuestionsWithResponses.find(
    (bifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse) => {
      return (
        bifrostFormQuestionWithResponse.bifrostFormQuestion
          .bifrostFormQuestionId ===
        mockRenderableSplitTextInputBifrostFormQuestionOne.bifrostFormQuestionId
      );
    }
  )!;

  const firstName = (
    splitNameQuestion.responseData as BifrostFormQuestionSplitTextResponse
  ).responseValue.left;

  const lastName = (
    splitNameQuestion.responseData as BifrostFormQuestionSplitTextResponse
  ).responseValue.right;

  const emailQuestion = bifrostFormQuestionsWithResponses.find(
    (bifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse) => {
      return (
        bifrostFormQuestionWithResponse.bifrostFormQuestion
          .bifrostFormQuestionId === ReservedBifrostFormQuestionIds.EMAIL
      );
    }
  )!;

  const emailAddress = (
    emailQuestion.responseData as BifrostFormQuestionEmailResponse
  ).responseValue;

  const phoneNumberQuestion = bifrostFormQuestionsWithResponses.find(
    (bifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse) => {
      return (
        bifrostFormQuestionWithResponse.bifrostFormQuestion
          .bifrostFormQuestionId === ReservedBifrostFormQuestionIds.PHONE
      );
    }
  )!;

  const phoneNumber = (
    phoneNumberQuestion.responseData as BifrostFormQuestionPhoneNumberResponse
  ).responseValue;

  const { userSessionId, nextQuestionWithResponse } =
    await bifrostApi.createUserSessionFromBifrost({
      hotelId,
      bifrostTravelerId,
      firstName,
      lastName,
      emailAddress,
      phoneNumber,
      additionalBifrostFormQuestionsWithResponses: [],
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
