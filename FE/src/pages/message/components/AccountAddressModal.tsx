import SlideUpModal from '@/components/common/SlideUpModal';
import * as S from '@/pages/message/components/StateModalStyle';
interface AccountAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (type: 'account' | 'address') => void;
}

const AccountAddressModal = ({ isOpen, onClose, onSelect }: AccountAddressModalProps) => {
  return (
    <SlideUpModal isOpen={isOpen} onClose={onClose} height="26vh" isCloseButtonHidden={true}>
      <S.StateList>
        <S.StateItem
          $isSelected={false}
          onClick={() => {
            onSelect('account');
            onClose();
          }}
        >
          계좌 보내기
        </S.StateItem>
        <S.StateItem
          $isSelected={false}
          onClick={() => {
            onSelect('address');
            onClose();
          }}
        >
          주소 보내기
        </S.StateItem>
      </S.StateList>
    </SlideUpModal>
  );
};

export default AccountAddressModal;
