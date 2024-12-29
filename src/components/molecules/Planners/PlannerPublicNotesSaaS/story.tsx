import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PlannerPublicNotes } from './index';
import { useArgs } from '@storybook/preview-api';

const meta: Meta<typeof PlannerPublicNotes> = {
  title: 'Molecules/Planners/PlannerPublicNotes',
  component: PlannerPublicNotes,
  render: function Render(args) {
    const [{ initialNotes }, updateArgs] = useArgs();

    const handleChange = (notes: string) => {
      updateArgs({ initialNotes: notes });
    };

    return (
      <div className="max-w-2xl p-4">
        <PlannerPublicNotes 
          {...args} 
          onChange={handleChange}
        />
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof PlannerPublicNotes>;

const defaultUser = {
  id: "1",
  name: "Sarah Johnson",
  email: "sarah.j@example.com",
  avatarUrl: "https://i.pravatar.cc/300?u=sarah.j@example.com",
};

export const Default: Story = {
  args: {
    initialNotes: "Guest requires vegetarian meal options.\nNeed to arrange special AV setup for presentations.",
    currentUser: defaultUser,
  },
};

export const Empty: Story = {
  args: {
    currentUser: defaultUser,
  },
};

export const WithLongNotes: Story = {
  args: {
    initialNotes: Array(5).fill("This is a long note that demonstrates how the component handles multiple lines of text. It includes details about various requirements and specifications that need to be tracked.").join("\n"),
    currentUser: defaultUser,
  },
};

export const Collapsed: Story = {
  args: {
    initialNotes: "Guest requires vegetarian meal options.\nNeed to arrange special AV setup for presentations.",
    currentUser: defaultUser,
    open: false,
  },
}; 