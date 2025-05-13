import { useEffect } from 'react';
import { WhiteCheckIcon, WhiteWarningIcon } from '@/assets/assets';
import * as S from '@/components/common/ToastStyle';

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
    <S.ToastWrapper>
      <S.ToastContainer>
        <S.ToastContent>
          <S.ToastIcon src={type === 'success' ? WhiteCheckIcon : WhiteWarningIcon} alt="아이콘" />
          <S.ToastText>{message}</S.ToastText>
        </S.ToastContent>
      </S.ToastContainer>
    </S.ToastWrapper>
  );
};

export default Toast;
