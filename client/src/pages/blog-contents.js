import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import { toast } from 'react-hot-toast';

const BlogContents = () => {
  const [blog, setBlog] = useState({});
  const id = useParams().id;
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});

  // Contents of a blog
  const blogContents = async () => {
    try {
      const { data } = await axios.get('/api/v1/blog/get-blog/' + id);
      if (data?.success) {
        setBlog(data?.blog);
        setInputs({
          title: data?.blog.title,
          description: data?.blog.description,
          image: data?.blog.image,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    blogContents();
  }, [id]);

  // Change the input
  const changeHandle = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Submit the form
  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put('/api/v1/blog/edit-blog/' + id, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        // user: id,
      });
      if (data?.success) {
        toast.success('Blog Edited');
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
          borderColor: '#0077a3'
        }}
      >
        <Typography variant="h5" style={{ textAlign: 'center', color: 'orangered', marginBottom: '20px' }}>
          Edit Blog
        </Typography>
        <TextField
          type="text"
          id="title"
          name="title"
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
          Confirm Edit
        </Button>
      </form>
    </div>
  );
};

export default BlogContents;
