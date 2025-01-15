export const Button = ({ type, children, className, onClick }) => {
  const types = {
    danger: 'bg-red-600 text-white',
    warning: 'bg-yellow-300',
    success: 'bg-green-600 text-white',
    light: 'text-black hover:bg-zinc-100',
    dark: 'bg-black text-white',
    'transparent-light': 'text-white',
    'transparent-dark': 'text-black',
  };
  return (
    <button
      onClick={onClick}
      className={`px-2 py-1 ${types[type]} rounded outline outline-zinc-200  flex-shrink-0 ${className}`}
    >
      {children}
    </button>
  );
};
