import React, { useState, useEffect } from 'react';
import { 
  Container, TextField, Button, Table, TableHead, TableRow, TableCell, 
  TableBody, Paper, Radio, RadioGroup, FormControlLabel, FormControl, 
  FormLabel, CssBaseline, ThemeProvider, createTheme, Switch, Box, 
  Typography, AppBar, Toolbar, IconButton, Avatar, Card, CardContent
} from '@mui/material';
import { Brightness4, Brightness7, Delete, Edit } from '@mui/icons-material';

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
  const [darkMode, setDarkMode] = useState(false);

  // Create theme based on dark mode preference
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#90caf9' : '#1976d2',
      },
      secondary: {
        main: darkMode ? '#f48fb1' : '#dc004e',
      },
      background: {
        default: darkMode ? '#121212' : '#f5f5f5',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      },
    },
    components: {
      MuiTableRow: {
        styleOverrides: {
          root: {
            '&:nth-of-type(odd)': {
              backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
            },
          },
        },
      },
    },
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const usersWithGender = data.map(user => ({ ...user, gender: 'male' }));
      setUsers(usersWithGender);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Generate random avatar color
  const getAvatarColor = (name) => {
    const colors = [
      '#f44336', '#e91e63', '#9c27b0', '#673ab7', 
      '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4',
      '#009688', '#4caf50', '#8bc34a', '#cddc39',
      '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'
    ];
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };

  // Generate initials for avatar
  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: darkMode 
            ? 'linear-gradient(135deg, #1e1e1e 0%, #121212 100%)' 
            : 'linear-gradient(135deg, #e0f7fa 0%, #bbdefb 100%)',
          pb: 4
        }}
      >
        <AppBar position="sticky" elevation={4}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              User Management System
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Brightness7 sx={{ color: 'white', mr: 1 }} />
              <Switch
                checked={darkMode}
                onChange={toggleDarkMode}
                color="default"
              />
              <Brightness4 sx={{ color: 'white', ml: 1 }} />
            </Box>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Card elevation={6} sx={{ mb: 4, borderRadius: 2, overflow: 'hidden' }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                {isEditing ? 'Edit User' : 'Create New User'}
              </Typography>
              <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  <TextField 
                    label="Name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required
                    sx={{ flexGrow: 1, minWidth: '250px' }}
                  />
                  <TextField 
                    label="Username" 
                    name="username" 
                    value={formData.username} 
                    onChange={handleChange} 
                    required
                    sx={{ flexGrow: 1, minWidth: '250px' }}
                  />
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                  <TextField 
                    label="Email" 
                    name="email" 
                    type="email"
                    value={formData.email} 
                    onChange={handleChange}
                    required
                    sx={{ flexGrow: 1, minWidth: '250px' }}
                  />
                  <TextField 
                    label="Phone" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange}
                    sx={{ flexGrow: 1, minWidth: '250px' }}
                  />
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                  <TextField 
                    label="Website" 
                    name="website" 
                    value={formData.website} 
                    onChange={handleChange}
                    sx={{ flexGrow: 1 }}
                  />
                  <FormControl component="fieldset" sx={{ ml: 2 }}>
                    <FormLabel>Gender</FormLabel>
                    <RadioGroup 
                      row 
                      name="gender" 
                      value={formData.gender} 
                      onChange={handleChange}
                    >
                      <FormControlLabel value="male" control={<Radio />} label="Male" />
                      <FormControlLabel value="female" control={<Radio />} label="Female" />
                    </RadioGroup>
                  </FormControl>
                </Box>
                <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                  <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary"
                    size="large"
                  >
                    {isEditing ? 'Update User' : 'Add User'}
                  </Button>
                  {isEditing && (
                    <Button 
                      variant="outlined" 
                      color="secondary" 
                      onClick={() => {
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
                      }}
                      size="large"
                    >
                      Cancel
                    </Button>
                  )}
                </Box>
              </form>
            </CardContent>
          </Card>

          <Card elevation={6} sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                User List
              </Typography>
              <Box sx={{ overflowX: 'auto' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>User</TableCell>
                      <TableCell>Username</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>Website</TableCell>
                      <TableCell>Gender</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.length > 0 ? (
                      users.map(user => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar 
                                sx={{ 
                                  bgcolor: getAvatarColor(user.name),
                                  mr: 2
                                }}
                              >
                                {getInitials(user.name)}
                              </Avatar>
                              {user.name}
                            </Box>
                          </TableCell>
                          <TableCell>{user.username}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.phone}</TableCell>
                          <TableCell>{user.website}</TableCell>
                          <TableCell>{user.gender}</TableCell>
                          <TableCell align="center">
                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                              <IconButton 
                                color="primary" 
                                onClick={() => editUser(user)}
                                size="small"
                              >
                                <Edit />
                              </IconButton>
                              <IconButton 
                                color="error" 
                                onClick={() => deleteUser(user.id)}
                                size="small"
                              >
                                <Delete />
                              </IconButton>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} align="center">
                          <Typography variant="body1" sx={{ py: 3 }}>
                            No users found. Add a new user to get started.
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
