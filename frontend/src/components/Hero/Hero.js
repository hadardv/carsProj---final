import React from 'react'
import { Container, Box, Typography } from '@mui/material';
import './Hero.css'

const Hero = () => {
  return (
    <div>
    <Container>
      <Box className="header-img">
        <img src="https://images.pexels.com/photos/315938/pexels-photo-315938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Background" className="responsive-image" />
        <Typography variant="h4" className="overlay-text">
        Car4U ברוכים הבאים ל
        </Typography>
        <Typography variant="h6" className="overlay-text">
        <br /><br />
          מאגר הרכבים החשמליים שיעשה לכם סדר
        </Typography>
      </Box>
    </Container>
  </div>
  )
}

export default Hero