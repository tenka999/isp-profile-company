import baseApi from "@/core/api/baseApi"


const testService = async () => {
  try {
    const res = await baseApi.get('/test-endpoint', {
      headers: {
        ['require-auth']: true
      }
    })
    console.log('Response from testService:', res)
    return res
  } catch (error) {
    console.error('Error occurred in testService:', error)
    throw error
  }
}


export { testService }