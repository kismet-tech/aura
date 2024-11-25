import React, { useEffect } from "react";

import { Meta, StoryObj } from "@storybook/react";
import { OverlayProvider, useOverlay } from ".";

interface MySquareComponentProps {
  children?: React.ReactNode;
}

const MySquareComponent: React.FC<MySquareComponentProps> = ({ children }) => {
  return (
    <div className="relative w-72 h-72 bg-gray-100 border-2 border-gray-300 mx-auto my-5 flex justify-center items-center">
      {children}
    </div>
  );
};

const CoverInBlue: React.FC = () => {
  const { clearOverlay } = useOverlay();

  const handleClick = () => {
    clearOverlay();
  };

  return (
    <div
      className="w-full h-full bg-blue-500 flex justify-center items-center cursor-pointer text-white text-lg"
      onClick={handleClick}
    >
      <h2>Click to Remove Overlay</h2>
    </div>
  );
};

const CoverInRed: React.FC = () => {
  const { setOverlay } = useOverlay();

  const handleClick = () => {
    setOverlay(<CoverInBlue />);
  };

  return (
    <div
      className="w-full h-full bg-red-500 flex justify-center items-center cursor-pointer"
      onClick={handleClick}
    >
      <h2 className="text-white text-lg">Click to Turn Blue</h2>
    </div>
  );
};

const AdditionalOverlayExample: React.FC = () => {
  const { setOverlay, clearOverlay } = useOverlay();

  useEffect(() => {
    // Simulate an API call after 5 seconds
    const timer = setTimeout(() => {
      setOverlay(
        <div
          className="w-full h-full bg-green-500 flex justify-center items-center cursor-pointer text-white text-lg"
          onClick={clearOverlay}
        >
          <h2>API Loaded Green Cover - Click to Remove</h2>
        </div>
      );
    }, 5000);

    return () => clearTimeout(timer);
  }, [setOverlay, clearOverlay]);

  return null;
};

const FullExampleComponent: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-5">
      <h1 className="text-2xl font-bold text-center mb-8">Overlay Example</h1>

      {/* OverlayProvider for MySquareComponent */}
      <MySquareComponent>
        <OverlayProvider>
          <CoverInRed />
          <AdditionalOverlayExample />
        </OverlayProvider>
      </MySquareComponent>
    </div>
  );
};

const meta: Meta<typeof FullExampleComponent> = {
  title: "Atoms/Overlay",
  component: FullExampleComponent,
};
export default meta;

type Story = StoryObj<typeof FullExampleComponent>;

export const Example: Story = {
  render: (args) => {
    return (
      <div style={{ width: "50%", margin: "0 auto" }}>
        <FullExampleComponent />
      </div>
    );
  },
  args: {},
};
