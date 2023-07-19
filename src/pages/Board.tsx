import * as React from 'react';
import WaveSurfer from 'wavesurfer.js'
import Timeline from 'wavesurfer.js/dist/plugins/timeline.js'

const { useRef, useState, useEffect, useCallback } = React

// WaveSurfer hook
const useWavesurfer = (containerRef, options) => {
  const [wavesurfer, setWavesurfer] = useState(null)

  // Initialize wavesurfer when the container mounts
  // or any of the props change
  useEffect(() => {
    if (!containerRef.current) return

    const ws = WaveSurfer.create({
      ...options,
      container: containerRef.current,
    })

    setWavesurfer(ws)

    return () => {
      ws.destroy()
    }
  }, [options, containerRef])

  return wavesurfer
}

// Create a React component that will render wavesurfer.
// Props are wavesurfer options.
const WaveSurferPlayer = (props) => {
  const containerRef = useRef()
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const wavesurfer = useWavesurfer(containerRef, props)

  // On play button click
  const onPlayClick = useCallback(() => {
    wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play()
  }, [wavesurfer])

  // Initialize wavesurfer when the container mounts
  // or any of the props change
  useEffect(() => {
    if (!wavesurfer) return

    setCurrentTime(0)
    setIsPlaying(false)

    const subscriptions = [
      wavesurfer.on('play', () => setIsPlaying(true)),
      wavesurfer.on('pause', () => setIsPlaying(false)),
      wavesurfer.on('timeupdate', (currentTime) => setCurrentTime(currentTime)),
    ]

    return () => {
      subscriptions.forEach((unsub) => unsub())
    }
  }, [wavesurfer])

  return (
    <>
    <button onClick={onPlayClick} className="btn-play">
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <div ref={containerRef} style={{ minHeight: '120px'}} />

   

      <p>Seconds played: {currentTime}</p>
    </>
  )
}

export default function Board() {

  const [file, setFile] = useState();
  

  const handleFileChange = (e) => {
      setFile(e.target.files[0]);
  };

  return (
    <div className="home">
      <div className="home-header">
        <h1>Board</h1>
      </div>
      <input type="file" className="input-board" onChange={handleFileChange}  />
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
  );
}