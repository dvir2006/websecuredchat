import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, DialogContentText, FormControlLabel, Checkbox } from '@mui/material';
import { username } from "../../utils/signals";
import {  } from "../../utils/types";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import { ProtectedGetRequest, ProtectedPostRequest, apiUrl } from "../../services/Server";

export default function CreateGroupDialog() { 
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(''); 
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const handleClickOpen = () => {
    setOpen(true);
    fetchAllUsers();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchAllUsers = async () => {
    const jwtToken = localStorage.getItem('jwtToken') || "";
    const response = await ProtectedGetRequest(`${apiUrl}/auth/all-users`, jwtToken);
    if (response.ok) {
      const data = await response.json();
      setUsers(data);
    } else {
      setOpen(false);
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userId = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    }
  };

  const handleCreateGroup = async () => {
    const jwtToken = localStorage.getItem('jwtToken') || '';
    const response = await ProtectedPostRequest(`${apiUrl}/chat/create-group`, { name, users: selectedUsers }, jwtToken);
    if (response.ok) {
      // Handle success
    }
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create Group
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Group</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a group, Please Enter your new group 
            name and choose the users you want to add
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Group Name"
            type="name"
            fullWidth
            variant="standard"
            value={name} 
            onChange={handleNameChange} 
          />
          {users.map((user: any) => (
            <FormControlLabel
              key={user._id}
              control={
                <Checkbox
                  value={user._id}
                  checked={selectedUsers.includes(user._id)}
                  onChange={handleCheckboxChange}
                />
              }
              label={user._name}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreateGroup}>Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
