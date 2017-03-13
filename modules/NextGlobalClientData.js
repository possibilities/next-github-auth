window = window.___nextData || {}

// This is useful in nextjs-world for passing data from server rendered
// components to the client

const NextGlobalClientData = {
  get(key) {
    window.___nextData[key]
  },

  set(key, val) {
    window.___nextData[key] = val
  }
}

export default NextGlobalClientData
