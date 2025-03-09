import React, { useState, useEffect } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  // Dummy data for search results (Replace with real API call or data)
  const allData = [
    { _id: 1, title: "Shape of You", singer: "Ed Sheeran", genre: "Pop", imageUrl: "https://via.placeholder.com/150" },
    { _id: 2, title: "Blinding Lights", singer: "The Weeknd", genre: "Pop", imageUrl: "https://via.placeholder.com/150" },
    { _id: 3, title: "Bohemian Rhapsody", singer: "Queen", genre: "Rock", imageUrl: "https://via.placeholder.com/150" },
    { _id: 4, title: "Rolling in the Deep", singer: "Adele", genre: "Soul", imageUrl: "https://via.placeholder.com/150" },
    // Add more items as needed
  ];

  useEffect(() => {
    if (searchTerm === '') {
      setSearchResults([]);
    } else {
      const results = allData.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.singer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.genre.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    }
  }, [searchTerm]);

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-4 text-center">Search</h2>
      <InputGroup className="mb-3" style={{ maxWidth: '600px', margin: 'auto' }}>
        <InputGroup.Text id="search-icon">
          <FaSearch />
        </InputGroup.Text>
        <Form.Control
          type="search"
          placeholder="Search by singer, genre, or song name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            outline: 'none',
            boxShadow: 'none',
            border: '1px solid #ced4da',
            borderRadius: '0.25rem',
            padding: '10px',
          }}
          className="search-input"
        />
      </InputGroup>

      <br />
      <div
        style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '30px',
        }}
      >
        {searchResults.length > 0 ? (
          searchResults.map((result) => (
            <div key={result._id} className="bg-white p-4 rounded shadow hover:shadow-lg transition duration-300">
              <img
                src={result.imageUrl}
                alt={result.title}
                className="rounded mb-3"
                style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
              />
              <h5>{result.title}</h5>
              <p>{result.singer}</p>
              <p style={{ color: '#777' }}>{result.genre}</p>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', width: '100%' }}>No results found</p>
        )}
      </div>
    </div>
  );
}

export default Search;
