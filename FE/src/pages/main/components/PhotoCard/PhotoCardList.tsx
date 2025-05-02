import PhotoCardItem from './PhotoCardItem';
import { photocardListMock } from '@/mocks/photocard-list';
import { artistList } from '@/mocks/artist';
import { ListContainer, ListWrapper } from './PhotoCardStyle';

interface PhotoCardListProps {
  selectedGroupId: number | null;
  selectedMember: string | null;
  selectedAlbum: string | null;
}

const PhotoCardList = ({ selectedGroupId, selectedMember, selectedAlbum }: PhotoCardListProps) => {
  const { content } = photocardListMock.result;

  const filteredContent = content.filter((card) => {
    // 전체 선택 상태일 때
    if (!selectedGroupId) return true;

    const selectedGroup = artistList.find((group) => group.groupId === selectedGroupId);
    if (!selectedGroup) return false;

    // 그룹만 선택된 상태일 때
    if (selectedGroupId && !selectedMember) {
      if (selectedAlbum) {
        return card.groupNameKo === selectedGroup.name && card.albumTitle === selectedAlbum;
      }
      return card.groupNameKo === selectedGroup.name;
    }

    // 그룹과 멤버가 모두 선택된 상태일 때
    if (selectedAlbum) {
      return (
        card.groupNameKo === selectedGroup.name &&
        card.memberName === selectedMember &&
        card.albumTitle === selectedAlbum
      );
    }
    return card.groupNameKo === selectedGroup.name && card.memberName === selectedMember;
  });

  return (
    <ListContainer>
      <ListWrapper>
        {filteredContent.map((card) => (
          <PhotoCardItem
            key={card.postId}
            cardId={card.cardId}
            imageUrl={card.postImageUrl}
            albumTitle={card.albumTitle}
            avgPrice={card.avgPrice}
          />
        ))}
      </ListWrapper>
    </ListContainer>
  );
};

export default PhotoCardList;
