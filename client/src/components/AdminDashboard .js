import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Button,
  useMediaQuery,Collapse
} from '@mui/material';
import {
  Home as HomeIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  MenuOpenOutlined,
  RemoveRedEye,EditNote,ExpandMore,ExpandLess, AddBox as AddRoomIcon
} from '@mui/icons-material';

import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
import {logout} from '../services/auth/authServices'
import srm from '../Images/srm.png';
import seal from '../Images/seal.png';

const drawerWidth = 250;

const AdminDashboard = () => {
  const [open, setOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null); // State to track which submenu is open
  const location = useLocation();
  const navigate = useNavigate();
  // const { logout } = useAuth();
  const isMobile = useMediaQuery('(max-width:600px)');

  // const toggleDrawer = () => setOpen(!open);

    // Function to toggle the collapsed state
    const toggleDrawer = () => {
      setOpen(!open);
    };
  
    // Function to toggle submenu (profile or home)
    const toggleSubmenu = (menu) => {
      // If the clicked menu is already open, close it. Otherwise, open the clicked menu and close others.
      setOpenSubmenu(openSubmenu === menu ? null : menu);
    };

  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    const handlePopState = () => {
      navigate('/');
    };
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  const onlogout = async() => {
    // logout();

    const response = await logout();
    console.log("res",response)
    if(response.data.success)
    navigate('/');
  };

  const isSelected = (path) => location.pathname === path;

  const listItemSx = {
    borderRadius: '8px',
    padding: '10px 16px',
    color: '#616161',
    marginBottom: '2px',
    '&:hover': {
      backgroundColor: '#edeef0',
      color: '#616161',
    },
    '& .MuiTypography-root': {
      fontWeight: '600',
      fontSize: '1rem',
    },
  };

  const selectedItemSx = {
    backgroundColor: '#1976D2',
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#7DC4FF',
    },
  };

  const listItemIconSx = {
    minWidth: '35px',
    color: 'inherit',
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />

      {/* Navbar */}
      <AppBar
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: '#1976D2',
          width: open && !isMobile ? `calc(100% - ${drawerWidth}px)` : '100%',
          transition: 'width 0.3s ease',
        }}
        position="fixed"
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
            aria-label="open drawer"
          >
            <MenuOpenOutlined />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={onlogout}
            sx={{
              backgroundColor: '#f44336',
              '&:hover': {
                backgroundColor: '#d32f2f',
              },
              textTransform: 'none',
              fontWeight: 'bold',
              padding: '6px 16px',
              borderRadius: '8px',
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        sx={{
          width: open ? drawerWidth : '84px',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : '84px',
            boxSizing: 'border-box',
            position: 'fixed',
            height: '100vh',
            background: '#f4f4f4',
            overflowY: 'auto', // Enable vertical scrolling
            scrollbarWidth: 'thin', // Hide scrollbars (Firefox)
            '&::-webkit-scrollbar': {
              width: '8px', // Customize scrollbar width
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#bbb', // Customize scrollbar thumb color
              borderRadius: '8px',
            },
          },
        }}
        variant={isMobile ? 'temporary' : 'permanent'}
        open={open}
        onClose={toggleDrawer}
      >
        {/* Sidebar Logo */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px 8px',
          }}
        >
          <img
            src={open ? srm : seal}
            alt="Logo"
            style={{ maxHeight: '50px', width: 'auto' }}
          />
        </Box>

        {/* Sidebar Menu */}
        <List>
          <ListItem
            button
            component={Link}
            to="/"
            sx={{
              ...listItemSx,
              ...(isSelected('/') && selectedItemSx),
            }}
          >
            <ListItemIcon sx={listItemIconSx}>
              <HomeIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Home" />}
          </ListItem>
         
          <ListItem
            button
            component={Link}
            to="/user_management"
            sx={{
              ...listItemSx,
              ...(isSelected('/user_management') && selectedItemSx),
            }}
          >
            <ListItemIcon sx={listItemIconSx}>
              <PersonIcon />
            </ListItemIcon>
            {open && <ListItemText primary="User Management" />}
          </ListItem>


              {/* Room (with submenu) */}
              <ListItem
            button
            onClick={() => toggleSubmenu('settings')}
            sx={{
              ...listItemSx,
              ...(isSelected('/settings') && selectedItemSx),
            }}
          >
            <ListItemIcon sx={listItemIconSx}>
              <SettingsIcon />
            </ListItemIcon>
            {open && <ListItemText primary="settings" />}
            {open && (openSubmenu === 'settings' ? <ExpandLess /> : <ExpandMore />)}
          </ListItem>

          {/* Submenu for Profile */}
          <Collapse in={openSubmenu === 'settings'} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                component={Link}
                to="/settings/Room_allocation"
                sx={{
                  ...listItemSx,
                  ...(isSelected("/settings/Room_allocation") && selectedItemSx),
                  paddingLeft: open ? 4 : 2, // Indentation for submenu items
                }}
              >
                <ListItemIcon sx={listItemIconSx}>
                  <RemoveRedEye />
                </ListItemIcon>
                {open && <ListItemText primary="Room Allocation" />}
              </ListItem>
            
              <ListItem
                button
                component={Link}
                to="/settings/add_room"
                sx={{
                  ...listItemSx,
                  ...(isSelected("/settings/add_room") && selectedItemSx),
                  paddingLeft: open ? 4 : 2, // Indentation for submenu items
                }}
              >
                <ListItemIcon sx={listItemIconSx}>
                  <AddRoomIcon />
                </ListItemIcon>
                {open && <ListItemText primary="Add New Room" />}
              </ListItem>

              <ListItem
                button
                component={Link}
                to="/settings/edit_room"
                sx={{
                  ...listItemSx,
                  ...(isSelected("/settings/edit_room") && selectedItemSx),
                  paddingLeft: open ? 4 : 2, // Indentation for submenu items
                }}
              >
                <ListItemIcon sx={listItemIconSx}>
                  <EditNote />
                </ListItemIcon>
                {open && <ListItemText primary="Edit Room" />}
              </ListItem>
            </List>
          </Collapse>
         
          {/* <ListItem
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
            {open && <ListItemText primary="Room Allocation" />}
          </ListItem> */}
        </List>
      </Drawer>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: open && !isMobile ? `${drawerWidth}px` : '0',
          transition: 'margin-left 0.3s ease',
        }}
      >
        <Toolbar />
        <Box
          sx={{
            backgroundColor: '#fff',
            padding: '10px',
            height: 'calc(100vh - 64px)',
            boxSizing: 'border-box',
          }}
        >
          <Box
            sx={{
              backgroundColor: '#fff',
              borderRadius: '10px',
              padding: '20px',
              height: '100%',
              boxSizing: 'border-box',
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;









































// import React,{useEffect, useState} from 'react';
// import { Box, Typography, Drawer, AppBar, Toolbar, IconButton, List, ListItem, ListItemIcon, ListItemText, CssBaseline, Button, } from '@mui/material';
// import {
//     Home as HomeIcon, Person as PersonIcon, Settings as SettingsIcon,
//     MenuOpenOutlined
//   } from '@mui/icons-material';
// // import MenuIcon from '@mui/icons-material/Menu';
// import { Link, Outlet, useLocation,useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import srm from '../Images/srm.png';
// import seal from '../Images/seal.png';

// const drawerWidth = 250;



// const AdminDashboard = () => {
//   const [open, setOpen] =useState(false);
//   const [openSubmenu, setOpenSubmenu] = useState(null); // State to track which submenu is open
//   const location = useLocation(); // Get the current location to determine the selected menu item
//   const navigate = useNavigate();
//   const { logout } = useAuth();
//   const toggleDrawer = () => setOpen(!open);


//   useEffect(() => {
//     // Prevent back and forward navigation using window.history API
//     window.history.pushState(null, null, window.location.href);
//     const handlePopState = () => {
//       navigate('/'); // Redirect to login if user tries to use back button
//     };
//     window.addEventListener('popstate', handlePopState);

//     return () => {
//       window.removeEventListener('popstate', handlePopState);
//     };
//   }, [navigate]);

 



//     // Function to toggle submenu (profile or home)
//     const toggleSubmenu = (menu) => {
//         // If the clicked menu is already open, close it. Otherwise, open the clicked menu and close others.
//         console.log("submenu",menu,openSubmenu)
//         setOpenSubmenu(openSubmenu === menu ? null : menu);
//       };
//     const onlogout=()=>{
//       logout();
//       navigate('/');
//     }

//       // Function to determine if the menu item is selected
//       const isSelected = (path) => location.pathname === path;
//       const listItemSx = {
//         borderRadius: '8px', // Rounded corners
//         boxShadow: "2px",
//         padding: '10px 16px', // Increased padding
//         color: '#616161', // Default font color
//         marginBottom: '2px', // Add space between menu items
//         '&:hover': {
//           backgroundColor: '#edeef0', // Hover background color
//           color: '#616161', // Hover font color
//         },
//         '& .MuiTypography-root': {
//           fontWeight: '600', // Bold text
//           fontSize: '1rem', // Slightly smaller font size for a sleek look
//         },
//       };
    

//       const selectedItemSx = {
//         backgroundColor: '#1976D2', // Highlighted background
//         color: '#FFFFFF', // Highlighted text color
//         '&:hover': {
//           backgroundColor: '#7DC4FF', // Slightly darker hover for selected items
//         },
//       };
    

//       const listItemIconSx = {
//         minWidth: '35px', // Reduced icon spacing
//         color: 'inherit', // Icon color to match the font
//       };



//   return (
//     <Box sx={{ display: 'flex',height: '100vh' }}>
//  <CssBaseline />

//    {/* Navbar */}  
//    <AppBar
//   sx={{
//     zIndex: (theme) => theme.zIndex.drawer + 1,
//     backgroundColor: '#1976D2',
//     width: open ? `calc(100% - ${drawerWidth}px)` : 'calc(100% - 84px)', // Adjust based on drawer state
//     transition: 'width 0.3s ease', // Smooth transition for responsiveness
//   }}
//   position="fixed"
// >
//   <Toolbar>
//     <IconButton edge="start" color="inherit" onClick={toggleDrawer} sx={{ mr: 2 }} aria-label="open drawer">
//       <MenuOpenOutlined />
//     </IconButton>
//     <Typography variant="h6" sx={{ flexGrow: 1 }}>
//       Admin Dashboard
//     </Typography>
//     <Box>
//       <Button
//         variant="contained"
//         color="secondary"
//         onClick={onlogout}
//         sx={{
//           backgroundColor: '#f44336',
//           '&:hover': {
//             backgroundColor: '#d32f2f',
//           },
//           textTransform:'none', // Keeps text casing natural
//           fontWeight: 'bold', // Improves readability
//           padding: '6px 16px', // Adjust padding for better spacing
//           borderRadius:'8px',
//         }}
//       >
//         Logout
//       </Button>
//     </Box>
//   </Toolbar>
// </AppBar>

//   {/* Sidebar */}
//       <Drawer  sx={{
//           width: open ? drawerWidth : '84px',
//           flexShrink: 0,
//           '& .MuiDrawer-paper': {
//             width: open ? drawerWidth : '84px',
//             boxSizing: 'border-box',
//             position: 'fixed', // Fix the drawer to the side
//             height: '100vh', // Make it take the full height of the viewport
//             background: '#f4f4f4',
//           },
//         }}
//        open={open} variant="permanent"
//         // onClose={toggleDrawer}
//          >

// <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: open ? '10px 8px' : '8px' }}>
//           <img
//             src={open ? srm : seal}
//             alt="Logo"
//             style={{ maxHeight: open ? '50px' : '50px', width: 'auto' }}
//           />
//         </Box>

//   {/* Menu Items */}
//         <List>

//   {/* Home (with submenu) */}
//   <ListItem
//             button
//             onClick={() => toggleSubmenu('home')}
//             sx={{
//               ...listItemSx,
//               ...(isSelected('/') && selectedItemSx),
//             }}
//           >
//             <ListItemIcon sx={listItemIconSx}>
//               <HomeIcon />
//             </ListItemIcon>
//             {open && <ListItemText primary="Home" />}
//             {/* {open && (openSubmenu === 'home' ? <ExpandLess /> : <ExpandMore />)} */}
//           </ListItem>

//           {/* Submenu for Home */}
//           {/* <Collapse in={openSubmenu === 'home'} timeout="auto" unmountOnExit>
//             <List component="div" disablePadding>
//               <ListItem
//                 button
//                 component={Link}
//                 to="/home/overview"
//                 sx={{
//                   ...listItemSx,
//                   ...(isSelected('/home/overview') && selectedItemSx),
//                   paddingLeft: open ? 4 : 2, // Indentation for submenu items
//                 }}
//               >
//                 <ListItemIcon sx={listItemIconSx}>
//                   <RemoveRedEye />
//                 </ListItemIcon>
//                 {open && <ListItemText primary="Home Overview" />}
//               </ListItem>
//               <ListItem
//                 button
//                 component={Link}
//                 to="/home/details"
//                 sx={{
//                   ...listItemSx,
//                   ...(isSelected('/home/details') && selectedItemSx),
//                   paddingLeft: open ? 4 : 2, // Indentation for submenu items
//                 }}
//               >
//                 <ListItemIcon sx={listItemIconSx}>
//                   <EditNote />
//                 </ListItemIcon>
//                 {open && <ListItemText primary="Home Details" />}
//               </ListItem>
//             </List>
//           </Collapse> */}

// <ListItem
//             button
//             // onClick={() => toggleSubmenu('user management')}
//             component={Link}
//             to={"/user_management"}
//             sx={{
//               ...listItemSx,
//               ...(isSelected('/usermanagement') && selectedItemSx),
//             }}
//           >
//             <ListItemIcon sx={listItemIconSx}>
//               <PersonIcon />
//             </ListItemIcon>
//             {open && <ListItemText primary="User Management" />}
//             {/* {open && (openSubmenu === 'user management' ? <ExpandLess /> : <ExpandMore />)} */}
//           </ListItem>

//            {/* Submenu for Profile */}
//            {/* <Collapse in={openSubmenu === 'profile'} timeout="auto" unmountOnExit>
//             <List component="div" disablePadding>
//               <ListItem
//                 button
//                 component={Link}
//                 to="/profile/view"
//                 sx={{
//                   ...listItemSx,
//                   ...(isSelected('/profile/view') && selectedItemSx),
//                   paddingLeft: open ? 4 : 2, // Indentation for submenu items
//                 }}
//               >
//                 <ListItemIcon sx={listItemIconSx}>
//                   <RemoveRedEye />
//                 </ListItemIcon>
//                 {open && <ListItemText primary="View Profile" />}
//               </ListItem>
//               <ListItem
//                 button
//                 component={Link}
//                 to="/profile/edit"
//                 sx={{
//                   ...listItemSx,
//                   ...(isSelected('/profile/edit') && selectedItemSx),
//                   paddingLeft: open ? 4 : 2, // Indentation for submenu items
//                 }}
//               >
//                 <ListItemIcon sx={listItemIconSx}>
//                   <EditNote />
//                 </ListItemIcon>
//                 {open && <ListItemText primary="Edit Profile" />}
//               </ListItem>
//             </List>
//           </Collapse> */}
       
//          {/* Settings */}
//          <ListItem
//             button
//             component={Link}
//             to="/settings"
//             sx={{
//               ...listItemSx,
//               ...(isSelected('/settings') && selectedItemSx),
//             }}
//           >
//             <ListItemIcon sx={listItemIconSx}>
//               <SettingsIcon />
//             </ListItemIcon>
//             {open && <ListItemText primary="Settings" />}
//           </ListItem>
       
       
//           </List>
//       </Drawer>
       
       
      
//    {/* Main Content Area */}
//       <Box
//         component="main"
//         sx={{ flexGrow: 1}}
//       >
//  <Toolbar />
//   {/* Gray gap between Navbar and Sidebar */}
// <Box
//           sx={{
//             backgroundColor: '#f5f5f5', // Very light gray background
//             padding: '10px', // Some padding to create the gap
//             height: 'calc(100vh - 64px)', // Full height minus the navbar
//             boxSizing: 'border-box',
//           }}
//         >

//         {/* White content area */}
//           <Box
//             sx={{
//               backgroundColor: '#fff', // Pure white background
//               borderRadius: '10px', // Rounded corners for the content area
//               padding: '20px',
//               height: '100%', // Full height for the content box
//               boxSizing: 'border-box',
//             }}
//           >
//               <Outlet />
//             {/* main content */}
//             </Box>
//             </Box>
    
//     </Box>
//     </Box>
//   );
// };

// export default AdminDashboard;




  //  {/* <ListItem button>
  //           <ListItemText primary="User Management" />
  //         </ListItem>
  //         <ListItem button>
  //           <ListItemText primary="Fee Management" />
  //         </ListItem>
  //         <ListItem button>
  //           <ListItemText primary="Complaint Oversight" />
  //         </ListItem>
  //         <ListItem button>
  //           <ListItemText primary="Analytics & Reporting" />
  //         </ListItem> */}