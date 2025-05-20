import styled from 'styled-components';
import { FontStyles } from '@/constants/fonts';
import { colors } from '@/styles/theme';
import scale, { scaleLetterSpacing } from '@/utils/scale';

export const Container = styled.div`
  padding: ${scale(16)}px ${scale(16)}px 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const TopContainer = styled.div`
  display: flex;
  width: 120%;
`;
export const TextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${scale(12)}px;
  width: 120%;
`;

export const TextWrapper = styled.div`
  flex: 1;
  white-space: pre-line;
  text-align: left;
`;

export const NicknameText = styled.span`
  ${FontStyles.headingMedium};
  color: ${colors.primary};
`;

export const CountText = styled.span`
  ${FontStyles.headingMedium};
  color: ${colors.primary};
`;

export const DefaultText = styled.span`
  ${FontStyles.headingSmall};
  color: ${colors.gray800};
  white-space: pre-line;
`;

export const PhotocardIconWrapper = styled.img`
  width: ${scale(100)}px;
  height: ${scale(90)}px;
  margin-top: ${scale(36)}px;
  transform: translateX(-${scale(60)}px);
`;

export const BackgroundSection = styled.div`
  width: calc(100% + ${scale(32)}px);
  margin: ${scale(24)}px -${scale(16)}px 0;
  padding: ${scale(24)}px ${scale(16)}px;
  flex: 1;
  min-height: calc(100vh - ${scale(260)}px);
  background-color: ${colors.gray100};
  border-radius: ${scale(10)}px ${scale(10)}px 0 0;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: ${scale(16)}px;
`;

export const ButtonColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${scale(16)}px;
`;

export const BaseButton = styled.button`
  font-family: 'Pretendard-SemiBold';
  font-size: ${scale(16)}px;
  line-height: ${scale(24)}px;
  letter-spacing: ${scaleLetterSpacing(16, -4)}px;

  width: ${scale(124)}px;
  background-color: white;
  border-radius: ${scale(10)}px;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  cursor: pointer;
  padding: ${scale(8)}px;
  position: relative;

  img {
    position: absolute;
    bottom: ${scale(8)}px;
    right: ${scale(6)}px;
    width: ${scale(50)}px;
    height: ${scale(40)}px;
    margin: 0;
  }
`;

export const RegisterButton = styled(BaseButton)`
  height: ${scale(195)}px;

  img {
    width: ${scale(70)}px;
    height: ${scale(70)}px;
  }
`;

export const SmallButton = styled(BaseButton)`
  height: ${scale(90)}px;
`;

export const Banner = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% + ${scale(32)}px);
  gap: ${scale(24)}px;
  margin: ${scale(16)}px -${scale(16)}px 0;
  padding: ${scale(8)}px ${scale(16)}px;
  background-color: ${colors.primary50};
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${scale(56)}px;
`;

export const BannerIcon = styled.img`
  width: ${scale(48)}px;
  height: ${scale(48)}px;
`;

export const BannerText = styled.span`
  ${FontStyles.bodyMedium};
  font-weight: 600;
  white-space: pre-line;
  text-align: left;
`;

export const BannerHighlight = styled.span`
  color: ${colors.primary};
`;
