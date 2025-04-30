import { BackIcon } from '@/assets/assets';
import * as S from './BackButtonStyle';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();
  return <S.BackButton onClick={() => navigate(-1)} src={BackIcon} alt="뒤로가기" />;
};

export default BackButton;
