import { PlusIcon, RefreshIcon } from '@/assets/assets';
import { StyledGroupImage, RefreshIconWrapper, ImageContainer } from './GroupImageStyle';

interface GroupImageProps {
  type: 'interest' | 'all' | 'add';
  groupImageUrl?: string;
  onClick?: () => void;
  isSelected?: boolean;
  selectedAllGroup?: number | null;
}

const GroupImage = ({
  type,
  groupImageUrl,
  onClick,
  isSelected = false,
  selectedAllGroup,
}: GroupImageProps) => {
  return (
    <StyledGroupImage onClick={onClick} data-type={type} $isSelected={isSelected}>
      {type === 'interest' && groupImageUrl && (
        <ImageContainer>
          <img src={groupImageUrl} alt="그룹 이미지" />
        </ImageContainer>
      )}
      {type === 'all' && (
        <>
          {selectedAllGroup ? (
            <>
              <ImageContainer>
                <img src={groupImageUrl} alt="선택된 그룹 이미지" />
              </ImageContainer>
              <RefreshIconWrapper>
                <img src={RefreshIcon} alt="새로고침" />
              </RefreshIconWrapper>
            </>
          ) : (
            <span>전체</span>
          )}
        </>
      )}
      {type === 'add' && <img src={PlusIcon} alt="추가" />}
    </StyledGroupImage>
  );
};

export default GroupImage;
