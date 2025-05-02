import { useNavigate } from 'react-router-dom';

import * as S from './MySaleListStyle';
import { MySaleIcon, DefaultProfileImage, RightArrowIcon } from '@/assets/assets';
import { mySale } from '@/mocks/myInfo';
import Divider from './Divider';

const MySaleList = () => {
  const navigate = useNavigate();
  const filteredList = mySale.filter((item) => item.sale).slice(0, 2);

  return (
    <S.MySaleListContainer>
      <S.MySaleTitleContainer>
        <S.MySaleTitleLeftContainer>
          <S.MySaleTitleIcon src={MySaleIcon} alt="판매 목록" />
          <S.MySaleTitle>내 판매 목록</S.MySaleTitle>
        </S.MySaleTitleLeftContainer>
        <S.MySaleDetailButton onClick={() => navigate('/mySaleList')}>더보기</S.MySaleDetailButton>
      </S.MySaleTitleContainer>
      {filteredList.map((mySale, index) => (
        <S.MySaleItemContainer key={index}>
          <S.MySaleItemDate>{mySale.date}</S.MySaleItemDate>
          <S.MySaleItemInfoContainer>
            <S.InfoAndButtonContainer>
              <S.InfoContainer>
                <S.CardImage src={mySale.image ?? DefaultProfileImage} alt="카드 이미지" />
                <S.CardInfoContainer>
                  <S.CardFirstLine>
                    <S.GroupContainer>
                      <S.Group>그룹</S.Group>
                      <S.TagContainer>
                        <S.Tag>{mySale.group}</S.Tag>
                      </S.TagContainer>
                    </S.GroupContainer>
                    <S.MemberContainer>
                      <S.Member>멤버</S.Member>
                      <S.TagContainer>
                        <S.Tag>{mySale.member}</S.Tag>
                      </S.TagContainer>
                    </S.MemberContainer>
                  </S.CardFirstLine>
                  <S.CardSecondLine>
                    <S.AlbumContainer>
                      <S.Album>앨범</S.Album>
                      <S.TagContainer>
                        <S.Tag>{mySale.album}</S.Tag>
                      </S.TagContainer>
                    </S.AlbumContainer>
                  </S.CardSecondLine>
                  <S.CardThirdLine>
                    <S.VersionContainer>
                      <S.Version>버전</S.Version>
                      <S.TagContainer>
                        <S.Tag>{mySale.version}</S.Tag>
                      </S.TagContainer>
                    </S.VersionContainer>
                  </S.CardThirdLine>
                </S.CardInfoContainer>
              </S.InfoContainer>
              <S.RightArrowButton src={RightArrowIcon} alt="판매 상세 페이지 이동" />
            </S.InfoAndButtonContainer>
          </S.MySaleItemInfoContainer>
          <S.MySaleItemPriceContainer>
            <S.MySalePriceTitle>판매가</S.MySalePriceTitle>
            <S.MySaleItemPriceText>
              <S.MySaleItemPrice>{mySale.price}</S.MySaleItemPrice>
              <S.MySaleItemPriceWon>원</S.MySaleItemPriceWon>
            </S.MySaleItemPriceText>
            {index !== filteredList.length - 1 && <Divider />}
          </S.MySaleItemPriceContainer>
        </S.MySaleItemContainer>
      ))}
    </S.MySaleListContainer>
  );
};

export default MySaleList;
