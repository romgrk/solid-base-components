/*
 * Checkbox.tsx
 */


import { Component, splitProps } from 'solid-js'
import cxx from '../cxx'
import eventHandler from '../event-handler'

let nextId = 1

interface Props {
  id?: string,
  value?: string,
  class?: string,
  size?: string,
  children?: any,
  disabled?: boolean,
  onChange?: (value: boolean, ev: Event) => void,
}

/**
 * @param {string} props.icon
 * @param {string} props.iconAfter
 * @param {boolean} props.loading
 */
export default function Checkbox(allProps: Props): Component<Props> {
  const [props, rest] = splitProps(allProps, [
    'id',
    'value',
    'class',
    'size',
    'children',
    'disabled',
    'onChange',
  ])
  const id = props.id || `checkbox-${nextId++}`
  const disabled = () => props.disabled
  const onChange = ev => {
    eventHandler(props.onChange, ev.target.checked, ev)
    if (props.value !== undefined && props.value !== ev.target.checked)
      ev.target.checked = props.value
  }

  return (
    <span class={cxx('Checkbox', [props.size], {
      disabled: disabled(),
    }, props.class)}>
      <input
        {...rest}
        type='checkbox'
        id={id}
        checked={props.value}
        onChange={onChange}
        disabled={disabled()}
      />
      <label for={id}>{props.children}</label>
    </span>
  )
}
