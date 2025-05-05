import { useState, useEffect } from 'react';
import { Maximize, Minimize } from 'lucide-react';

const FullscreenToggle = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleToggle = () => {
    const element = document.documentElement;
    if (!document.fullscreenElement) {
      element.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const onChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', onChange);

    return () => {
      document.removeEventListener('fullscreenchange', onChange);
    };
  }, []);

  return (
    <button
      onClick={handleToggle}
      className="rounded-md hover:bg-muted cursor-pointer p-1 transition-colors"
      aria-label="Toggle fullscreen"
    >
      {isFullscreen ? (
        <Minimize className="w-4 h-4 stroke-[1.5]" />
      ) : (
        <Maximize className="w-4 h-4 stroke-[1.5]" />
      )}
    </button>
  );
};

export default FullscreenToggle;
