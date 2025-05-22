import { useNavigate, useLocation } from 'react-router-dom';
import { BackIcon } from '@/assets/assets';
import * as S from './BackButtonStyle';
interface BackButtonProps {
  fallbackPath?: string;
  onClick?: () => void;
}

const BackButton = ({ fallbackPath, onClick }: BackButtonProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (onClick) {
      onClick();
    } else if (location.state?.from) {
      navigate(location.state.from);
    } else if (fallbackPath) {
      navigate(fallbackPath);
    } else {
      navigate(-1);
    }
  };

  return (
    <S.Button type="button" onClick={handleBack} aria-label="뒤로 가기">
      <img src={BackIcon} alt="뒤로 가기" />
    </S.Button>
  );
};

export default BackButton;
