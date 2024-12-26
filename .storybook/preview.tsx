import React from 'react';
import type { Preview } from "@storybook/react";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="font-sans min-h-screen p-4 antialiased">
        <Story />
      </div>
    ),
  ],
};

export default preview; 