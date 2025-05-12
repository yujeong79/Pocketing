import SlideUpModal from '@/components/common/SlideUpModal';
import SellerListItem from './SellerListItem';
import { ModalContent } from './SellerListStyle';
import { useSellerList } from '@/hooks/post/query/useList';
import { SellerListItem as SellerListItemType } from '@/types/seller';

interface SellerListModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardId: number;
}

const SellerListModal = ({ isOpen, onClose, cardId }: SellerListModalProps) => {
  const { data: sellerList } = useSellerList(cardId);

  return (
    <SlideUpModal isOpen={isOpen} onClose={onClose} height="75vh" header="거래 상대 선택">
      <ModalContent>
        {sellerList?.content.content.map((seller: SellerListItemType) => (
          <SellerListItem
            key={seller.postId}
            postId={seller.postId}
            nickname={seller.nickname}
            isVerified={seller.isVerified}
            price={seller.price}
            postImageUrl={seller.postImageUrl}
          />
        ))}
      </ModalContent>
    </SlideUpModal>
  );
};

export default SellerListModal;
