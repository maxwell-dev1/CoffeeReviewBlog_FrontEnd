'use client';

import { Typography, Paper, Box, List, ListItem, ListItemText } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import useFetch from '../../hooks/useFetch'
import {api} from '../../utils/api'
import Link from 'next/link';


export default function RootPage() {


  const images = ['/1.jpg', '/2.jpg', '/3.jpg'];

  const { loading, error, data } = useFetch(`${api.articles}`); 

  // Get the actual array (remember: your hook wraps in { data: [...] })
  const articles = data?.data || [];

  // Sort by publishedAt descending and take top 5
  const featuredArticles = [...articles]
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, 5);


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

        {/*----------------------------- FEATURED ARTICLES LINKS/ CARDS ----------------------------------*/}
        <Paper
          className="homeTopCards"
          sx={{
            backgroundColor: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(8px)',
            marginLeft: 10,
            width: '45%',
            marginTop: '28px',
            padding: '20px',
            borderRadius: '16px',
            border: '1px solid #ece0d1',
            boxShadow: '0px 0px 15px rgba(219,193,172,0.3)',
            maxHeight: '640px',
            overflowY: 'auto',
          }}
        >
          {loading && <Typography sx={{ color: '#dbc1ac', textAlign: 'center', mt: 4 }}>Loading articles...</Typography>}

          {error && <Typography sx={{ color: 'red', textAlign: 'center' }}>Error loading articles</Typography>}

          {!loading && !error && featuredArticles.length === 0 && (
            <Typography sx={{ color: '#dbc1ac', textAlign: 'center', mt: 4 }}>No articles yet</Typography>
          )}

          {!loading && !error && featuredArticles.length > 0 && (
            <List>
              {featuredArticles.map((article) => (
                <ListItem
                  key={article.id}
                  component={Link}
                  href={`/articles/${article.id}`}
                  sx={{
                    marginBottom: '16px',
                    padding: '12px 16px',
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    borderRadius: '12px',
                    transition: 'all 0.3s',
                    '&:hover': {
                      backgroundColor: 'rgba(219,193,172,0.2)',
                      transform: 'translateX(8px)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                    },
                  }}
                >
                  <ListItemText
                    primary={article.title}
                    primaryTypographyProps={{
                      sx: {
                        color: '#dbc1ac',
                        fontSize: '1.3rem',
                        fontWeight: 500,
                      },
                    }}
                    secondary={
                      <Typography component="span" sx={{ color: '#b89f87', fontSize: '0.95rem' }}>
                        By {article.author} • {new Date(article.publishedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
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