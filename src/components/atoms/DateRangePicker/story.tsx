import { Meta, StoryObj } from "@storybook/react";
import { DateRangePicker, DateRangePickerProps } from ".";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";

const meta: Meta<typeof DateRangePicker> = {
  title: "Atoms/DateRangePicker",
  component: DateRangePicker,
};
export default meta;

type Story = StoryObj<typeof DateRangePicker>;

const StoryWrapper = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const dynamicArgs: DateRangePickerProps = {
    dateRange,
    setDateRange,
  };

  return (
    <div
      style={{
        width: "50%",
        margin: "0 auto",
        border: "1px solid #ccc",
        padding: "16px",
      }}
    >
      <DateRangePicker {...dynamicArgs} />
    </div>
  );
};

export const Example: Story = {
  render: () => <StoryWrapper />,
  args: {},
};
