import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ResponsiveGrid } from ".";

const meta: Meta<typeof ResponsiveGrid> = {
  title: "Atoms/ResponsiveGrid",
  component: ResponsiveGrid,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ResponsiveGrid>;

const ExampleCard = ({ className = "" }: { className?: string }) => (
  <div className={`border rounded-lg p-4 ${className}`}>
    <h3 className="text-lg font-semibold">Example Card</h3>
    <p className="text-gray-600">Some content here</p>
  </div>
);

const ExampleContent = () => (
  <>
    <ExampleCard />
    <ExampleCard />
    <ExampleCard />
    <ExampleCard />
  </>
);

export const Primary: Story = {
  args: {
    title: "Example Grid",
    description: "This is an example of the responsive grid component",
    children: <ExampleContent />,
  },
};

export const NoTitleOrDescription: Story = {
  args: {
    children: <ExampleContent />,
  },
};

export const CustomItemWidth: Story = {
  args: {
    title: "Custom Width Items",
    description: "Grid items with custom minimum width",
    itemClassName: "min-w-[400px]",
    children: <ExampleContent />,
  },
}; 