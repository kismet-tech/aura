import "../src/styles/globals.css";
import type { Preview } from "@storybook/react";

import { withThemeByDataAttribute } from "@storybook/addon-themes";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "custom-light",
      values: [
        {
          name: "custom-light",
          value: "#f5f5e9",
        },
        {
          name: "dark",
          value: "#333333",
        },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  decorators: [
    withThemeByDataAttribute({
      themes: {
        // nameOfTheme: 'dataAttributeForTheme',
        light: "",
        dark: "dark",
      },
      defaultTheme: "light",
      dataAttribute: "data-theme",
    }),
  ],
};

export default preview;
