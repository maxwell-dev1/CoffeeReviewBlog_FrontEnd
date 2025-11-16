import { useState, useEffect } from 'react';

// This hook fetches data from any URL and returns:
// - data: the JSON response
// - loading: true while fetching
// - error: any error message
export default function useFetch(url) {
  // State to hold the fetched data
  // Starts as null because we haven't fetched yet
  const [data, setData] = useState(null);

  // State to show a loading spinner
  const [loading, setLoading] = useState(true);

  // State to show error messages
  const [error, setError] = useState(null);

  // useEffect runs when the component mounts OR when 'url' changes
  useEffect(() => {
    // This is the actual function that talks to the API
    const fetchData = async () => {
      try {
        // Step 1: Make the HTTP GET request
        const res = await fetch(url);

        // Step 2: Check if the response is OK (200-299)
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }

        // Step 3: Parse the JSON response
        const json = await res.json();

        // Step 4: .NET returns an array directly: [ {...}, {...} ]
        // But your old Strapi code expects: { data: [ {...}, {...} ] }
        // So we wrap it to keep your old code working
        setData({ data: json });

        // Step 5: Done loading
        setLoading(false);
      } catch (err) {
        // If anything fails (network, 404, etc.), save the error
        setError(err.message);
        setLoading(false);
      }
    };

    // Run the fetch function
    fetchData();
  }, [url]); // ← Only re-run if the URL changes

  // Return the three values so your component can use them
  return { data, loading, error };
}