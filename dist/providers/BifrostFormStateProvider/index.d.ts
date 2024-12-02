import React from "react";
import { BifrostFormStateContextValue, BifrostFormStateProviderProps } from "./models/models";
export declare const BifrostFormStateContext: React.Context<BifrostFormStateContextValue>;
export declare const BifrostFormStateProvider: ({ children, bifrostApi, }: BifrostFormStateProviderProps) => React.JSX.Element;
