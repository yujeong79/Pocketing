import styled from 'styled-components';
import scale from '@/utils/scale';
import { colors } from '@/styles/theme';
import { FontStyles } from '@/constants/fonts';

export const MapSearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  box-shadow: 0px ${scale(4)}px ${scale(4)}px 0px rgba(0, 0, 0, 0.1);
`;

export const MapSearchInput = styled.input`
  width: 100%;
  height: 100%;
  padding: ${scale(8)}px ${scale(12)}px;

  border: none;
  outline: none;
  border-radius: ${scale(5)}px;

  ${FontStyles.captionMedium};
  color: ${colors.gray800};
`;

export const SearchResultsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 8px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
`;

export const SearchResultItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${colors.gray100};
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${colors.gray200};
  }
`;

export const ResultTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.black};
  margin-bottom: 4px;
`;

export const ResultAddress = styled.div`
  font-size: 12px;
  color: ${colors.gray600};
`;

export const LoadingText = styled.div`
  padding: 16px;
  text-align: center;
  color: ${colors.gray600};
  font-size: 14px;
`;
