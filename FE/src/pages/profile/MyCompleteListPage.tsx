import * as S from './MyCompleteListStyle';
import Header from '@/components/common/Header';
import { mySale } from '@/mocks/myInfo';
import { DefaultProfileImage, RightArrowIcon } from '@/assets/assets';
import Divider from './components/Divider';

const MyCompleteListPage = () => {
  const filteredList = mySale.filter((item) => !item.sale);
  return (
    <S.PageContainer>
      <Header type="mySaleList" title="판매 완료 목록" hasBorder={true} />
      <S.ContentContainer>
        {filteredList.map((mySale, index) => (
          <S.MyCompleteItemContainer key={index}>
            <S.MyCompleteItemDate>{mySale.date}</S.MyCompleteItemDate>
            <S.MyCompleteItemInfoContainer>
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
        ))}
      </S.ContentContainer>
    </S.PageContainer>
  );
};

export default MyCompleteListPage;
