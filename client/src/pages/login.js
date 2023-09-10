import React,{useState} from 'react'
import { Box,Typography,TextField,Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import {authActions} from '../redux/store'
import { toast } from 'react-hot-toast'

const Login = () => {
  const navigate = useNavigate()
  const dsp = useDispatch()
  //initial states
  const [inputs,setInputs] = useState({
    email:'',
    password:'',
  })
  //handle inputs
  const changeHandle=(e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]:e.target.value,
    }));
  };
  //handle form
  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post("/api/v1/user/login", {
        email:inputs.email,
        password:inputs.password,
      });
      if(data.success){
        localStorage.setItem('userId',data?.user._id);
        dsp(authActions.login());
        toast.success('Logged in Successfully');
        navigate('/');
      }  
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <>
      <form onSubmit={submitHandle}>
        <Box
          maxWidth={500}
          display='flex'
          flexDirection='column'
          alignItems='center'
          margin='auto'
          marginTop={5}
          borderRadius={3}
          padding={4}
          boxShadow='0 4px 12px rgba(0,0,0,0.1)'
          bgcolor='#fff'
        >
          <Typography
            variant='h5'
            sx={{ color: 'orangered', marginBottom: 2 }}
            gutterBottom>     
          User Login
          </Typography>
          <TextField
            placeholder='E-Mail'
            name='email'
            value={inputs.email}
            onChange={changeHandle}
            margin='normal'
            type='email'
            variant='outlined'
            fullWidth
          />
          <TextField
            placeholder='Password'
            name='password'
            value={inputs.password}
            onChange={changeHandle}
            margin='normal'
            type='password'
            variant='outlined'
            fullWidth
          />
          <Button
            type='submit'
            sx={{
              borderRadius: 2,
              marginTop: 3,
              backgroundColor: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
              cursor: 'pointer',
              color: '#fff',
              '&:hover': {
                backgroundColor: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
              },
            }}
            variant='contained'
            color='warning'
            size='large'
            >        
          Login
          </Button>
          <Button color='warning'
            onClick={() => navigate('/register')}  
            sx={{ borderRadius: 3, marginTop: 2, color: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',cursor: 'pointer' }}>
             Not registered? Please Signup
          </Button>
        </Box>
      </form>
    </>
  )
}

export default Login