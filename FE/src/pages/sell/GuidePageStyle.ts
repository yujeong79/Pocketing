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
  ${FontStyles.headingMedium}
  color: ${colors.white};
  margin-top: ${scale(88)}px;
  text-align: center;

  p {
    color: ${colors.primary};
    display: inline;
  }

  span {
    display: block;
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
  }
`;
