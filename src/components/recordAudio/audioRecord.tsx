import {useRef } from 'react';
import "./audioRecord.scss";

const AudioRecorder = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const items: BlobPart[] = [];

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);

            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    items.push(e.data);
                }

                if (recorder.state === 'inactive') {
                    const audioElement = audioRef.current;
                    if (audioElement) {
                        const audioBlob = new Blob(items, { type: 'audio/webm' });
                        audioElement.src = URL.createObjectURL(audioBlob);
                    }
                }
            };

            recorder.start(100);

            setTimeout(() => {
                recorder.stop();
            }, 5000);
        } catch (error) {
            console.error('Error accessing microphone:', error);
        }
    };


    return (
        <div className="audio">
            <span>1.Allow Audio Permission</span><br />
            <span>2.Start talking it will display</span>
            <div className='audio-display'>
                <audio ref={audioRef} controls />
                <button onClick={startRecording}>Record</button>
            </div>
        </div>
    );
};

export default AudioRecorder;
