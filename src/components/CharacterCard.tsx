import React, { useEffect, useRef, useState } from 'react';
import HanziWriter from 'hanzi-writer';
import { Volume2, RefreshCw, Share2, Star } from 'lucide-react';
import type { Character } from '../data/characters';
import html2canvas from 'html2canvas';

interface Props {
  data: Character;
  isActive: boolean;
}

const CharacterCard: React.FC<Props> = ({ data, isActive }) => {
  const writerRef = useRef<HanziWriter | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [grade, setGrade] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initialize writer
  useEffect(() => {
    if (!containerRef.current) return;

    // Clear container if it has children (handling strict mode double render)
    containerRef.current.innerHTML = '';

    const writer = HanziWriter.create(containerRef.current, data.char, {
      width: 300,
      height: 300,
      padding: 5,
      showOutline: true,
      strokeAnimationSpeed: 1,
      delayBetweenStrokes: 200,
      charDataLoader: (char, onComplete) => {
        fetch(`https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0/${char}.json`)
          .then(res => res.json())
          .then(onComplete);
      }
    });

    writerRef.current = writer;
    setLoading(false);

    // Initial quiz start if already active (e.g. first slide)
    if (isActive) {
        // We need to wait for loading, but useEffect below handles it
    }

    return () => {
      // No explicit destroy method on instance, but we clear innerHTML on mount
    };
  }, [data.char]);

  // Handle active state (start quiz when scrolled into view)
  useEffect(() => {
    if (isActive && writerRef.current && !loading) {
      // Small timeout to ensure UI is settled
      const timer = setTimeout(() => {
        startQuiz();
        playSound();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isActive, loading]);

  const startQuiz = () => {
    if (!writerRef.current) return;
    
    setGrade(null);
    setIsComplete(false);

    writerRef.current.quiz({
      onMistake: function() {
        // console.log('Mistake!');
      },
      onComplete: function(summaryData) {
        setIsComplete(true);
        // Calculate a simple grade based on mistakes
        // summaryData contains totalMistakes
        let score = 100 - (summaryData.totalMistakes * 10);
        if (score < 0) score = 0;
        setGrade(score);
        
        // Celebrate
        if (score > 80) playSound(true);
      }
    });
  };

  const playSound = (success = false) => {
    if ('speechSynthesis' in window) {
      // Cancel previous
      window.speechSynthesis.cancel();
      
      const text = success ? 'Great job!' : data.char;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = success ? 'en-US' : 'zh-CN';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleShare = async () => {
    if (cardRef.current) {
      try {
        const canvas = await html2canvas(cardRef.current);
        canvas.toBlob(async (blob) => {
          if (!blob) return;
          
          if (navigator.share) {
            const file = new File([blob], `mandarin-${data.char}.png`, { type: 'image/png' });
            try {
              await navigator.share({
                title: `I learned ${data.char} (${data.meaning})!`,
                text: `I got a score of ${grade} on writing ${data.char} in Mandarin!`,
                files: [file]
              });
            } catch (e) {
              console.log('Share failed', e);
            }
          } else {
            alert('Sharing not supported on this device/browser context, but you did great!');
          }
        });
      } catch (e) {
        console.error('Screenshot failed', e);
      }
    }
  };

  const getGradeText = (score: number) => {
    if (score >= 90) return 'Perfect!';
    if (score >= 80) return 'Great!';
    if (score >= 60) return 'Good';
    return 'Keep Practicing';
  };

  const getGradeColor = (score: number) => {
    if (score >= 90) return 'text-yellow-400'; // Gold
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-blue-500';
    return 'text-gray-500';
  };

  return (
    <div 
      ref={cardRef}
      className="h-full w-full flex flex-col items-center justify-center p-6 bg-slate-900 snap-center shrink-0 relative border-b border-slate-800"
    >
      <div className="flex flex-col items-center space-y-4 max-w-sm w-full">
        
        {/* Header Info */}
        <div className="text-center space-y-1">
          <h2 className="text-4xl font-bold text-white">{data.char}</h2>
          <p className="text-xl text-slate-300 font-medium">{data.pinyin}</p>
          <p className="text-slate-400 uppercase tracking-wide text-sm">{data.meaning}</p>
        </div>

        {/* Drawing Area */}
        <div className="relative bg-slate-800 rounded-2xl shadow-xl overflow-hidden border-2 border-slate-700">
           {/* SVG Container for HanziWriter */}
           <div ref={containerRef} className="bg-white cursor-pointer touch-none" />
           
        </div>

        {/* Controls & Feedback */}
        <div className="flex items-center justify-between w-full px-4 pt-4">
          <button 
            onClick={() => playSound()}
            className="p-3 rounded-full bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
            aria-label="Play sound"
          >
            <Volume2 size={24} />
          </button>

          {isComplete && grade !== null && (
             <div className={`flex flex-col items-center ${getGradeColor(grade)} animate-bounce`}>
                <div className="flex items-center space-x-1">
                    <Star fill="currentColor" size={20} />
                    <span className="text-2xl font-bold">{grade}</span>
                </div>
                <span className="text-xs font-bold uppercase">{getGradeText(grade)}</span>
             </div>
          )}

          <div className="flex space-x-2">
            <button 
                onClick={startQuiz}
                className="p-3 rounded-full bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
                aria-label="Reset"
            >
                <RefreshCw size={24} />
            </button>
            
            {isComplete && (
                <button 
                    onClick={handleShare}
                    className="p-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/30"
                    aria-label="Share"
                >
                    <Share2 size={24} />
                </button>
            )}
          </div>
        </div>

        {/* Helper Text */}
        <p className="text-slate-500 text-sm mt-4 text-center">
            {isComplete ? 'Scroll up for next word' : 'Trace the character above'}
        </p>

      </div>
    </div>
  );
};

export default CharacterCard;
