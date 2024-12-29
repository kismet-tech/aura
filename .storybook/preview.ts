import "../src/app/globals.css";
import React from 'react';
import type { Preview } from "@storybook/react";
import { withThemeByDataAttribute } from "@storybook/addon-themes";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
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
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
      attributeName: "data-theme",
    }),
    (Story: React.ComponentType) => {
      return React.createElement('div', { className: 'font-sans' },
        React.createElement(Story)
      );
    },
  ],
};

export default preview;
