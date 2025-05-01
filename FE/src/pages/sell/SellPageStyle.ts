import styled from 'styled-components';
import { FontStyles } from '@/constants/fonts';
import { colors } from '@/styles/theme';
import scale from '@/utils/scale';

export const Container = styled.div`
  padding: ${scale(16)}px ${scale(16)}px 0;
  display: flex;
  flex-direction: column;
`;

export const TextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${scale(12)}px;
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
  width: ${scale(121)}px;
  height: ${scale(106)}px;
  margin-top: ${scale(36)}px;
`;

export const BackgroundSection = styled.div`
  width: calc(100% + ${scale(32)}px);
  margin: ${scale(24)}px -${scale(16)}px 0;
  padding: ${scale(24)}px ${scale(16)}px;
  flex: 1;
  min-height: calc(100vh - ${scale(280)}px);
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
  ${FontStyles.bodyMedium};
  font-weight: 600;
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
    width: ${scale(60)}px;
    height: ${scale(50)}px;
    margin: 0;
  }
`;

export const RegisterButton = styled(BaseButton)`
  height: ${scale(195)}px;

  img {
    width: ${scale(80)}px;
    height: ${scale(80)}px;
  }
`;

export const SmallButton = styled(BaseButton)`
  height: ${scale(90)}px;
`;

export const Banner = styled.div`
  width: calc(100% + ${scale(32)}px);
  height: ${scale(64)}px;
  margin: ${scale(24)}px -${scale(16)}px 0;
  background-color: ${colors.primary50};
  display: flex;
  align-items: center;
  gap: ${scale(24)}px;
  padding: ${scale(8)}px ${scale(24)}px;
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
