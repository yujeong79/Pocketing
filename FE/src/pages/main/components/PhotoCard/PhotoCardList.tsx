import { usePostList } from '@/hooks/post/query/useList';
import PhotoCardItem from './PhotoCardItem';
import {
  ListContainer,
  ListWrapper,
  EmptyCartImage,
  EmptyContainer,
  EmptyText,
} from './PhotoCardStyle';
import { PostContent } from '@/types/post';
import { EmptyCartIcon } from '@/assets/assets';

interface PhotoCardListProps {
  selectedMember: number | null;
  selectedAlbumId: number | null;
  groupId: number;
}

const PhotoCardList = ({ selectedMember, selectedAlbumId, groupId }: PhotoCardListProps) => {
  const { data } = usePostList(selectedMember, groupId, selectedAlbumId, 0, 10);
  const postList = data?.content || [];

  if (!groupId) return null;

  return (
    <ListContainer>
      {postList.length === 0 ? (
        <EmptyContainer>
          <EmptyCartImage src={EmptyCartIcon} alt="빈 카드" />
          <EmptyText>아직 등록된 판매글이 없어요!</EmptyText>
        </EmptyContainer>
      ) : (
        <ListWrapper>
          {postList.map((post: PostContent) => (
            <PhotoCardItem
              key={post.postId}
              cardId={post.cardId}
              imageUrl={post.postImageUrl}
              albumTitle={post.albumTitle}
              avgPrice={post.avgPrice}
            />
          ))}
        </ListWrapper>
      )}
    </ListContainer>
  );
};

export default PhotoCardList;
