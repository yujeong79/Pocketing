import { useEffect } from 'react';

import * as S from './MyCompleteListStyle';
import Header from '@/components/common/Header';
import Divider from './components/Divider';
import { DefaultProfileImage, RightArrowIcon } from '@/assets/assets';
import { formatDate } from '@/utils/formatDate';
import { useGlobalStore } from '@/store/globalStore';
import { useCompleteSales } from '@/hooks/sales/useSales';

const MyCompleteListPage = () => {
  const { isCompleteSalesLoading, setIsCompleteSalesLoading } = useGlobalStore();
  const { myCompleteSales, fetchCompleteSales } = useCompleteSales();

  const filteredList = myCompleteSales.sort((a, b) => b.postId - a.postId);

  useEffect(() => {
    if (!isCompleteSalesLoading) {
      fetchCompleteSales();
      setIsCompleteSalesLoading(true);
    }
  }, [isCompleteSalesLoading, fetchCompleteSales, setIsCompleteSalesLoading]);

  return (
    <S.PageContainer>
      <Header type="mySaleList" title="판매 완료 목록" hasBorder={true} />
      <S.ContentContainer>
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
                    <S.CardImage
                      src={mySale.postImageUrl ?? DefaultProfileImage}
                      alt="카드 이미지"
                    />
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
                  <S.MyCompleteItemPrice>{mySale.price.toLocaleString()}</S.MyCompleteItemPrice>
                  <S.MyCompleteItemPriceWon>원</S.MyCompleteItemPriceWon>
                </S.MyCompleteItemPriceText>
                {index !== filteredList.length - 1 && <Divider />}
              </S.MyCompleteItemPriceContainer>
            </S.MyCompleteItemContainer>
          ))
        )}
      </S.ContentContainer>
    </S.PageContainer>
  );
};

export default MyCompleteListPage;
