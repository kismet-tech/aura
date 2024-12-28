import type { Meta, StoryObj } from '@storybook/react';
import { PlannerHost } from './index';

const meta: Meta<typeof PlannerHost> = {
  title: 'Molecules/Planners/PlannerHostSaaS',
  component: PlannerHost,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialVisibility: 'PUBLIC',
    initialPaymentSplitType: 'SINGLE_PAYER',
    onChange: (values) => console.log('Values changed:', values),
  }
}; 