import { useState } from 'react';
import { Box, List, ListItem, ListItemText, TextField, Button } from "@mui/material";
import { ChatWindowProps, MessageType } from "../../utils/types";
import { formatDate } from "../../utils/formatDate";
import { useAuth } from "../../context/AuthContext";
import { username } from "../../utils/signals";
import { PostRequest, ProtectedPostRequest , apiUrl } from "../../services/Server";

const ChatApp: React.FC<ChatWindowProps> = ({chat,currUser}) => { 
    const {userId} = useAuth();
    const [newMessage, setNewMessage] = useState('');

    const idToName = (sender: string) => {
        if(userId === sender) return username.value;
        return currUser.username;
    }

    const handleMessageSend = () => {
        chat.sendMessageToServer(newMessage, currUser);
        setNewMessage('');
      };

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
            
            <Box display="flex">
                <TextField
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    label="Type your message"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
                <Button variant="contained" color="primary" onClick={handleMessageSend}>
                    Send
                </Button>
            </Box>
            
        </Box>
    );
};

export default ChatApp;
