import React, { useState } from 'react';
import { calculateChart } from './lib/numerology';
import type { Chart } from './lib/numerology';
import { NUMBER_ARCHETYPES } from './data/readings';
import { Shield, TrendingUp, Zap, DollarSign, Activity, Target, Crown } from 'lucide-react';

function App() {
  const [birthDate, setBirthDate] = useState('');
  const [chart, setChart] = useState<Chart | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthDate) return;
    const c = calculateChart(birthDate);
    setChart(c);
    setShowResults(true);
    window.scrollTo(0, 0);
  };

  if (showResults && chart) {
    return <ResultsView chart={chart} onReset={() => setShowResults(false)} />;
  }

  return <LandingView birthDate={birthDate} setBirthDate={setBirthDate} onCalculate={handleCalculate} />;
}

const LandingView = ({ birthDate, setBirthDate, onCalculate }: { birthDate: string, setBirthDate: (s: string) => void, onCalculate: (e: React.FormEvent) => void }) => (
  <div className="min-h-screen bg-titan-dark text-titan-text font-sans selection:bg-titan-gold selection:text-titan-dark">
    {/* Hero Section */}
    <header className="container mx-auto px-4 py-8 flex justify-between items-center border-b border-gray-800">
      <div className="flex items-center gap-2">
        <Crown className="w-8 h-8 text-titan-gold" />
        <span className="text-2xl font-display font-bold tracking-wider">TITAN</span>
      </div>
      <button onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })} className="px-6 py-2 border border-titan-gold text-titan-gold font-bold uppercase hover:bg-titan-gold hover:text-titan-dark transition-all">
        Get Access
      </button>
    </header>

    <main>
      <section className="container mx-auto px-4 py-20 text-center max-w-4xl">
        <div className="inline-block bg-titan-gold/10 text-titan-gold px-4 py-1 rounded-full text-sm font-bold mb-6 tracking-widest uppercase">
          Emperor Numerology™ System
        </div>
        <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight">
          Your Birth Date Is Your <span className="text-titan-gold">Entire Business Plan</span>.
        </h1>
        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Before you hire another consultant, rewrite your pitch, or burn cash on ads...
          Let <span className="font-bold text-white">TITAN</span> decode your empire, strategy, and money map — all from your birth date.
        </p>

        {/* CTA Form */}
        <div id="calculator" className="bg-gray-900 p-8 rounded-2xl border border-gray-800 shadow-2xl max-w-md mx-auto relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-titan-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <h3 className="text-2xl font-display font-bold mb-6 relative z-10">Initialize TITAN Protocol</h3>
          <form onSubmit={onCalculate} className="space-y-4 relative z-10">
            <div>
              <label className="block text-left text-sm font-bold text-gray-400 mb-2 uppercase">Date of Birth</label>
              <input 
                type="date" 
                required
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-titan-gold focus:ring-1 focus:ring-titan-gold transition-all"
              />
            </div>
            <button type="submit" className="w-full bg-titan-gold text-titan-dark font-bold text-lg py-4 rounded-lg hover:bg-yellow-500 transition-all flex items-center justify-center gap-2">
              <Zap className="w-5 h-5" />
              DECODE MY BLUEPRINT
            </button>
            <p className="text-xs text-gray-500 mt-4">
              Instant Analysis • AI-Powered • Secure
            </p>
          </form>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="bg-gray-900 py-24 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Target className="w-8 h-8 text-titan-gold" />}
              title="Strategic Intelligence"
              description="TITAN doesn't guess. It calculates. Get the exact strategic roadmap you were born with."
            />
            <FeatureCard 
              icon={<DollarSign className="w-8 h-8 text-titan-gold" />}
              title="Money Code"
              description="Discover your natural wealth frequency. Stop grinding against your grain and start leveraging your design."
            />
            <FeatureCard 
              icon={<Shield className="w-8 h-8 text-titan-gold" />}
              title="Shadow Defense"
              description="Your biggest weakness is actually your secret weapon. TITAN shows you how to flip the script."
            />
          </div>
        </div>
      </section>

      {/* Social Proof / Copy */}
      <section className="container mx-auto px-4 py-24 max-w-4xl text-center">
        <h2 className="text-4xl font-display font-bold mb-12">Real Talk: Why You're Still Stuck</h2>
        <div className="space-y-6 text-lg text-gray-400 text-left mx-auto max-w-2xl">
          <p className="flex gap-4">
            <span className="text-red-500 font-bold">✖</span>
            You've invested in generic business courses.
          </p>
          <p className="flex gap-4">
            <span className="text-red-500 font-bold">✖</span>
            You've hired "gurus" who don't know your wiring.
          </p>
          <p className="flex gap-4">
            <span className="text-red-500 font-bold">✖</span>
            You're grinding 80 hours a week for mediocre returns.
          </p>
          <div className="h-px bg-gray-800 my-8"></div>
          <p className="text-2xl text-white font-bold text-center">
            Because nothing you've done has been aligned with the codes you were born with.
          </p>
        </div>
      </section>
    </main>
    
    <footer className="border-t border-gray-800 py-12 text-center text-gray-600">
      <p>© 2026 TITAN EMPEROR NUMEROLOGY. All rights reserved.</p>
    </footer>
  </div>
);

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="p-8 bg-gray-950 rounded-2xl border border-gray-800 hover:border-titan-gold/30 transition-all">
    <div className="mb-6 bg-gray-900 p-4 rounded-full inline-block">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-4 font-display">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

