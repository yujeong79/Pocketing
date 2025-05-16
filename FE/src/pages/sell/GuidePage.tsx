import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './GuidePageStyle';
import { BackIcon2, CameraIcon2, CheckIcon, SampleImage } from '@/assets/assets';

const GuidePage = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleAlbumOpen = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    navigate('/upload', { state: { capturedFile: file } });
  };

  return (
    <S.GuideBackground>
      <S.BackButton onClick={() => navigate(-1)}>
        <img src={BackIcon2} alt="뒤로가기" />
      </S.BackButton>
      <S.MainGuideText>
        판매하려는 <span>포토카드</span>를<br />
        <span>한 번에</span> 촬영해보세요!
      </S.MainGuideText>
      <S.GuideText>
        <span>최대 6장</span>까지 정확하게 인식돼요.
      </S.GuideText>
      <S.SampleImage src={SampleImage} alt="샘플 이미지" />
      <S.DetailGuideText>
        <span>
          <S.CheckIcon src={CheckIcon} alt="체크 아이콘" />
          장식 없이 원본 그대로
        </span>
        <span>
          <S.CheckIcon src={CheckIcon} alt="체크 아이콘" />빛 번짐이 없는 상태에서
        </span>
        <span>
          <S.CheckIcon src={CheckIcon} alt="체크 아이콘" />
          포카끼리 겹치지 않게
        </span>
      </S.DetailGuideText>
      <S.ButtonContainer>
        <S.ActionButton variant="camera" onClick={handleAlbumOpen}>
          <img src={CameraIcon2} alt="카메라 아이콘" />
          포토카드 등록하러 가기
        </S.ActionButton>
        {/* ✅ 숨겨진 input */}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </S.ButtonContainer>
    </S.GuideBackground>
  );
};

export default GuidePage;
