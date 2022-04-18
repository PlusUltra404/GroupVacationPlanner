import {ChatEngine } from 'react-chat-engine';
import ChatFeed from './ChatFeed'



export const Message = () => {
    return (
        <ChatEngine
            height = "100vh"
            projectID = "d84aadd4-ad67-4b0b-b507-415a6fb05ae2"
            userName = "fireguy172"
            userSecret = "12345"
            renderChatFeed= {(chatAppProps) => <ChatFeed {...chatAppProps} />}

            />
    ) 
    
}
export default Message;