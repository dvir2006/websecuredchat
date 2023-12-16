import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ProtectedGetRequest, ProtectedPostRequest, apiUrl } from "../../services/Server";
import { AddUserToGroupDialogProps } from "../../utils/types";



const AddUserToGroupDialog: React.FC<AddUserToGroupDialogProps>= ({users,groupUsers,groupId,fetchChat}) => { 
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<string>();
    const [filteredUsers, setFilteredUsers] = useState([]);

    const filterUsers = (list1:any, list2:any) => {
        const userSetStrings = new Set(list1); 
        console.log(userSetStrings);
        const filteredUsers = list2.filter((user:any) => !userSetStrings.has(user._id.toString()));
        console.log(filteredUsers);
        return filteredUsers;
    };

    useEffect(() => {
        const updatedFilteredList = filterUsers(groupUsers,users);
        setFilteredUsers(updatedFilteredList);
    }, [groupUsers, users]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedUser(event.target.value);
    };

    const handleAddUserToGroup = async () => {
        const jwtToken = localStorage.getItem('jwtToken') || '';
        const response = await ProtectedPostRequest(`${apiUrl}/chat/add-user-to-group`, { addedUserId: selectedUser, groupId }, jwtToken);
        if (response.ok) {
            fetchChat({uid:groupId});
        }
        setOpen(false);
    };
    return (
        <React.Fragment>
          <Button variant="outlined" onClick={handleClickOpen}>
            Add User To Group
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Select User</DialogTitle>
            <DialogContent>
                <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={selectedUser}
                        onChange={handleChange}
                    >
                        {filteredUsers.map((user: any) => (
                            <FormControlLabel value={user._id} control={<Radio />} label={user.username} />
                        ))}
                    </RadioGroup>
                </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleAddUserToGroup}>Add User</Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      );
    }

export default AddUserToGroupDialog