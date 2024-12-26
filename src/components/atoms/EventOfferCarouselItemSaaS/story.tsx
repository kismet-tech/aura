import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { EventOfferCarouselItemSaaS } from '.';

const meta = {
  title: 'Atoms/EventOfferCarouselItemSaaS',
  component: EventOfferCarouselItemSaaS,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EventOfferCarouselItemSaaS>;

export default meta;
type Story = StoryObj<typeof meta>;
