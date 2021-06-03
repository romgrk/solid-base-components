/*
 * Input.tsx
 */


import { Component, JSX, splitProps } from 'solid-js'
import cxx from '../cxx'
import eventHandler from '../event-handler'
import Icon from './Icon'


type InputProps = Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'onChange'>
interface OwnProps {
  ref?: any;
  value?: string;
  class?: string;
  status?: string;
  icon?: string;
  iconAfter?: string;
  loading?: boolean;
  disabled?: boolean;
  onChange?: (value: string, ev?: Event) => void;
}
type Props = InputProps & OwnProps

/**
 * Input: an input element
 */
export default function Input(allProps: Props): Component<Props> {
  const [props, rest] = splitProps(allProps, [
    'ref',
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
    eventHandler(props.onChange, target.value, ev)
    if (rest.value !== undefined && target.value !== rest.value)
      target.value = rest.value
  }

  return (
    <span ref={props.ref} class={cxx('Input', [props.status], {
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
