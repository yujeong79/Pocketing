import styled from 'styled-components';
import { colors } from '@/styles/theme';
import { FontStyles } from '@/constants/fonts';
import scale from '@/utils/scale';

export const HeaderContainer = styled.header<{ $hasBorder: boolean }>`
  background-color: white;
  z-index: 100;
  padding: ${scale(18)}px ${scale(16)}px;
  height: ${scale(58)}px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  border-bottom: ${({ $hasBorder }) => ($hasBorder ? `1px solid ${colors.gray100}` : 'none')};
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${scale(24)}px;
  ${FontStyles.headingSmall}

  img {
    height: ${scale(30)}px;
  }
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${scale(16)}px;

  img {
    height: ${scale(24)}px;
  }
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  img {
    width: ${scale(12)}px;
    height: ${scale(16)}px;
  }
`;

export const Title = styled.span`
  ${FontStyles.headingSmall}
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  ${FontStyles.headingSmall}
`;

export const ExchangeNotification = styled.span`
  ${FontStyles.headingSmall}
  margin-left: ${scale(24)}px;
`;

export const SaleListTitle = styled.span`
  ${FontStyles.headingSmall}
  margin-left: ${scale(24)}px;
`;

export const TextLogo = styled.span`
  ${FontStyles.headingSmall}
`;

export const ImageLogo = styled.img`
  height: ${scale(24)}px;
`;

export const ModifyButton = styled(ActionButton)`
  svg {
    width: ${scale(24)}px;
    height: ${scale(24)}px;
  }
`;

export const LeaveButton = styled(ActionButton)`
  color: ${colors.danger};
`;

export const RegisterButton = styled(ActionButton)`
  color: ${colors.primary};
`;
