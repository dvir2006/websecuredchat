import { useState } from 'react';
import { Box, List, ListItem, ListItemText, TextField, Button } from "@mui/material";
import { ChatWindowProps, MessageType } from "../../utils/types";
import { formatDate } from "../../utils/formatDate";
import { useAuth } from "../../context/AuthContext";
import { username } from "../../utils/signals";
import { PostRequest, ProtectedPostRequest , apiUrl } from "../../services/Server";
import AddUserToGroupDialog from './AddUserToGroupDialog';
import RemoveUserFromGroupDialog from './RemoveUserFromGroupDialog';

const ChatWindow: React.FC<ChatWindowProps> = ({chat, currUser, onSendMessage,isGroup,users,fetchChat}) => { 
    const {userId} = useAuth();
    const [newMessage, setNewMessage] = useState('');
    
    const idToName = (sender: string) => {
        if(!isGroup)
        {
            if(userId === sender) return username.value;
            return currUser.username;
        }
        for(const user of users)
        {
            if(user._id === sender) return user.username;
        }
        return "";
    }

    const handleMessageSend = () => {
        onSendMessage(currUser, newMessage);
        setNewMessage('');
      };

    return (
        <Box>
            <h1>{isGroup?currUser.name : currUser.username}</h1>
            {isGroup && <AddUserToGroupDialog users={users} groupId={currUser.uid} fetchChat={fetchChat} groupUsers={chat.users}/>}
            {isGroup && <RemoveUserFromGroupDialog users={users} groupUsers={chat.users} groupId={currUser.uid} fetchChat={fetchChat}/>}
            <List>
                { chat.messages.map((message: MessageType, index: number) => (
                <ListItem key={index}>
                    <ListItemText
                    primary={message.content}
                    secondary={`${idToName(message.sender)}, ${formatDate(new Date(message.timestamp))}`} 
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

export default ChatWindow;
