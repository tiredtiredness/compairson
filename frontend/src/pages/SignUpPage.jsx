import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { registerUser } from '../utils/authService.js';

export const SignUpPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (password === passwordAgain) {
        await registerUser({ username, email, password });
        navigate('/signin');
      }
    } catch (error) {
      setError('Unable to register user');
    }
  };

  return (
    <div className='absolute top-1/2 left-1/2 flex  -translate-x-1/2 -translate-y-1/2 '>
      <div className=' bg-gradient-to-l from-white to-zinc-200 px-8 py-4 rounded-s flex flex-col gap-2 justify-center'>
        <h2 className='text-center font-bold '>Welcome to Compairson!</h2>
        <p className='text-balance text-center '>
          Make rankings easier by comparing items in pairs.
        </p>
      </div>
      <div className='px-8 py-4  flex flex-col gap-4'>
        <h2 className='text-center text-3xl font-bold'>Register</h2>
        <form
          className='flex flex-col gap-2 pl-4'
          onSubmit={handleSubmit}
          id='signup'
        >
          <label htmlFor='' className='flex gap-2 items-center '>
            <h4 className='font-bold capitalize w-32'>Username</h4>
            <input
              type='text'
              placeholder={'Your username'}
              className='border-2 border-zinc-200 rounded px-2 py-1 max-w-md'
              required
              onChange={e => setUsername(e.target.value)}
            />
          </label>
          <label htmlFor='' className='flex gap-2 items-center '>
            <h4 className='font-bold capitalize w-32'>Email</h4>
            <input
              type='email'
              placeholder={'Your email'}
              className='border-2 border-zinc-200 rounded px-2 py-1 max-w-md'
              required
              onChange={e => setEmail(e.target.value)}
            />
          </label>

          <label htmlFor='' className='flex gap-2 items-center '>
            <h4 className='font-bold capitalize w-32'>Password</h4>
            <input
              type='password'
              placeholder={'Your password'}
              className='border-2 border-zinc-200 rounded px-2 py-1 max-w-md'
              required
              onChange={e => setPassword(e.target.value)}
              autoComplete='current-password'
            />
          </label>
          <label htmlFor='' className='flex gap-2 items-center '>
            <h4 className='font-bold  w-32'>Password again</h4>
            <input
              type='password'
              placeholder={'Your password again'}
              className='border-2 border-zinc-200 rounded px-2 py-1 max-w-md'
              required
              onChange={e => setPasswordAgain(e.target.value)}
              autoComplete='current-password'
            />
          </label>
        </form>
        <button
          type='submit'
          className='px-2 py-1 rounded bg-zinc-200 w-fit self-center '
          form='signup'
        >
          Sign up
        </button>
        <p className='text-sm text-center '>
          Already have an account?{' '}
          <Link to={'/signin'} className='font-semibold'>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
