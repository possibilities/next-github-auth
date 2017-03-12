const compose = (...fns) => {
  const reverseFns = fns.reverse()
  return (...args) => {
    reverseFns.forEach(fn => {
      if (!Array.isArray(args)) {
        args = [args]
      }
      args = fn.apply(null, args)
    })
    return args
  }
}

export default compose
