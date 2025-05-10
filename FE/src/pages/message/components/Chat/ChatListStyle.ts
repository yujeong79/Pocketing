import styled from 'styled-components';
import scale from '@/utils/scale';
import { colors } from '@/styles/theme';
import { FontStyles } from '@/constants/fonts';

const Container = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const EmptyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${scale(200)}px;
`;

const EmptyText = styled.p`
  color: ${colors.gray600};
  ${FontStyles.bodySmall};
`;

export { Container, EmptyContainer, EmptyText };
