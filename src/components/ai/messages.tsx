import { Message } from "ai";

interface MessagesProps {
  showInitialMessage: boolean;
  messages: Message[];
}

export function Messages({ showInitialMessage, messages }: MessagesProps) {
  const minLength = showInitialMessage ? 0 : 1;

  return (
    <ul>
      {messages.length > minLength &&
        messages
          .slice(minLength, messages.length)
          .map((message) => <li key={message.id}>{message.content}</li>)}
    </ul>
  );
}
