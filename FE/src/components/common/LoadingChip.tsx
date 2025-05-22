import { colors } from '@/styles/theme';
import scale from '@/utils/scale';
import styled from 'styled-components';

export const StyledMemberChipLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${scale(26)}px;
`;

export const StyledMemberChipLoadingDot = styled.div`
  display: flex;
  flex-direction: row;
  .dot {
    height: ${scale(5)}px;
    width: ${scale(5)}px;
    margin-right: ${scale(10)}px;
    border-radius: ${scale(10)}px;
    background-color: ${colors.primary};
    animation: pulse 1.5s infinite ease-in-out;
  }

  .dot:last-child {
    margin-right: 0;
  }

  .dot:nth-child(1) {
    animation-delay: -0.3s;
  }

  .dot:nth-child(2) {
    animation-delay: -0.1s;
  }

  .dot:nth-child(3) {
    animation-delay: 0.1s;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.8);
      background-color: ${colors.primary200};
      box-shadow: 0 0 0 0 ${colors.primary200};
    }

    50% {
      transform: scale(1.2);
      background-color: ${colors.primary};
      box-shadow: 0 0 0 10px ${colors.primary100};
    }

    100% {
      transform: scale(0.8);
      background-color: ${colors.primary200};
      box-shadow: 0 0 0 0 ${colors.primary50};
    }
  }
`;

export const LoadingChip = () => (
  <StyledMemberChipLoading>
    <StyledMemberChipLoadingDot>
      <div className="dot" />
      <div className="dot" />
      <div className="dot" />
    </StyledMemberChipLoadingDot>
  </StyledMemberChipLoading>
);
