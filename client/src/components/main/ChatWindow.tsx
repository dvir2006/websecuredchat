import { Box, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { ChatWindowProps, MessageType } from "../../utils/types";
import { formatDate } from "../../utils/formatDate";
import { useAuth } from "../../context/AuthContext";
import { username } from "../../utils/signals";


const ChatApp: React.FC<ChatWindowProps> = ({chat,currUser}) => { 
    const {userId} = useAuth();
    const idToName = (sender: string) => {
        if(userId === sender) return username.value;
        return currUser.name;
    }

    return (
        <Box>
            <h1>{currUser.username}</h1>
            <List>
                {chat.messages.map((message: MessageType, index: number) => (
                <ListItem key={index}>
                    <ListItemText
                    primary={message.content}
                    secondary={`${idToName(message.sender)}, ${formatDate(message.timestamp)}`} 
                    />
                </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default ChatApp;
