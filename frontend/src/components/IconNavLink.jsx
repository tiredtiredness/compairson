import { Icon } from '@iconify/react/dist/iconify.js'
import { NavLink } from 'react-router'

export const IconNavLink = ({ to, icon, text, hideTextClassName }) => {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex justify-center rounded outline-zinc-200 hover:cursor-pointer hover:outline focus:outline focus:outline-offset-4 focus:outline-black lg:justify-normal ${
          isActive ? 'outline outline-1' : ''
        }`
      }
    >
      <div className="flex w-max items-center gap-2 px-2 py-1">
        <Icon icon={icon} />
        <span className={hideTextClassName}>{text}</span>
      </div>
    </NavLink>
  )
}
