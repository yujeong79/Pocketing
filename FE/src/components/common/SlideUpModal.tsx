import { useEffect, useState } from 'react';
import * as S from './SlideUpModalStyle';
import { CloseIcon } from '@/assets/assets';
import Portal from './Portal';

interface SlideUpModalProps {
  header?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  isCloseButtonHidden?: boolean;
  height?: string;
}

const SlideUpModal = ({
  header,
  isOpen,
  onClose,
  children,
  isCloseButtonHidden,
  height,
}: SlideUpModalProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !isAnimating) return null;

  return (
    <Portal>
      <S.Overlay $isOpen={isOpen} onClick={onClose}>
        <S.ModalContainer $isOpen={isOpen} $height={height} onClick={(e) => e.stopPropagation()}>
          <S.ModalHeader>
            <S.ModalTitle>{header}</S.ModalTitle>
            {!isCloseButtonHidden && <S.CloseButton src={CloseIcon} onClick={onClose} />}
          </S.ModalHeader>
          <S.ModalContent>{children}</S.ModalContent>
        </S.ModalContainer>
      </S.Overlay>
    </Portal>
  );
};

export default SlideUpModal;
