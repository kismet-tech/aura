import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BifrostModal } from './index';
import { BifrostDrawerButton } from '../BifrostDrawer/bifrostDrawerButton';

const meta = {
  title: 'Bifrost/BifrostModal',
  component: BifrostModal,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof BifrostModal>;

export default meta;
type Story = StoryObj<typeof BifrostModal>;

const ModalWrapper: React.FC<{
  platform?: string;
  firstName?: string;
  redirectCode?: string;
  customMessage?: string;
  offerTitle?: string;
  offerDescription?: string;
}> = ({
  platform = 'Google',
  firstName,
  redirectCode,
  customMessage,
  offerTitle = 'Special Travel Offer',
  offerDescription = 'Get exclusive deals on your next adventure. Book now and save!',
}) => {
  const [modalState, setModalState] = React.useState<'open' | 'closed'>('open');

  const handleClose = () => {
    setModalState('closed');
  };

  const handleButtonClick = () => {
    setModalState('open');
  };

  return (
    <div>
      <BifrostModal
        isOpen={modalState === 'open'}
        onClose={handleClose}
        platform={platform}
        firstName={firstName}
        redirectCode={redirectCode}
        customMessage={customMessage}
        offerTitle={offerTitle}
        offerDescription={offerDescription}
      />
      {modalState === 'closed' && (
        <BifrostDrawerButton
          type="special-offer"
          data={{ discount: '20%' }}
          onClick={handleButtonClick}
          shouldOpenModal={false}
          createdByBifrostModal={true}
          firstName={firstName}
        />
      )}
    </div>
  );
};

export const GenericOffer: Story = {
  render: () => (
    <ModalWrapper
      platform="Google"
      offerTitle="Exclusive Travel Deal"
      offerDescription="Book your dream vacation with our special rates and flexible dates."
    />
  ),
};

export const InstagramRedirect: Story = {
  render: () => (
    <ModalWrapper
      platform="Instagram"
      redirectCode="IG2023"
      firstName="Jessica"
      customMessage="Welcome back! We saw you on Instagram."
      offerTitle="Instagram Exclusive"
      offerDescription="Special offer for our Instagram followers. Limited time only!"
    />
  ),
};

export const EmailRedirect: Story = {
  render: () => (
    <ModalWrapper
      platform="Google"
      redirectCode="EMAIL2023"
      firstName="Michael"
      customMessage="Welcome back! Here's your exclusive offer."
      offerTitle="Email Subscriber Offer"
      offerDescription="As a valued subscriber, you get first access to this deal."
    />
  ),
};

export const LinkedInRedirect: Story = {
  render: () => (
    <ModalWrapper
      platform="LinkedIn"
      redirectCode="LI2023"
      firstName="David"
      customMessage="Welcome from LinkedIn!"
      offerTitle="Professional Travel Package"
      offerDescription="Exclusive business travel deals for LinkedIn professionals."
    />
  ),
}; 