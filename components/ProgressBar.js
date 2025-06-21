import clsx from 'classnames';

export default function ProgressBar({ pct, label, color }) {
  return (
    <div className="w-full mb-2">
      <div className="flex justify-between text-xs mb-1">
        <span>{label}</span><span>{Math.round(pct)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className={clsx('h-3 rounded-full transition-all', color)}
          style={{ width: pct + '%' }}
        />
      </div>
    </div>
  );
}