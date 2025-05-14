// src/pages/sell/UploadPageStyle.ts
import styled from 'styled-components'
import { FontStyles } from '@/constants/fonts'
import { colors } from '@/styles/theme'
import scale, { scaleLetterSpacing } from '@/utils/scale'

export const GuideBackground = styled.div`
  background-color: ${colors.gray800};
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: ${scale(20)}px ${scale(16)}px;
`

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
`

export const MainGuideText = styled.div`
  ${FontStyles.headingSmall};
  color: ${colors.white};
  margin-top: ${scale(88)}px;
  text-align: center;

  span {
    color: ${colors.primary};
    display: inline;
  }
`

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
`

export const PreviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
  margin-top: 16px;
  overflow: auto;
`

export const RotatableImage = styled.img`
  max-width: 100%;
  max-height: 60vh;
  object-fit: contain;
  display: block;
  pointer-events: none;
`

export const ButtonBar = styled.div`
  display: flex;
  gap: 20px;
`

export const SmallActionButton = styled.button<{ variant: 'album' | 'camera' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: ${scale(12)}px;
  padding: 0 ${scale(20)}px;
  height: ${scale(30)}px;

  font-size: ${scale(15)}px;
  font-family: 'Pretendard-Bold';

  background-color: ${({ variant }) => (variant === 'album' ? colors.primary50 : colors.primary)};
  color: ${({ variant }) => (variant === 'album' ? colors.primary : colors.white)};
`