const ResultsView = ({ chart, onReset }: { chart: Chart, onReset: () => void }) => {
  return (
    <div className="min-h-screen bg-titan-dark text-titan-text font-sans">
      <header className="container mx-auto px-4 py-6 border-b border-gray-800 flex justify-between items-center sticky top-0 bg-titan-dark/95 backdrop-blur z-50">
        <div className="flex items-center gap-2">
          <Crown className="w-6 h-6 text-titan-gold" />
          <span className="font-display font-bold">TITAN REPORT</span>
        </div>
        <button onClick={onReset} className="text-sm text-gray-400 hover:text-white">
          New Analysis
        </button>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Your Energetic Architecture</h1>
          <p className="text-xl text-gray-400">Blueprint Generated. Status: <span className="text-green-500 font-mono">UNLOCKED</span></p>
        </div>

        {/* Primary Numbers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
           <NumberCard 
             value={chart.path} 
             title="Path Number" 
             icon={<TrendingUp className="text-blue-500" />}
             delay={0}
           />
           <NumberCard 
             value={chart.soul} 
             title="Soul Driver" 
             icon={<Activity className="text-purple-500" />}
             delay={100}
           />
           <NumberCard 
             value={chart.karma} 
             title="Karma Metric" 
             icon={<Zap className="text-yellow-500" />}
             delay={200}
           />
           <NumberCard 
             value={chart.destiny} 
             title="Destiny Metric" 
             icon={<Target className="text-red-500" />}
             delay={300}
           />
           <NumberCard 
             value={chart.gift} 
             title="Natural Gift" 
             icon={<Crown className="text-titan-gold" />}
             delay={400}
           />
           <NumberCard 
             value={chart.moneyCode} 
             title="Money Code" 
             icon={<DollarSign className="text-green-500" />}
             delay={500}
           />
        </div>

        {/* Detailed Breakdown */}
        <div className="space-y-12">
          <Section 
            title="THE STRATEGY (PATH)" 
            number={chart.path} 
          />
           <div className="grid md:grid-cols-2 gap-8">
            <Section 
              title="INTERNAL DRIVE (SOUL)" 
              number={chart.soul}
            />
            <Section 
              title="EXTERNAL FORCE (KARMA)" 
              number={chart.karma}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Section 
              title="NATURAL GIFT" 
              number={chart.gift}
            />
            <Section 
              title="LIFETIME DESTINY" 
              number={chart.destiny}
            />
          </div>

          <div className="bg-gray-900 border border-titan-gold/20 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <DollarSign className="w-48 h-48 text-titan-gold" />
            </div>
            <h2 className="text-3xl font-display font-bold text-titan-gold mb-8 flex items-center gap-3">
              <DollarSign />
              WEALTH FREQUENCY: {chart.moneyCode}
            </h2>
            <div className="relative z-10 grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-sm uppercase tracking-widest text-gray-500 mb-2">Money Style</h4>
                <p className="text-lg leading-relaxed">{getArchetype(chart.moneyCode).salesStyle}</p>
              </div>
              <div>
                <h4 className="text-sm uppercase tracking-widest text-gray-500 mb-2">Wealth Block</h4>
                <p className="text-lg leading-relaxed text-red-400">{getArchetype(chart.moneyCode).shadow}</p>
              </div>
            </div>
          </div>

          <div className="bg-red-950/20 border border-red-900/50 rounded-2xl p-8">
             <h2 className="text-3xl font-display font-bold text-red-500 mb-8 flex items-center gap-3">
              <Shield />
              SHADOW PROTOCOL: {chart.shadow}
            </h2>
             <p className="text-xl mb-4 text-gray-300">
               Your shadow is not a mistake. It is an unrefined weapon.
             </p>
             <div className="bg-black/40 p-6 rounded-xl border-l-4 border-red-500">
               <p className="font-mono text-red-300">{getArchetype(chart.shadow).shadow}</p>
             </div>
          </div>

        </div>

        <div className="mt-20 text-center p-12 bg-gray-900 rounded-3xl border border-gray-800">
          <h3 className="text-2xl font-display font-bold mb-4">This is just the surface.</h3>
          <p className="text-gray-400 mb-8">Titan has decoded your base architecture. Use this data to rebuild your empire.</p>
          <button className="bg-titan-gold text-titan-dark font-bold px-8 py-4 rounded-lg hover:bg-yellow-500 transition-all uppercase tracking-wider">
            Download Full Report (PDF)
          </button>
        </div>
      </main>
    </div>
  );
};

