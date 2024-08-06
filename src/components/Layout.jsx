import  { useState } from 'react';
import { Box, Drawer, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import logo from '../assets/images/logo.png'

const Layout = ({ children }) => {

    const [isDrawerOpen, setIsDrawerOpen] = useState(true);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const location = useLocation();
    const isRegisterRoute = location.pathname === '/register';

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        open={isDrawerOpen}
        
        sx={{
          width: isDrawerOpen?260:60,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            padding:1,
            width: isDrawerOpen?260:60,
            boxSizing: 'border-box',
          },
        }}
      >
        <List sx={{display :!isDrawerOpen ? 'block':'none'}}>


          <ListItem >
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer} >
                <MenuIcon sx={{ fontSize:'1.2rem'}}/>
            </IconButton>
          </ListItem>
          
        </List>
        <List sx={{display :isDrawerOpen ? 'block':'none'}}>


          <ListItem sx={{display:'flex' , alignItems:'center' , gap:4}}>
            <img src={logo} alt=""  style={{height:35}}/>
          </ListItem>
          <ListItem sx={{display:'flex' , alignItems:'center', justifyContent:'space-between' , gap:4 , my:1}}>
            <Typography variant='subtitle2' sx={{fontSize:'14px'}}>New NPO Registration</Typography>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer} sx={{ padding:'12px' , backgroundColor:'#00447b' , color:'white','& .MuiIconButton-root':{backgroundColor:'#00447b'} , '&:hover':{color:'black'}}}>
                <ArrowBackIosNewIcon  sx={{fontSize:'.9rem'  , '&:hover':{color:'black'}}}/>
            </IconButton>
          </ListItem>

          <ListItem sx={{display:'flex' , alignItems:'center', justifyContent:'space-between' , gap:4, py:1.2 , mb:1}}>
            <Typography variant='subtitle2' sx={{fontSize:'13px'}}>Initial Registration</Typography>
            <ArrowDropDownIcon sx={{fontSize:'1.1rem'}}/>
          </ListItem>

          <ListItem button component={Link} to="/register" sx={{ borderRadius:'30px' , py:1.2, mb:1,backgroundColor: isRegisterRoute ? '#00447b' : 'initial', color: isRegisterRoute ? 'white' : 'initial', '&:hover':{backgroundColor:'#00447b' , color:'white'}}}>
            <FiberManualRecordIcon sx={{fontSize:'1.1rem', marginRight:2}}/>
            <Typography variant='subtitle2' sx={{fontSize:'14px'}}>Page 1</Typography>
          </ListItem>



          <ListItem sx={{display:'flex' , alignItems:'center', justifyContent:'space-between' , gap:4, py:1.2, mb:1}}>
            <Typography variant='subtitle2' sx={{fontSize:'13px'}}>Discover Registration Details</Typography>
            <ArrowDropDownIcon sx={{fontSize:'1.1rem'}}/>
          </ListItem>

          <ListItem button component={Link} to="/register" sx={{ borderRadius:'30px' , py:1.2, mb:1, '&:hover':{backgroundColor:'#00447b' , color:'white'}}}>
            <FiberManualRecordIcon sx={{fontSize:'1.1rem', marginRight:2}}/>
            <Typography variant='subtitle2' sx={{fontSize:'14px'}}>Page 2</Typography>
          </ListItem>
          <ListItem button component={Link} to="/register" sx={{ borderRadius:'30px' , py:1.2, mb:1, '&:hover':{backgroundColor:'#00447b' , color:'white'}}}>
            <FiberManualRecordIcon sx={{fontSize:'1.1rem', marginRight:2}}/>
            <Typography variant='subtitle2' sx={{fontSize:'14px'}}>Page 3</Typography>
          </ListItem>
          <ListItem button component={Link} to="/register" sx={{ borderRadius:'30px' , py:1.2, mb:1, '&:hover':{backgroundColor:'#00447b' , color:'white'}}}>
            <FiberManualRecordIcon sx={{fontSize:'1.1rem', marginRight:2}}/>
            <Typography variant='subtitle2' sx={{fontSize:'14px'}}>Page 4</Typography>
          </ListItem>



          <ListItem sx={{display:'flex' , alignItems:'center', justifyContent:'space-between' , gap:4, py:1.2 , mb:1}}>
            <Typography variant='subtitle2' sx={{fontSize:'13px'}}>Engage Details</Typography>
            <ArrowDropDownIcon sx={{fontSize:'1.1rem'}}/>
          </ListItem>

          <ListItem button component={Link} to="/register" sx={{ borderRadius:'30px' , py:1.2, mb:1, '&:hover':{backgroundColor:'#00447b' , color:'white'}}}>
            <FiberManualRecordIcon sx={{fontSize:'1.1rem', marginRight:2}}/>
            <Typography variant='subtitle2' sx={{fontSize:'14px'}}>Page 5</Typography>
          </ListItem>
          <ListItem button component={Link} to="/register" sx={{ borderRadius:'30px' , py:1.2, mb:1, '&:hover':{backgroundColor:'#00447b' , color:'white'}}}>
            <FiberManualRecordIcon sx={{fontSize:'1.1rem', marginRight:2}}/>
            <Typography variant='subtitle2' sx={{fontSize:'14px'}}>Page 6</Typography>
          </ListItem>
          
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
