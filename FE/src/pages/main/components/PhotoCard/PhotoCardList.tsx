import { useRef, useEffect } from 'react';
import { useInfinitePostList } from '@/hooks/post/query/useList';
import PhotoCardItem from './PhotoCardItem';
import {
  ListContainer,
  ListWrapper,
  EmptyCartImage,
  EmptyContainer,
  EmptyText,
} from '@/pages/main/components/PhotoCard/PhotoCardStyle';
import { PostContent } from '@/types/post';
import { EmptyCartIcon } from '@/assets/assets';
import { LoadingChip } from '@/components/common/LoadingChip';

interface PhotoCardListProps {
  selectedMember: number | null;
  selectedAlbumId: number | null;
  groupId: number;
}

const PhotoCardList = ({ selectedMember, selectedAlbumId, groupId }: PhotoCardListProps) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfinitePostList(
    selectedMember,
    groupId,
    selectedAlbumId,
    5
  );

  // 모든 페이지의 포스트 합치기
  const postList = data?.pages.flatMap((page) => page.content) || [];

  // 중복 제거
  const uniqueCardList = postList.filter(
    (post, idx, arr) => arr.findIndex((p) => p.cardId === post.cardId) === idx
  );

  // Intersection Observer로 마지막 요소 감지
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );
    const currentRef = observerRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (!groupId) return null;

  return (
    <ListContainer>
      {uniqueCardList.length === 0 ? (
        <EmptyContainer>
          <EmptyCartImage src={EmptyCartIcon} alt="빈 카드" />
          <EmptyText>아직 등록된 판매글이 없어요!</EmptyText>
        </EmptyContainer>
      ) : (
        <ListWrapper>
          {uniqueCardList.map((post: PostContent) => (
            <PhotoCardItem
              key={post.postId}
              cardId={post.cardId}
              imageUrl={post.postImageUrl}
              albumTitle={post.albumTitle}
              avgPrice={post.avgPrice}
            />
          ))}
          {/* 마지막에 감시용 div 추가 */}
          <div ref={observerRef} style={{ height: 1 }} />
        </ListWrapper>
      )}
      {isFetchingNextPage && (
        <div>
          <LoadingChip />
        </div>
      )}
    </ListContainer>
  );
};

export default PhotoCardList;
