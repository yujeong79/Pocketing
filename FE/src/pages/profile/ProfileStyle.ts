import styled from 'styled-components';
import scale from '@/utils/scale';

export const ContentContainer = styled.div`
  padding: ${scale(8)}px ${scale(16)}px ${scale(64)}px;
  gap: ${scale(32)}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
