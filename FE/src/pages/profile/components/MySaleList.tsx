import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

import * as S from './MySaleListStyle';
import Divider from './Divider';
import { MySaleIcon, DefaultProfileImage, RightArrowIcon } from '@/assets/assets';
import { getMySales } from '@/api/user/mySales';
import { MySaleListResponse } from '@/types/mySale';

const MySaleList = () => {
  const [mySales, setMySales] = useState<MySaleListResponse[]>([]);
  const navigate = useNavigate();
  const filteredList = mySales.filter((item) => item.createdAt).slice(0, 2);

  const handleGetMySales = useCallback(async () => {
    try {
      const response = await getMySales();
      setMySales(response.result);
      console.log(response);
      console.log(mySales);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    handleGetMySales();
  }, [handleGetMySales]);

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
          <S.MySaleItemContainer key={index}>
            <S.MySaleItemDate>{mySales.createdAt}</S.MySaleItemDate>
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
                          <S.Tag>{mySales.groupNameKo}</S.Tag>
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
