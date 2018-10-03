export function throttle (func, wait, context, options) {
  let args, result
  let timeout = null
  let previous = 0

  if (!options) options = {}

  let later = function() {
    previous = options.leading === false ? 0 : Date.now()
    timeout = null
    result = func.apply(context, args)

    if (!timeout) args = null
  }

  return function() {
    let now = Date.now()

    if (!previous && options.leading === false) previous = now

    let remaining = wait - (now - previous)

    args = arguments

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }

      previous = now
      result = func.apply(context, args)

      if (!timeout) args = null
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }

    return result
  }
}
