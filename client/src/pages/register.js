import React,{useState} from 'react'
import { Box,Typography,TextField,Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { orange } from '@mui/material/colors'

const Register = () => {
  const navigate = useNavigate()
  //initial states
  const [inputs,setInputs] = useState({
    name:'',
    university:'',
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
      const {data} = await axios.post("/api/v1/user/register", {
        username:inputs.name,
        university:inputs.university,
        email:inputs.email,
        password:inputs.password,
      });
      if(data.success){
        toast.success('Registered Successfully');
        navigate('/login');
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
      >
        <Typography
          variant='h5'
          sx={{ color: 'orangered', marginBottom: 2 }}
          gutterBottom>     
        User Registration
        </Typography>
        <TextField
          placeholder='Name'
          name='name'
          value={inputs.name}
          onChange={changeHandle}
          margin='normal'
          type='text'
          variant='outlined'
          fullWidth
        />
        <TextField
          placeholder='University'
          name='university'
          value={inputs.university}
          onChange={changeHandle}
          margin='normal'
          type='text'
          variant='outlined'
          fullWidth
        />
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
            color: '#fff',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            },
          }}
          variant='contained'
          color='warning'
          size='large'>        
        Register
        </Button>
        <Button 
          onClick={() => navigate('/login')}  
          sx={{ borderRadius: 3, marginTop: 2, color: 'orangered',cursor: 'pointer'}}>
            Already a user? Please Login
        </Button>
        <Typography 
          variant='body1' 
          style={{ marginTop: 16 }}
          align='center'>
        By signing up, you agree to our Terms, Data Policy, and Cookies Policy.
        </Typography>
      </Box>
    </form>
    </>
  )
}

export default Register