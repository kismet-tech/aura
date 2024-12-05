import { Meta, StoryObj } from "@storybook/react";
import React, { useLayoutEffect } from "react";
import { BifrostFormApplication } from ".";
import { BifrostFormStateProvider } from "@/providers/BifrostFormStateProvider";
import { MockBifrostApi } from "@/apis/bifrostApi/mockBifrostApi";
import { AppViewport } from "@/components/atoms/AppViewport";
import { useBifrostFormState } from "@/providers/BifrostFormStateProvider/useBifrostFormState";
import { BifrostApi } from "@/apis/bifrostApi/bifrostApi";
import { injectTheme } from "@/utilities/themes/injectTheme";
import { knollcroftTheme } from "@/models/frontend/themes";

const meta: Meta<typeof BifrostFormApplication> = {
  title: "Applications/BifrostFormApplication",
  component: BifrostFormApplication,
};
export default meta;

type Story = StoryObj<typeof BifrostFormApplication>;

const MockBifrostApiStoryWrapper = () => {
  const {} = useBifrostFormState();

  useLayoutEffect(() => {
    async function applyStyle() {
      // await new Promise((r) => setTimeout(r, 4000));
      console.log("useLayoutEffect");

      const formContainer = document.querySelector(
        "#storybook-root"
      ) as HTMLDivElement;

      formContainer.style.setProperty("font-family", "Outfit");

      const themeVariables = knollcroftTheme;
      console.log(formContainer);
      injectTheme(formContainer, themeVariables);
    }

    applyStyle();
  });

  return (
    <AppViewport>
      <BifrostFormStateProvider bifrostApi={new MockBifrostApi()}>
        <BifrostFormApplication />
      </BifrostFormStateProvider>
    </AppViewport>
  );
};

export const Mock_Api_Example: Story = {
  render: () => <MockBifrostApiStoryWrapper />,
  args: {},
};

const LocalhostBifrostApiStoryWrapper = () => {
  const {} = useBifrostFormState();

  return (
    <AppViewport>
      <BifrostFormStateProvider bifrostApi={new BifrostApi()}>
        <BifrostFormApplication />
      </BifrostFormStateProvider>
    </AppViewport>
  );
};

export const Localhost_Api_Example: Story = {
  render: () => <LocalhostBifrostApiStoryWrapper />,
  args: {},
};
