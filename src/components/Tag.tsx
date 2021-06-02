/*
 * Tag.tsx
 */


import { Component, splitProps } from 'solid-js'
import cxx from '../cxx'

interface Props {
  class?: string;
  variant?: string;
  color?: string;
  children: any;
}

/**
 * Tag: a tag component
 */
export default function Tag(allProps: Props): Component<Props> {
  const [props, rest] = splitProps(allProps, [
    'class',
    'variant',
    'color',
    'children',
  ])

  return (
    <span class={cxx('Tag', [props.variant, props.color], props.class)} {...rest}>
      {props.children}
    </span>
  )
}
