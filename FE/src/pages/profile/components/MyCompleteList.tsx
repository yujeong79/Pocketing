import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from './MyCompleteListStyle';
import Divider from './Divider';
import { MySaleCompleteIcon, DefaultProfileImage, RightArrowIcon } from '@/assets/assets';
import { getMyCompleteSales } from '@/api/user/mySales';
import { MyCompleteListResponse } from '@/types/mySale';
import { formatDate } from '@/utils/formatDate';

const MyCompleteList = () => {
  const [myCompleteSales, setMyCompleteSales] = useState<MyCompleteListResponse[]>([]);
  const navigate = useNavigate();
  const filteredList = myCompleteSales
    .filter((item) => !item.createdAt)
    .sort((a, b) => b.postId - a.postId)
    .slice(0, 2);

  const handleGetMyCompleteSales = useCallback(async () => {
    try {
      const response = await getMyCompleteSales();
      setMyCompleteSales(response.result);
    } catch (error) {
      throw error;
    }
  }, []);

  useEffect(() => {
    handleGetMyCompleteSales();
  }, [handleGetMyCompleteSales]);

  return (
    <S.MyCompleteListContainer>
      <S.MyCompleteTitleContainer>
        <S.MyCompleteTitleLeftContainer>
          <S.MyCompleteTitleIcon src={MySaleCompleteIcon} alt="판매 목록" />
          <S.MyCompleteTitle>판매 완료 목록</S.MyCompleteTitle>
        </S.MyCompleteTitleLeftContainer>
        <S.MyCompleteDetailButton onClick={() => navigate('/myCompleteList')}>
          더보기
        </S.MyCompleteDetailButton>
      </S.MyCompleteTitleContainer>
      {myCompleteSales.length === 0 ? (
        <S.NonItemContainer>
          <S.NonItemText>판매 완료 내역이 없습니다.</S.NonItemText>
        </S.NonItemContainer>
      ) : (
        filteredList.map((mySale, index) => (
          <S.MyCompleteItemContainer key={index}>
            <S.MyCompleteItemDate>{formatDate(mySale.createdAt)}</S.MyCompleteItemDate>
            <S.MyCompleteItemInfoContainer>
              <S.InfoAndButtonContainer>
                <S.InfoContainer>
                  <S.CardImage src={mySale.postImageUrl ?? DefaultProfileImage} alt="카드 이미지" />
                  <S.CardInfoContainer>
                    <S.CardFirstLine>
                      <S.GroupContainer>
                        <S.Group>그룹</S.Group>
                        <S.TagContainer>
                          <S.Tag>{mySale.groupDisplayName ?? mySale.groupNameKo}</S.Tag>
                        </S.TagContainer>
                      </S.GroupContainer>
                      <S.MemberContainer>
                        <S.Member>멤버</S.Member>
                        <S.TagContainer>
                          <S.Tag>{mySale.memberName}</S.Tag>
                        </S.TagContainer>
                      </S.MemberContainer>
                    </S.CardFirstLine>
                    <S.CardSecondLine>
                      <S.AlbumContainer>
                        <S.Album>앨범</S.Album>
                        <S.TagContainer>
                          <S.Tag>{mySale.albumTitle}</S.Tag>
                        </S.TagContainer>
                      </S.AlbumContainer>
                    </S.CardSecondLine>
                  </S.CardInfoContainer>
                </S.InfoContainer>
                <S.RightArrowButton src={RightArrowIcon} alt="판매 상세 페이지 이동" />
              </S.InfoAndButtonContainer>
            </S.MyCompleteItemInfoContainer>
            <S.MyCompleteItemPriceContainer>
              <S.MyCompletePriceTitle>판매가</S.MyCompletePriceTitle>
              <S.MyCompleteItemPriceText>
                <S.MyCompleteItemPrice>{mySale.price}</S.MyCompleteItemPrice>
                <S.MyCompleteItemPriceWon>원</S.MyCompleteItemPriceWon>
              </S.MyCompleteItemPriceText>
              {index !== filteredList.length - 1 && <Divider />}
            </S.MyCompleteItemPriceContainer>
          </S.MyCompleteItemContainer>
        ))
      )}
    </S.MyCompleteListContainer>
  );
};

export default MyCompleteList;
