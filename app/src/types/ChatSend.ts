import type MessageChatSend from "./MessageChatSend"

type ChatSend = {
    model: string,
    messages: MessageChatSend[],
    stream: boolean
};

export default ChatSend;