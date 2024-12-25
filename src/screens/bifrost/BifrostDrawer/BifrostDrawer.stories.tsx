/**
 * WIP: Drawer stories are under development and not ready for use
 * This file contains stories for:
 * - Completed itinerary with instant book
 * - Completed itinerary with inquiry
 * - Abandoned AWF
 * - Special offer (logged in)
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BookingDrawer } from './bifrostDrawer';

const meta = {
  title: 'Bifrost/Drawer/BookingDrawer',
  component: BookingDrawer,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof BookingDrawer>;

export default meta;
type Story = StoryObj<typeof BookingDrawer>;

export const CompletedItineraryWithInstantBook: Story = {
  args: {
    type: 'completed-itinerary',
    data: {
      destination: 'Maldives Resort & Spa',
      dates: '08/15/24 - 08/22/24',
      guests: 2,
      price: '$2,450/night',
      roomType: 'Ocean Villa',
      status: 'confirmed',
      confirmationNumber: 'MALD-2024-08-15',
      imageUrl: 'https://www.bestambiance.com/wp-content/uploads/2022/09/cwo4c5et7jyz-aspect-ratio-800-800.jpg',
      firstName: 'Alex',
      hasInstantBookOptions: true,
      bifrostItinerarySummary: {
        title: 'Your Perfect Maldives Getaway',
        description: 'A luxurious 7-night stay in an overwater villa with stunning ocean views.',
        highlights: [
          'Direct access to crystal-clear waters',
          'Daily breakfast included',
          'Complimentary water activities',
          'Sunset dinner cruise included'
        ]
      }
    },
    isLoggedIn: true,
    firstName: 'Alex'
  }
};

export const CompletedItineraryWithInquiry: Story = {
  args: {
    type: 'completed-itinerary',
    data: {
      destination: 'Knollcroft Manor',
      dates: '09/20/24 - 09/25/24',
      guests: 2,
      price: '$1,850/night',
      roomType: 'Heritage Suite',
      status: 'confirmed',
      confirmationNumber: 'KNOL-2024-09-20',
      imageUrl: 'https://www.bestambiance.com/wp-content/uploads/2022/09/manor-house.jpg',
      firstName: 'Sarah',
      hasInstantBookOptions: false,
      bifrostItinerarySummary: {
        title: 'Your Luxury Manor Experience',
        description: 'A 5-night stay in a historic English manor with personalized service.',
        highlights: [
          'Private butler service',
          'Afternoon tea included',
          'Access to manor grounds',
          'Exclusive dining experiences'
        ]
      }
    },
    isLoggedIn: true,
    firstName: 'Sarah'
  }
};

export const AbandonedAWF: Story = {
  args: {
    type: 'in-progress',
    data: {
      destination: 'Caribbean Cruise',
      dates: 'Sep 10 - Sep 17, 2024',
      guests: 4,
      currentStep: 2,
      totalSteps: 5,
      lastUpdated: '2 hours ago'
    },
    isLoggedIn: true,
    firstName: 'Sarah'
  }
};

export const SpecialOfferLoggedIn: Story = {
  args: {
    type: 'special-offer',
    data: {
      hotelName: 'Grand Resort Phuket',
      offerName: 'Summer Escape Package',
      validUntil: 'July 31, 2024',
      discount: '30%',
      originalPrice: '$850/night',
      discountedPrice: '$595/night'
    },
    isLoggedIn: true,
    isFromModal: true,
    firstName: 'Michael'
  }
}; 