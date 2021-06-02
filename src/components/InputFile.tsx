/*
 * InputFile.tsx
 */

import { Component, splitProps } from 'solid-js'
import cxx from '../cxx'
import eventHandler from '../event-handler'
import Button from './Button'

interface Props {
  class?: string;
  children?: any;
  accept?: string;
  capture?: string;
  multiple?: boolean;
  onChange: (files: File[], ev: Event) => void;
}

export default function InputFile(allProps: Props): Component<Props> {
  const [props, rest] = splitProps(allProps, [
    'class',
    'children',
    'onChange',
  ])
  const [inputProps, buttonProps] = splitProps(rest, [
    'accept',
    'capture',
    'multiple',
  ])

  const onChange = ev => {
    eventHandler(props.onChange, ev.target.files, ev)
  }

  return (
    <Button.Label
      class={cxx('InputFile', props.class)}
      {...buttonProps}
    >
      {props.children}
      <input
        type='file'
        onChange={onChange}
        {...inputProps}
      />
    </Button.Label>
  )
}

