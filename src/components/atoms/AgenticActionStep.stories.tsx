import type { Meta, StoryObj } from '@storybook/react';
import { AgenticActionStep } from './AgenticActionStep';

type ComponentType = typeof AgenticActionStep;

const meta: Meta<ComponentType> = {
  title: 'Atoms/AgenticActionStep',
  component: AgenticActionStep,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    number: {
      control: { type: 'number' },
      description: 'The step number to display in the circle'
    },
    title: {
      control: { type: 'text' },
      description: 'The title of the action'
    },
    description: {
      control: { type: 'text' },
      description: 'A brief description of what the action does'
    }
  }
};

export default meta;
type Story = StoryObj<ComponentType>;

export const Default: Story = {
  name: 'Process Lead',
  args: {
    number: 1,
    title: 'Process Lead Information',
    description: 'Analyze and categorize incoming lead details for efficient processing'
  }
};

export const FollowUp: Story = {
  name: 'Schedule Follow-ups',
  args: {
    number: 2,
    title: 'Schedule Follow-ups',
    description: 'Automatically schedule and manage follow-up communications'
  }
};

export const Proposal: Story = {
  name: 'Generate Proposals',
  args: {
    number: 3,
    title: 'Generate Proposals',
    description: 'Create and send customized booking proposals based on lead requirements'
  }
}; 