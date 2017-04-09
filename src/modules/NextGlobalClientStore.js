// In next it's useful to have a global spot to share data. This is used
// throughout to enable sharing server generated values across client loaded
// pages.

const data = {}

const NextGlobalClientStore = {
  get (key) { return data[key] },
  set (key, val) { data[key] = val }
}

export default NextGlobalClientStore
