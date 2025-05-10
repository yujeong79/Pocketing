import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

import * as S from './MyMemberEditStyle';
import BackButton from '@/pages/onboarding/components/BackButton';
import Button from '@/components/common/Button';
import { artistList } from '@/mocks/artist';
import MemberItem from '@/pages/onboarding/components/MemberItem';

// TODO:렌더링이 느린 감이 있음. 최적화 필요
// 아이콘이 커서 클릭시 늘어나는 느낌이 있음. 조정 필요
// 멤버를 선택했을 시 그룹에 효과를 넣어야함

const MyMemberEditPage = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const selectedGroup = artistList.find((artist) => artist.groupId === Number(groupId));

  if (!selectedGroup) {
    return null;
  }

  const handleMemberClick = (member: string) => {
    setSelectedMembers((prev) =>
      prev.includes(member) ? prev.filter((name) => name !== member) : [...prev, member]
    );
  };

  return (
    <S.PageContainer>
      <S.ItemContainer>
        <BackButton />
        <S.Title>관심 멤버를 선택해주세요</S.Title>
        <S.MemberListContainer>
          {selectedGroup.members.map((member) => (
            <MemberItem
              key={member}
              member={member}
              isSelected={selectedMembers.includes(member)}
              onPressed={() => handleMemberClick(member)}
            />
          ))}
        </S.MemberListContainer>
      </S.ItemContainer>
      <Button text="다음" onClick={() => navigate('/myGroupEdit')} />
    </S.PageContainer>
  );
};

export default MyMemberEditPage;
