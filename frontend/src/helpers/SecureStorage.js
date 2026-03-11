import SecureLS from "secure-ls";

const secureStorage = new SecureLS();

const getStorage = (key) => {
  try {
    let value = secureStorage.get(key);
    if (value === null || typeof value === "undefined") {
      // Fallback: check plain localStorage (for migration from older implementations)
      const raw = localStorage.getItem(key);
      if (raw !== null) {
        try {
          const parsed = JSON.parse(raw);
          secureStorage.set(key, parsed);
          localStorage.removeItem(key);
          return parsed;
        } catch (e) {
          // raw is not JSON (likely a string token)
          secureStorage.set(key, raw);
          localStorage.removeItem(key);
          return raw;
        }
      }
    }
    return value;
  } catch (err) {
    return null;
  }
};

const setStorage = (key, value) => {
  return secureStorage.set(key, value);
};

const removeStorage = (key) => {
  return secureStorage.remove(key);
};

const clearStorage = () => {
  return secureStorage.clear();
};

export default { getStorage, setStorage, removeStorage, clearStorage };
