import { FontStyles } from '@/constants/fonts';
import { colors } from '@/styles/theme';
import scale from '@/utils/scale';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: start;
  margin-bottom: ${scale(8)}px;
`;

export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  margin-right: ${scale(16)}px;
`;

export const ProfileImage = styled.img`
  width: ${scale(40)}px;
  height: ${scale(64)}px;
  border-radius: ${scale(5)}px;
  box-shadow: 0 3px 6px 0 rgba(33, 33, 33, 0.23);
`;

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;

export const StateButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
`;

export const StateButton = styled.div`
  ${FontStyles.captionMedium}
  width: 100%;
  display: flex;
  justify-content: flex-start;

  &[data-available='true'] {
    color: ${colors.success};
  }
  &[data-available='false'] {
    color: ${colors.gray700};
  }
`;

export const Arrow = styled.div`
  ${FontStyles.captionMedium}
  font-weight: 600;
  display: inline-block;
  transform: rotate(90deg);
  margin-left: ${scale(4)}px;
`;

export const AlbumTitle = styled.div`
  ${FontStyles.bodySmall}
  margin-top: ${scale(4)}px;
`;

export const PriceSection = styled.div`
  ${FontStyles.bodyMedium}
  font-weight: 600;
  align-self: flex-end;
  margin-left: auto;
`;
