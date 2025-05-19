import styled from 'styled-components';
import scale from '@/utils/scale';
import { colors } from '@/styles/theme';
import { FontStyles } from '@/constants/fonts';

const Container = styled.div`
  padding-bottom: ${scale(20)}px;
  overflow-y: auto;
`;

const EmptyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${scale(220)}px;
`;

const EmptyText = styled.p`
  color: ${colors.gray600};
  ${FontStyles.bodySmall};
`;

export { Container, EmptyContainer, EmptyText };
