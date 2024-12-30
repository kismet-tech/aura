import type { Meta, StoryObj } from '@storybook/react';
import { AgenticActionList } from './index';
import React from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const meta = {
  title: 'Molecules/AgenticActionList',
  component: AgenticActionList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A modal component that displays a list of automated actions. Each action shows its status and can be cancelled individually.'
      }
    }
  },
  decorators: [
    (Story) => (
      <div className="w-[600px]">
        <Story />
      </div>
    )
  ],
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: { type: 'boolean' },
      description: 'Controls the visibility of the modal'
    },
    onClose: {
      description: 'Callback function triggered when the modal is closed via the X button or Cancel button'
    },
    onConfirm: {
      description: 'Callback function triggered when the user confirms enabling the agent'
    }
  }
} satisfies Meta<Props>;

export default meta;
type Story = StoryObj<Props>;

export const Default: Story = {
  name: 'Initial State',
  args: {
    isOpen: true,
    onClose: () => console.log('Modal closed'),
    onConfirm: () => console.log('Agent enabled')
  },
  parameters: {
    docs: {
      description: {
        story: 'The initial state where all actions are pending and ready to begin.'
      }
    }
  }
};

export const QualifyingLead: Story = {
  name: 'Qualifying Lead',
  args: {
    isOpen: true,
    onClose: () => console.log('Modal closed'),
    onConfirm: () => console.log('Agent enabled')
  },
  parameters: {
    docs: {
      description: {
        story: 'First step in progress: qualifying the lead by gathering missing information.'
      }
    }
  }
};

export const SharingCollateral: Story = {
  name: 'Sharing Collateral',
  args: {
    isOpen: true,
    onClose: () => console.log('Modal closed'),
    onConfirm: () => console.log('Agent enabled')
  },
  parameters: {
    docs: {
      description: {
        story: 'First step completed, second step in progress: sharing venue information and materials.'
      }
    }
  }
};

export const ContractPhase: Story = {
  name: 'Contract Phase',
  args: {
    isOpen: true,
    onClose: () => console.log('Modal closed'),
    onConfirm: () => console.log('Agent enabled')
  },
  parameters: {
    docs: {
      description: {
        story: 'Early steps completed, now working on contract generation and review.'
      }
    }
  }
};

export const BEOAndPricing: Story = {
  name: 'BEO and Pricing Review',
  args: {
    isOpen: true,
    onClose: () => console.log('Modal closed'),
    onConfirm: () => console.log('Agent enabled')
  },
  parameters: {
    docs: {
      description: {
        story: 'Final stages: BEO review with Chef Don and pricing confirmation with Revenue Management.'
      }
    }
  }
};

export const WithCancellation: Story = {
  name: 'With Cancelled Step',
  args: {
    isOpen: true,
    onClose: () => console.log('Modal closed'),
    onConfirm: () => console.log('Agent enabled')
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows a scenario where one step was cancelled but the process continues.'
      }
    }
  }
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => console.log('Modal closed'),
    onConfirm: () => console.log('Agent enabled')
  },
  parameters: {
    docs: {
      description: {
        story: 'The modal in its closed state (renders null).'
      }
    }
  }
}; 