import type { Meta, StoryObj } from '@storybook/react';
import { PlannerPublicNotes } from './index';

const meta: Meta<typeof PlannerPublicNotes> = {
  title: 'Molecules/Planners/PlannerPublicNotesSaaS',
  component: PlannerPublicNotes,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialNotes: '',
    onChange: (notes: string) => console.log('Notes changed:', notes),
  }
}; 