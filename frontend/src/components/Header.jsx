import { Input } from './Input';

export const Header = ({ title, showInput = false }) => {
  return (
    <header className='py-4 '>
      <h2 className='font-extrabold text-3xl '>{title}</h2>
      {showInput && <Input />}
    </header>
  );
};
