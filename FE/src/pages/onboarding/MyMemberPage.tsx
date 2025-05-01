import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

import * as S from './MyMemberStyle';
import BackButton from '@/pages/onboarding/components/BackButton';
import Button from '@/components/common/Button';
import { artistList } from '@/mocks/artist';
import MemberItem from './components/MemberItem';

const MyMemberPage = () => {
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
      <Button text="다음" onClick={() => navigate('/signup/complete')} />
    </S.PageContainer>
  );
};

export default MyMemberPage;
