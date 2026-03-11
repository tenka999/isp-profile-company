import SecureStorage from "@/helpers/SecureStorage"
import { useNavigate } from "react-router"

const useConfig = () => {
  const navigate = useNavigate()
  const Logout = async () => {
    SecureStorage.removeStorage('user')
    SecureStorage.removeStorage('token')
    navigate('/login')

  }

  const getUser = () => {
    const user = {
      data: {
        first_name: 'John',
        last_name: 'Doe'
      }
    }
    return user.data
  }

  return {
    Logout,
    getUser
  }
}

export default useConfig
