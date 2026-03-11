/* eslint-disable no-unused-vars */
import baseApi from '@/core/api/baseApi'
import axios from 'axios'

const authApi = {
  login: async (credentials) => {
    try {
      const response = await baseApi.post('/login', credentials, {
        headers: {
          'require-auth': true
        }
      })
      return response.data
    } catch (error) {
      console.error('authApi.login', error)
      if(axios.isAxiosError(error)){
        const errorResponse = error.response
        const responseData = errorResponse.data

        console.error("authApi.login", responseData);
        throw new Error(responseData ? responseData.message : error.message);
        
      }
      throw error
    }
  },
  register: async (credentials) => {
    console.log('authApi.register', credentials)
    try {
      const response = await baseApi.post('/register', credentials, {
        headers: {
          'require-auth': true
        }
      })
      return response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}


export default authApi
