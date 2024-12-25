import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
`;

export interface BifrostModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export const BifrostModal: React.FC<BifrostModalProps> = ({ isOpen, onOpenChange, children }) => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const shouldOpenModal = urlParams.get('openBifrost');

    if (shouldOpenModal === 'true') {
      onOpenChange(true);
    }
  }, []);

  return (
    <ModalOverlay onClick={() => onOpenChange(false)}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
}; 