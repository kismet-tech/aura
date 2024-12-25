import type { Meta, StoryObj } from '@storybook/react';
import { LogoKismet } from './LogoKismet';

const meta = {
  title: 'Components/Icons/LogoKismet',
  component: LogoKismet,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'number', min: 16, max: 100, step: 4 },
    },
    color: {
      control: 'color',
    },
  },
} satisfies Meta<typeof LogoKismet>;

export default meta;
type Story = StoryObj<typeof LogoKismet>;

export const Default: Story = {
  args: {
    size: 40,
    color: '#0095f6',
  },
};

export const Small: Story = {
  args: {
    size: 24,
    color: '#0095f6',
  },
};

export const Large: Story = {
  args: {
    size: 64,
    color: '#0095f6',
  },
};

export const CustomColor: Story = {
  args: {
    size: 40,
    color: '#10b981',
  },
}; 