import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';
import './favorities.css'; // Make sure to include the animations in a separate CSS file.
import { FaHeart, FaPlayCircle, FaPauseCircle } from 'react-icons/fa';

function Favorities() {
  const [playlist, setPlaylist] = useState([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  useEffect(() => {
    // Fetch the playlist data
    axios
      .get(`http://localhost:3000/favorities`)
      .then((response) => {
        const playlistData = response.data;
        setPlaylist(playlistData);
      })
      .catch((error) => {
        console.error('Error fetching playlist items: ', error);
      });
  }, []);

  useEffect(() => {
    const handleAudioPlay = (itemId, audioElement) => {
      // Pause the previously playing audio if it exists
      if (currentlyPlaying && currentlyPlaying !== audioElement) {
        currentlyPlaying.pause(); // Pause the currently playing audio
      }
      setCurrentlyPlaying(audioElement); // Update the currently playing audio
    };

    // Add event listener for each audio element to handle play
    playlist.forEach((item) => {
      const audioElement = document.getElementById(`audio-${item.id}`);
      if (audioElement) {
        audioElement.addEventListener('play', () => {
          handleAudioPlay(item.id, audioElement);
        });
      }
    });

    // Cleanup event listeners when the component unmounts or playlist changes
    return () => {
      playlist.forEach((item) => {
        const audioElement = document.getElementById(`audio-${item.id}`);
        if (audioElement) {
          audioElement.removeEventListener('play', () => handleAudioPlay(item.id, audioElement));
        }
      });
    };
  }, [playlist, currentlyPlaying]);

  const removeFromFavorites = async (itemId) => {
    try {
      const selectedItem = playlist.find((item) => item.itemId === itemId);
      if (!selectedItem) {
        throw new Error('Selected item not found in favorites');
      }

      // Remove item from favorites by making a DELETE request
      await axios.delete(`http://localhost:3000/favorities/${selectedItem.id}`);
      // Refresh the playlist after removal
      const response = await axios.get('http://localhost:3000/favorities');
      setPlaylist(response.data);
    } catch (error) {
      console.error('Error removing item from favorites: ', error);
    }
  };

  return (
    <div className="favorities-container">
      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-semibold mb-4 text-center">Favorites</h2>

        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Genre</th>
              <th>Actions</th>
              <th>Audio</th>
            </tr>
          </thead>
          <tbody>
            {playlist.map((item, index) => (
              <tr key={item._id} className="fade-in-row">
                <td>{index + 1}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src={item.imgUrl}
                      alt="Item Image"
                      className="rounded"
                      style={{ height: '50px', width: '50px' }}
                    />
                    <div style={{ paddingLeft: '20px' }}>
                      <strong>{item.title}</strong>
                      <p>{item.singer}</p>
                    </div>
                  </div>
                </td>
                <td>{item.genre}</td>
                <td>
                  <Button
                    variant="link"
                    style={{ padding: 0 }}
                    onClick={() => removeFromFavorites(item.itemId)}
                    className="remove-btn"
                  >
                    <FaHeart color="red" />
                  </Button>
                </td>
                <td>
                  <audio controls id={`audio-${item.id}`} style={{ width: '250px' }}>
                    <source src={item.songUrl} />
                  </audio>
                  <div style={{ marginTop: '10px' }}>
                    {currentlyPlaying && currentlyPlaying.id === `audio-${item.id}` ? (
                      <FaPauseCircle
                        color="blue"
                        className="audio-control-icon"
                        onClick={() => currentlyPlaying.pause()}
                      />
                    ) : (
                      <FaPlayCircle
                        color="green"
                        className="audio-control-icon"
                        onClick={() => document.getElementById(`audio-${item.id}`).play()}
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Favorities;
