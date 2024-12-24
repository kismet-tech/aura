/**
 * WIP: Drawer button stories are under development and not ready for use
 * This file contains stories for:
 * - Completed itinerary button
 * - Abandoned AWF button
 * - Special offer button (logged in)
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BifrostDrawerButton } from './bifrostDrawerButton';

const meta = {
  title: 'Bifrost/Drawer/BifrostDrawerButton',
  component: BifrostDrawerButton,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof BifrostDrawerButton>;

export default meta;
type Story = StoryObj<typeof BifrostDrawerButton>;

export const CompletedItinerary: Story = {
  args: {
    type: 'completed-itinerary',
    data: {
      currentStep: 3,
      totalSteps: 3,
    },
    onClick: () => console.log('View completed itinerary'),
    isPersistent: true,
    firstName: 'Alex'
  }
};

export const AbandonedAWF: Story = {
  args: {
    type: 'in-progress',
    data: {
      currentStep: 2,
      totalSteps: 5,
      lastUpdated: '2 hours ago'
    },
    onClick: () => console.log('Return to workflow'),
    isPersistent: true,
    firstName: 'Sarah'
  }
};

export const SpecialOfferLoggedIn: Story = {
  args: {
    type: 'special-offer',
    data: {
      discount: '30%'
    },
    onClick: () => console.log('View special offer'),
    isPersistent: true,
    firstName: 'Michael',
    createdByBifrostModal: true,
    shouldOpenModal: false
  }
}; 