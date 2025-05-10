import { usePostList } from '@/hooks/post/query/usePost';
import PhotoCardItem from './PhotoCardItem';
import { ListContainer, ListWrapper } from './PhotoCardStyle';
import { PostContent } from '@/types/post';

interface PhotoCardListProps {
  selectedMember: number | null;
  selectedAlbumId: number | null;
  groupId: number;
}

const PhotoCardList = ({ selectedMember, selectedAlbumId, groupId }: PhotoCardListProps) => {
  const { data } = usePostList(
    selectedMember === null ? 0 : selectedMember,
    groupId,
    selectedAlbumId,
    0,
    10
  );
  const postList = data?.content || [];

  if (!groupId) return null;

  return (
    <ListContainer>
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
    </ListContainer>
  );
};

export default PhotoCardList;
