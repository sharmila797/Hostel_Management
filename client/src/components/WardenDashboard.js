import React,{useEffect, useState} from 'react';
import { Box, Typography, Drawer, AppBar, Toolbar, IconButton, List, ListItem, ListItemIcon, ListItemText, CssBaseline, Button, } from '@mui/material';
import {
    Home as HomeIcon, Person as PersonIcon,
    MenuOpenOutlined,
    EditNote,Apartment
  } from '@mui/icons-material';
  // import ApartmentIcon from '@mui/icons-material/Apartment';
// import MenuIcon from '@mui/icons-material/Menu';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
import {logout} from '../services/auth/authServices'
import srm from '../Images/srm.png';
import seal from '../Images/seal.png';

const drawerWidth = 255;


const WardenDashboard = () => {
  const [open, setOpen] =useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null); // State to track which submenu is open
  const location = useLocation(); // Get the current location to determine the selected menu item
const navigate=useNavigate();
// const {logout}=useAuth();
  const toggleDrawer = () => setOpen(!open);



  useEffect(() => {
    // Prevent back and forward navigation using window.history API
    window.history.pushState(null, null, window.location.href);
    const handlePopState = () => {
      navigate('/'); // Redirect to login if user tries to use back button
    };
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);



    // Function to toggle submenu (profile or home)
    const toggleSubmenu = (menu) => {
        // If the clicked menu is already open, close it. Otherwise, open the clicked menu and close others.
        console.log("submenu",menu,openSubmenu)
        setOpenSubmenu(openSubmenu === menu ? null : menu);
      };
    

      const onlogout = async() => {
        // logout();
    
        const response = await logout();
        console.log("res",response)
        if(response.data.success)
        navigate('/');
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
    width: open ? `calc(100% - ${drawerWidth}px)` : 'calc(100% - 84px)', // Adjust based on drawer state
    transition: 'width 0.3s ease', // Smooth transition for responsiveness
  }}
  position="fixed"
>
  <Toolbar>
    <IconButton edge="start" color="inherit" onClick={toggleDrawer} sx={{ mr: 2 }} aria-label="open drawer">
      <MenuOpenOutlined />
    </IconButton>
    <Typography variant="h6" sx={{ flexGrow: 1 }}>
      Warden Dashboard
    </Typography>
    <Box>
      <Button
        variant="contained"
        color="secondary"
        onClick={onlogout}
        sx={{
          backgroundColor: '#f44336',
          '&:hover': {
            backgroundColor: '#d32f2f',
          },
          textTransform:'none', // Keeps text casing natural
          fontWeight: 'bold', // Improves readability
          padding: '6px 16px', // Adjust padding for better spacing
          borderRadius:'8px',
        }}
      >
        Logout
      </Button>
    </Box>
  </Toolbar>
</AppBar>
  {/* Sidebar */}
      <Drawer  sx={{
          width: open ? drawerWidth : '84px',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : '84px',
            boxSizing: 'border-box',
            position: 'fixed', // Fix the drawer to the side
            height: '100vh', // Make it take the full height of the viewport
            background: '#f4f4f4',
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
            {/* {open && (openSubmenu === 'home' ? <ExpandLess /> : <ExpandMore />)} */}
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
            // onClick={() => toggleSubmenu('user management')}
            component={Link}
            to={"/user_management"}
            sx={{
              ...listItemSx,
              ...(isSelected('/usermanagement') && selectedItemSx),
            }}
          >
            <ListItemIcon sx={listItemIconSx}>
              <PersonIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Attendance" />}
            {/* {open && (openSubmenu === 'user management' ? <ExpandLess /> : <ExpandMore />)} */}
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
       
         {/* Settings  */}
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
              <Apartment/>
            </ListItemIcon>
            {open && <ListItemText primary="Room Allocation" />}
          </ListItem>
       
          {/* Complaint Management */}

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
            <EditNote/>
            </ListItemIcon>
            {open && <ListItemText primary="Complaint Management" />}
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
              borderRadius: '10px', // Rounded corners for the content area
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

export default WardenDashboard;




























// import React, { useState } from 'react';
// import { AppBar, Toolbar, Typography, Box, List, ListItem, ListItemIcon, ListItemText, Container, Card, CardContent } from '@mui/material';
// import { People, Event, Home, Feedback, Announcement } from '@mui/icons-material';

// Define the components to render for each section
// const components = {
//   'Student Management': (
//     <Card>
//       <CardContent>
//         <Typography variant="h5">Student Management</Typography>
//         <p>List and manage student information here.</p>
//       </CardContent>
//     </Card>
//   ),
//   Attendance: (
//     <Card>
//       <CardContent>
//         <Typography variant="h5">Attendance</Typography>
//         <p>Record and view student attendance here.</p>
//       </CardContent>
//     </Card>
//   ),
//   'Room Allocation': (
//     <Card>
//       <CardContent>
//         <Typography variant="h5">Room Allocation</Typography>
//         <p>Allocate or change student rooms here.</p>
//       </CardContent>
//     </Card>
//   ),
//   'Complaint Management': (
//     <Card>
//       <CardContent>
//         <Typography variant="h5">Complaint Management</Typography>
//         <p>View and respond to student complaints here.</p>
//       </CardContent>
//     </Card>
//   ),
//   Announcements: (
//     <Card>
//       <CardContent>
//         <Typography variant="h5">Announcements</Typography>
//         <p>Post announcements or notices for students here.</p>
//       </CardContent>
//     </Card>
//   ),
// };

// const WardenDashboard = () => {
//   const [activeSection, setActiveSection] = useState('Student Management');

//   // Sidebar navigation items
//   const menuItems = [
//     { text: 'Student Management', icon: <People /> },
//     { text: 'Attendance', icon: <Event /> },
//     { text: 'Room Allocation', icon: <Home /> },
//     { text: 'Complaint Management', icon: <Feedback /> },
//     { text: 'Announcements', icon: <Announcement /> },
//   ];

//   return (
//     <Box sx={{ display: 'flex', height: '100vh' }}>
//       {/* Sidebar */}
//       <Box sx={{ width: '300px', background: '#f4f4f4', height: '100vh' }}>
//         <List>
//           {menuItems.map((item, index) => (
//             <ListItem
//               button
//               key={index}
//               onClick={() => setActiveSection(item.text)}
//               selected={activeSection === item.text}
//             >
//               <ListItemIcon>{item.icon}</ListItemIcon>
//               <ListItemText primary={item.text} />
//             </ListItem>
//           ))}
//         </List>
//       </Box>

//       {/* Main Content */}
//       <Box sx={{ flexGrow: 1 }}>
//         <AppBar position="static">
//           <Toolbar>
//             <Typography variant="h6" component="div">
//               Warden Dashboard
//             </Typography>
//           </Toolbar>
//         </AppBar>
//         <Container sx={{ mt: 4 }}>
//           {components[activeSection]}
//         </Container>
//       </Box>
//     </Box>
//   );
// };

// export default WardenDashboard;
