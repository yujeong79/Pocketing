import * as S from './SellerItemStyle';
import { VerifyIcon } from '@/assets/assets';
import { ReactNode } from 'react';

interface SellerItemProps {
  nickname: string;
  isVerified: boolean;
  profileImgUrl: string;
  price: number;
  children?: ReactNode;
}

const SellerItem: React.FC<SellerItemProps> = ({
  nickname,
  isVerified,
  profileImgUrl,
  price,
  children,
}: SellerItemProps) => {
  return (
    <S.ItemContainer>
      <S.ProfileSection>
        <S.ProfileImage src={profileImgUrl} alt="프로필 이미지" />
      </S.ProfileSection>
      <S.NickName>{nickname}</S.NickName>
      {isVerified && <S.VerifiedBadge src={VerifyIcon} alt="인증 아이콘" />}
      <S.PriceText>
        {children}
        {price.toLocaleString()}원
      </S.PriceText>
    </S.ItemContainer>
  );
};

export default SellerItem;
