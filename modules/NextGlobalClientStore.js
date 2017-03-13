if (process.browser) {
  window.___nextJsData || (window.___nextJsData = {})
}

// In next it's useful to have a global spot to share data. This is used
// throughout to enable sharing server generated values across client loaded
// pages.

const NextGlobalClientStore = {
  get (key) {
    return window.___nextJsData[key]
  },

  set (key, val) {
    window.___nextJsData[key] = val
  }
}

export default NextGlobalClientStore
