import { useNavigate } from 'react-router-dom';
import * as S from './GuidePageStyle';
import { BackIcon2, SampleImage } from '@/assets/assets';

const GuidePage = () => {
  const navigate = useNavigate();
  return (
    <S.GuideBackground>
      <S.BackButton onClick={() => navigate(-1)}>
        <img src={BackIcon2} alt="뒤로가기" />
      </S.BackButton>
      <S.MainGuideText>
        <span>
          판매하려는 <p>포토카드</p>를
        </span>
        <span>
          <p>한 번에</p> 촬영해보세요!
        </span>
      </S.MainGuideText>
      <S.GuideText>
        <span>최대 6장</span>까지 정확하게 인식돼요.
      </S.GuideText>
      <S.SampleImage src={SampleImage} alt="샘플 이미지" />
    </S.GuideBackground>
  );
};

export default GuidePage;
