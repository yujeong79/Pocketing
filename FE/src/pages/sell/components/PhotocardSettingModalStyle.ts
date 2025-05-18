import { FontStyles } from '@/constants/fonts';
import { colors } from '@/styles/theme';
import scale from '@/utils/scale';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  padding: ${scale(16)}px;
  gap: ${scale(20)}px;
  height: calc(100vh - ${scale(240)}px);
  overflow: hidden;
`;

export const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${scale(16)}px;
  min-width: ${scale(80)}px;
  width: ${scale(80)}px;
`;

export const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: calc(100vh - ${scale(300)}px);
  padding-right: ${scale(8)}px;

  &::-webkit-scrollbar {
    width: ${scale(4)}px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${colors.gray200};
    border-radius: ${scale(2)}px;
  }
`;

export const SettingLabel = styled.div<{ selected?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${scale(4)}px;
  cursor: pointer;
  padding: ${scale(4)}px;
  border-radius: ${scale(8)}px;

  background-color: ${({ selected }) => (selected ? colors.primary50 : 'transparent')};

  &:hover {
    background-color: ${({ selected }) => (selected ? colors.primary50 : colors.primary50)};
  }
`;


export const LabelText = styled.span`
  ${FontStyles.bodySmall}
  color: ${colors.primary};
`;

export const SelectedValue = styled.span`
  ${FontStyles.bodyMedium}
  color: ${colors.gray800};
`;

export const SearchSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${scale(12)}px;
`;

export const SearchInput = styled.input`
  width: 100%;
  height: ${scale(36)}px;
  padding: ${scale(6)}px ${scale(12)}px;
  border: 1px solid ${colors.gray200};
  border-radius: ${scale(8)}px;
  font-family: 'Pretendard-Regular';
  font-size: ${scale(13)}px;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }

  &::placeholder {
    color: ${colors.gray400};
  }
`;

export const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${scale(8)}px;
`;

export const Item = styled.div<{ selected: boolean }>`
  padding: ${scale(8)}px;
  font-family: 'Pretendard-Medium';
  font-size: ${scale(14)}px;
  color: ${(props) => (props.selected ? colors.primary : colors.gray800)};
  cursor: pointer;

  &:hover {
    background-color: ${colors.primary50};
  }
`;

export const ButtonWrapper = styled.div`
  position: fixed;
  bottom: ${scale(20)}px;
  left: 50%;
  transform: translateX(-50%);
`;

export const VersionTitle = styled.h2`
  ${FontStyles.captionMedium}
  margin-top: ${scale(8)}px;
  margin-bottom: ${scale(8)}px;
`;

export const VersionGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${scale(4)}px;
  padding-bottom: ${scale(16)}px;
`;

export const VersionItem = styled.div`
  cursor: pointer;
  border-radius: ${scale(8)}px;
  overflow: hidden;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: ${colors.primary50};
  }
`;

export const VersionImage = styled.img<{ selected: boolean }>`
  width: ${scale(100)}px;
  height: ${scale(154)}px;

  object-fit: cover;
  border-radius: ${scale(8)}px;
  border: 2px solid ${(props) => (props.selected ? colors.primary : 'transparent')};
  transition: border-color 0.2s ease;
`;

export const NoPhotocardText = styled.p`
  color: ${colors.gray400};
  text-align: center;
  margin-top: ${scale(20)}px;
  font-size: ${scale(14)}px;
`;
