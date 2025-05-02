import styled from 'styled-components';
import scale from '@/utils/scale';
import { FontStyles } from '@/constants/fonts';

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: calc(100% - ${scale(32)}px);
  margin: ${scale(8)}px ${scale(16)}px;
`;

export const ProfileSection = styled.div`
  display: flex;
  align-itmes: center;
  margin-right: ${scale(12)}px;
`;

export const ProfileImage = styled.img`
  width: ${scale(36)}px;
  height: ${scale(36)}px;
  border-radius: 50%;
`;

export const NickName = styled.span`
  ${FontStyles.bodySmall};
`;

export const VerifiedBadge = styled.img`
  width: ${scale(24)}px;
  height: ${scale(24)}px;
`;

export const PriceText = styled.span`
  ${FontStyles.headingSmall};
  text-align: right;
  margin-left: auto;
`;
