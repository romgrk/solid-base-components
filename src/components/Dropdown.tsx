/*
 * Dropdown.tsx
 */

import { Component, createEffect, createSignal, JSX } from 'solid-js'
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
  onChange?: (value: boolean, ev: Event|undefined, o: Option) => void,
}

export default function Dropdown(props: Props): Component<Props> {
  // TODO: pass popover-props to popover

  let popover
  let popoverNode: HTMLElement
  let close = () => popover.close()

  const id = props.id || `dropdown-${nextId++}`
  const disabled = () => props.disabled || props.loading
  const placeholder = () => props.placeholder ?? '-'
  const [value, option, onChange] = createControlledValue(props, close)
  const [selected, setSelected] = createSignal(-1)

  const onKeyDown = (ev) => {
    switch (ev.key) {
      case 'Escape': {
        popover.close()
        break
      }
      case 'Enter': {
        const o = props.options[selected()]
        if (o)
          onChange(o, undefined)
        popover.close()
        break
      }
      case 'ArrowDown': {
        let index = selected() + 1
        if (index >= props.options.length)
          index = -1
        setSelected(index)
        break
      }
      case 'ArrowUp': {
        let index = selected() - 1
        if (index <= -2)
          index = props.options.length - 1
        setSelected(index)
        break
      }
      default: return
    }
    ev.preventDefault()
  }

  let previousActiveElement: HTMLElement
  const onOpen = () => {
    previousActiveElement = document.activeElement as HTMLElement
    popoverNode.focus()
    const v = value()
    setSelected(props.options.findIndex(o => o.value === v) ?? -1)
  }
  const onClose = () => {
    if (previousActiveElement) {
      previousActiveElement.focus()
      previousActiveElement = null
    }
  }

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

  const itemClass = (o, index) =>
    cxx('Dropdown__item', { active: value() === o.value, selected: selected() === index }, 'sel-' + selected())

  return (
    <Popover
      trigger={trigger}
      onOpen={onOpen}
      onClose={onClose}
    >
      <ul
        id={id}
        ref={popoverNode}
        tabindex='-1'
        role='listbox'
        class={popoverClass()}
        aria-activedescendant={value() !== undefined ? `${id}--${value()}` : ''}
        onKeyDown={onKeyDown}
      >
        <For each={props.options}
          children={(o, index) =>
            <li
              id={`${id}--${o.value}`}
              role='option'
              aria-selected={value() === o.value ? 'true' : 'false'}
              class={itemClass(o, index())}
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
