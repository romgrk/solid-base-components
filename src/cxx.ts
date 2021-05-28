/*
 * cxx.js
 */

import cx from 'clsx'

export default function cxx(baseName: string, ...args: any[]): string {
  const newArgs: any[] = [baseName]
  for (let arg of args) {
    if (typeof arg === 'string')
      newArgs.push(arg)
    else if (Array.isArray(arg))
      newArgs.push(...arg.map(a => a ? `${baseName}--${a}` : undefined))
    else if (typeof arg === 'object' && arg !== null)
      newArgs.push(prefixKeys(baseName, arg))
  }
  return cx.apply(null, newArgs)
}

function prefixKeys(prefix: string, o: Object) {
  const result = {}
  for (let key in o) {
    result[`${prefix}--${key}`] = o[key]
  }
  return result
}
