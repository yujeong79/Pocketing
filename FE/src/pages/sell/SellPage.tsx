import Header from '@/components/common/Header';
import { PhotocardIcon, PencilIcon, SpeakerIcon, WalletIcon, SiteIcon } from '@/assets/assets';
import * as S from './SellPageStyle';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '@/hooks/user/useProfile';
import { useGlobalStore } from '@/store/globalStore';
import { useEffect } from 'react';
import { useSales } from '@/hooks/sales/useSales';

const SellPage = () => {
  const { myProfile, fetchProfile } = useProfile();
  const { mySales, fetchSales } = useSales();
  const { setIsProfileLoading, isProfileLoading, isSalesLoading, setIsSalesLoading } =
    useGlobalStore();

  useEffect(() => {
    if (!isProfileLoading) {
      fetchProfile();
      setIsProfileLoading(true);
    }

    if (!isSalesLoading) {
      fetchSales();
      setIsSalesLoading(true);
    }
  }, [
    isProfileLoading,
    isSalesLoading,
    fetchProfile,
    fetchSales,
    setIsProfileLoading,
    setIsSalesLoading,
  ]);

  const handleGuideClick = () => {
    console.log('이용방법 버튼 클릭');
  };

  const handleMyPostsClick = () => {
    navigate('/mySaleList');
  };

  const navigate = useNavigate();
  return (
    <>
      <Header type="main" />
      <S.Container>
        <S.TopContainer>
          <S.TextContainer>
            <S.TextWrapper>
              <S.NicknameText>{myProfile?.nickname}</S.NicknameText>
              <S.DefaultText> 님은{'\n'}</S.DefaultText>
              <S.CountText>{mySales?.length}</S.CountText>
              <S.DefaultText>개의 포토카드를{'\n'}판매하고 있어요</S.DefaultText>
            </S.TextWrapper>
          </S.TextContainer>
          <S.PhotocardIconWrapper src={PhotocardIcon} alt="포토카드 아이콘" />
        </S.TopContainer>

        <S.BackgroundSection>
          <S.ButtonContainer>
            <S.RegisterButton onClick={() => navigate('/guide')}>
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
