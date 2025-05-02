import Header from '@/components/common/Header';
import { useParams } from 'react-router-dom';
import * as S from './DetailPageStyle';
import InfoChip from './components/Chip/InfoChip';
import { postDetailMock } from '@/mocks/post-detail';
import SellerItem from './components/Seller/SellerItem';
import Button from '@/components/common/Button';

const DetailPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const postDetail = postDetailMock[Number(postId)];

  if (!postDetail) {
    return null;
  }

  const { card, seller } = postDetail.result;

  return (
    <div>
      <Header type="detail" />
      <S.DetailPageContainer>
        <S.ContentSection>
          <S.GraySection>
            <S.InformationText>
              포토카드는 판매자가 등록한 이미지로,{'\n'} 촬영 환경에 따라 실제 포토카드와 차이가
              있을 수 있어요.
            </S.InformationText>
            <S.PhotoCardImage src={postDetail.result.postImageUrl} alt="포토카드 이미지" />
            <S.ChipsContainer>
              <InfoChip label={card.groupNameKo} />
              <InfoChip label={card.memberName} />
              <InfoChip label={card.albumTitle} />
            </S.ChipsContainer>
          </S.GraySection>
          <S.SellerSection>
            <SellerItem
              nickname={seller.nickname}
              isVerified={seller.isVerified}
              profileImgUrl={seller.profileImageUrl}
              price={postDetail.result.price}
            />
          </S.SellerSection>
        </S.ContentSection>
        <S.ButtonWrapper>
          <Button text="채팅하기" height={40} fontStyle="headingSmall" />
        </S.ButtonWrapper>
      </S.DetailPageContainer>
    </div>
  );
};

export default DetailPage;
