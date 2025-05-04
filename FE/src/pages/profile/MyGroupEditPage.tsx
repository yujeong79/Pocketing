import { useNavigate } from 'react-router-dom';

import * as S from './MyGroupEditStyle';
import BackButton from '@/pages/onboarding/components/BackButton';
import Button from '@/components/common/Button';
import { SearchIcon } from '@/assets/assets';
import { artistList } from '@/mocks/artist';

const MyGroupEditPage = () => {
  const navigate = useNavigate();

  return (
    <S.PageContainer>
      <S.ItemContainer>
        <BackButton />
        <S.Title>관심 그룹을 선택해주세요</S.Title>
        <S.SearchContainer>
          <S.SearchInput placeholder="그룹명을 검색해주세요" />
          <S.SearchIcon src={SearchIcon} />
        </S.SearchContainer>
        <S.GroupListContainer>
          {artistList.map((artist) => (
            <S.GroupInfo
              key={artist.groupId}
              onClick={() => navigate(`/myMemberEdit/${artist.groupId}`)}
            >
              <S.GroupImage src={artist.image} />
              <S.GroupName>{artist.name}</S.GroupName>
            </S.GroupInfo>
          ))}
        </S.GroupListContainer>
      </S.ItemContainer>
      <Button text="완료" onClick={() => navigate('/profile')} />
    </S.PageContainer>
  );
};

export default MyGroupEditPage;
