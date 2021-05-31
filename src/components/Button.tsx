/*
 * Button.tsx
 */

import { Component, splitProps, JSX } from "solid-js";
import cxx from '../cxx'
import Icon from './Icon'

interface Props extends JSX.CustomAttributes<HTMLElement>, JSX.DOMAttributes<HTMLElement> {
  class?: string;
  icon?: string;
  iconAfter?: string;
  loading?: boolean;
  variant?: string;
  size?: string;
  role?: string;
  children?: any;
}
declare type PropsKey = keyof Props

const buttonProps: PropsKey[] = [
  'class',
  'icon',
  'iconAfter',
  'loading',
  'variant',
  'size',
  'children',
]

/**
 * @param {string} props.icon
 * @param {string} props.iconAfter
 * @param {boolean} props.loading
 * @param {string} props.variant
 */
export default function Button(allProps: Props): Component<Props> {
  const [props, rest] = splitProps(allProps, buttonProps)
  return (
    <button class={buttonClass(props)} {...rest}>
      {buttonContent(props)}
    </button>
  )
}

export function Label(allProps: Props): Component<Props> {
  const [props, rest] = splitProps(allProps, buttonProps)
  return (
    <label class={buttonClass(props)} {...rest}>
      {buttonContent(props)}
    </label>
  )
}

Button.Label = Label

// Helpers

export function buttonClass(props) {
  const variant = props.variant ?? 'primary'
  const size = props.size ?? 'medium'
  return cxx('Button', [variant, size], {
    disabled: props.disabled,
  }, props.class)
}

export function buttonContent(props) {
  return (
    <>
      {props.icon && <Icon name={props.icon} />}
      {props.children}
      {props.iconAfter && <Icon name={props.iconAfter} />}
      {props.loading && <Icon name='sync' spin />}
    </>
  )
}
