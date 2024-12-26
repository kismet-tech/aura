import type { Meta, StoryObj } from '@storybook/react';
import { PlannerFinancials } from './index';

const meta: Meta<typeof PlannerFinancials> = {
  title: 'Molecules/Planners/PlannerFinancialsSaaS',
  component: PlannerFinancials,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    startDateTime: new Date().toISOString(),
    paymentSplitType: 'SINGLE_PAYER',
  }
}; 