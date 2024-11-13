import React, { useState } from 'react';
import { playlistData } from '../../jsonData/MusicData';
import AudioPlayer from '../audioPlayer/AudioPlayer';

const PlaylistComponent = ({ playlist }) => {
  const [currentSong, setCurrentSong] = useState(null);

  const handleSongClick = (song) => {
    setCurrentSong(song);
  };

  return (
    <div className="bg-gray-900 text-white p-4 shadow-md">
      <h2 className="text-2xl font-bold mb-4">My Playlist</h2>
      <ul className="space-y-3">
        {playlistData.map((song) => (
          <li
            key={song.id}
            onClick={() => handleSongClick(song)}
            className="flex items-center p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700"
          >
            <img
              src={song.thumbnail}
              alt={`${song.title} thumbnail`}
              className="w-12 h-12 rounded-md mr-4"
            />
            <div className="flex-1">
              <h4 className="font-semibold">{song.title}</h4>
              <p className="text-sm text-gray-400">{song.artist} - {song.album}</p>
            </div>
            <span className="text-gray-400">{song.duration}</span>
          </li>
        ))}
      </ul>
      {currentSong && <AudioPlayer song={currentSong} />}
    </div>
  );
};

export default PlaylistComponent;
