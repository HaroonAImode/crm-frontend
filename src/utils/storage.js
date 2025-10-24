// Small wrapper around localStorage to centralize JSON parsing/stringifying
const storage = {
  set(key, value) {
    try {
      const v = JSON.stringify(value);
      localStorage.setItem(key, v);
    } catch (e) {
      console.error('storage.set error', e);
    }
  },
  get(key, defaultValue = null) {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : defaultValue;
    } catch (e) {
      console.error('storage.get error', e);
      return defaultValue;
    }
  },
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('storage.remove error', e);
    }
  },
};

export default storage;
