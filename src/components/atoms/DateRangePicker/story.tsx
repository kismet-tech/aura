import { Meta, StoryObj } from "@storybook/react";
import { DateRangePicker, DateRangePickerProps } from ".";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import { AppViewport } from "../AppViewport";

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
    <AppViewport>
      <DateRangePicker {...dynamicArgs} />
    </AppViewport>
  );
};

export const Example: Story = {
  render: () => <StoryWrapper />,
  args: {},
};
