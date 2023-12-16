import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import React, { useState } from "react";
import { ProtectedGetRequest, ProtectedPostRequest, apiUrl } from "../../services/Server";
import { RemoveUserFromGroupProps } from "../../utils/types";



const RemoveUserFromGroupDialog: React.FC<RemoveUserFromGroupProps>= ({users,groupId}) => { 
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<string>();

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
        const response = await ProtectedPostRequest(`${apiUrl}/chat/remove-user-from-group`, { removedUserId: selectedUser, groupId }, jwtToken);
        if (response.ok) {
        // Handle success
        }
        setOpen(false);
    };
    return (
        <React.Fragment>
          <Button variant="outlined" onClick={handleClickOpen}>
            Remove User From Group
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
                        {users.map((user: any) => (
                            <FormControlLabel value={user._id} control={<Radio />} label={user.username} />
                        ))}
                    </RadioGroup>
                </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleAddUserToGroup}>Remove User</Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      );
    }

export default RemoveUserFromGroupDialog