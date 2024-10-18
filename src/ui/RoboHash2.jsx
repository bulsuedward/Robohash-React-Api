import React, { useEffect, useState } from "react";
import AddUserDialog from "../components/AddUserDialog";
import DeleteUserDialog from "../components/DeleteUserDialog";
import useUpdateUser from "../hooks/UpdateUser"; // Import your custom hook
import "../css/card.css";
import "../css/user.css";
import axios from "axios";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  CardActions,
  Grid2,
  TextField,
} from "@mui/material";

export default function RoboHash() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [isDeleteUserDialogOpen, setDeleteUserDialogOpen] = useState(false);
  const [userToRemove, setUserToRemove] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null); // For tracking the user being edited

  // Using the custom hook to manage user updates
  const {
    name,
    setName,
    address,
    setAddress,
    company,
    setCompany,
    email,
    setEmail,
    phone,
    setPhone,
    comment,
    setComment,
    updateUser,
  } = useUpdateUser();

  // Fetch users and comments
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((usersResponse) => {
        return axios
          .get("https://jsonplaceholder.typicode.com/comments")
          .then((commentsResponse) => {
            const usersWithComments = usersResponse.data.map((user, index) => {
              const commentBody = commentsResponse.data[index]?.body || "";
              return { ...user, commentBody };
            });
            setUsers(usersWithComments);
          });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Opening Add User Dialog for adding a new user
  const handleClickOpenAddUser = () => {
    setAddUserDialogOpen(true);
    setUserToEdit(null); // Reset the editing state for new user addition
    // Reset the new user values using the hook's set functions
    setName("");
    setEmail("");
    setPhone("");
    setCompany("");
    setAddress("");
    setComment("");
  };

  // Opening Edit Dialog
  const handleClickOpenEditUser = (user) => {
    setAddUserDialogOpen(true);
    setUserToEdit(user.id); // Set the user to be edited
    // Prefill the form with the selected user's data
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
    setCompany(user.company.name);
    setAddress(user.address.city);
    setComment(user.commentBody);
  };

  const handleCloseAddUser = () => {
    setAddUserDialogOpen(false);
  };

  const handleAddOrUpdateUser = () => {
    if (userToEdit !== null) {
      // Update existing user
      const updatedUsers = users.map((user) =>
        user.id === userToEdit
          ? {
              ...user,
              name,
              email,
              phone,
              address: { city: address },
              company: { name: company },
              commentBody: comment,
            }
          : user
      );
      setUsers(updatedUsers);
    } else {
      // Add new user
      const newUserData = {
        id: users.slice(-1)[0].id + 1,
        name,
        email,
        phone,
        address: { city: address },
        company: { name: company },
        commentBody: comment,
      };
      setUsers([...users, newUserData]);
    }

    setAddUserDialogOpen(false);
  };

  const handleClickOpenDeleteUser = (userId) => {
    setUserToRemove(userId);
    setDeleteUserDialogOpen(true);
  };

  const handleCloseDeleteUser = () => {
    setDeleteUserDialogOpen(false);
  };

  const handleDelete = () => {
    setUsers(users.filter((user) => user.id !== userToRemove));
    setDeleteUserDialogOpen(false);
  };

  return (
    <>
      <div
        className="nav-container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <Button
          variant="outlined"
          color="primary"
          onClick={handleClickOpenAddUser}
        >
          Add User
        </Button>
      </div>

      <Grid2 container spacing={3} justifyContent="center" alignItems="center">
        {filteredUsers.map((user) => (
          <Grid2 item xs={12} sm={6} md={4} key={user.id}>
            <Card sx={{ maxWidth: 345, margin: "auto" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={`https://robohash.org/${user.name}`}
                  sx={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "140px",
                    objectFit: "contain",
                  }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {user.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Address: {user.address.city}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Company: {user.company.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Email: {user.email}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Phone: {user.phone}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Comments: {user.commentBody}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions sx={{ justifyContent: "flex-end", mt: "auto" }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleClickOpenEditUser(user)} // Trigger editing
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleClickOpenDeleteUser(user.id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      <AddUserDialog
        open={isAddUserDialogOpen}
        onClose={handleCloseAddUser}
        newUser={{ name, email, phone, address, company, comment }}
        setNewUser={({ name, email, phone, address, company, comment }) => {
          setName(name);
          setEmail(email);
          setPhone(phone);
          setAddress(address);
          setCompany(company);
          setComment(comment);
        }}
        onAddUser={handleAddOrUpdateUser}
        buttonText={userToEdit !== null ? "Save" : "Add User"} // Use the updated function for both add and edit
      />
      <DeleteUserDialog
        open={isDeleteUserDialogOpen}
        onClose={handleCloseDeleteUser}
        onDelete={handleDelete}
      />
    </>
  );
}
