import React, { useState } from 'react';
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';

const CreateBlog = () => {
  const id = localStorage.getItem('userId');
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    image: '',
  });

  const changeHandle = (event) => {
    setInputs((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/v1/blog/create-blog', {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        toast.success('Blog Posted');
        navigate('/blogs-posted');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '90vh',
      }}
    >
      <form
        onSubmit={submitHandle}
        style={{
          width: '600px',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          borderRadius: '5px',
        }}
      >
        <Typography variant="h5" style={{ textAlign: 'center', color: 'orangered', marginBottom: '20px' }}>
          Create a New Blog
        </Typography>
        <TextField
          type="text"
          id="title"
          name='title'
          label="Title"
          variant="outlined"
          fullWidth
          value={inputs.title}
          onChange={changeHandle}
          required
          style={{ marginBottom: '20px' }}
        />
        <TextField
          type="text"
          name="image"
          label="Add Image URL"
          variant="outlined"
          fullWidth
          value={inputs.image}
          onChange={changeHandle}
          required
          style={{ marginBottom: '20px' }}
        />
        <TextField
          multiline
          rows={6}
          id="description"
          name="description"
          label="Blog Content"
          variant="outlined"
          fullWidth
          value={inputs.description}
          onChange={changeHandle}
          required
          style={{ marginBottom: '20px' }}
        />
        <Button
          type="submit"
          variant="contained"
          style={{
            backgroundColor: 'orangered',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          Post
        </Button>
      </form>
    </div>
  );
};

export default CreateBlog;
