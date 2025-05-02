import Header from '@/components/common/Header';
import { PhotocardIcon, PencilIcon, SpeakerIcon, WalletIcon, SiteIcon } from '@/assets/assets';
import * as S from './SellPageStyle';

const SellPage = () => {
  const nickname = '닉네임'; // 실제로는 사용자 정보에서 가져올 예정
  const count = 3; // 실제로는 API에서 가져올 예정

  const handleRegisterClick = () => {
    console.log('판매등록 버튼 클릭');
  };

  const handleGuideClick = () => {
    console.log('이용방법 버튼 클릭');
  };

  const handleMyPostsClick = () => {
    console.log('내 판매글 버튼 클릭');
  };

  return (
    <>
      <Header type="main" />
      <S.Container>
        <S.TextContainer>
          <S.TextWrapper>
            <S.NicknameText>{nickname}</S.NicknameText>
            <S.DefaultText> 님은{'\n'}</S.DefaultText>
            <S.CountText>{count}</S.CountText>
            <S.DefaultText>개의 포토카드를{'\n'}판매하고 있어요</S.DefaultText>
          </S.TextWrapper>
          <S.PhotocardIconWrapper src={PhotocardIcon} alt="포토카드 아이콘" />
        </S.TextContainer>

        <S.BackgroundSection>
          <S.ButtonContainer>
            <S.RegisterButton onClick={handleRegisterClick}>
              <img src={PencilIcon} alt="판매등록" />
              판매등록
            </S.RegisterButton>
            <S.ButtonColumn>
              <S.SmallButton onClick={handleGuideClick}>
                <img src={SpeakerIcon} alt="이용방법" />
                이용방법
              </S.SmallButton>
              <S.SmallButton onClick={handleMyPostsClick}>
                <img src={WalletIcon} alt="내 판매글" />내 판매글
              </S.SmallButton>
            </S.ButtonColumn>
          </S.ButtonContainer>

          <S.Banner>
            <S.BannerIcon src={SiteIcon} alt="사이트 아이콘" />
            <S.BannerText>
              <S.BannerHighlight>현장 교환, 자동 매칭</S.BannerHighlight>
              으로{'\n'}더 편리하게 업데이트 예정!
            </S.BannerText>
          </S.Banner>
        </S.BackgroundSection>
      </S.Container>
    </>
  );
};

export default SellPage;
