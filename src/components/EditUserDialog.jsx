import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";

export default function EditUserDialog({
  open,
  onClose,
  user,
  setUser,
  onSave,
}) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          value={user.name}
          name="name"
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          value={user.email}
          name="email"
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          label="Phone"
          type="text"
          fullWidth
          value={user.phone}
          name="phone"
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          label="Company"
          type="text"
          fullWidth
          value={user.company}
          name="company"
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          label="Address"
          type="text"
          fullWidth
          value={user.address}
          name="address"
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          label="Comments"
          type="text"
          fullWidth
          value={user.comment}
          name="comment"
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={onSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
