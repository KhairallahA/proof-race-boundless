'use client';
import { useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';

export default function Race({ stake, stars, diff, sla, onFinish }) {
  // convert stake discount via reputation
  const effStake = Math.max(1, stake * (1 - stars * 0.1));

  // Player speed: higher stake ⇒ faster (cap 2 s)
  const playerTime = Math.max(2, 8 - effStake / 20);

  // Rivals: array of two times depending on difficulty
  const rivalTimes = Array.from({ length: 2 }).map(() => {
    const [minT, maxT] = diff === 'hard' ? [3, 6] : [5, 8];
    return Math.random() * (maxT - minT) + minT;
  });

  const [t, setT] = useState(0); // elapsed seconds
  useEffect(() => {
    const id = setInterval(() => setT((x) => x + 0.1), 100);
    return () => clearInterval(id);
  }, []);

  const pctPlayer = Math.min((t / playerTime) * 100, 100);
  const pctRivals = rivalTimes.map((rt) => Math.min((t / rt) * 100, 100));

  // Determine outcome once first finisher occurs
  useEffect(() => {
    const earliest = Math.min(playerTime, ...rivalTimes);
    if (t >= earliest) {
      const win   = playerTime <= Math.min(...rivalTimes) && t <= sla;
      const slash = t > sla;
      const reward = win ? stake * 1.2 : slash ? -stake : 0;
      onFinish({ win, slash, reward, playerTime, rivalTimes });
    }
  }, [t, playerTime, rivalTimes, sla, stake, onFinish]);

  return (
    <div className="w-full mt-4">
      <ProgressBar pct={pctPlayer} label="You" color="bg-emerald-500" />
      {pctRivals.map((p, i) => (
        <ProgressBar key={i} pct={p} label={`Rival ${i + 1}`} color="bg-indigo-500" />
      ))}
      <p className="text-center text-xs opacity-70 mt-2">SLA = {sla.toFixed(1)} s · reward = stake × 1.2</p>
    </div>
  );
}