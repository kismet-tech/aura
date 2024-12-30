import type { Meta, StoryObj } from '@storybook/react';
import { ContactContactInfo } from '.';

const meta: Meta<typeof ContactContactInfo> = {
  title: 'Atoms/ContactContactInfo',
  component: ContactContactInfo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ContactContactInfo>;

const defaultInfo = {
  phone: '+1 (555) 123-4567',
  email: 'john.doe@example.com',
  address: '123 Main St, San Francisco, CA 94105',
};

export const Default: Story = {
  args: {
    info: defaultInfo,
  },
};

export const WithEditButton: Story = {
  args: {
    info: defaultInfo,
    onEdit: (updatedInfo) => {
      console.log('Updated info:', updatedInfo);
      alert('Contact information updated!');
    },
  },
};

export const PhoneOnly: Story = {
  args: {
    info: {
      phone: defaultInfo.phone,
    },
  },
};

export const EmailOnly: Story = {
  args: {
    info: {
      email: defaultInfo.email,
    },
  },
};

export const AddressOnly: Story = {
  args: {
    info: {
      address: defaultInfo.address,
    },
  },
};

export const PhoneAndEmailWithEdit: Story = {
  args: {
    info: {
      phone: defaultInfo.phone,
      email: defaultInfo.email,
    },
    onEdit: (updatedInfo) => {
      console.log('Updated info:', updatedInfo);
      alert('Contact information updated!');
    },
  },
};

export const EmailAndAddressWithEdit: Story = {
  args: {
    info: {
      email: defaultInfo.email,
      address: defaultInfo.address,
    },
    onEdit: (updatedInfo) => {
      console.log('Updated info:', updatedInfo);
      alert('Contact information updated!');
    },
  },
}; 