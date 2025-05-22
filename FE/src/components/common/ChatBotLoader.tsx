import { colors } from '@/styles/theme';
import scale from '@/utils/scale';
import styled, { keyframes } from 'styled-components';

const loader = keyframes`
  0% {
    opacity: 0;
    transform: translateY(0) translateX(${scale(50)}px) rotate(0deg);
  }
  10% {
    opacity: 0;
    transform: translateY(0) translateX(${scale(50)}px) rotate(0deg);
  }
  100% {
    opacity: 1;
    transform: translateY(-${scale(20)}px) translateX(0) rotate(360deg);
  }
`;

const LoaderWrapper = styled.div`
  user-select: none;
  display: flex;
  align-items: center;
  gap: 0;
  margin-top: ${scale(32)}px;
`;

const Star = styled.svg<{ delay?: string; size?: string; marginLeft?: string }>`
  opacity: 0;
  fill: ${colors.primary};
  animation: ${loader} 2s infinite alternate;
  ${({ delay }) => delay && `animation-delay: ${delay};`}
  ${({ size }) => size && `height: ${size}; width: ${size};`}
  ${({ marginLeft }) => marginLeft && `margin-left: ${marginLeft};`}
`;

const ChatBotLoader = () => (
  <LoaderWrapper>
    <Star viewBox="0 0 256 256" delay="0s" size="20px">
      <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z" />
    </Star>
    <Star viewBox="0 0 256 256" delay="0.25s" size="14px" marginLeft="-6px">
      <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z" />
    </Star>
    <Star viewBox="0 0 256 256" delay="0.5s" size="10px" marginLeft="-8px">
      <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z" />
    </Star>
  </LoaderWrapper>
);

export default ChatBotLoader;
