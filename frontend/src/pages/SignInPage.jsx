import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '@/hooks/useAuth.js'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useForm } from 'react-hook-form'

export const SignInPage = () => {
  const { login, token, user } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm()

  useEffect(() => {
    if (token && user) {
      navigate('/lists')
    }
  }, [token, user, navigate])

  const onSubmit = async (data) => {
    const { username, password } = data

    try {
      await login(username, password)
      navigate('/lists')
    } catch (error) {
      setError('username', {
        type: error,
        message: 'Unable to login',
      })
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
        <h2 className="text-center text-3xl font-bold">Login</h2>
        <form
          id="signin"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
          <label htmlFor="" className="flex items-center gap-2">
            <h4 className="w-20 font-bold capitalize">Username</h4>
            <input
              {...register('username', { required: 'This field is required' })}
              type="text"
              placeholder={'Your username'}
              className="max-w-md rounded border-2 border-zinc-200 px-2 py-1"
            />
          </label>
          {errors.username && (
            <div className="flex items-center gap-1 text-xs text-red-600">
              <Icon icon="solar:danger-triangle-outline" />
              <p>{errors.username.message}</p>
            </div>
          )}

          <label htmlFor="" className="flex items-center gap-2">
            <h4 className="w-20 font-bold capitalize">Password</h4>
            <input
              {...register('password', { required: 'This field s required' })}
              type="password"
              placeholder={'Your password'}
              className="max-w-md rounded border-2 border-zinc-200 px-2 py-1"
            />
          </label>
          {errors.password && (
            <div className="flex items-center gap-1 text-xs text-red-600">
              <Icon icon="solar:danger-triangle-outline" />
              <p>{errors.password.message}</p>
            </div>
          )}
        </form>

        <button
          type="submit"
          form="signin"
          className="self-center rounded bg-zinc-200 px-2 py-1"
        >
          Sign In
        </button>
        <p className="text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link to={'/signup'} className="font-semibold">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}
