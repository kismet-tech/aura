import type { Meta, StoryObj } from '@storybook/react';
import { SpecialOffer } from './index';

const meta = {
  title: 'Molecules/SpecialOffer',
  component: SpecialOffer,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SpecialOffer>;

export default meta;
type Story = StoryObj<typeof SpecialOffer>;

export const Default: Story = {
  args: {
    title: 'Summer Escape Package',
    description: 'Experience luxury at its finest with our exclusive summer package. Includes daily breakfast, spa access, and complimentary airport transfers.',
    imageUrl: 'https://www.bestambiance.com/wp-content/uploads/2022/09/cwo4c5et7jyz-aspect-ratio-800-800.jpg',
    originalPrice: '$850/night',
    discountedPrice: '$595/night',
    discount: '30%',
    validUntil: 'July 31, 2024'
  }
}; 