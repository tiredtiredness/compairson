import { Input } from './Input'

export const Header = ({ title, showInput = false }) => {
  return (
    <header className="py-4">
      <h2 className="text-3xl font-extrabold">{title}</h2>
      {showInput && <Input />}
    </header>
  )
}
