'use client';
import { useState } from 'react';
import Race from '../components/Race';

export default function Home() {
  const [stake, setStake]   = useState(50);
  const [diff, setDiff]     = useState('easy');
  const [running, setRun]   = useState(false);
  const [result, setRes]    = useState(null);
  const [stars, setStars]   = useState(0); // reputation 0‑5
  const [sla, setSla]       = useState(6);

  const startRace = () => {
    setSla(Math.random() * 6 + 4); // 4‑10 s
    setRun(true);
    setRes(null);
  };

  const handleFinish = (r) => {
    setRun(false);
    setRes(r);
    // update stars
    if (r.win) setStars((s) => Math.min(5, s + 1));
    else if (r.slash) setStars((s) => Math.max(0, s - 1));
  };

  const maxStake = diff === 'hard' ? 200 : 100;

  return (
    <main className="h-screen flex flex-col items-center justify-center p-4 gap-6 -mt-12">
      <div className="flex flex-col items-center justify-center pb-6">
        <h1 className="text-4xl font-semibold">Proof Race</h1>
        <p className="text-sm pt-1 text-gray-400">
          Built by <a href="https://x.com/eng_khairallah1" className="text-gray-400 underline hover:text-gray-500" target='_blank'>@Khairallah</a>
        </p>
      </div>

      {/* Lobby */}
      {!running && !result && (
        <div className="flex flex-col items-center gap-4 w-80">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1 cursor-pointer">
              <input type="radio" name="diff" value="easy" checked={diff==='easy'} onChange={() => setDiff('easy')} /> Easy
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
              <input type="radio" name="diff" value="hard" checked={diff==='hard'} onChange={() => setDiff('hard')} /> Hard
            </label>
          </div>
          <label className="w-full">Stake: {stake} USDC (‑{(stars*10)}% rep disc)
            <input type="range" min={10} max={maxStake} step={10} value={stake} onChange={(e) => setStake(parseInt(e.target.value,10))} className="w-full" />
          </label>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg" onClick={startRace}>Start race</button>
        </div>
      )}

      {/* Race */}
      {running && !result && (
        <Race stake={stake} stars={stars} diff={diff} sla={sla} onFinish={handleFinish} />
      )}

      {/* Result */}
      {result && (
        <div className="text-center">
          <p className="text-lg font-medium mb-2">
            {result.win ? '🥳 You won!' : result.slash ? '⛔ Stake slashed!' : 'You lost (no slash)'}
          </p>
          <p className="text-sm mb-4">
            Player: {result.playerTime.toFixed(1)} s · Rivals: {result.rivalTimes.map(t=>t.toFixed(1)).join(', ')} s<br/>
            Net: {result.reward.toFixed(2)} USDC
          </p>
          <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg mr-2" onClick={startRace}>Race again</button>
          <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg" onClick={() => setRes(null)}>Back</button>
        </div>
      )}
    </main>
  );
}