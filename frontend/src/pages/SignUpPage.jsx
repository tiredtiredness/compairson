import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { registerUser } from '@/utils/authService.js'

export const SignUpPage = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordAgain, setPasswordAgain] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (password === passwordAgain) {
        await registerUser({ username, email, password })
        navigate('/signin')
      }
    } catch (error) {
      setError('Unable to register user')
    }
  }

  return (
    <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2">
      <div className="flex flex-col justify-center gap-2 rounded-s bg-gradient-to-l from-white to-zinc-200 px-8 py-4">
        <h2 className="text-center font-bold">Welcome to Compairson!</h2>
        <p className="text-balance text-center">
          Make rankings easier by comparing items in pairs.
        </p>
      </div>
      <div className="flex flex-col gap-4 px-8 py-4">
        <h2 className="text-center text-3xl font-bold">Register</h2>
        <form
          className="flex flex-col gap-2 pl-4"
          onSubmit={handleSubmit}
          id="signup"
        >
          <label htmlFor="" className="flex items-center gap-2">
            <h4 className="w-32 font-bold capitalize">Username</h4>
            <input
              type="text"
              placeholder={'Your username'}
              className="max-w-md rounded border-2 border-zinc-200 px-2 py-1"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label htmlFor="" className="flex items-center gap-2">
            <h4 className="w-32 font-bold capitalize">Email</h4>
            <input
              type="email"
              placeholder={'Your email'}
              className="max-w-md rounded border-2 border-zinc-200 px-2 py-1"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label htmlFor="" className="flex items-center gap-2">
            <h4 className="w-32 font-bold capitalize">Password</h4>
            <input
              type="password"
              placeholder={'Your password'}
              className="max-w-md rounded border-2 border-zinc-200 px-2 py-1"
              required
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </label>
          <label htmlFor="" className="flex items-center gap-2">
            <h4 className="w-32 font-bold">Password again</h4>
            <input
              type="password"
              placeholder={'Your password again'}
              className="max-w-md rounded border-2 border-zinc-200 px-2 py-1"
              required
              onChange={(e) => setPasswordAgain(e.target.value)}
              autoComplete="current-password"
            />
          </label>
        </form>
        <button
          type="submit"
          className="w-fit self-center rounded bg-zinc-200 px-2 py-1"
          form="signup"
        >
          Sign up
        </button>
        <p className="text-center text-sm">
          Already have an account?{' '}
          <Link to={'/signin'} className="font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
