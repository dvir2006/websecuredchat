import React from 'react';
import { Divider, Drawer, List, ListItem, ListItemText, Typography } from "@mui/material";
import { ChatAppProps } from "../../utils/types";

const ChatList: React.FC<ChatAppProps> = ({ open, onClose, users, onChat, groups, onGroup }) => {
  return (
    <Drawer variant="temporary" open={open} onClose={onClose}>
      <div style={{ padding: '16px' }}>
        <Typography variant="h5" gutterBottom>
          Users
        </Typography>
        <Divider />
        <List>
          {users.map((user: any, index: any) => (
            <ListItem button key={index} onClick={() => onChat(user)}>
              <ListItemText primary={user.username} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <Typography variant="h5" gutterBottom>
          Groups
        </Typography>
        <Divider />
        <List>
          {groups.map((group: any, index: any) => (
            <ListItem button key={index} onClick={() => onGroup(group)}>
              <ListItemText primary={group.name} />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default ChatList;
