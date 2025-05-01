import { VerifyIcon, BracketIcon } from '@/assets/assets';
import * as S from './SellerListStyle';

interface SellerListItemProps {
  postId: number;
  nickname: string;
  isVerified: boolean;
  price: number;
  postImageUrl: string;
}

const SellerListItem = ({
  postId,
  nickname,
  isVerified,
  price,
  postImageUrl,
}: SellerListItemProps) => {
  const handleClick = () => {
    console.log(`${postId}번 거래 상세글로 이동`);
  };

  return (
    <S.ItemContainer onClick={handleClick}>
      <S.ItemContent>
        <S.PhotoCard src={postImageUrl} alt="포토카드" />
        <S.InfoContainer>
          <S.NicknameWrapper>
            <S.Nickname>{nickname}</S.Nickname>
            {isVerified && <S.VerifyIconWrapper src={VerifyIcon} alt="인증됨" />}
          </S.NicknameWrapper>
          <S.PriceWrapper>
            <S.Price>{price.toLocaleString()}원</S.Price>
            <S.BracketIconWrapper src={BracketIcon} alt="화살표" />
          </S.PriceWrapper>
        </S.InfoContainer>
      </S.ItemContent>
      <S.Divider />
    </S.ItemContainer>
  );
};

export default SellerListItem;
