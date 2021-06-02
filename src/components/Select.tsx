/*
 * Select.tsx
 */


import { Component, splitProps } from 'solid-js'
import { For } from 'solid-js/web'
import type { Option } from '../types'
import cxx from '../cxx'
import eventHandler from '../event-handler'

interface Props {
  class?: string;
  size?: string;
  value?: any;
  options?: Option[];
  loading?: boolean;
  disabled?: boolean;
  onChange?: (value: any, ev: Event) => void;
}

/**
 * @param {boolean} props.loading
 */
export default function Select(allProps: Props): Component<Props> {
  const [props, rest] = splitProps(allProps, [
    'class',
    'size',
    'value',
    'options',
    'loading',
    'onChange',
  ])
  const value = () => props.value !== undefined ? JSON.stringify(props.value) : undefined
  const disabled = () => props.loading || rest.disabled
  const onChange = ev => {
    eventHandler(props.onChange, JSON.parse(ev.target.value), ev)
    if (props.value !== undefined && ev.target.value !== props.value)
      ev.target.value = JSON.stringify(props.value)
  }

  return (
    <select
      class={cxx('Select', [props.size], {
        disabled: disabled(),
      }, props.class)}
      {...rest}
      value={value()}
      onChange={onChange}
    >
      <option value='null'></option>
      <For each={props.options}
        children={o =>
          <option value={JSON.stringify(o.value)}>{o.label}</option>
        }
      />
    </select>
  )
}
