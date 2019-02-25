export const storageKey = '3fcaf074-03ff-4375-89ac-c53d91303fb1'

class StorageUtil {
  getItem (key) {
    try {
      let val = window.localStorage.getItem(key)
      if (val) {
        return JSON.parse(val)
      } else {
        throw new Error()
      }
    } catch (e) {
    }
  }

  setItem (key, val) {
    return window.localStorage.setItem(key, JSON.stringify(val))
  }

  removeItem (key) {
    return window.localStorage.removeItem(key)
  }
}

export const Storage = new StorageUtil()
