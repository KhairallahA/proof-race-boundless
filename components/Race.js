'use client';
import { useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';

export default function Race({ stake, onFinish }) {
  const playerTime = Math.max(2, 8 - stake / 20); // stake → speed
  const rivalTime  = Math.random() * 2 + 5;       // 5–7 s
  const [t, setT]  = useState(0);

  useEffect(() => {
    const id = setInterval(() => setT((x) => x + 0.1), 100);
    return () => clearInterval(id);
  }, []);

  const pctPlayer = Math.min((t / playerTime) * 100, 100);
  const pctRival  = Math.min((t / rivalTime) * 100, 100);

  useEffect(() => {
    if (t >= Math.min(playerTime, rivalTime)) {
      const win    = playerTime < rivalTime;
      const reward = win ? stake * 1.2 : -stake;
      onFinish({ playerTime, rivalTime, win, reward });
    }
  }, [t, playerTime, rivalTime, stake, onFinish]);

  return (
    <div className="w-full mt-4">
      <ProgressBar pct={pctPlayer} label="You"   color="bg-emerald-500" />
      <ProgressBar pct={pctRival}  label="Rival" color="bg-indigo-500" />
      <p className="text-center text-xs opacity-70 mt-2">SLA = 6 s · reward = stake × 1.2</p>
    </div>
  );
}