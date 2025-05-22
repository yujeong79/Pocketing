import styled, { keyframes } from 'styled-components';

import scale from '@/utils/scale';
import { colors } from '@/styles/theme';
import { FontStyles } from '@/constants/fonts';

const rotate = keyframes`
  100% {
    transform: rotate(-360deg);
  }
`;

export const MapContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  overflow: hidden;
`;

export const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

export const PageItemContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  padding: ${scale(28)}px ${scale(16)}px;
`;

export const MapHeaderContainer = styled.div`
  display: flex;
  gap: ${scale(8)}px;
`;

export const ExchangeCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-top: ${scale(20)}px;
  gap: ${scale(16)}px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${scale(16)}px;
  position: absolute;
  bottom: ${scale(100)}px;
  right: ${scale(16)}px;
  z-index: 1;
`;

export const ButtonContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${scale(36)}px;
  height: ${scale(36)}px;
  border-radius: 50%;
  background-color: ${colors.white};
  box-shadow: 0px ${scale(4)}px ${scale(4)}px 0px rgba(0, 0, 0, 0.1);
`;

export const ReturnButton = styled.img`
  width: ${scale(22)}px;
  height: ${scale(22)}px;
`;

export const RefreshButton = styled.img<{ $spinning?: boolean }>`
  width: ${scale(22)}px;
  height: ${scale(22)}px;
  animation: ${({ $spinning }) => ($spinning ? rotate : 'none')} 0.3s linear;
`;

// 반경 재설정
export const RangeButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${scale(54)}px;
  height: ${scale(20)}px;
  background-color: ${colors.primary};
  border-radius: ${scale(10)}px;
  box-shadow: 0px ${scale(4)}px ${scale(4)}px 0px rgba(0, 0, 0, 0.1);

  position: absolute;
  left: 50%;
  bottom: ${scale(80)}px;
  z-index: 1;
  transform: translateX(-50%);
`;

export const RangeButton = styled.div`
  ${FontStyles.captionSmall}
  color: ${colors.white};
`;

export const RangeModalText = styled.div`
  ${FontStyles.bodySmall}
  color: ${colors.black};
  padding-top: ${scale(4)}px;
`;

export const RangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${scale(24)}px;
  padding-top: ${scale(36)}px;
  padding-bottom: ${scale(24)}px;
`;

export const Range100 = styled.div<{ $selected?: boolean }>`
  ${FontStyles.headingMedium}
  color: ${colors.black};
  ${({ $selected }) => $selected && `color: ${colors.primary};`}
`;

export const Range300 = styled.div<{ $selected?: boolean }>`
  ${FontStyles.headingMedium}
  color: ${colors.black};
  ${({ $selected }) => $selected && `color: ${colors.primary};`}
`;

export const Range500 = styled.div<{ $selected?: boolean }>`
  ${FontStyles.headingMedium}
  color: ${colors.black};
  ${({ $selected }) => $selected && `color: ${colors.primary};`}
`;

// 나의 포카 모달
// step.1
export const MyCardModalText = styled.div`
  ${FontStyles.bodySmall}
  color: ${colors.black};
`;

export const MyCardImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: ${scale(24)}px;
  padding-bottom: ${scale(45)}px;
`;

export const MyCardImageLabel = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${scale(125)}px;
  height: ${scale(193)}px;
`;

export const MyCardImageInput = styled.input`
  display: none;
`;

export const MyCardImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-color: ${colors.primary};
  border-style: dashed;
  border-width: ${scale(2)}px;
`;

export const MyCardImageIcon = styled.img`
  width: ${scale(40)}px;
  height: ${scale(40)}px;
`;

export const UploadedImage = styled.img`
  width: ${scale(125)}px;
  height: ${scale(193)}px;
  border-radius: ${scale(10)}px;
  box-shadow: 0px ${scale(3)}px ${scale(6)}px 0px rgba(0, 0, 0, 0.25);
`;

// step.2
export const MyCardInfoContainer = styled.div`
  display: flex;
  gap: ${scale(12)}px;
  padding-top: ${scale(28)}px;
  padding-bottom: ${scale(66)}px;
`;

export const LeftInfoContainer = styled.div`
  display: flex;

  flex-direction: column;
  gap: ${scale(12)}px;
  width: ${scale(124)}px;
  border-right: ${scale(1)}px solid ${colors.primary};
