import { useSecureLS } from "@/hooks/useSecureLS";
import authApi from "@/services/api/auth";
import { useMutation } from "@tanstack/react-query";

export const authKeys = {
  login: ['login'],
  refreshToken: ['refreshToken'],
  me: ['me']
}

export const useAuthApi = () => {

  const secureStorage = useSecureLS()
  // functions login
  const login = useMutation({
    mutationFn: async (credentials) => authApi.login(credentials),
    onSuccess: (data) => {
      console.log('Login successful:', data);
      secureStorage.setItem('user', data.data.user);
      secureStorage.setItem('token', data.data.accessToken);
      console.log('User from SecureStorage:', secureStorage.getItem('user'));
    },
    onError: (error) => {
      console.error('Login failed:', error);
    }
  });
  
  // functions register
  const register = useMutation({
    mutationFn: async (credentials) => authApi.register(credentials),
  
    onError: (error) => {
      console.error('Login failed:', error);
    }
  });

  const refreshToken = async () => {
    // Call refresh token API
    throw new Error('Refresh token not implemented');
  };

  const me = async () => {
    // Call me API
    throw new Error('Me API not implemented');
  };

  return {
    login,
    refreshToken,
    me,
    register
  };
};
