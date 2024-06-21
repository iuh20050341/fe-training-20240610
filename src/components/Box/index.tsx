import * as React from 'react';
import Box from '@mui/material/Box';

export default function BoxSystemProps({item, height, width}) {
  return (
    <Box
      height={height}
      width={width}
      my={4}
      display="flex"
      alignItems="center"
      gap={4}
      p={2}
      sx={{ border: '2px solid grey' }}
    >
        {item}
    </Box>
  );
}
