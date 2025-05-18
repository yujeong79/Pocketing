import { useEffect } from 'react';

import * as S from './MySaleListStyle';
import Header from '@/components/common/Header';
import Divider from './components/Divider';
import { DefaultProfileImage, RightArrowIcon } from '@/assets/assets';
import { useNavigate, useLocation } from 'react-router-dom';
import { formatDate } from '@/utils/formatDate';
import { useSales } from '@/hooks/sales/useSales';

const MySaleListPage = () => {
  const { mySales, fetchSales } = useSales();
  const navigate = useNavigate();
  const location = useLocation();

  const filteredList = mySales.filter((item) => item.createdAt).sort((a, b) => b.postId - a.postId);

  const fromRegister = location.state?.fromRegister;

  useEffect(() => {
    const handlePopState = () => {
      if (fromRegister) {
        navigate('/sell', { replace: true });
      }
    };
    // 뒤로가기를 감지
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [fromRegister, navigate]);

  // TODO: 추후 판매글 등록에서 fetch 함수를 호출하도록 변경
  useEffect(() => {
    if (mySales.length === 0) {
      fetchSales();
    }
  }, [mySales.length, fetchSales]);

  return (
    <S.PageContainer>
      <Header
        type="mySaleList"
        title="내 판매 목록"
        hasBorder={true}
        onBack={() => {
          if (location.state?.fromRegister) {
            navigate('/sell', { replace: true }); // ✅ 등록을 통해 온 경우
          } else {
            navigate(-1); // ✅ 일반적으로 접근한 경우
          }
        }}
      />
      <S.ContentContainer>
        {mySales.length === 0 ? (
          <S.NonItemContainer>
            <S.NonItemText>판매 내역이 없습니다.</S.NonItemText>
          </S.NonItemContainer>
        ) : (
          filteredList.map((mySales, index) => (
            <S.MySaleItemContainer
              key={index}
              onClick={() => navigate(`/detail/${mySales.postId}`)}
            >
              <S.MySaleItemDate>{formatDate(mySales.createdAt)}</S.MySaleItemDate>
              <S.MySaleItemInfoContainer>
                <S.InfoAndButtonContainer>
                  <S.InfoContainer>
                    <S.CardImage
                      src={mySales.postImageUrl ?? DefaultProfileImage}
                      alt="카드 이미지"
                    />
                    <S.CardInfoContainer>
                      <S.CardFirstLine>
                        <S.GroupContainer>
                          <S.Group>그룹</S.Group>
                          <S.TagContainer>
                            <S.Tag>{mySales.groupDisplayName ?? mySales.groupNameKo}</S.Tag>
                          </S.TagContainer>
                        </S.GroupContainer>
                        <S.MemberContainer>
                          <S.Member>멤버</S.Member>
                          <S.TagContainer>
                            <S.Tag>{mySales.memberName}</S.Tag>
                          </S.TagContainer>
                        </S.MemberContainer>
                      </S.CardFirstLine>
                      <S.CardSecondLine>
                        <S.AlbumContainer>
                          <S.Album>앨범</S.Album>
                          <S.TagContainer>
                            <S.Tag>{mySales.albumTitle}</S.Tag>
                          </S.TagContainer>
                        </S.AlbumContainer>
                      </S.CardSecondLine>
                    </S.CardInfoContainer>
                  </S.InfoContainer>
                  <S.RightArrowButton src={RightArrowIcon} alt="판매 상세 페이지 이동" />
                </S.InfoAndButtonContainer>
              </S.MySaleItemInfoContainer>
              <S.MySaleItemPriceContainer>
                <S.MySalePriceTitle>판매가</S.MySalePriceTitle>
                <S.MySaleItemPriceText>
                  <S.MySaleItemPrice>{mySales.price}</S.MySaleItemPrice>
                  <S.MySaleItemPriceWon>원</S.MySaleItemPriceWon>
                </S.MySaleItemPriceText>
                {index !== filteredList.length - 1 && <Divider />}
              </S.MySaleItemPriceContainer>
            </S.MySaleItemContainer>
          ))
        )}
      </S.ContentContainer>
    </S.PageContainer>
  );
};

export default MySaleListPage;
