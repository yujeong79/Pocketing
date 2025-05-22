import { FontStyles } from '@/constants/fonts';
import { colors } from '@/styles/theme';
import scale, { scaleLetterSpacing } from '@/utils/scale';
import styled from 'styled-components';

export const GuideBackground = styled.div`
  background-color: ${colors.gray800};
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: ${scale(20)}px ${scale(16)}px;
`;

export const BackButton = styled.button`
  display: flex;
  background: none;
  border: none;
  cursor: pointer;
  align-self: flex-start;
  margin-left: 0;
  img {
    width: ${scale(12)}px;
    height: ${scale(16)}px;
  }
`;

export const MainGuideText = styled.div`
  ${FontStyles.headingMedium};
  color: ${colors.white};
  margin-top: ${scale(88)}px;
  text-align: center;

  span {
    color: ${colors.primary};
    display: inline;
  }
`;

export const GuideText = styled.p`
  margin-top: ${scale(12)}px;
  font-family: 'Pretendard-Medium';
  font-size: ${scale(12)}px;
  line-height: ${scale(12)}px;
  letter-spacing: ${scaleLetterSpacing(12, -2)}px;
  color: ${colors.white};

  span {
    color: ${colors.primary};
  }
`;

export const SampleImage = styled.img`
  width: ${scale(128)}px;
  height: ${scale(128)}px;
  margin-top: ${scale(12)}px;
`;

export const DetailGuideText = styled.p`
  font-family: 'Pretendard-Medium';
  font-size: ${scale(10)}px;
  line-height: ${scale(12)}px;
  letter-spacing: ${scaleLetterSpacing(12, -2)}px;
  color: ${colors.white};
  text-align: left;
  margin-top: ${scale(12)}px;

  span {
    display: block;
    margin-bottom: ${scale(4)}px;
  }
`;

export const CheckIcon = styled.img`
  width: ${scale(12)}px;
  height: ${scale(12)}px;
  margin-right: ${scale(4)}px;
  vertical-align: middle;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: ${scale(16)}px;
  margin-top: ${scale(76)}px;
`;

export const ActionButton = styled.button<{ variant: 'album' | 'camera' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${scale(256)}px;
  height: ${scale(44)}px;
  border: none;
  border-radius: ${scale(10)}px;

  background-color: ${({ variant }) => (variant === 'album' ? colors.primary50 : colors.primary)};
  color: ${({ variant }) => (variant === 'album' ? colors.primary : colors.white)};

  ${FontStyles.headingSmall};

  img {
    width: ${scale(22)}px;
    height: ${scale(19)}px;
    margin-right: ${scale(8)}px;
  }
`;

