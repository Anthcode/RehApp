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
      <div ref={containerRef} style={{ minHeight: '120px' }} />

      <button onClick={onPlayClick} style={{ marginTop: '1em' }}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>

      <p>Seconds played: {currentTime}</p>
    </>
  )
}

// Another React component that will render two wavesurfers
const App = () => {
  const urls = ['/examples/audio/audio.wav', '/examples/audio/stereo.mp3']
  const [audioUrl, setAudioUrl] = useState(urls[0])

  // Swap the audio URL
  const onUrlChange = useCallback(() => {
    urls.reverse()
    setAudioUrl(urls[0])
  }, [])

  // Render the wavesurfer component
  // and a button to load a different audio file
  return (
    <>
      <WaveSurferPlayer
        height={100}
        waveColor="rgb(200, 0, 200)"
        progressColor="rgb(100, 0, 100)"
        url={audioUrl}
        plugins={[Timeline.create()]}
      />

      <button onClick={onUrlChange}>Change audio</button>
    </>
  )
}

export default function Board() {

  const [file, setFile] = useState<File>();
  
  

  const urls = ['/examples/audio/audio.wav', '/examples/audio/stereo.mp3']
  const [audioUrl, setAudioUrl] = useState(urls[0])
   // Swap the audio URL
   const onUrlChange = useCallback(() => {
    urls.reverse()
    setAudioUrl(urls[0])
  }, [])



  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };


  // Render the wavesurfer component
  // and a button to load a different audio file

  return (
    <div className="board">
      <div className="home-header">
        <h1>Board</h1>
      </div>
      <section className="file-board">
       <input type="file" onChange={handleFileChange}  />

       <WaveSurferPlayer
        height={100}
        waveColor="rgb(200, 0, 200)"
        progressColor="rgb(100, 0, 100)"
        url={audioUrl}
        plugins={[Timeline.create()]}
      />

      <button onClick={onUrlChange}>Change audio</button>
       
      </section>  
    </div>
  );
}