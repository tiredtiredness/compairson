import { useState } from 'react';

export const Toggler = ({ options, onToggle }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = () => {
    const nextIndex = (currentIndex + 1) % options.length;
    setCurrentIndex(nextIndex);
    if (onToggle) {
      onToggle(options[nextIndex]);
    }
  };

  return (
    <button
      className='flex rounded bg-zinc-200 px-1 py-1 '
      onClick={handleClick}
    >
      {options.map((option, index) => (
        <div
          className={`w-fit px-2 rounded flex-shrink-0 text-center ${index === currentIndex ? 'bg-white' : ''}`}
          key={index}
        >
          {options[index]}
        </div>
      ))}
    </button>
  );
};
