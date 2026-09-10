import React from 'react';
import { Language } from '../types';
import { KitchenPackagingVideoModal } from './KitchenPackagingVideoModal';

interface DemoModalProps {
  lang?: Language;
  onClose: () => void;
  onLaunchLiveHub: () => void;
  onOpenBookDemo?: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({
  onClose,
  onLaunchLiveHub,
  onOpenBookDemo,
}) => {
  return (
    <KitchenPackagingVideoModal
      onClose={onClose}
      onLaunchLiveHub={onLaunchLiveHub}
      onOpenBookDemo={onOpenBookDemo}
    />
  );
};
