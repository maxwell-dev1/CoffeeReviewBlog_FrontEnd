'use client'; // Important: This makes it a Client Component

import { useParams } from 'next/navigation';
import useFetch from '../../../../hooks/useFetch';
import { api } from '../../../../utils/api';

export default function ArticlePage() {
  const { id } = useParams();

  // Fetch the single article using your .NET endpoint: /api/articles/{id}
  const { loading, error, data } = useFetch(`${api.articles}/${id}`);
  const article = data?.data || {}; //article must be set this way since "data" is wrapped in JSOn in useFetch..but this is a single item so we do this..also when this code first loads "data" won't be ready yet so we'll set it to empty..when its not null we'll parse the data from data
  console.log(data)

  if (loading) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center', color: '#dbc1ac' }}>
        Loading article...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center', color: '#dbc1ac' }}>
        Article not found or something went wrong.
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: '900px',
      margin: '40px auto',
      padding: '20px',
      color: '#f5ede4',
      background: 'linear-gradient(rgb(163, 138, 105,.75), rgba(56, 41, 29, 0.928))',
      borderRadius: '16px',
      border: '1px solid #ece0d1',
      boxShadow: '0px 0px 20px #dbc1ac',
    }}>
      {/* Title */}
      <h1 style={{
        fontSize: '3.5rem',
        textAlign: 'center',
        marginBottom: '20px',
        textShadow: '0px 0px 10px rgba(219,193,172,0.6)',
      }}>
        {article.title}
      </h1>

      {/* Author and Date */}
      <div style={{
        textAlign: 'center',
        marginBottom: '40px',
        fontSize: '1.2rem',
        opacity: 0.9,
      }}>
        By <strong>{article.author} </strong> 
        •{' '}Published: {new Date(article.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
            })}
        
      </div>

      

      {/* Body */}
        <div
            style={{
            lineHeight: '1.9',
            textAlign: 'justify',
            }}
        >
        {article.body}
        </div>
    </div>
  );
}