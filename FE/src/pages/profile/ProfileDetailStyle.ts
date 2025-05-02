import styled from 'styled-components';

import scale from '@/utils/scale';
import { colors } from '@/styles/theme';
import { FontStyles } from '@/constants/fonts';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: ${scale(24)}px ${scale(16)}px;

  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  -webkit-overflow-scrolling: touch;
`;

export const ProfileInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

export const ProfileImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${scale(16)}px;
  padding-bottom: ${scale(24)}px;
`;

export const ProfileImage = styled.img`
  width: ${scale(125)}px;
  height: ${scale(125)}px;
  border-radius: 50%;
  border: 1px solid ${colors.primary200};
`;

export const ProfileNickname = styled.div`
  ${FontStyles.headingSmall}
  color: ${colors.gray800};
`;

export const AddressContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: ${scale(8)}px;
  padding-bottom: ${scale(28)}px;
`;

export const AddressTitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${scale(4)}px;
`;

export const AddressIcon = styled.img`
  width: ${scale(28)}px;
  height: ${scale(28)}px;
`;

export const AddressTitle = styled.div`
  ${FontStyles.headingSmall}
  color: ${colors.primary};
`;

export const Address = styled.div`
  ${FontStyles.bodySmall}
  color: ${colors.gray800};
`;

export const AccountContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: ${scale(4)}px;
  padding-bottom: ${scale(48)}px;
`;

export const AccountTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${scale(4)}px;
`;

export const AccountIcon = styled.img`
  width: ${scale(28)}px;
  height: ${scale(28)}px;
`;

export const AccountTitle = styled.div`
  ${FontStyles.headingSmall}
  color: ${colors.primary};
`;

export const Account = styled.div`
  ${FontStyles.bodySmall}
  color: ${colors.gray800};
`;

export const AccountBank = styled.div`
  ${FontStyles.captionSmall}
  color: ${colors.gray800};
`;

export const LeaveContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${scale(16)}px;
  width: 100%;
`;

export const Logout = styled.div`
  ${FontStyles.headingSmall}
  color: ${colors.primary};
  text-align: right;
`;

export const DeleteAccount = styled.div`
  ${FontStyles.bodySmall}
  color: ${colors.gray500};
  text-align: right;
`;
