/*
 * Input.tsx
 */


import { Component, splitProps } from 'solid-js'
import cxx from '../cxx'
import Icon from './Icon'

interface Props {
  value?: string;
  class?: string;
  status?: string;
  icon?: string;
  iconAfter?: string;
  loading?: boolean;
  disabled?: boolean;
  onChange?: (value: string, ev: Object) => void;
}

/**
 * @param {string} props.icon
 * @param {string} props.iconAfter
 * @param {boolean} props.loading
 */
export default function Input(allProps: Props): Component<Props> {
  const [props, rest] = splitProps(allProps, [
    'class',
    'status',
    'icon',
    'iconAfter',
    'loading',
    'disabled',
    'onChange',
  ])
  const disabled = () => props.loading || props.disabled
  const onChange = (ev: InputEvent) => {
    const target = ev.target as HTMLInputElement
    props.onChange?.(target.value, ev)
    if (rest.value !== undefined && target.value !== rest.value)
      target.value = rest.value
  }

  return (
    <span class={cxx('Input', [props.status], {
      disabled: disabled(),
    }, props.class)}>
      {props.icon && <Icon name={props.icon} />}
      <input
        {...rest}
        disabled={disabled()}
        onInput={onChange}
      />
      {props.iconAfter && <Icon name={props.iconAfter} />}
      {props.loading && <Icon name='sync' spin />}
    </span>
  )
}
