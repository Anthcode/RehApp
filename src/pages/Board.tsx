import * as React from 'react';
import WaveSurfer from 'wavesurfer.js';
import Timeline from 'wavesurfer.js/dist/plugins/timeline.js';
import Comments from '../components/Comments'

const { useRef, useState, useEffect, useCallback } = React;

// WaveSurfer hook
const useWavesurfer = (containerRef, options) => {
  const [wavesurfer, setWavesurfer] = useState(null);

  // Initialize wavesurfer when the container mounts
  // or any of the props change
  useEffect(() => {
    if (!containerRef.current) return;

    const ws = WaveSurfer.create({
      ...options,
      container: containerRef.current,
    });

    setWavesurfer(ws);

    return () => {
      ws.destroy();
    };
  }, [options, containerRef]);

  return wavesurfer;
};

// Create a React component that will render wavesurfer.
// Props are wavesurfer options.
const WaveSurferPlayer = (props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const wavesurfer = useWavesurfer(containerRef, props);

  // On play button click
  const onPlayClick = useCallback(() => {
    wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play();
  }, [wavesurfer]);

  // Initialize wavesurfer when the container mounts
  // or any of the props change
  useEffect(() => {
    if (!wavesurfer) return;

    setTime(0);
    setIsPlaying(false);



    const subscriptions: (() => void)[] = [
      wavesurfer.on('play', () => setIsPlaying(true)),
      wavesurfer.on('pause', () => setIsPlaying(false)),
      wavesurfer.on('timeupdate', (currentTime: number) => setTime(Number(currentTime.toFixed(2)))),
    ];

    return () => {
      subscriptions.forEach((unsub) => unsub());
    };
  }, [wavesurfer]);

  return (
    <>
      <button onClick={onPlayClick} className="btn-play">
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <div ref={containerRef} style={{ minHeight: '130px' }} />
      <p>Seconds played: {time}</p>
    </>
  );
};

const Board: React.FC = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      setFile(e.currentTarget.files[0]);
    }
  };

  return (
    <div className="home">
      <div className="home-header">
        <h1>Board</h1>
      </div>
      <input type="file" className="input-board" onChange={handleFileChange} />
      <div className="board">
      <Comments />
      <section className="file-board">
     
        <WaveSurferPlayer
          height={120}
          barWidth="4"
          barGap="1"
          barRadius="2"
          waveColor="rgb(100, 100, 180)"
          progressColor="rgb(100, 0, 100)"
          url="https://wavesurfer-js.org//wavesurfer-code/examples/audio/audio.wav"
          plugins={[Timeline.create()]}
        />
      </section>
      </div>
    </div>
  );
};
export default Board;
