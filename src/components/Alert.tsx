/*
 * Alert.tsx
 */


import { Component, splitProps } from 'solid-js'
import cxx from '../cxx'
import Box from './Box'
import Icon from './Icon'

interface Props {
  class?: string;
  icon?: string;
  variant?: string;
  color?: string;
  children: any;
}

/**
 * Alert: a tag component
 */
export default function Alert(allProps: Props): Component<Props> {
  const [props, rest] = splitProps(allProps, [
    'class',
    'icon',
    'variant',
    'color',
    'children',
  ])

  return (
    <Box horizontal class={cxx('Alert', [props.variant, props.color], props.class)} {...rest}>
      {props.icon &&
        <div class='Alert__icon'>
          <Icon name={props.icon} />
        </div>
      }
      <div>
        {props.children}
      </div>
    </Box>
  )
}
