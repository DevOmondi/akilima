import Audiorecord from '../recordAudio/audioRecord';
import './audioBox.scss';
import React, { useRef } from 'react';
type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  audioSrc: string
}
const AudioBox = (props: Props) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  //function to seek to a specific time in the audio
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(e.target.value);
      setCurrentTime(Number(e.target.value));
    }
  };
  //function to update the current time and duration of the audio
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };
  //function to handle playing the audio
  const handlePlay = () => {
    audioRef.current?.play();
    setIsPlaying(true)
  };
  //function to handle pausing the audio
  const handlePause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };
  //function to toggle between the play and pause state
  const handlePlayPause = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  }
  //function to format the duration in 'mm:ss' format.
  function formatDuration(durationSeconds: number) {
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.floor(durationSeconds % 60);
    const formattedSeconds = seconds.toString().padStart(2, "0");
    return `${minutes}:${formattedSeconds}`;
  }
  //Use an effect to listen for 'timeupdate' events from the audio element and update
  React.useEffect(() => {
    audioRef.current?.addEventListener("timeupdate", handleTimeUpdate);
    //clean up the event listener when the component unmounts
    return () => {
      audioRef.current?.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [])
  return (
    <div className='audioBox'>
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>X</span>
        <h1>Below is my Audio Module</h1>
        <div className='audio-component'>
        <div className="player-card">
          {/* //input range for seeking within the audio track */}
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
          />
          {/* //the audio element for playing the audio */}
          <audio ref={audioRef} src={props.audioSrc} />
          {/* Display current and total duration of the track */}
          <div className="track-duration">
            <p>{formatDuration(currentTime)}</p>
            <p>{formatDuration(duration)}</p>
          </div>
        </div>
        {/* play and pause button with a dynamic icon */}
        <button onClick={handlePlayPause}>
            <span className="material-symbols-rounded">
              {isPlaying ? "pause" : "play_arrow"}
            </span>
          </button>
      </div>
      <Audiorecord/>
      </div>
    </div>
  )
}

export default AudioBox