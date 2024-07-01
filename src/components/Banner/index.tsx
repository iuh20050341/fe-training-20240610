import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';

// Định nghĩa kiểu cho props
interface BannerSlideProps {
  time: number;
  imgList1: string[];
  imgList2: string[];
}

const BannerSlide: React.FC<BannerSlideProps> = ({ time, imgList1, imgList2 }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === imgList1.length - 1 ? 0 : prevIndex + 1));
    }, time);

    return () => clearInterval(interval);
  }, [time, imgList1]);

  return (
    <div className="banner">
      <div className="banner1">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '50px' }}>
          <div style={{ position: 'relative', width: '80%', height: '400px', overflow: 'hidden', boxShadow: '20px', borderRadius: '10px', marginTop: '20px' }}>
            {imgList1.map((imageUrl, index) => (
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
        <div className="banner2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '100px', marginBottom: '10px' }}>
          <Grid sx={{ flexGrow: 1 }} container spacing={0}>
            {imgList2.map((img, index) => (
              <Grid key={index} container spacing={2} item xs={3}>
                <img style={{ borderRadius: '20px' }} src={img} alt="" />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default BannerSlide;
