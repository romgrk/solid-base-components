/*
 * Button.tsx
 */

import { Component, splitProps, JSX } from 'solid-js';
import cxx from '../cxx'
import Icon from './Icon'

interface Props extends JSX.CustomAttributes<HTMLElement>, JSX.DOMAttributes<HTMLElement> {
  class?: string;
  type?: 'button'|'reset'|'submit';
  icon?: string;
  iconAfter?: string;
  loading?: boolean;
  variant?: string;
  size?: string;
  role?: string;
  disabled?: boolean;
  children?: any;
}
declare type PropsKey = keyof Props

const buttonProps: PropsKey[] = [
  'class',
  'type',
  'icon',
  'iconAfter',
  'loading',
  'variant',
  'size',
  'disabled',
  'children',
]

/**
 * Button: a normal button
 */
export default function Button(allProps: Props): Component<Props> {
  const [props, rest] = splitProps(allProps, buttonProps)
  return (
    <button class={buttonClass(props)} disabled={props.disabled} type={props.type ?? 'button'} {...rest}>
      {buttonContent(props)}
    </button>
  )
}

/**
 * Button.Label: a label styled as a button
 */
export function Label(allProps: Props): Component<Props> {
  const [props, rest] = splitProps(allProps, buttonProps)
  return (
    <label class={buttonClass(props)} disabled={props.disabled} role='button' {...rest}>
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
    loading: props.loading,
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
