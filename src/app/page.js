'use client';
import { useState } from 'react';
import { useLogGood } from '/components/LogGoodContext';
import { useUserContext } from '/components/UserContext';
import { useJwtContext } from '/components/JwtContext';
import { Typography, Paper, Box } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

export default function RootPage() {
  // const [reviewImages] = useState([]);
  const [reviewLinks] = useState([]);
  const { logGood } = useLogGood();
  const { activeUser } = useUserContext();
  //const { jwt } = useJwtContext();

  console.log('logGood = ' + logGood + '. active user is: ' + activeUser);
  const images = ['/1.jpg', '/2.jpg', '/3.jpg'];

  
  return (
    <div>
      {/* Title texts */}
      <div style={{ display: 'flex', marginLeft: '20%' }}>
        <Typography
          sx={{
            letterSpacing: 6,
            marginTop: 2,
            color: '#dbc1ac',
            fontSize: 32,
          }}
        >
          Featured Articles:
        </Typography>
        <Typography
          sx={{
            letterSpacing: 6,
            marginTop: 2,
            color: '#dbc1ac',
            fontSize: 32,
            marginLeft: '30%',
          }}
        >
          Recent Reviews:
        </Typography>
      </div>

      {/* Main content container */}
      <div className="homeCardCont">
        <Paper
          className="homeTopCards"
          sx={{
            backgroundColor: 'rgba(0,0,0,0)',
            marginLeft: 10,
            width: '45%',
            marginTop: '28px',
          }}
        >
          {/* Placeholder for Featured Articles */}
        </Paper>

        <Box sx={{ width: '40%', '& .css-1m9128y': { marginTop: '28px' } }}>
          <Carousel sx={{ borderRadius: '12px', width: '100%' }}>
                {images.map((src, i) => (
                <Paper key={i} sx={{ backgroundColor: 'black', borderRadius: '12px' }}>
                    <Box
                    sx={{
                        width: '100%',
                        height: '640px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'hidden',
                    }}
                    >
                    <img
                        src={src}
                        alt={`Slide ${i + 1}`}
                        style={{
                        maxWidth: '100%',
                        maxHeight: '600px',
                        borderRadius: 10,
                        }}
                    />
                    </Box>
                </Paper>
                ))}          
            </Carousel>
        </Box>
      </div>
    </div>
  );
}