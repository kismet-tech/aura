import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Carousel, CarouselProps } from ".";

const meta: Meta<typeof Carousel> = {
  title: "Displays/Carousel",
  component: Carousel,
};
export default meta;

type Story = StoryObj<typeof Carousel>;

const carouselPropsMockDataOne: CarouselProps<{ id: number; name: string }> = {
  items: [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
    { id: 4, name: "Item 4" },
    { id: 5, name: "Item 5" },
    { id: 6, name: "Item 6" },
  ],
  renderItem: (item: { id: number; name: string }) => {
    return <div>{item.name}</div>;
  },
  itemKey: (item: { id: number; name: string }) => item.id,
  // slidesPerView: 6,
};

export const Example_One: Story = {
  render: (args) => {
    return (
      <div style={{ width: "100%", margin: "0 auto" }}>
        <div className="h-32">
          <Carousel {...args} />
        </div>
      </div>
    );
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args: carouselPropsMockDataOne as any,
};
