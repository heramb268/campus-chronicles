import React, { useState, useEffect } from 'react';
import { Box, Button, Paper, TextField, IconButton } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import EditIcon from '@mui/icons-material/Edit';

const Profile = () => {
  const id = localStorage.getItem('userId');
  const [user, setUser] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedBio, setUpdatedBio] = useState('');
  const [updatedDOB, setUpdatedDOB] = useState('');

  useEffect(() => {
    async function fetchUserData() {
      try {
        const { data } = await axios.get('/api/v1/user/get-user/' + id);
        if (data?.success) {
          setUser(data.user);
          setUpdatedBio(data.user.bio || '');
          setUpdatedDOB(data.user.dateOfBirth || '');
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchUserData();
  }, [id]);

  const handleSaveChanges = async () => {
    try {
      const { data } = await axios.put(`/api/v1/user/update-user/${id}`, {
        bio: updatedBio,
        dateOfBirth: updatedDOB,
      });
      if (data?.success) {
        setIsEditMode(false);
        toast.success('Profile updated successfully');
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '90vh',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '600px',
          padding: '20px',
          textAlign: 'center',
          margin: '20px',
          borderRadius:'10px',
          background: 'linear-gradient(45deg, #5fa3e0, #b57bc3)'
        }}
      >
        <h4 style={{ color: 'white', fontSize: '24px', marginBottom: '20px' }}>User Profile</h4>
        <img
          src={user.profilePicture || 'https://socialiti.netlify.app/imgs/request.jpg'}
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            objectFit: 'cover',
            marginBottom: '20px',
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
          <h6 style={{ marginRight: '10px', fontSize: '20px', color:'white' }}>Username:</h6>
          {isEditMode ? (
            <TextField
              value={user.username}
              fullWidth
              variant="outlined"
              disabled
              sx={{ fontSize: '20px', background: "white", borderColor:'black',borderRadius:'15px' }}
            />
          ) : (
            <div style={{ fontSize: '20px', color:'white' }}>{user.username}</div>
          )}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
          <h6 style={{ marginRight: '10px', fontSize: '20px',color:'white' }}>Email:</h6>
          {isEditMode ? (
            <TextField
              value={user.email}
              fullWidth
              variant="outlined"
              disabled
              sx={{ fontSize: '20px', background: "white", borderColor:'black',borderRadius:'15px' }}
            />
          ) : (
            <div style={{ fontSize: '20px',color:'white' }}>{user.email}</div>
          )}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
          <h6 style={{ marginRight: '10px', fontSize: '20px',color:'white' }}>University:</h6>
          {isEditMode ? (
            <TextField
              value={user.university}
              fullWidth
              variant="outlined"
              disabled
              sx={{ fontSize: '20px', background: "white", borderColor:'black',borderRadius:'15px' }}
            />
          ) : (
            <div style={{ fontSize: '20px',color:'white' }}>{user.university}</div>
          )}
        </Box>
        {isEditMode ? (
          <TextField
            fullWidth
            label="Bio"
            variant="outlined"
            value={updatedBio}
            onChange={(e) => setUpdatedBio(e.target.value)}
            multiline
            rows={3}
            sx={{ marginBottom: '20px', fontSize: '20px',background: "white", borderColor:'black',borderRadius:'15px' }}
          />
        ) : (
          <div style={{ marginBottom: '20px' }}>
            <h6 style={{ fontSize: '20px',color:'white' }}>Bio:</h6>
            <div style={{ fontSize: '20px',color:'white' }}>{user.bio || 'No bio available'}</div>
          </div>
        )}
        {isEditMode ? (
          <TextField
            fullWidth
            label="Date of Birth"
            variant="outlined"
            value={updatedDOB}
            onChange={(e) => setUpdatedDOB(e.target.value)}
            sx={{ marginBottom: '20px', fontSize: '20px',background: "white", borderColor:'black',borderRadius:'15px' }}
          />
        ) : (
          <div style={{ marginBottom: '20px' }}>            
            <div style={{ fontSize: '20px',color:'white' }}> 
            <h6 style={{ fontSize: '20px',color:'white' }}>Date of Birth:</h6>{user.dateOfBirth || 'Not specified'}
            </div>
          </div>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {isEditMode ? (
            <Button variant="contained" onClick={handleSaveChanges} sx={{ backgroundColor: 'orangered', color: 'white', fontSize: '20px', marginRight: '10px' }}>
              Save Changes
            </Button>
          ) : (
            <IconButton onClick={() => setIsEditMode(true)} aria-label="Edit" style={{ color:'white' }}>
              <EditIcon />
            </IconButton>
          )}
        </Box>
      </Paper>
    </div>
  );
};

export default Profile;
