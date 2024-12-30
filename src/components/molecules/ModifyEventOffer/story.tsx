import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ModifyEventOffer } from "./index.js";
import type { EventData } from "./index.js";

const meta: Meta<typeof ModifyEventOffer> = {
  title: "Molecules/ModifyEventOffer",
  component: ModifyEventOffer,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="h-screen w-screen">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ModifyEventOffer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AddEventOfferSaaS: Story = {
  args: {
    open: true,
    onOpenChange: (open) => console.log("Drawer open state:", open),
    onSave: (data) => console.log("Saving data:", data),
    defaultOpen: true,
  },
};

const mockFilledData: EventData = {
  name: "Summer Gala 2024",
  status: "DEFINITIVE",
  startDate: new Date("2024-07-15T18:00"),
  endDate: new Date("2024-07-15T23:00"),
  guestCount: 200,
  venues: ["1"], // Ballroom
  priceInCents: 5000000,
  undiscountedPriceInCents: 6000000,
  pricePerHourInCents: 1000000,
  altFoodBevPriceInCents: 500000,
  paymentSplitType: "SINGLE_PAYER",
  visibility: "PUBLIC",
  publicNotes:
    "Annual summer fundraising gala with live music and silent auction.",
  privateNotes:
    "VIP section needs extra security. Client requested specific wine selection.",
};

export const EditEventOfferSaaS: Story = {
  args: {
    open: true,
    onOpenChange: (open) => console.log("Drawer open state:", open),
    onSave: (data) => console.log("Saving data:", data),
    initialData: mockFilledData,
    defaultOpen: false, // All sections start collapsed
  },
};