const NumberCard = ({ value, title, icon, delay }: { value: number, title: string, icon: React.ReactNode, delay: number }) => {
  const archetype = getArchetype(value);
  return (
    <div 
      className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition-all animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-gray-950 rounded-lg">{icon}</div>
        <div className="text-4xl font-display font-bold text-white">{value}</div>
      </div>
      <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-1">{title}</h3>
      <div className="text-lg font-bold text-titan-gold mb-2">{archetype.title}</div>
      <p className="text-sm text-gray-400 line-clamp-3">{archetype.description}</p>
    </div>
  );
}

const Section = ({ title, number }: { title: string, number: number }) => {
  const archetype = getArchetype(number);
  return (
    <div className="border-t border-gray-800 pt-8">
      <div className="flex flex-col md:flex-row gap-6 md:gap-12">
        <div className="md:w-1/3">
           <h3 className="text-sm uppercase tracking-widest text-titan-gold mb-2">{title}</h3>
           <div className="text-6xl font-display font-bold mb-4">{number}</div>
           <div className="text-2xl font-bold mb-2">{archetype.title}</div>
        </div>
        <div className="md:w-2/3 space-y-6">
          <div>
            <h4 className="text-xs uppercase text-gray-500 mb-2">Core Analysis</h4>
            <p className="text-lg text-gray-300 leading-relaxed">{archetype.description}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
             <div className="bg-gray-900 p-4 rounded-lg">
                <h4 className="text-xs uppercase text-green-500 mb-2 font-bold">Strategy</h4>
                <p className="text-sm text-gray-400">{archetype.salesStyle}</p>
             </div>
             <div className="bg-gray-900 p-4 rounded-lg">
                <h4 className="text-xs uppercase text-red-500 mb-2 font-bold">Risk Factor</h4>
                <p className="text-sm text-gray-400">{archetype.shadow}</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const getArchetype = (num: number) => {
  // Fallback for numbers not in the main list (though reduce usually handles it)
  // Standard reduction keeps 1-9, 11, 22, 33.
  // If somehow we get something else, reduce further.
  return NUMBER_ARCHETYPES[num as keyof typeof NUMBER_ARCHETYPES] || NUMBER_ARCHETYPES[reduceToSingle(num)];
}

const reduceToSingle = (n: number): number => {
   // Simple recursive reduction to 1-9
   if (n <= 9) return n;
   let sum = 0;
   for (const d of n.toString()) sum += parseInt(d);
   return reduceToSingle(sum);
}

export default App;
