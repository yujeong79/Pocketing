import * as S from './SellerItemStyle';
import { VerifyIcon } from '@/assets/assets';

interface SellerItemProps {
  nickname: string;
  isVerified: boolean;
  profileImgUrl: string;
  price: number;
}

const SellerItem: React.FC<SellerItemProps> = ({
  nickname,
  isVerified,
  profileImgUrl,
  price,
}: SellerItemProps) => {
  return (
    <S.ItemContainer>
      <S.ProfileSection>
        <S.ProfileImage src={profileImgUrl} alt="프로필 이미지" />
      </S.ProfileSection>
      <S.NickName>{nickname}</S.NickName>
      {isVerified && <S.VerifiedBadge src={VerifyIcon} alt="인증 아이콘" />}
      <S.PriceText>{price.toLocaleString()}원</S.PriceText>
    </S.ItemContainer>
  );
};

export default SellerItem;
