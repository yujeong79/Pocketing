import { useEffect } from 'react';

import Portal from '@/components/common/Portal';
import * as S from './ToastStyle';
import { WhiteCheckIcon, WhiteWarningIcon } from '@/assets/assets';

interface ToastProps {
  type: 'success' | 'warning';
  message: string;
  onClose: () => void;
}

const Toast = ({ type, message, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <Portal>
      <S.ToastContainer>
        <S.ToastContent>
          <S.ToastIcon src={type === 'success' ? WhiteCheckIcon : WhiteWarningIcon} alt="아이콘" />
          <S.ToastText>{message}</S.ToastText>
        </S.ToastContent>
      </S.ToastContainer>
    </Portal>
  );
};

export default Toast;
