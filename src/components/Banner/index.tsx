import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "../Paper/index.tsx";

type Image = {
  url: string;
  title: string;
};
interface BannerSlideProps {
  time: number;
  imgList1: string[];
  imgList2: string[];
  imgList3: Image[];
}

const BannerSlide: React.FC<BannerSlideProps> = ({
  time,
  imgList1,
  imgList2,
  imgList3,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === imgList1.length - 1 ? 0 : prevIndex + 1
      );
    }, time);

    return () => clearInterval(interval);
  }, [time, imgList1]);

  return (
    <div className="banner">
      <div className="banner1">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "50px",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "80%",
              height: "400px",
              overflow: "hidden",
              boxShadow: "20px",
              borderRadius: "10px",
              marginTop: "20px",
            }}
          >
            {imgList1.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`Slide ${index + 1}`}
                style={{
                  position: "absolute",
                  top: "0",
                  left: `${(index - currentIndex) * 100}%`,
                  transition: "left 0.5s ease-in-out",
                  width: "100%",
                  height: "100%",
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <div
        className="banner2"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "130px",
          marginBottom: "10px",
        }}
      >
        <Grid sx={{ flexGrow: 1 }} container spacing={0}>
          {imgList2.map((img, index) => (
            <Grid key={index} container spacing={2} item xs={3}>
              <img style={{ borderRadius: "20px" }} src={img} alt="" />
            </Grid>
          ))}
        </Grid>
      </div>
      <div>
        <Paper
          style={{
            backgroundColor: "white",
            width: "90%",
            marginLeft: 75,
          }}
        >
          <Grid sx={{ flexGrow: 1 }} container spacing={0}>
            {imgList3.map((item, index) => (
              <Grid
                key={index}
                container
                spacing={0}
                direction="column"
                item
                xs={2}
                alignItems="center"
              >
                <img
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
                  src={item.url}
                  alt=""
                />
                {item.title}
              </Grid>
            ))}
          </Grid>
        </Paper>
      </div>
    </div>
  );
};

export default BannerSlide;
