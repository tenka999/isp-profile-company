import SecureLS from "secure-ls";

const secureStorage = new SecureLS();

 const getStorage = (key) => {
  return secureStorage.get(key);
};

 const setStorage = (key, value) => {
  return secureStorage.set(key, value);
};

 const removeStorage = (key) => {
  return secureStorage.remove(key);
};

const clearStorage = () => {
  return secureStorage.clear()
}
export default { getStorage, setStorage, removeStorage, clearStorage }