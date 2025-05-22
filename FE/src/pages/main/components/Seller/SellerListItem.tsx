import { VerifyIcon, BracketIcon } from '@/assets/assets';
import * as S from './SellerListStyle';
import { useNavigate } from 'react-router-dom';

export interface SellerListItemProps {
  postId: number;
  nickname: string;
  isVerified: boolean;
  price: number;
  postImageUrl: string;
  infoWidth?: number;
}

const SellerListItem = ({
  postId,
  nickname,
  isVerified,
  price,
  postImageUrl,
  infoWidth,
}: SellerListItemProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/detail/${postId}`);
  };

  return (
    <S.ItemContainer onClick={handleClick}>
      <S.ItemContent>
        <S.PhotoCard src={postImageUrl} alt="포토카드" />
        <S.InfoContainer style={infoWidth ? { width: infoWidth } : {}}>
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
