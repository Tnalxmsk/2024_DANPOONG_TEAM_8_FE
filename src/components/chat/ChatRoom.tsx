import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import ChatInput from './ChatInput.tsx';
import { useChatStore } from '../../store/useChatStore.ts';

const ChatRoom = () => {
  const { messages } = useChatStore();
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'auto' });
    }
  }, [messages]);

  return (
    <ChatWrapper>
      <ChatContainer>
        {messages.map((msg, index) => (
          <ChatBubble
            key={msg.id}
            $isUser={msg.isUser}
            ref={index === messages.length - 1 ? lastMessageRef : null}
          >
            {msg.content}
          </ChatBubble>
        ))}
      </ChatContainer>
      <ChatInput />
    </ChatWrapper>
  );
};

export default ChatRoom;

const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ChatContainer = styled.div`
  flex: 1;
  padding: 18px 16px;
  margin-bottom: 100px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ChatBubble = styled.div<{ $isUser: boolean }>`
  position: relative;
  align-self: ${({ $isUser }) => ($isUser ? 'flex-end' : 'flex-start')};
  background-color: ${({ $isUser, theme }) => ($isUser ? theme.colors.gray700 : 'white')};
  color: ${({ $isUser, theme }) => ($isUser ? 'white' : theme.colors.gray700)};
  font: ${({ theme }) => theme.fonts.body_m_16px};
  padding: 15px 25px;
  border-radius: 26px;
  max-width: 70vw;
  word-wrap: break-word;
`;
