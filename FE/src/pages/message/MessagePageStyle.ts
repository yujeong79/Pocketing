import scale from "@/utils/scale";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 90vh;
  padding-top: ${scale(50)}px;
`;

export const TabsWrapper = styled.div`
  flex-shrink: 0;
`;

export const ChatListWrapper = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;
