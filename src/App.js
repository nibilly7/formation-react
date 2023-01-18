import './App.css';
import { Outlet } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Box, Button, Divider, Drawer, Typography } from '@mui/material';
import logo from './logo.svg';
import { DataContextProvider } from './DataContext';

function App() {
  return (
    <Box sx={{ display: 'flex' }} className='container'>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Store</Typography>
          <Button color='inherit' variant='outlined'>Download</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <img src={logo} alt='logo'></img>
        <Divider />
        <Button href='/'>Dashboard</Button>
        <Button href='/customers'>Customers</Button>
        <Button href='/add-customer'>Add Customers</Button>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, pt: 10, pl: 5, pr: 5 }}>
        <DataContextProvider>
          <Outlet />
        </DataContextProvider>
      </Box>
    </Box>
  );
}

export default App;
