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
  useMediaQuery, Collapse
} from '@mui/material';
import {
  Home as HomeIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  MenuOpenOutlined,
  RemoveRedEye, EditNote, ExpandMore, ExpandLess, AddBox as AddRoomIcon
} from '@mui/icons-material';

import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../services/auth/authServices'
import srm from '../Images/srm.png';
import seal from '../Images/seal.png';

const drawerWidth = 250;

const AdminDashboard = () => {
  const [open, setOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null); // State to track which submenu is open
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');
  const [selectedPath, setSelectedPath] = useState('/'); // Track the selected path for highlighting

  // Function to toggle the collapsed state
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // Function to toggle submenu (profile or home)
  const toggleSubmenu = (menu) => {
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

  const onlogout = async () => {
    const response = await logout();
    console.log("res", response)
    if (response.data.success)
      navigate('/');
  };

  const isSelected = (path) => location.pathname === path || selectedPath === path;

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

  const handleListItemClick = (path) => {
    setSelectedPath(path); // Update the selected path on click
    navigate(path); // Navigate to the selected path
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
            onClick={() => handleListItemClick('/')}
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
            onClick={() => handleListItemClick('/user_management')}
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
            {open && <ListItemText primary="Settings" />}
            {open && (openSubmenu === 'settings' ? <ExpandLess /> : <ExpandMore />)}
          </ListItem>

          {/* Submenu for Settings */}
          <Collapse in={openSubmenu === 'settings'} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                component={Link}
                to="/settings/Room_allocation"
                onClick={() => handleListItemClick('/settings/Room_allocation')}
                sx={{
                  ...listItemSx,
                  ...(isSelected('/settings/Room_allocation') && selectedItemSx),
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
                onClick={() => handleListItemClick('/settings/add_room')}
                sx={{
                  ...listItemSx,
                  ...(isSelected('/settings/add_room') && selectedItemSx),
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
                onClick={() => handleListItemClick('/settings/edit_room')}
                sx={{
                  ...listItemSx,
                  ...(isSelected('/settings/edit_room') && selectedItemSx),
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
















// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Typography,
//   Drawer,
//   AppBar,
//   Toolbar,
//   IconButton,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   CssBaseline,
//   Button,
//   useMediaQuery,Collapse
// } from '@mui/material';
// import {
//   Home as HomeIcon,
//   Person as PersonIcon,
//   Settings as SettingsIcon,
//   MenuOpenOutlined,
//   RemoveRedEye,EditNote,ExpandMore,ExpandLess, AddBox as AddRoomIcon
// } from '@mui/icons-material';

// import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
// // import { useAuth } from '../context/AuthContext';
// import {logout} from '../services/auth/authServices'
// import srm from '../Images/srm.png';
// import seal from '../Images/seal.png';

// const drawerWidth = 250;

// const AdminDashboard = () => {
//   const [open, setOpen] = useState(false);
//   const [openSubmenu, setOpenSubmenu] = useState(null); // State to track which submenu is open
//   const location = useLocation();
//   const navigate = useNavigate();
//   // const { logout } = useAuth();
//   const isMobile = useMediaQuery('(max-width:600px)');

//   // const toggleDrawer = () => setOpen(!open);

//     // Function to toggle the collapsed state
//     const toggleDrawer = () => {
//       setOpen(!open);
//     };
  
//     // Function to toggle submenu (profile or home)
//     const toggleSubmenu = (menu) => {
//       // If the clicked menu is already open, close it. Otherwise, open the clicked menu and close others.
//       setOpenSubmenu(openSubmenu === menu ? null : menu);
//     };

//   useEffect(() => {
//     window.history.pushState(null, null, window.location.href);
//     const handlePopState = () => {
//       navigate('/');
//     };
//     window.addEventListener('popstate', handlePopState);

//     return () => {
//       window.removeEventListener('popstate', handlePopState);
//     };
//   }, [navigate]);

//   const onlogout = async() => {
//     // logout();

//     const response = await logout();
//     console.log("res",response)
//     if(response.data.success)
//     navigate('/');
//   };

//   const isSelected = (path) => location.pathname === path;

//   const listItemSx = {
//     borderRadius: '8px',
//     padding: '10px 16px',
//     color: '#616161',
//     marginBottom: '2px',
//     '&:hover': {
//       backgroundColor: '#edeef0',
//       color: '#616161',
//     },
//     '& .MuiTypography-root': {
//       fontWeight: '600',
//       fontSize: '1rem',
//     },
//   };

//   const selectedItemSx = {
//     backgroundColor: '#1976D2',
//     color: '#FFFFFF',
//     '&:hover': {
//       backgroundColor: '#7DC4FF',
//     },
//   };

//   const listItemIconSx = {
//     minWidth: '35px',
//     color: 'inherit',
//   };

//   return (
//     <Box sx={{ display: 'flex', height: '100vh' }}>
//       <CssBaseline />

//       {/* Navbar */}
//       <AppBar
//         sx={{
//           zIndex: (theme) => theme.zIndex.drawer + 1,
//           backgroundColor: '#1976D2',
//           width: open && !isMobile ? `calc(100% - ${drawerWidth}px)` : '100%',
//           transition: 'width 0.3s ease',
//         }}
//         position="fixed"
//       >
//         <Toolbar>
//           <IconButton
//             edge="start"
//             color="inherit"
//             onClick={toggleDrawer}
//             sx={{ mr: 2 }}
//             aria-label="open drawer"
//           >
//             <MenuOpenOutlined />
//           </IconButton>
//           <Typography variant="h6" sx={{ flexGrow: 1 }}>
//             Admin Dashboard
//           </Typography>
//           <Button
//             variant="contained"
//             color="secondary"
//             onClick={onlogout}
//             sx={{
//               backgroundColor: '#f44336',
//               '&:hover': {
//                 backgroundColor: '#d32f2f',
//               },
//               textTransform: 'none',
//               fontWeight: 'bold',
//               padding: '6px 16px',
//               borderRadius: '8px',
//             }}
//           >
//             Logout
//           </Button>const drawerWidth = 250;
//         </Toolbar>
//       </AppBar>

//       {/* Sidebar */}
//       <Drawer
//         sx={{
//           width: open ? drawerWidth : '84px',
//           flexShrink: 0,
//           '& .MuiDrawer-paper': {
//             width: open ? drawerWidth : '84px',
//             boxSizing: 'border-box',
//             position: 'fixed',
//             height: '100vh',
//             background: '#f4f4f4',
//             overflowY: 'auto', // Enable vertical scrolling
//             scrollbarWidth: 'thin', // Hide scrollbars (Firefox)
//             '&::-webkit-scrollbar': {
//               width: '8px', // Customize scrollbar width
//             },
//             '&::-webkit-scrollbar-thumb': {
//               background: '#bbb', // Customize scrollbar thumb color
//               borderRadius: '8px',
//             },
//           },
//         }}
//         variant={isMobile ? 'temporary' : 'permanent'}
//         open={open}
//         onClose={toggleDrawer}
//       >
//         {/* Sidebar Logo */}
//         <Box
//           sx={{
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             padding: '10px 8px',
//           }}
//         >
//           <img
//             src={open ? srm : seal}
//             alt="Logo"
//             style={{ maxHeight: '50px', width: 'auto' }}
//           />
//         </Box>

//         {/* Sidebar Menu */}
//         <List>
//           <ListItem
//             button
//             component={Link}
//             to="/"
//             sx={{
//               ...listItemSx,
//               ...(isSelected('/') && selectedItemSx),
//             }}
//           >
//             <ListItemIcon sx={listItemIconSx}>
//               <HomeIcon />
//             </ListItemIcon>
//             {open && <ListItemText primary="Home" />}
//           </ListItem>
         
//           <ListItem
//             button
//             component={Link}
//             to="/user_management"
//             sx={{
//               ...listItemSx,
//               ...(isSelected('/user_management') && selectedItemSx),
//             }}
//           >
//             <ListItemIcon sx={listItemIconSx}>
//               <PersonIcon />
//             </ListItemIcon>
//             {open && <ListItemText primary="User Management" />}
//           </ListItem>


//               {/* Room (with submenu) */}
//               <ListItem
//             button
//             onClick={() => toggleSubmenu('settings')}
//             sx={{
//               ...listItemSx,
//               ...(isSelected('/settings') && selectedItemSx),
//             }}
//           >
//             <ListItemIcon sx={listItemIconSx}>
//               <SettingsIcon />
//             </ListItemIcon>
//             {open && <ListItemText primary="settings" />}
//             {open && (openSubmenu === 'settings' ? <ExpandLess /> : <ExpandMore />)}
//           </ListItem>

//           {/* Submenu for Profile */}
//           <Collapse in={openSubmenu === 'settings'} timeout="auto" unmountOnExit>
//             <List component="div" disablePadding>
//               <ListItem
//                 button
//                 component={Link}
//                 to="/settings/Room_allocation"
//                 sx={{
//                   ...listItemSx,
//                   ...(isSelected("/settings/Room_allocation") && selectedItemSx),
//                   paddingLeft: open ? 4 : 2, // Indentation for submenu items
//                 }}
//               >
//                 <ListItemIcon sx={listItemIconSx}>
//                   <RemoveRedEye />
//                 </ListItemIcon>
//                 {open && <ListItemText primary="Room Allocation" />}
//               </ListItem>
            
//               <ListItem
//                 button
//                 component={Link}
//                 to="/settings/add_room"
//                 sx={{
//                   ...listItemSx,
//                   ...(isSelected("/settings/add_room") && selectedItemSx),
//                   paddingLeft: open ? 4 : 2, // Indentation for submenu items
//                 }}
//               >
//                 <ListItemIcon sx={listItemIconSx}>
//                   <AddRoomIcon />
//                 </ListItemIcon>
//                 {open && <ListItemText primary="Add New Room" />}
//               </ListItem>

//               <ListItem
//                 button
//                 component={Link}
//                 to="/settings/edit_room"
//                 sx={{
//                   ...listItemSx,
//                   ...(isSelected("/settings/edit_room") && selectedItemSx),
//                   paddingLeft: open ? 4 : 2, // Indentation for submenu items
//                 }}
//               >
//                 <ListItemIcon sx={listItemIconSx}>
//                   <EditNote />
//                 </ListItemIcon>
//                 {open && <ListItemText primary="Edit Room" />}
//               </ListItem>
//             </List>
//           </Collapse>
         
//           {/* <ListItem
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
//             {open && <ListItemText primary="Room Allocation" />}
//           </ListItem> */}
//         </List>
//       </Drawer>

//       {/* Main Content Area */}
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           marginLeft: open && !isMobile ? `${drawerWidth}px` : '0',
//           transition: 'margin-left 0.3s ease',
//         }}
//       >
//         <Toolbar />
//         <Box
//           sx={{
//             backgroundColor: '#fff',
//             padding: '10px',
//             height: 'calc(100vh - 64px)',
//             boxSizing: 'border-box',
//           }}
//         >
//           <Box
//             sx={{
//               backgroundColor: '#fff',
//               borderRadius: '10px',
//               padding: '20px',
//               height: '100%',
//               boxSizing: 'border-box',
//             }}
//           >
       
//             <Outlet />
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default AdminDashboard;









































