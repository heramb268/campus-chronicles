import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { blue, red } from '@mui/material/colors';
import { Box, IconButton } from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

export default function BlogCard({title,description,image,username,time,id,isUser}) {
  // console.log("Username"+username);
  const nav = useNavigate()
  const editHandle = () => {
    nav('/blog-contents/'+id)
  }
  const deleteHandle = async () => {
    try {
      const {data} = await axios.delete('/api/v1/blog/delete-blog/'+id)
      if(data?.success){
        alert('Blog Deleted')
        window.location.reload();
      }
    } catch (error) {
      console.log(error)
    }
  }
  // function getInitials(name) {
  //   const nameArray = name.split(' ');
  //   const initials = nameArray.map((word) => word.charAt(0).toUpperCase()).join('');
  //   return initials;
  // }
  const formattedTime = format(new Date(time), 'dd MMM yyyy');
  return (
    <Card
      sx={{
        maxWidth: '600px',
        margin: 'auto',
        mt: 3,
        boxShadow: '4px 4px 8px #ccc',
        transition: 'box-shadow 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '7px 7px 14px #ccc',
        },
      }}
    >
      {isUser && (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={editHandle} sx={{ marginRight: '10px' }}>
            <EditNoteIcon />
          </IconButton>
          <IconButton onClick={deleteHandle}>
            <DeleteOutlineIcon />
          </IconButton>
        </div>
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blue[800] }} aria-label="blog">
            <PersonOutlineIcon />
          </Avatar>
        }
        title={username}
        subheader={formattedTime}
      />
      <CardMedia component="img" height="350" image={image} alt={title} />
      <CardContent>
        <Typography variant="h5" color="text.primary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}