`;

export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${scale(4)}px;
`;

export const SelectHeader = styled.div`
  ${FontStyles.bodySmall}
  color: ${colors.primary};
`;

export const SelectContent = styled.div`
  ${FontStyles.bodyMedium}
  color: ${colors.gray500};
`;

export const RightInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${scale(8)}px;
  height: ${scale(168)}px;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${scale(124)}px;
  height: ${scale(28)}px;
  border-radius: ${scale(10)}px;
  border: ${scale(1)}px solid ${colors.primary};
`;

export const SearchInput = styled.input`
  width: 100%;
  border: none;
  padding: ${scale(4)}px ${scale(8)}px;
  ${FontStyles.captionMedium}
  color: ${colors.black};
  background-color: transparent;
`;

export const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${scale(8)}px;
  overflow-y: auto;
`;

export const ResultItem = styled.div`
  ${FontStyles.bodySmall}
  color: ${colors.gray500};
`;

// step.3
export const MyCardResultContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: ${scale(28)}px;
  padding-bottom: ${scale(76)}px;
  gap: ${scale(24)}px;
`;

export const MyCardResultImage = styled.img`
  width: ${scale(102)}px;
  height: ${scale(158)}px;
  border-radius: ${scale(10)}px;
  box-shadow: 0px ${scale(3)}px ${scale(6)}px 0px rgba(0, 0, 0, 0.25);
`;

export const MyCardResultTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${scale(12)}px;
`;

export const MyCardResultText = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${scale(4)}px;
`;

export const MyCardResultHeader = styled.div`
  ${FontStyles.captionSmall}
  color: ${colors.primary};
`;

export const MyCardResultContent = styled.div`
  ${FontStyles.captionMedium}
  color: ${colors.black};
`;

// 원하는 포카 모달
export const OtherCardModalText = styled.div`
  padding-top: ${scale(4)}px;
  ${FontStyles.bodySmall}
  color: ${colors.black};
`;

// 마커 스타일
export const createMarkerIcon = () => ({
  content: `
    <div style="
      width: ${scale(24)}px;
      height: ${scale(24)}px;
      background-color: ${colors.primary};
      border: 2px solid ${colors.white};
      border-radius: 50%;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      position: relative;
    ">
      <div style="
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: ${scale(8)}px;
        height: ${scale(8)}px;
        background-color: ${colors.white};
        border-radius: 50%;
      "></div>
    </div>
  `,
  size: new window.naver.maps.Size(scale(24), scale(24)),
  anchor: new window.naver.maps.Point(scale(12), scale(12)),
});

// 교환 목록 모달
export const ExchangeModalSecondHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-top: ${scale(4)}px;
`;

export const ExchangeModalSecondHeaderText = styled.div`
  ${FontStyles.bodySmall}
  color: ${colors.black};
  white-space: pre-line;
`;

export const ExchangeListRefreshButton = styled.img<{ $spinning?: boolean }>`
  width: ${scale(24)}px;
  height: ${scale(24)}px;
  cursor: pointer;
  animation: ${({ $spinning }) => ($spinning ? rotate : 'none')} 0.3s linear;
`;

export const ExchangeModalThirdHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-top: ${scale(8)}px;
`;

export const ExchangeModalThirdHeaderLeft = styled.div`
  ${FontStyles.captionSmall}
  color: ${colors.gray600};
`;

export const ExchangeModalThirdHeaderRight = styled.div<{ $isMax?: boolean }>`
  ${FontStyles.bodySmall}
  color: ${({ $isMax }) => ($isMax ? colors.primary : colors.black)};
`;

export const ExchangeUserListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${scale(12)}px;
  padding-top: ${scale(16)}px;
`;

export const ExchangeUserList = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const ExchangeUserLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${scale(24)}px;
`;

export const ExchangeCardImage = styled.img`
  width: ${scale(48)}px;
  height: ${scale(73)}px;
  border-radius: ${scale(4)}px;
`;

export const ExchangeUserName = styled.div`
  ${FontStyles.bodyMedium}
  color: ${colors.black};
`;

export const Divider = styled.div`
  width: 100%;
  height: ${scale(1)}px;
  background-color: ${colors.gray100};
`;
