import styled from 'styled-components';

import scale from '@/utils/scale';
import { colors } from '@/styles/theme';
import { FontStyles } from '@/constants/fonts';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

export const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  padding: ${scale(24)}px ${scale(16)}px ${scale(64)}px;

  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  -webkit-overflow-scrolling: touch;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${scale(24)}px;
  padding-bottom: ${scale(52)}px;
`;

export const ProfileImageContainer = styled.input`
  display: flex;
  position: relative;
`;

export const ProfileImage = styled.img`
  width: ${scale(125)}px;
  height: ${scale(125)}px;
  border-radius: 50%;
  border: 1px solid ${colors.primary200};
`;

export const CameraIcon = styled.img`
  width: ${scale(36)}px;
  height: ${scale(36)}px;
  position: absolute;
  bottom: 0;
  right: 0;
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ImageLabel = styled.label`
  cursor: pointer;
  display: block;
  width: ${scale(125)}px;
  height: ${scale(125)}px;
  border-radius: 50%;

  position: relative;
`;

export const ImageInput = styled.input`
  display: none;
`;

export const Image = styled.div`
  cursor: pointer;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid ${colors.primary200};

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const UploadedImage = styled.img`
  width: 100%;
  height: 100%;
  object-position: center;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${scale(24)}px;
  width: 100%;
`;

export const NicknameContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NicknameTitle = styled.p`
  ${FontStyles.bodySmall};
  color: ${colors.primary};
  text-align: left;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: ${scale(32)}px;
  padding: ${scale(4)}px 0;
  border-bottom: ${scale(1)}px solid ${colors.primary};
`;

export const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  height: ${scale(20)}px;

  ${FontStyles.bodySmall};
  color: ${colors.gray800};
`;

export const AddressContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AddressTitle = styled.div`
  ${FontStyles.bodySmall};
  color: ${colors.primary};
  text-align: left;
`;

export const AccountContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AccountTitle = styled.div`
  ${FontStyles.bodySmall};
  color: ${colors.primary};
  text-align: left;
`;
