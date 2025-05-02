import styled from 'styled-components';
import scale from '@/utils/scale';
import { colors } from '@/styles/theme';
import { FontStyles } from '@/constants/fonts';

export const PageContainer = styled.div`
  padding: ${scale(8)}px;
  gap: ${scale(32)}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: ${scale(12)}px;
`;

export const ProfileImage = styled.img`
  width: ${scale(48)}px;
  height: ${scale(48)}px;
  border-radius: 50%;
  border: 1px solid ${colors.primary200};
`;

export const ProfileInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: ${scale(206)}px;
`;

export const NameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${scale(4)}px;
`;

export const Name = styled.div`
  ${FontStyles.bodySmall};
  font-weight: bold;
  color: ${colors.primary};
`;

export const NameAdd = styled.div`
  ${FontStyles.bodySmall};
  color: ${colors.gray800};
`;

export const ProfileEditButton = styled.img`
  width: ${scale(6)}px;
  height: ${scale(12)}px;
`;
