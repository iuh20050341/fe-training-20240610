// Footer.js
import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
const Footer = () => {
  const handleMouseOver = (event) => {
    event.target.style.color = 'blue';
  };

  const handleMouseOut = (event) => {
    event.target.style.color = 'black';
  };
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2">
            NamTQ Library Management System is a comprehensive software solution designed to streamline and enhance the management of libraries 
            and information centers. Built with modern technologies and user-centric design principles, our system empowers librarians 
            and administrators to efficiently organize, catalog, and circulate library resources.
            </Typography>
            <Typography variant="body2">
              <FacebookIcon style={{fontSize:40}} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}/>
              <InstagramIcon style={{fontSize:40}} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}/>
              <YouTubeIcon style={{fontSize:40}} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}/>
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Services
            </Typography>
            <Link href="#" variant="body2" display="block" gutterBottom>
              Điều khoản sử dụng
            </Link>
            <Link href="#" variant="body2" display="block" gutterBottom>
              Chính sách bảo mật thông tin cá nhân
            </Link>
            <Link href="#" variant="body2" display="block" gutterBottom>
            Chính sách mượn - trả
            </Link>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2" display="block" gutterBottom>
              Email: namtq@unit.com.vn
            </Typography>
            <Typography variant="body2" display="block" gutterBottom>
              Phone: +84 79 969 2994
            </Typography>
            <Typography variant="body2" display="block" gutterBottom>
              Address: 123 Main Street, Anytown, VietNam
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
