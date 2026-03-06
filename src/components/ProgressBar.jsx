import React from 'react';
function ProgressBar({ answered, total }) {
  const percentage = Math.round((answered / total) * 100);

  return (
    <div className="progress-wrapper" aria-label="Progreso de respuestas">
      <div className="progress-label">
        <span>Progreso</span>
        <span>{answered}/{total} ({percentage}%)</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

export default ProgressBar;

