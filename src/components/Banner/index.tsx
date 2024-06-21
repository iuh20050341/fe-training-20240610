import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';

const images = [
  'https://cdn0.fahasa.com/media/magentothem/banner7/DoChoiT624-slide_-smallbanner_Slide_840x320.png?text=Slide+1',
  'https://cdn0.fahasa.com/media/magentothem/banner7/Summersale_0624_ldp_840x320_DealHot.jpg?text=Slide+2',
  'https://cdn0.fahasa.com/media/magentothem/banner7/NCC_0624_HuyHoang_Slide_840x320_1.png?text=Slide+3',
];

const BannerSlide = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='banner'>
      <div className='banner1'>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom:'50px'}}>
            <div style={{ position: 'relative', width: '80%', height: '400px', overflow: 'hidden', boxShadow:'20px', borderRadius:'10px', marginTop:'20px' }}>
            {images.map((imageUrl, index) => (
                <img
                key={index}
                src={imageUrl}
                alt={`Slide ${index + 1}`}
                style={{
                    position: 'absolute',
                    top: '0',
                    left: `${(index - currentIndex) * 100}%`,
                    transition: 'left 0.5s ease-in-out',
                    width: '100%',
                    height: '100%',
                }}
                />
            ))}
            </div>
      </div>
        <div className='banner2' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft:'100px', marginBottom:'10px'}}>
        <Grid sx={{ flexGrow: 1 }} container spacing={0}>
          <Grid container spacing={2} item xs={3}>
            <img style={{borderRadius:'20px'}} src="https://cdn0.fahasa.com/media/wysiwyg/Thang-06-2024/NCC_0624_ThienLong_Smallbanner_310x210.png" alt="" />
          </Grid>
          <Grid container spacing={2} item xs={3}>
            <img style={{borderRadius:'20px'}} src="https://cdn0.fahasa.com/media/wysiwyg/Thang-06-2024/NgoaiVanT6_310x210.jpg" alt="" />
          </Grid>
          <Grid container spacing={2} item xs={3}>
            <img style={{borderRadius:'20px'}} src="https://cdn0.fahasa.com/media/wysiwyg/Thang-06-2024/BachHoa_SmallBanner_310x210.jpg" alt="" />
          </Grid>
          <Grid container spacing={2} item xs={3}>
            <img style={{borderRadius:'20px'}} src="https://cdn0.fahasa.com/media/wysiwyg/Thang-06-2024/NCC_0624_HuyHoang_Smallbanner_310x210.png" alt="" />
          </Grid>
        </Grid>
        </div>
      </div>
    </div>
  );
};

export default BannerSlide;
