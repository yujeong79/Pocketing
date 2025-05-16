import Header from '@/components/common/Header';
import { useParams, useNavigate } from 'react-router-dom';
import * as S from './DetailPageStyle';
import InfoChip from './components/Chip/InfoChip';
import SellerItem from './components/Seller/SellerItem';
import Button from '@/components/common/Button';
import { usePostDetail } from '@/hooks/post/query/usePost';
import { createOrGetChatRoom, enterChatRoom } from '@/api/chat';
import { useAuth } from '@/hooks/useAuth';
import { DeleteIcon, CashEditIcon } from '@/assets/assets';
import ConfirmModal from '@/components/common/ConfirmModal';
import { useDeletePost, useUpdatePostPrice } from '@/hooks/post/mutation/usePost';
import { useToastStore } from '@/store/toastStore';
import { useState } from 'react';
import InputModal from '@/components/common/InputModal';

const DetailPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const { data: postDetail, isLoading, isError, error } = usePostDetail(Number(postId));
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const deletePostMutation = useDeletePost();
  const showToast = useToastStore((state) => state.showToast);
  const updatePriceMutation = useUpdatePostPrice();
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [priceInput, setPriceInput] = useState(postDetail?.price.toString() || '');

  console.log('DetailPage 렌더링:', {
    postId,
    postDetail,
    isLoading,
    isError,
    error,
    user,
  });

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError) {
    console.error('상세 정보 로드 실패:', error);
    return <div>상세 정보를 불러오는데 실패했습니다.</div>;
  }

  if (!postDetail || !user) {
    console.log('데이터 없음:', { postDetail, user });
    return null;
  }

  const { card, seller } = postDetail;

  const handleChatButtonClick = async () => {
    try {
      const createResponse = await createOrGetChatRoom(
        user.userId,
        seller.sellerId,
        Number(postId)
      );

      if (createResponse.isSuccess) {
        const roomId = createResponse.result.roomId;
        // 채팅방 입장 API 호출
        const enterResponse = await enterChatRoom(roomId);

        if (enterResponse.isSuccess) {
          navigate(`/message/${roomId}`, {
            state: {
              nickname: seller.nickname,
              chatType: 'TRADE',
              chatRoomDetail: enterResponse.result,
            },
          });
        }
      }
    } catch (error) {
      console.error('채팅방 생성 또는 입장 실패:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePostMutation.mutateAsync(Number(postId));
      showToast('success', '판매글이 삭제되었습니다.');
      navigate('/main');
    } catch (e) {
      console.error('삭제 실패:', e);
      showToast('warning', '삭제에 실패했습니다.');
    }
  };

  const handleEditPrice = () => {
    setPriceInput(postDetail.price.toString());
    setIsPriceModalOpen(true);
  };

  const handleConfirmPrice = async (input: string) => {
    const newPrice = Number(input);
    if (isNaN(newPrice) || newPrice <= 0) {
      showToast('warning', '올바른 가격을 입력하세요.');
      return;
    }
    try {
      await updatePriceMutation.mutateAsync({ postId: Number(postId), price: newPrice });
      showToast('success', '가격이 수정되었습니다.');
    } catch {
      showToast('warning', '가격 수정에 실패했습니다.');
    }
    setIsPriceModalOpen(false);
  };

  return (
    <div>
      <Header
        type="detail"
        rightElement={
          user.userId === seller.sellerId ? (
            <img
              src={DeleteIcon}
              alt="삭제"
              style={{ cursor: 'pointer' }}
              onClick={() => setIsModalOpen(true)}
            />
          ) : undefined
        }
      />
      <S.DetailPageContainer>
        <S.ContentSection>
          <S.GraySection>
            <S.InformationText>
              포토카드는 판매자가 등록한 이미지로,{'\n'} 촬영 환경에 따라 실제 포토카드와 차이가
              있을 수 있어요.
            </S.InformationText>
            <S.PhotoCardImage src={postDetail.postImageUrl} alt="포토카드 이미지" />
            <S.ChipsContainer>
              <S.InfoChipContainer>
                <InfoChip label={card.groupDisplayName} />
                <InfoChip label={card.memberName} />
              </S.InfoChipContainer>
              <S.InfoChipContainer>
                <InfoChip label={card.albumTitle} />
              </S.InfoChipContainer>
            </S.ChipsContainer>
          </S.GraySection>
          <S.SellerSection>
            <SellerItem
              nickname={seller.nickname}
              isVerified={seller.isVerified}
              profileImgUrl={seller.profileImageUrl}
              price={postDetail.price}
            >
              {user.userId === seller.sellerId && (
                <S.PriceEditIcon src={CashEditIcon} alt="가격 수정" onClick={handleEditPrice} />
              )}
            </SellerItem>
          </S.SellerSection>
        </S.ContentSection>
        <S.ButtonWrapper>
          {user.userId !== seller.sellerId && (
            <Button
              text="채팅하기"
              height={40}
              fontStyle="headingSmall"
              onClick={handleChatButtonClick}
            />
          )}
        </S.ButtonWrapper>
      </S.DetailPageContainer>
      {isModalOpen && (
        <ConfirmModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDelete}
          title="정말 삭제하시겠습니까?"
        />
      )}
      <InputModal
        isOpen={isPriceModalOpen}
        onClose={() => setIsPriceModalOpen(false)}
        onConfirm={handleConfirmPrice}
        title="가격 수정"
        defaultValue={priceInput}
        confirmText="수정"
        cancelText="취소"
      />
    </div>
  );
};

export default DetailPage;
