// ProfileEditStyle.ts
import styled from 'styled-components';
import scale from '@/utils/scale';
import { colors } from '@/styles/theme';
import { FontStyles } from '@/constants/fonts';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background: ${colors.gray100};
  padding-top: ${scale(40)}px;
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

export const CheckContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Phrase = styled.div<{ type: 'error' | 'success' }>`
  ${FontStyles.captionSmall};
  color: ${({ type }) => (type === 'error' ? colors.danger : colors.success)};
  text-align: left;
  height: ${scale(12)}px;
  padding-top: ${scale(4)}px;
  padding-left: ${scale(4)}px;
`;

export const DuplicateCheckButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  padding-top: ${scale(4)}px;
`;

export const DuplicateCheckButton = styled.button`
  width: ${scale(70)}px;
  height: ${scale(28)}px;
  border-radius: ${scale(5)}px;
  background-color: ${colors.white};
  border: ${scale(1)}px solid ${colors.primary};
  ${FontStyles.bodySmall};
  color: ${colors.primary};
  cursor: pointer;
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

export const BankContainer = styled.div`
  display: flex;
  gap: ${scale(8)}px;
`;
