import { useState, useEffect, useRef } from 'react';
import { Conductor } from './utils/Conductor';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(100);
  const [beat, setBeat] = useState(0);
  const conductorRef = useRef<Conductor | null>(null);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    // Initialize Conductor
    conductorRef.current = new Conductor(bpm, (beatNumber) => {
      setBeat(beatNumber);
      setFlash(true);
      setTimeout(() => setFlash(false), 100); // Reset flash after 100ms
    });

    return () => {
      if (conductorRef.current) {
        conductorRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (conductorRef.current) {
      conductorRef.current.setBpm(bpm);
    }
  }, [bpm]);

  const togglePlay = () => {
    if (!conductorRef.current) return;

    if (isPlaying) {
      conductorRef.current.stop();
    } else {
      conductorRef.current.start();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Say the Word
      </h1>

      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-700">
        <div className="flex justify-between items-center mb-8">
          <div className="text-gray-400">BPM: {bpm}</div>
          <div className="text-gray-400">Beat: {beat}</div>
        </div>

        {/* The "Beat" Visualizer */}
        <div className={`w-full h-32 rounded-lg mb-8 transition-colors duration-75 flex items-center justify-center text-4xl font-bold
          ${flash ? 'bg-pink-500 scale-105' : 'bg-gray-700 scale-100'} transform`}
        >
          {flash ? 'HIT!' : '...'}
        </div>

        <div className="space-y-4">
          <button
            onClick={togglePlay}
            className={`w-full py-4 rounded-lg font-bold text-lg transition-all
              ${isPlaying 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-green-500 hover:bg-green-600'
              }`}
          >
            {isPlaying ? 'Stop' : 'Start Game'}
          </button>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400">Speed:</span>
            <input
              type="range"
              min="60"
              max="200"
              value={bpm}
              onChange={(e) => setBpm(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 text-gray-500 text-sm max-w-md text-center">
        <p>Instructions: Click "Start Game" and say the word on the beat.</p>
        <p className="mt-2">(Microphone integration coming soon)</p>
      </div>
    </div>
  );
}

export default App;
