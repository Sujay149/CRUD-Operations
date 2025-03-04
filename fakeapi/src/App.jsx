import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Table, TableHead, TableRow, TableCell, TableBody, Paper, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';

const apiUrl = 'https://jsonplaceholder.typicode.com/users';

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
    gender: 'male',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const usersWithGender = data.map(user => ({ ...user, gender: 'male' }));
    setUsers(usersWithGender);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      updateUser(formData.id);
    } else {
      createUser();
    }

    setFormData({
      id: null,
      name: '',
      username: '',
      email: '',
      phone: '',
      website: '',
      gender: 'male',
    });

    setIsEditing(false);
  };

  const createUser = async () => {
    const newUser = { id: Date.now(), ...formData };
    setUsers([newUser, ...users]);
  };

  const updateUser = async (id) => {
    setUsers(users.map(user => (user.id === id ? { ...user, ...formData } : user)));
  };

  const deleteUser = async (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const editUser = (user) => {
    setFormData(user);
    setIsEditing(true);
  };

  return (
    <Container maxWidth="lg">
      <h1>CRUD Operations</h1>
      <Paper style={{ padding: '20px', marginBottom: '20px' }}>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Username" name="username" value={formData.username} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Phone" name="phone" value={formData.phone} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Website" name="website" value={formData.website} onChange={handleChange} margin="normal" />
          
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup row name="gender" value={formData.gender} onChange={handleChange}>
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
            </RadioGroup>
          </FormControl>

          <Button type="submit" variant="contained" color="primary" style={{ marginRight: '10px' }}>
            {isEditing ? 'Update User' : 'Create User'}
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => setIsEditing(false)}>
            Reset
          </Button>
        </form>
      </Paper>

      <Paper>
        <h2>Users</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Website</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.website}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => editUser(user)}>
                    Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="outlined" color="secondary" onClick={() => deleteUser(user.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}

export default App;
