// ProfileEditStyle.ts
import styled from 'styled-components';
import scale from '@/utils/scale';
import { colors } from '@/styles/theme';
import { FontStyles } from '@/constants/fonts';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background: ${colors.gray100};
  padding-bottom: ${scale(80)}px;
`;

export const ContentsContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${scale(24)}px ${scale(16)}px;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${scale(24)}px;
  padding-bottom: ${scale(52)}px;
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ImageLabel = styled.label`
  position: relative;
  width: ${scale(125)}px;
  height: ${scale(125)}px;
  border-radius: 50%;
  overflow: visible;
  cursor: pointer;
  border: 1px solid ${colors.primary200};
`;

export const ImageInput = styled.input`
  display: none;
`;

export const Image = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
`;

export const UploadedImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const CameraIcon = styled.img`
  position: absolute;
  bottom: ${scale(4)}px;
  right: ${scale(4)}px;
  width: ${scale(30)}px;
  height: ${scale(30)}px;
  background: white;
  border-radius: 50%;
  padding: ${scale(4)}px;
  z-index: 10;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${scale(12)}px;
  width: 90%;
  max-width: ${scale(300)}px;
  margin: 0 auto;
`;

export const InputContainer = styled.div`
  margin-bottom: ${scale(8)}px;
`;

export const Label = styled.label`
  ${FontStyles.bodySmall};
  color: ${colors.primary};
  margin-bottom: ${scale(4)}px;
  display: flex;
`;

export const Input = styled.input`
  width: 100%;
  padding: ${scale(8)}px ${scale(12)}px;
  border: 1px solid ${colors.gray300};
  border-radius: ${scale(4)}px;
  ${FontStyles.bodySmall};
  color: ${colors.gray800};
  outline: none;
  &:focus {
    border-color: ${colors.primary};
  }
`;

export const ButtonContainer = styled.div`
  padding: ${scale(16)}px;
`;
