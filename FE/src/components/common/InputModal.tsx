import React, { useState, useEffect } from 'react';
import * as S from '@/components/common/InputModalStyle';
import { CancelButton } from '@/components/common/ConfirmModalStyle';

interface InputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (value: string) => void;
  title?: string;
  label?: string;
  defaultValue?: string;
  confirmText?: string;
  cancelText?: string;
}

const InputModal: React.FC<InputModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = '입력',
  label,
  defaultValue = '',
  confirmText = '확인',
  cancelText = '취소',
}) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue, isOpen]);

  if (!isOpen) return null;

  return (
    <S.Overlay onClick={onClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <S.Title>{title}</S.Title>
        {label && <S.Label>{label}</S.Label>}
        <S.Input type="number" value={value} onChange={(e) => setValue(e.target.value)} autoFocus />
        <S.ButtonRow>
          <CancelButton onClick={onClose}>{cancelText}</CancelButton>
          <S.ConfirmButton onClick={() => onConfirm(value)}>{confirmText}</S.ConfirmButton>
        </S.ButtonRow>
      </S.ModalContainer>
    </S.Overlay>
  );
};

export default InputModal;
