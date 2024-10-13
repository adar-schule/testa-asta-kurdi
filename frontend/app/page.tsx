"use client"; // Ensure this is a client-side component

import { useEffect, useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState(''); // State to hold backend response

  // Use useEffect to call the backend when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use the Heroku API URL if available, fallback to localhost for development
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
        console.log('Fetching data from:', apiUrl);

        const res = await fetch(apiUrl);
        if (!res.ok) {
          throw new Error(`Error: ${res.statusText}`);
        }

        const data = await res.text();
        console.log('Backend response:', data); // Log the response from backend
        setMessage(data); // Set the backend response
      } catch (err) {
        console.error('Error fetching data from backend:', err);
        setMessage('Error fetching data.');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>{message || 'Loading...'}</h1> {/* Display the backend message as a heading */}
    </div>
  );
}