import React,{useState} from 'react';
import { Box, Typography, Drawer, AppBar, Toolbar, IconButton, List, ListItem, ListItemIcon, ListItemText, Collapse, CssBaseline, } from '@mui/material';
import {
    Home as HomeIcon, Person as PersonIcon, Settings as SettingsIcon, ExpandLess, ExpandMore,
    MenuOpenOutlined,
    EditNote,
    RemoveRedEye
  } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, Outlet, useLocation } from 'react-router-dom';
import srm from '../Images/srm.png';
import seal from '../Images/seal.png';

const drawerWidth = 180;


const AdminDashboard = () => {
  const [open, setOpen] =useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null); // State to track which submenu is open
  const location = useLocation(); // Get the current location to determine the selected menu item

  const toggleDrawer = () => setOpen(!open);



    // Function to toggle submenu (profile or home)
    const toggleSubmenu = (menu) => {
        // If the clicked menu is already open, close it. Otherwise, open the clicked menu and close others.
        console.log("submenu",menu)
        setOpenSubmenu(openSubmenu === menu ? null : menu);
      };
    

      // Function to determine if the menu item is selected
      const isSelected = (path) => location.pathname === path;
      const listItemSx = {
        borderRadius: '8px', // Rounded corners
        boxShadow: "2px",
        padding: '10px 16px', // Increased padding
        color: '#616161', // Default font color
        marginBottom: '2px', // Add space between menu items
        '&:hover': {
          backgroundColor: '#edeef0', // Hover background color
          color: '#616161', // Hover font color
        },
        '& .MuiTypography-root': {
          fontWeight: '600', // Bold text
          fontSize: '1rem', // Slightly smaller font size for a sleek look
        },
      };
    

      const selectedItemSx = {
        backgroundColor: '#1976D2', // Highlighted background
        color: '#FFFFFF', // Highlighted text color
        '&:hover': {
          backgroundColor: '#7DC4FF', // Slightly darker hover for selected items
        },
      };
    

      const listItemIconSx = {
        minWidth: '35px', // Reduced icon spacing
        color: 'inherit', // Icon color to match the font
      };



  return (
    <Box sx={{ display: 'flex',height: '100vh' }}>
 <CssBaseline />

   {/* Navbar */}
      <AppBar 
       sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: '#1976D2',
        width: open ? `calc(100% - ${drawerWidth}px)` : 'calc(100% - 64px)', // Adjust based on drawer state
        transition: 'width 0.3s ease', // Smooth transition for responsiveness
      }}
      position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer} sx={{ mr: 2 }}aria-label="open drawer">
            {/* <MenuIcon /> */}
            <MenuOpenOutlined />
          </IconButton>
          <Typography variant="h6">Admin Dashboard</Typography>
        </Toolbar>
      </AppBar>
  {/* Sidebar */}
      <Drawer  sx={{
          width: open ? drawerWidth : '64px',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : '64px',
            boxSizing: 'border-box',
            position: 'fixed', // Fix the drawer to the side
            height: '100vh', // Make it take the full height of the viewport
          },
        }}
       open={open} variant="permanent"
        // onClose={toggleDrawer}
         >

<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: open ? '10px 8px' : '8px' }}>
          <img
            src={open ? srm : seal}
            alt="Logo"
            style={{ maxHeight: open ? '50px' : '50px', width: 'auto' }}
          />
        </Box>

  {/* Menu Items */}
        <List>

  {/* Home (with submenu) */}
  <ListItem
            button
            onClick={() => toggleSubmenu('home')}
            sx={{
              ...listItemSx,
              ...(isSelected('/') && selectedItemSx),
            }}
          >
            <ListItemIcon sx={listItemIconSx}>
              <HomeIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Home" />}
            {open && (openSubmenu === 'home' ? <ExpandLess /> : <ExpandMore />)}
          </ListItem>

          {/* Submenu for Home */}
          {/* <Collapse in={openSubmenu === 'home'} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                component={Link}
                to="/home/overview"
                sx={{
                  ...listItemSx,
                  ...(isSelected('/home/overview') && selectedItemSx),
                  paddingLeft: open ? 4 : 2, // Indentation for submenu items
                }}
              >
                <ListItemIcon sx={listItemIconSx}>
                  <RemoveRedEye />
                </ListItemIcon>
                {open && <ListItemText primary="Home Overview" />}
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/home/details"
                sx={{
                  ...listItemSx,
                  ...(isSelected('/home/details') && selectedItemSx),
                  paddingLeft: open ? 4 : 2, // Indentation for submenu items
                }}
              >
                <ListItemIcon sx={listItemIconSx}>
                  <EditNote />
                </ListItemIcon>
                {open && <ListItemText primary="Home Details" />}
              </ListItem>
            </List>
          </Collapse> */}

<ListItem
            button
            onClick={() => toggleSubmenu('profile')}
            sx={{
              ...listItemSx,
              ...(isSelected('/profile') && selectedItemSx),
            }}
          >
            <ListItemIcon sx={listItemIconSx}>
              <PersonIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Profile" />}
            {open && (openSubmenu === 'profile' ? <ExpandLess /> : <ExpandMore />)}
          </ListItem>

           {/* Submenu for Profile */}
           {/* <Collapse in={openSubmenu === 'profile'} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                component={Link}
                to="/profile/view"
                sx={{
                  ...listItemSx,
                  ...(isSelected('/profile/view') && selectedItemSx),
                  paddingLeft: open ? 4 : 2, // Indentation for submenu items
                }}
              >
                <ListItemIcon sx={listItemIconSx}>
                  <RemoveRedEye />
                </ListItemIcon>
                {open && <ListItemText primary="View Profile" />}
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/profile/edit"
                sx={{
                  ...listItemSx,
                  ...(isSelected('/profile/edit') && selectedItemSx),
                  paddingLeft: open ? 4 : 2, // Indentation for submenu items
                }}
              >
                <ListItemIcon sx={listItemIconSx}>
                  <EditNote />
                </ListItemIcon>
                {open && <ListItemText primary="Edit Profile" />}
              </ListItem>
            </List>
          </Collapse> */}
       
         {/* Settings */}
         <ListItem
            button
            component={Link}
            to="/settings"
            sx={{
              ...listItemSx,
              ...(isSelected('/settings') && selectedItemSx),
            }}
          >
            <ListItemIcon sx={listItemIconSx}>
              <SettingsIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Settings" />}
          </ListItem>
       
       
          </List>
      </Drawer>
       
       
      
   {/* Main Content Area */}
      <Box
        component="main"
        sx={{ flexGrow: 1}}
      >
 <Toolbar />
  {/* Gray gap between Navbar and Sidebar */}
<Box
          sx={{
            backgroundColor: '#f5f5f5', // Very light gray background
            padding: '10px', // Some padding to create the gap
            height: 'calc(100vh - 64px)', // Full height minus the navbar
            boxSizing: 'border-box',
          }}
        >

        {/* White content area */}
          <Box
            sx={{
              backgroundColor: '#fff', // Pure white background
              borderRadius: '8px', // Rounded corners for the content area
              padding: '20px',
              height: '100%', // Full height for the content box
              boxSizing: 'border-box',
            }}
          >
              <Outlet />
            {/* main content */}
            </Box>
            </Box>
    
    </Box>
    </Box>
  );
};

export default AdminDashboard;




   {/* <ListItem button>
            <ListItemText primary="User Management" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Fee Management" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Complaint Oversight" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Analytics & Reporting" />
          </ListItem> */}