import React from 'react';
import { Typography, Card, CardMedia, CardContent } from '@mui/material';
import { CardActionArea } from '@mui/material';

interface BoxProductProps {
  image: string;
  name: string;
}

const BoxProduct: React.FC<BoxProductProps> = ({ image, name }) => {
  return (
    <div>
      <Card sx={{ width: '250px', margin: '10px', height: '380px' }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="240"
            image={`data:image/png;base64,${image}`}
            alt={name}
            style={{ marginTop: '10px' }}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default BoxProduct;
