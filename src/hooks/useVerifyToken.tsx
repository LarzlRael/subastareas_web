import { useEffect } from 'react'
import { getAction } from '../services/action'
import { successResponse } from '../utils/utils'
import { useNavigate } from 'react-router-dom'

export const useVerifyToken = () => {
  const navigate = useNavigate()
  useEffect(() => {
    verfyToken()
  }, [])
  async function verfyToken() {
    const res = await getAction(
      'http://localhost:3000/auth/verifytemporarytoken',
    )
    saveToken(res)
  }
  function saveToken(res: any) {
    if (successResponse.includes(res.status)) {
      localStorage.setItem('token', res.data.token)
    } else {
      navigate('/success', {
        state: {
          title: 'Hubo',
          boldWord: 'error',
          subtitle: 'Vuelva a intentarlo',
          success: false,
        },
      })
    }
  }
}
