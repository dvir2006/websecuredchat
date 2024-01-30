import React from 'react';
import { Autocomplete, Box, Divider, Drawer, List, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import { ChatAppProps } from "../../utils/types";

const ChatList: React.FC<ChatAppProps> = ({ open, onClose, users, onChat, groups, onGroup }) => {
  const combinedOptions = [...users, ...groups];

  return (
    <Drawer variant="temporary" open={open} onClose={onClose}>
      <Box sx={{ width: 300 }}>
        <div style={{ padding: '16px', width: '100%' }}>
          <Typography variant="h5" gutterBottom>
            Search
          </Typography>
          <Divider />
          <Autocomplete
            options={combinedOptions}
            getOptionLabel={(option) => option.username || option.name || ''}
            renderInput={(params) => (
              <TextField {...params} label="Search users and groups" variant="outlined" />
            )}
            sx={{ width: '80%'}}
            onChange={(event, value) => {
              if (value) {
                value.username ? onChat(value) : onGroup(value);
              }
            }}
            style={{ marginBottom: '16px' }} 
          />
          <Typography variant="h6" gutterBottom>
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
          <Typography variant="h6" gutterBottom>
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
      </Box>
    </Drawer>
  );
};

export default ChatList;
