import { useState, useEffect, useRef } from 'react';
import CharacterCard from './components/CharacterCard';
import { characters } from './data/characters';

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            if (!isNaN(index)) {
              setActiveIndex(index);
            }
          }
        });
      },
      {
        root: container,
        threshold: 0.6 // Trigger when 60% visible
      }
    );

    const children = container.querySelectorAll('.character-slide');
    children.forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-slate-950 scroll-smooth no-scrollbar"
    >
      {characters.map((char, index) => (
        <div 
          key={char.char} 
          data-index={index}
          className="character-slide h-full w-full snap-start snap-always"
        >
          <CharacterCard 
            data={char} 
            isActive={activeIndex === index} 
          />
        </div>
      ))}
      
      {/* End Screen / Footer */}
      <div className="h-full w-full snap-start snap-always flex flex-col items-center justify-center bg-slate-900 text-white p-6 text-center">
          <h1 className="text-3xl font-bold mb-4">You've reached the end!</h1>
          <p className="text-slate-400 mb-8">Great job practicing today.</p>
          <button 
            onClick={() => containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-6 py-3 bg-indigo-600 rounded-full font-bold shadow-lg hover:bg-indigo-500 transition-colors"
          >
            Start Over
          </button>
      </div>
    </div>
  );
}

export default App;
