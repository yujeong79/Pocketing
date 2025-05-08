import { useNavigate } from 'react-router-dom';

import * as S from './MyGroupStyle';
import BackButton from '@/pages/onboarding/components/BackButton';
import Button from '@/components/common/Button';
import { SearchIcon } from '@/assets/assets';
import { useGroups } from '@/hooks/artist/query/useGroups';
import { Group } from '@/types/group';

const MyGroupPage = () => {
  const navigate = useNavigate();
  const { data: groupsData } = useGroups();

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
          {groupsData?.result?.map((group: Group) => (
            <S.GroupInfo key={group.groupId} onClick={() => navigate(`/member/${group.groupId}`)}>
              <S.GroupImage src={group.groupImageUrl} />
              <S.GroupName>{group.groupNameKo}</S.GroupName>
            </S.GroupInfo>
          ))}
        </S.GroupListContainer>
      </S.ItemContainer>
      <Button text="다음" onClick={() => navigate('/signup/complete')} />
    </S.PageContainer>
  );
};

export default MyGroupPage;
