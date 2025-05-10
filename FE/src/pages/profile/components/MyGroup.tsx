import * as S from './MyGroupStyle';
import { PhotocardIcon } from '@/assets/assets';
import { myArtist } from '@/mocks/myInfo';

interface MyGroupProps {
  onEditGroup: () => void;
}

const MyGroup = ({ onEditGroup }: MyGroupProps) => {
  return (
    <S.GroupContainer>
      <S.GroupTitleContainer>
        <S.GroupTitleIcon src={PhotocardIcon} alt="그룹 아이콘" />
        <S.GroupTitle>관심 그룹</S.GroupTitle>
      </S.GroupTitleContainer>
      <S.GroupLogoContainer>
        {myArtist.map((artist, index) => (
          <S.GroupLogo key={artist.groupId ?? index} src={artist.image} alt={artist.name} />
        ))}
        <S.MoreGroupButton onClick={onEditGroup}>+</S.MoreGroupButton>
      </S.GroupLogoContainer>
    </S.GroupContainer>
  );
};

export default MyGroup;
