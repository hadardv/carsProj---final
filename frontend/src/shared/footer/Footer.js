import React from 'react';
import { Box } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: '#333', color: '#fff', textAlign: 'center', height:'80px' }}>
       <p>&copy; 2024 Car4U. All rights reserved.</p>
    </Box>
  );
};

export default Footer;