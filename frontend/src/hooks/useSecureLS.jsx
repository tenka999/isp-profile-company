import SecureStorage from "@/helpers/SecureStorage"


export const useSecureLS = () => {
  const secureStorage = SecureStorage

  const setItem = (key, value) => {
    secureStorage.setStorage(key, value)
  }

  const getItem = (key) => {
    return secureStorage.getStorage(key)
  }

  const removeItem = (key) => {
    secureStorage.removeStorage(key)
  }

  const clearAll = () => {
    secureStorage.clearStorage()
  }

  return {
    setItem,
    getItem,
    removeItem,
    clearAll
  }
}