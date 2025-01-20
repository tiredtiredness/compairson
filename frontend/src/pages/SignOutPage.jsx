import { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth.js'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router'
import { Loader } from '@/components/Loader.jsx'

export const SignOutPage = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    logout()
    Cookies.remove('token')
    navigate('/signin')
  }, [logout, navigate])

  return <Loader />
}
