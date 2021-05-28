/*
 * Box.tsx
 */


import { Component, splitProps } from 'solid-js'
import cxx from '../cxx'

interface Props {
  class?: string;
  horizontal?: boolean;
  vertical?: boolean;
  children: any;
}

/**
 * @param {string} props.icon
 * @param {string} props.iconAfter
 * @param {boolean} props.loading
 */
export default function Box(allProps: Props): Component<Props> {
  const [props, rest] = splitProps(allProps, [
    'class',
    'children',
    'horizontal',
    'vertical',
  ])

  return (
    <div class={cxx('Box', {
      horizontal: props.horizontal ?? !props.vertical,
      vertical:   props.vertical,
    }, props.class)} {...rest}>
      {props.children}
    </div>
  )
}
