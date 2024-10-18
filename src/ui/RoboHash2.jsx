import React, { useEffect, useState } from "react";
import AddUserDialog from "../components/AddUserDialog";
import DeleteUserDialog from "../components/DeleteUserDialog";
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
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    comment: "",
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

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

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClickOpenAddUser = () => {
    setAddUserDialogOpen(true);
    setNewUser({
      name: "",
      email: "",
      phone: "",
      company: "",
      address: "",
      comment: "",
    });
  };

  const handleCloseAddUser = () => {
    setAddUserDialogOpen(false);
  };

  const handleAddUser = () => {
    const newUserData = {
      id: users.length + 1,
      ...newUser,
      address: { city: newUser.address },
      company: { name: newUser.company },
      phone: newUser.phone,
      commentBody: newUser.comment,
    };

    setUsers([...users, newUserData]);
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
                  color="error"
                  onClick={() => handleClickOpenDeleteUser(user.id)}
                >
                  Delete User
                </Button>
              </CardActions>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      <AddUserDialog
        open={isAddUserDialogOpen}
        onClose={handleCloseAddUser}
        newUser={newUser}
        setNewUser={setNewUser}
        onAddUser={handleAddUser}
      />
      <DeleteUserDialog
        open={isDeleteUserDialogOpen}
        onClose={handleCloseDeleteUser}
        onDelete={handleDelete}
      />
    </>
  );
}
