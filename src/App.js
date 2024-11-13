import { useRef, useState } from 'react';
// import ReactPlayer from 'react-player';
import './App.css';
// import UserForm from "./components/userForm/userForm";
import Navbar from './components/navbar/Navbar';
import PlaylistComponent from './components/playList/PlaylistComponent';
import { playlistData } from './jsonData/MusicData';

function App() {
  const [duration, setDuration] = useState(0); // To store the duration of the audio
  const [currentTime, setCurrentTime] = useState(10); // To track the current time
  const [playing, setPlaying] = useState(false); // To toggle play/pause
  const [audioUrl, setAudioUrl] = useState("https://samplesongs.netlify.app/Death%20Bed.mp3"); // Sample audio URL

  const playerRef = useRef(null); // Reference to ReactPlayer for c4ontrol

  const onDuration = (duration) => {
    setDuration(duration);
  };

  const onSeek = (e) => {
    const newTime = e.target.value;
    setCurrentTime(newTime);
    playerRef.current.seekTo(newTime);
  };

  const togglePlayPause = () => {
    setPlaying((prevState) => !prevState);
  };

  const handleNext = () => {
    // Set the next track URL here
    setAudioUrl("https://samplesongs.netlify.app/Another%20Track.mp3");
    setPlaying(true); // Start playing the next track automatically
  };

  const handlePrev = () => {
    // Set the previous track URL here
    setAudioUrl("https://samplesongs.netlify.app/Death%20Bed.mp3");
    setPlaying(true); // Start playing the previous track automatically
  };

  const onProgress = (state) => {
    setCurrentTime(state.playedSeconds);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const fetchMusicData = async (endpoint, query = "") => {
    const url = `https://jsonplaceholder.typicode.com/${endpoint}${query}`;

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();  // Parse the response body as JSON
      return data;  // Return the parsed JSON data
    } catch (error) {
      console.error("Error fetching data:", error.message);
      throw error;  // Re-throw the error for further handling
    }
  };

  // Using the async function with await inside another async function
  const getData = async () => {
    try {
      const data = await fetchMusicData("photos", "");
      console.log("data===>>>>>>>>>>>>>>>>>>>", data);  // Log the data
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  // Call the async function
  getData();


  return (
    <div className="w-full h-screen">
      <Navbar />
      <PlaylistComponent playlist={playlistData}/>
      {/* <div className="player-container">
        <ReactPlayer
          ref={playerRef}
          url={audioUrl}
          playing={playing}
          controls={false} // Hide default controls
          onDuration={onDuration}
          onProgress={onProgress}
          width="100%"
          height="100px" // You can customize the height
        />

        <div className="audio-controls">
          <button className="prev-btn" onClick={handlePrev}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z" />
            </svg>
          </button>
          <button className="play-pause-btn" onClick={togglePlayPause}>
            {playing ?
              <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
              </svg>
              :
              <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
              </svg>
            }
          </button>
          <button className="next-btn" onClick={handleNext}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
            </svg>
          </button>
          <input
            type="range"
            className="seek-bar"
            min="0"
            max={duration}
            value={currentTime}
            onChange={onSeek}
          />

          <span className="duration">{`${formatTime(currentTime)} / ${formatTime(duration)}`}</span>
        </div>
      </div> */}

      {/* <header className="w-full py-2 flex justify-center items-center bg-[#091057] text-white">
        User Form
      </header>
      <UserForm /> */}
    </div>
  );
}

export default App;
