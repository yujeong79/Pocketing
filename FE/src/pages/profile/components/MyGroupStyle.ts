import styled from 'styled-components';
import { colors } from '@/styles/theme';
import scale from '@/utils/scale';
import { FontStyles } from '@/constants/fonts';

export const GroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: ${scale(12)}px;
`;

export const GroupTitleContainer = styled.div`
  display: flex;
  gap: ${scale(8)}px;
`;

export const GroupTitleIcon = styled.img`
  width: ${scale(24)}px;
  height: ${scale(24)}px;
`;

export const GroupTitle = styled.div`
  ${FontStyles.headingSmall};
  color: ${colors.primary};
`;

export const GroupLogoContainer = styled.div`
  display: flex;
  gap: ${scale(8)}px;
`;

export const GroupLogo = styled.img`
  width: ${scale(44)}px;
  height: ${scale(44)}px;
  border-radius: 50%;
  border: 1px solid ${colors.gray400};
`;

export const MoreGroupButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${scale(44)}px;
  height: ${scale(44)}px;
  border-radius: 50%;
  border: 1px dashed ${colors.gray400};
  background-color: ${colors.gray100};

  ${FontStyles.bodySmall};
  font-weight: bold;
  color: ${colors.gray400};
`;
