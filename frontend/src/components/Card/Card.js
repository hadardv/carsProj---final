import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import './Card.css';  // Import the CSS file

export default function BasicCard({ title, description, path }) {
  return (
    <Card className='card' sx={{
     backgroundColor: '#333',
      borderRadius: '8px',
      color:'#fff',
      textAlign: 'center',
      width: '400px',
      display: '-ms-inline-flexbox',
      paddingBottom: '20px'
       }} >
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2">
          {description}
          <br />
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Link to={path}>
        <Button variant="contained">עוד מידע</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
