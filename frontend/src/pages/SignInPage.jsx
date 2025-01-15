import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth.js';

export const SignInPage = () => {
  const { login, token, user } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (token && user) {
      navigate('/lists');
    }
  }, [token, user, navigate]);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      await login(username, password);
      navigate('/lists');
    } catch (error) {
      console.log(error);
      setError(error + 'Unable to login');
    }
  };

  return (
    <div className='absolute top-1/2 left-1/2 flex  -translate-x-1/2 -translate-y-1/2 '>
      <div className='bg-gradient-to-l from-white to-zinc-200 px-8 py-4  rounded-s flex flex-col gap-2 justify-center'>
        <h2 className='text-center font-bold '>Welcome to Compairson!</h2>
        <p className='text-balance text-center '>
          Make rankings easier by comparing items in pairs.
        </p>
      </div>
      <div className='px-8 py-4  flex flex-col gap-4'>
        <h2 className='text-center text-3xl font-bold'>Login</h2>
        <form
          id='signin'
          onSubmit={handleSubmit}
          className='flex flex-col gap-2'
        >
          <label htmlFor='' className='flex gap-2 items-center '>
            <h4 className='font-bold capitalize w-20 '>Username</h4>
            <input
              type='text'
              placeholder={'Your username'}
              className='border-2 border-zinc-200 rounded px-2 py-1 max-w-md'
              onChange={e => setUsername(e.target.value)}
              autoComplete='current-password'
            />
          </label>
          <label htmlFor='' className='flex gap-2 items-center '>
            <h4 className='font-bold capitalize w-20'>Password</h4>
            <input
              type='password'
              placeholder={'Your password'}
              className='border-2 border-zinc-200 rounded px-2 py-1 max-w-md'
              onChange={e => setPassword(e.target.value)}
              autoComplete='current-password'
            />
          </label>
        </form>

        <button
          type='submit'
          form='signin'
          className='px-2 py-1 rounded bg-zinc-200 self-center'
        >
          Sign In
        </button>
        <p className='text-sm text-center'>
          Don&apos;t have an account?{' '}
          <Link to={'/signup'} className='font-semibold'>
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};
