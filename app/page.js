'use client';
import { useState } from 'react';
import Race from '../components/Race';

export default function Home() {
  const [stake, setStake]   = useState(50);
  const [running, setRun]   = useState(false);
  const [result, setResult] = useState(null);

  const reset = () => { setRun(false); setResult(null); };

  return (
    <main className="h-screen flex flex-col items-center justify-center p-4 gap-6">
      <h1 className="text-2xl font-semibold">Proof Race</h1>

      {/* Lobby */}
      {!running && !result && (
        <>
          <label className="w-72">Stake: {stake} USDC
            <input
              type="range" min={10} max={100} step={10}
              value={stake}
              onChange={(e) => setStake(parseInt(e.target.value, 10))}
              className="w-full"
            />
          </label>
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
            onClick={() => setRun(true)}
          >Start race</button>
        </>
      )}

      {/* Race in progress */}
      {running && !result && (
        <Race stake={stake} onFinish={(r) => { setResult(r); setRun(false); }} />
      )}

      {/* Result screen */}
      {result && (
        <div className="text-center">
          <p className="text-lg font-medium mb-2">
            {result.win ? '🥳 You won!' : '⛔ Stake slashed!'}
          </p>
          <p className="text-sm mb-4">
            You: {result.playerTime.toFixed(1)} s · Rival: {result.rivalTime.toFixed(1)} s<br/>
            Net: {result.reward.toFixed(2)} USDC
          </p>
          <button
            className="px-4 py-2 bg-emerald-500 text-white rounded-lg mr-2"
            onClick={() => setRun(true)}
          >Race again</button>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
            onClick={reset}
          >Back</button>
        </div>
      )}
    </main>
  );
}