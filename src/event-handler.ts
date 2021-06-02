/*
 * event-handler.ts
 */

export default function eventHandler(callback, ...args) {
  if (Array.isArray(callback))
    callback[0](callback[1], ...args)
  else if (typeof callback === 'function')
    callback(...args)
}
