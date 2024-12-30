import type { Meta, StoryObj } from '@storybook/react';
import { ContactData } from '.';

const meta = {
  title: 'Atoms/ContactData',
  component: ContactData,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A component that displays social media and web links for a contact as clickable icons.'
      }
    }
  },
  argTypes: {
    sources: {
      description: 'Array of social media and web links',
      control: 'object'
    },
    size: {
      description: 'Size of the icons in pixels',
      control: { type: 'number', min: 12, max: 48, step: 4 }
    },
    className: {
      description: 'Additional CSS classes',
      control: 'text'
    }
  }
} satisfies Meta<typeof ContactData>;

export default meta;
type Story = StoryObj<typeof ContactData>;

export const AllSources: Story = {
  args: {
    sources: [
      { type: 'LinkedIn', url: 'https://linkedin.com/in/johndoe' },
      { type: 'Instagram', url: 'https://instagram.com/johndoe' },
      { type: 'Facebook', url: 'https://facebook.com/johndoe' },
      { type: 'Web', url: 'https://johndoe.com' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows all possible social media icons.'
      }
    }
  }
};

export const SingleSource: Story = {
  args: {
    sources: [
      { type: 'LinkedIn', url: 'https://linkedin.com/in/johndoe' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows a single social media icon (LinkedIn).'
      }
    }
  }
};

export const LargerSize: Story = {
  args: {
    sources: [
      { type: 'LinkedIn', url: 'https://linkedin.com/in/johndoe' },
      { type: 'Instagram', url: 'https://instagram.com/johndoe' },
    ],
    size: 24,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows icons at a larger size (24px).'
      }
    }
  }
};

export const CustomStyling: Story = {
  args: {
    sources: [
      { type: 'LinkedIn', url: 'https://linkedin.com/in/johndoe' },
      { type: 'Instagram', url: 'https://instagram.com/johndoe' },
    ],
    className: 'bg-blue-100 p-2 rounded-lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows icons with custom styling applied through className.'
      }
    }
  }
};

export const WithWhatsApp: Story = {
  args: {
    sources: [
      { type: 'LinkedIn', url: 'https://linkedin.com/in/johndoe' },
      { type: 'WhatsApp', url: 'https://wa.me/1234567890' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows LinkedIn and WhatsApp icons.'
      }
    }
  }
}; 