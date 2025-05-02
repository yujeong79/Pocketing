import SlideUpModal from '@/components/common/SlideUpModal';
import SellerListItem from './SellerListItem';
import { sellerListMock } from '@/mocks/seller-list';
import { ModalContent } from './SellerListStyle';

interface SellerListModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardId: number;
}

const SellerListModal = ({ isOpen, onClose, cardId }: SellerListModalProps) => {
  const { content } = sellerListMock.result;
  const filteredContent = content.filter((seller) => seller.cardId === cardId);

  return (
    <SlideUpModal isOpen={isOpen} onClose={onClose} header="거래 상대 선택">
      <ModalContent>
        {filteredContent.map((seller) => (
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
