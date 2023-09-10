import React, { useState } from 'react'
import {Box,AppBar,Toolbar,Button,Typography,Tabs,Tab} from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux'
import { authActions } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Header = () => {
  //global state
  let islogin=useSelector((state)=>state.islogin)
  islogin = islogin || localStorage.getItem('userId')
  console.log(islogin);
  const dsp = useDispatch();
  const nav = useNavigate();
  //local state  
  const [value, setValue] = useState(0);
  //logout handling
  const logoutHandle = () => {
    try {
      dsp(authActions.logout())  
      toast.success('Logged out')
      nav('/login')
      localStorage.clear()
    } catch (err) {
      console.log(err)  
    }
  }

  return (
    <>
        <AppBar position='static' color='warning'>
            <Toolbar sx={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',color: 'white', padding: '8px 16px'}}>
              <Typography variant="h5" sx={{ color: 'white', fontFamily: 'pacifico, cursive' }}>Campus Chronicles</Typography>

                {islogin && (
                  <Box display="flex" justifyContent="center" marginX="auto">
                    <Tabs textColor="inherit" value={value} onChange={(e, val) => setValue(val)}>
                      <Tab label="Blogs" LinkComponent={Link} to="/blogs" />
                      <Tab label="Blogs Posted" LinkComponent={Link} to="/blogs-posted" />
                      <Tab label="Add New Blog" LinkComponent={Link} to="/create-blog" />
                    </Tabs>
                  </Box>
                )}
                <Box display={'flex'} marginLeft='auto'>
                    {!islogin && (
                      <>
                        <Button sx={{ml: 1,color: 'white',background: '#4CAF50',fontFamily: 'Poppins, sans-serif','&:hover': {background: '#45a049'},}} LinkComponent={Link} to='/login'>Login</Button>
                        <Button sx={{ml: 1,color: 'white',background: '#008CBA',fontFamily: 'Poppins, sans-serif','&:hover': {background: '#0077a3'},}} LinkComponent={Link} to='/register'>Register</Button>    
                      </>
                    )}
                    {islogin && (
                      <>  
                        <Button sx={{ml: 1,color: 'white',fontFamily: 'Poppins, sans-serif',background: '#808080','&:hover': {background: '#404040'}}} LinkComponent={Link} to='/user-profile/:id'>Profile</Button>
                        <Button onClick={logoutHandle}sx={{ml: 1,color: 'white',background: '#008CBA',fontFamily: 'Poppins, sans-serif','&:hover': {background: '#0077a3'},}}>Logout</Button>
                      </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    </>
  )
}

export default Header