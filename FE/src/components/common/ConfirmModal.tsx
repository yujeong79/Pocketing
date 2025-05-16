import React from 'react';
import { CautionIcon } from '@/assets/assets';
import * as S from '@/components/common/ConfirmModalStyle';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  text?: string;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  icon?: React.ReactNode;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  text,
  title = '알림',
  confirmText = '확인',
  cancelText = '취소',
  icon,
}) => {
  if (!isOpen) return null;

  return (
    <S.Overlay $isOpen={isOpen} onClick={onClose}>
      <S.ModalContainer $isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
        <S.CautionIconWrapper>
          {icon || <img src={CautionIcon} alt="경고 아이콘" />}
        </S.CautionIconWrapper>
        <S.Title>{title}</S.Title>
        <S.Message>{text}</S.Message>
        <S.ButtonRow>
          <S.CancelButton onClick={onClose}>{cancelText}</S.CancelButton>
          <S.ConfirmButton onClick={onConfirm}>{confirmText}</S.ConfirmButton>
        </S.ButtonRow>
      </S.ModalContainer>
    </S.Overlay>
  );
};

export default ConfirmModal;
