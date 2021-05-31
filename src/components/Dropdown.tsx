/*
 * Dropdown.tsx
 */

import { Component, createSignal, JSX } from 'solid-js'
import { For } from 'solid-js/web'
import type { Option } from '../types'
import cxx from '../cxx'
import Button from './Button'
import Popover from './Popover'

let nextId = 1

interface Props {
  options: Option[],
  id?: string,
  class?: string,
  value?: any,
  defaultValue?: any,
  size?: string,
  variant?: string,
  loading?: boolean,
  disabled?: boolean,
  placeholder?: JSX.Element,
  children?: any,
  onChange?: (value: boolean, ev: Event, o: Option) => void,
}

export default function Dropdown(props: Props): Component<Props> {
  // TODO: keyboard interface: https://stackoverflow.com/questions/41141247/aria-role-menuitem-for-a-or-li
  // TODO: pass popover-props to popover

  let popover
  let close = () => popover.close()

  const id = props.id || `dropdown-${nextId++}`
  const disabled = () => props.disabled || props.loading
  const placeholder = () => props.placeholder ?? '-'
  const [value, option, onChange] = createControlledValue(props, close)

  const triggerLabel = () => option()?.label ?? value() ?? placeholder()
  const triggerClass = () =>
    cxx('Dropdown', [props.size, props.variant], { disabled: disabled() }, props.class)
  const trigger = (popover_) => {
    popover = popover_
    return (
      <Button
        ref={popover.ref}
        class={triggerClass()}
        iconAfter='chevron-down'
        onClick={popover.open}
      >
        {triggerLabel()}
      </Button>
    )
  }

  const popoverClass = () =>
    cxx('Dropdown__popover', props.class)

  const itemClass = (o) =>
    cxx('Dropdown__item', { active: value() === o.value })

  return (
    <Popover trigger={trigger}>
      <ul
        id={id}
        class={popoverClass()}
        tabindex='-1'
        role='listbox'
        aria-activedescendant={value() !== undefined ? `${id}--${value()}` : ''}
      >
        <For each={props.options}
          children={o =>
            <li
              id={`${id}--${o.value}`}
              role='option'
              aria-selected={value() === o.value ? 'true' : 'false'}
              class={itemClass(o)}
              onClick={[onChange, o]}
            >
              {o.label ?? o.value}
            </li>
          }
        />
      </ul>
    </Popover>
  )
}

function createControlledValue(props: Props, close: () => void): [() => any, () => Option, (o, ev) => void] {
  const isControlled = props.value !== undefined

  let value = () => props.value
  let setValue
  if (!isControlled) {
    [value, setValue] = createSignal(props.defaultValue)
  }

  const findOption = () => props.options.find(o => o.value === value())
  const [option, setOption] = createSignal(findOption())
  const onChange = (o, ev) => {
    if (!isControlled)
      setValue(o.value)
    props.onChange?.(o.value, ev, o)
    if (isControlled)
      setOption(findOption())
    else
      setOption(o)
    close()
  }

  return [value, option, onChange]
}

