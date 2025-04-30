import styled from 'styled-components';
import GroupImage from './GroupImage/GroupImage';
import { useNavigate } from 'react-router-dom';

interface Group {
  groupId: number;
  name: string;
  image: string;
  members: string[];
}

interface GroupImageListProps {
  groups: Group[];
}

const GroupImageList = ({ groups }: GroupImageListProps) => {
  const navigate = useNavigate();

  return (
    <StyledGroupImageWrapper>
      <StyledGroupImageList>
        <GroupImage type="all" />
        {groups.map((group) => (
          <GroupImage
            key={group.groupId}
            type="interest"
            groupImageUrl={group.image}
            onClick={() => {
              // 멤버 목록 표시 로직 추가 예정
            }}
          />
        ))}
        <GroupImage type="add" onClick={() => navigate('/group/add')} />
      </StyledGroupImageList>
    </StyledGroupImageWrapper>
  );
};

const StyledGroupImageWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledGroupImageList = styled.div`
  display: flex;
  gap: 8px;
  padding: 0 16px;
  white-space: nowrap;
  width: fit-content;
  min-width: 100%;
`;

export default GroupImageList;
