import type { Meta, StoryObj } from '@storybook/react';
import { AgenticActionStep, type AgenticActionStatus } from './index';

type ComponentType = typeof AgenticActionStep;

const meta: Meta<ComponentType> = {
  title: 'Atoms/AgenticActionStep',
  component: AgenticActionStep,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A step component that displays an automated action with its status and the ability to cancel it. Each step shows a numbered circle, a title, bulleted substeps in small text, and a status badge.'
      }
    }
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
      control: { type: 'object' },
      description: 'A list of bullet points describing what the action does, displayed as small text'
    },
    status: {
      control: { type: 'select' },
      options: ['pending', 'in_progress', 'completed', 'cancelled'],
      description: 'The current status of the action. Affects the badge color and cancel button visibility.'
    },
    onCancel: {
      description: 'Callback function triggered when the X button is clicked. The button is only visible on hover and when status is not cancelled.'
    }
  },
  decorators: [
    (Story) => (
      <div className="w-[600px] p-4 bg-gray-50">
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<ComponentType>;

const defaultArgs = {
  number: 1,
  title: 'Qualify Lead',
  description: [
    'Review submitted information for completeness',
    'Contact for missing room count details',
    'Verify event dates and flexibility'
  ],
  onCancel: () => console.log('Action cancelled')
};

export const Pending: Story = {
  args: {
    ...defaultArgs,
    status: 'pending'
  },
  parameters: {
    docs: {
      description: {
        story: 'The default state of a step. Shows a gray status badge and allows cancellation. Note the small, bulleted text for substeps.'
      }
    }
  }
};

export const InProgress: Story = {
  args: {
    ...defaultArgs,
    status: 'in_progress'
  },
  parameters: {
    docs: {
      description: {
        story: 'When the action is being processed. Shows a blue status badge and allows cancellation.'
      }
    }
  }
};

export const Completed: Story = {
  args: {
    ...defaultArgs,
    status: 'completed'
  },
  parameters: {
    docs: {
      description: {
        story: 'When the action is finished. Shows a green status badge and allows cancellation.'
      }
    }
  }
};

export const Cancelled: Story = {
  args: {
    ...defaultArgs,
    status: 'cancelled'
  },
  parameters: {
    docs: {
      description: {
        story: 'When the action has been cancelled. Shows a red status badge and hides the cancel button.'
      }
    }
  }
};

export const ShareCollateral: Story = {
  args: {
    ...defaultArgs,
    number: 2,
    title: 'Share Collateral',
    description: [
      'Prepare Wedding Weekend package information',
      'Include venue photos and floor plans',
      'Provide relevant PDFs and pricing guides'
    ],
    status: 'pending'
  }
};

export const BEOReview: Story = {
  args: {
    ...defaultArgs,
    number: 5,
    title: 'Request BEO Review',
    description: [
      'Contact @Chef Don for menu review',
      'Confirm dietary requirements',
      'Update BEO with final selections'
    ],
    status: 'pending'
  }
};

export const ConfirmPricing: Story = {
  args: {
    ...defaultArgs,
    number: 6,
    title: 'Confirm Pricing',
    description: [
      'Contact @RevenueMgt for pricing review',
      'Obtain sign-off on final rates',
      'Update contract with approved pricing'
    ],
    status: 'pending'
  }
}; 