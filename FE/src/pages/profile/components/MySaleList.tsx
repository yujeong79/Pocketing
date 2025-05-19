import { useNavigate } from 'react-router-dom';

import * as S from './MySaleListStyle';
import Divider from './Divider';
import { MySaleIcon, DefaultProfileImage, RightArrowIcon } from '@/assets/assets';
import { formatDate } from '@/utils/formatDate';
import { useSales } from '@/hooks/sales/useSales';

const MySaleList = () => {
  const navigate = useNavigate();
  const { mySales } = useSales();
  const filteredList = mySales
    .filter((item) => item.createdAt)
    .sort((a, b) => b.postId - a.postId)
    .slice(0, 2);

  return (
    <S.MySaleListContainer>
      <S.MySaleTitleContainer>
        <S.MySaleTitleLeftContainer>
          <S.MySaleTitleIcon src={MySaleIcon} alt="판매 목록" />
          <S.MySaleTitle>내 판매 목록</S.MySaleTitle>
        </S.MySaleTitleLeftContainer>
        <S.MySaleDetailButton onClick={() => navigate('/mySaleList')}>더보기</S.MySaleDetailButton>
      </S.MySaleTitleContainer>
      {mySales.length === 0 ? (
        <S.NonItemContainer>
          <S.NonItemText>판매 내역이 없습니다.</S.NonItemText>
        </S.NonItemContainer>
      ) : (
        filteredList.map((mySales, index) => (
          <S.MySaleItemContainer key={index} onClick={() => navigate(`/detail/${mySales.postId}`)}>
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
    </S.MySaleListContainer>
  );
};

export default MySaleList;
