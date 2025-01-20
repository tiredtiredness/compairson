import { Icon } from '@iconify/react/dist/iconify.js';
import { NavLink } from 'react-router';

export const IconNavLink = ({ to, icon, text, hideTextClassName }) => {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex justify-center lg:justify-normal hover:cursor-pointer hover:outline outline-zinc-200 rounded focus:outline focus:outline-black focus:outline-offset-4  ${
          isActive ? ' outline outline-1' : ''
        }`
      }
    >
      <div className='flex  items-center gap-2 py-1 px-2 w-max'>
        <Icon icon={icon} />
        <span className={hideTextClassName}>{text}</span>
      </div>
    </NavLink>
  );
};
