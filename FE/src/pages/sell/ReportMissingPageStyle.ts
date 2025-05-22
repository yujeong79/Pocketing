// src/pages/sell/ReportMissingPageStyle.ts
import styled from 'styled-components';
import { colors } from '@/styles/theme';
import scale from '@/utils/scale';

export const Container = styled.div`
  padding: ${scale(20)}px;
  display: flex;
  flex-direction: column;
  gap: ${scale(16)}px;
`;

export const SectionTitle = styled.h2`
  font-size: ${scale(18)}px;
  font-weight: bold;
  color: ${colors.black};
  margin-bottom: ${scale(8)}px;
`;

export const ToggleWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: ${scale(8)}px;
  margin: ${scale(16)}px 0;
`;


export const ToggleButton = styled.button<{ selected: boolean }>`
  padding: ${scale(10)}px ${scale(20)}px;
  border-radius: ${scale(8)}px;
  font-weight: bold;
  border: none;
  font-size: ${scale(14)}px;
  background-color: ${({ selected }) => (selected ? colors.primary : colors.gray200)};
  color: ${({ selected }) => (selected ? colors.white : colors.gray800)};
  cursor: pointer;
  transition: 0.2s ease;
`;

export const Label = styled.label`
  font-size: ${scale(14)}px;
  color: ${colors.black};
  font-weight: 500;
`;

export const InputBox = styled.input`
  width: 100%;
  padding: ${scale(10)}px;
  border: 1px solid ${colors.gray300};
  border-radius: ${scale(8)}px;
  font-size: ${scale(14)}px;
  margin-top: ${scale(8)}px;
`;

export const ImageUploadInput = styled.input`
  margin-top: ${scale(8)}px;
`;

export const ImagePreview = styled.img`
  margin-top: ${scale(10)}px;
  width: 100%;
  max-width: ${scale(300)}px;
  border-radius: ${scale(10)}px;
`;

export const SubmitButton = styled.button`
  margin-top: ${scale(20)}px;
  width: 100%;
  padding: ${scale(14)}px;
  background-color: ${colors.primary};
  color: ${colors.white};
  font-weight: bold;
  border: none;
  border-radius: ${scale(10)}px;
  font-size: ${scale(16)}px;
`;

export const SelectRow = styled.div`
  margin-top: ${scale(12)}px;
  display: flex;
  flex-direction: column;
  gap: ${scale(6)}px;

  button {
    background-color: ${colors.gray100}; // 선택 버튼은 흐리게
    color: ${colors.gray800};
    border: 1px solid ${colors.gray300};

    &:hover {
      background-color: ${colors.gray200};
    }
  }
`;

export const InputRow = styled.div`
  margin-top: ${scale(16)}px;
`;

export const ImageUploadWrapper = styled.div`
  margin-top: ${scale(16)}px;
  display: flex;
  flex-direction: column;
  gap: ${scale(8)}px;

  label > button {
    background-color: ${colors.primary50};
    color: ${colors.primary};
    border: 1px solid ${colors.primary};
  }
`;

export const SubmitWrapper = styled.div`
  margin-top: ${scale(28)}px;

  button {
    background-color: ${colors.primary}; // 신청 버튼은 강조
    color: ${colors.white};
    font-weight: bold;
  }
`;

export const ModalList = styled.div`
  padding: ${scale(16)}px;
`;

export const ModalItem = styled.div`
  padding: ${scale(12)}px;
  font-size: ${scale(14)}px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
`;

