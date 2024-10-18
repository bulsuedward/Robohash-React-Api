import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const AddUserDialog = ({
  open,
  onClose,
  newUser,
  setNewUser,
  onAddUser,
  buttonText,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {buttonText === "Save" ? "Edit User" : "Add User"}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          fullWidth
          variant="outlined"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Email"
          fullWidth
          variant="outlined"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Phone"
          fullWidth
          variant="outlined"
          value={newUser.phone}
          onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Company"
          fullWidth
          variant="outlined"
          value={newUser.company}
          onChange={(e) => setNewUser({ ...newUser, company: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Address"
          fullWidth
          variant="outlined"
          value={newUser.address}
          onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Comment"
          fullWidth
          variant="outlined"
          multiline
          rows={4}
          value={newUser.comment}
          onChange={(e) => setNewUser({ ...newUser, comment: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onAddUser} color="primary">
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserDialog;
