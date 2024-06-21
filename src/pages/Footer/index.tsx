import React from 'react';
import Typography from '@mui/material/Typography';

const Footer = () => {
  return (
    <footer style={{ marginTop: 'auto', backgroundColor: '#333', color: 'white', padding: '20px 0' }}>
      <Typography variant="body1" align="center">
        Library Management System
      </Typography>
      <Typography variant="body2" align="center">
        Made with ❤️ by NamTQ
      </Typography>
      {/* <Typography variant="body2" align="center">
        <Link href="#" color="inherit" target="_blank" rel="noopener noreferrer">
          GitHub Repository
        </Link>
      </Typography> */}
    </footer>
  );
};

export default Footer;
