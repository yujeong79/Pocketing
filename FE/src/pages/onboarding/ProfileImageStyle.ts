import styled from 'styled-components';

import { FontStyles } from '@/constants/fonts';
import scale from '@/utils/scale';
import { colors } from '@/styles/theme';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  padding-top: ${scale(24)}px;
  padding-left: ${scale(16)}px;
  padding-right: ${scale(16)}px;
  padding-bottom: ${scale(64)}px;
`;

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  padding-top: ${scale(60)}px;
  text-align: left;

  ${FontStyles.headingMedium};
  color: ${colors.gray800};
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: ${scale(64)}px;
`;

export const ImageLabel = styled.label`
  cursor: pointer;
  display: block;
  width: ${scale(160)}px;
  height: ${scale(160)}px;
  border-radius: 50%;
`;

export const ImageInput = styled.input`
  display: none;
`;

export const Image = styled.div`
  cursor: pointer;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px dashed ${colors.primary};

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const UploadedImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
`;

export const CameraIcon = styled.img`
  width: ${scale(40)}px;
  height: ${scale(40)}px;
`;
