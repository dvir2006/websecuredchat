import { useState } from 'react';
import { Box, List, ListItem, ListItemText, TextField, Button, AppBar, Toolbar, Typography, Paper } from "@mui/material";
import { ChatWindowProps, MessageType } from "../../utils/types";
import { formatDate } from "../../utils/formatDate";
import { useAuth } from "../../context/AuthContext";
import { username } from "../../utils/signals";
import { PostRequest, ProtectedPostRequest , apiUrl } from "../../services/Server";
import AddUserToGroupDialog from './AddUserToGroupDialog';
import RemoveUserFromGroupDialog from './RemoveUserFromGroupDialog';

const ChatWindow: React.FC<ChatWindowProps> = ({ chat, currUser, onSendMessage, isGroup, users, fetchChat }) => {
    const { userId } = useAuth();
    const [newMessage, setNewMessage] = useState('');
  
    const idToName = (sender: string) => {
      if (userId === sender) return username.value;
      if (!isGroup) {
        return currUser.username;
      }
      for (const user of users) {
        if (user._id === sender) return user.username;
      }
      return "";
    };
    const isCurrentUser = (sender: string) => userId === sender;
  
    const handleMessageSend = () => {
      onSendMessage(currUser, newMessage);
      setNewMessage('');
    };
  
    return (
      <Box border="1px solid #ccc" borderRadius="8px" overflow="hidden" marginY="10px">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              {isGroup ? currUser.name : currUser.username}
            </Typography>
          </Toolbar>
        </AppBar>
  
        {isGroup && <AddUserToGroupDialog users={users} groupId={currUser.uid} fetchChat={fetchChat} groupUsers={chat.users} />}
        {isGroup && <RemoveUserFromGroupDialog users={users} groupUsers={chat.users} groupId={currUser.uid} fetchChat={fetchChat} />}
            <List style={{ minHeight: '55vh', maxHeight: '55vh', overflowY: 'auto',scrollbarWidth: 'thin', scrollbarColor: '#9dc8f3 #ffffff',msScrollbarBaseColor: "#fff" }}>
            {chat.messages.map((message: MessageType, index: number) => (
                <ListItem key={index} style={{ display: 'flex', justifyContent: isCurrentUser(message.sender) ? 'flex-end' : 'flex-start' }}>
                <Paper elevation={3} style={{ padding: '10px', borderRadius: '8px' , backgroundColor: isCurrentUser(message.sender) ? "#9dc8f3" : "#FFFFFF"}}>
                    <ListItemText
                    primary={message.content}
                    secondary={`${idToName(message.sender)}, ${formatDate(new Date(message.timestamp))}`}
                    />
                </Paper>
                </ListItem>
            ))}
            </List>
  
        <Box display="flex" alignItems="center" p={2} sx={{borderTop: '1px solid #ccc'}}>
          <TextField
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            label="Type your message"
            variant="outlined"
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleMessageSend}
            style={{ marginLeft: '10px', minHeight: '55px' }}
          >
            Send
          </Button>
        </Box>
      </Box>
    );
  };
  
  
export default ChatWindow;
