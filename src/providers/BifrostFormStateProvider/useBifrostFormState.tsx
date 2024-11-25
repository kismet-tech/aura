import { useContext } from "react";
import { BifrostFormStateContextValue } from "./models/models";
import { BifrostFormStateContext } from ".";

export const useBifrostFormState = () => {
  const context: BifrostFormStateContextValue = useContext(
    BifrostFormStateContext
  );
  return context;
};
