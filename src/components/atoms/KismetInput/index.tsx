import { Input } from "@/components/shadcn/input";
import React from "react";

export interface KismetInputProps extends React.ComponentProps<"input"> {}

export function KismetInput(props: KismetInputProps) {
  return <Input {...props} style={{ backgroundColor: "rgb(250, 249, 239)" }} />;
}
