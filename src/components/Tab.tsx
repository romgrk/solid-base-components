/*
 * Tab.tsx
 */

import { Component, JSX, splitProps, createSignal } from 'solid-js'
import { For } from 'solid-js/web'
import cxx from '../cxx'
import Box from './Box'

interface Pane {
  label: JSX.Element;
  render: () => JSX.Element;
}

type HTMLProps = Omit<JSX.DOMAttributes<HTMLElement>, 'onChange'>
interface OwnProps extends JSX.CustomAttributes<HTMLElement> {
  class?: string;
  vertical?: boolean;
  active?: number;
  header?: boolean;
  panes: Pane[];
  onChange?: (index: number) => void;
}
type Props = HTMLProps & OwnProps

/**
 * Tab: a tag component
 */
export default function Tab(allProps: Props): Component<Props> {
  const [activeValue, setActive] = createSignal(0)
  const [props, rest] = splitProps(allProps, [
    'class',
    'vertical',
    'active',
    'header',
    'panes',
    'onChange',
  ])

  const active = () => props.active ?? activeValue()

  const onChangeActive = (index: number) => {
    setActive(index)
    if (props.onChange)
      props.onChange(index)
  }

  return (
    <Box vertical class={cxx('Tab', props.class)} {...rest}>
      {(props.header !== false) &&
        <Header
          vertical={props.vertical}
          active={active()}
          panes={props.panes}
          onChange={onChangeActive}
        />
      }
      {props.panes[active()]?.render()}
    </Box>
  )
}

interface ContentOwnProps extends JSX.CustomAttributes<HTMLElement> {
  class?: string;
  children: JSX.Element;
}
type ContentProps = HTMLProps & ContentOwnProps

function Content(allProps: ContentProps) {
  const [props, rest] = splitProps(allProps, [
    'class',
    'children',
  ])
  return (
    <div class={cxx('Tab__content', props.class)} {...rest}>
      {props.children}
    </div>
  )
}

interface HeaderOwnProps extends JSX.CustomAttributes<HTMLElement> {
  class?: string;
  vertical?: boolean;
  panes: Pane[];
  active: number;
  onChange: (index: number) => void;
}
type HeaderProps = HTMLProps & HeaderOwnProps

function Header(allProps: HeaderProps) {
  const [props, rest] = splitProps(allProps, [
    'class',
    'vertical',
    'active',
    'panes',
    'onChange',
  ])
  return (
    <Box
      horizontal={!props.vertical}
      vertical={props.vertical}
      class={cxx('Tab__header', props.class)}
      {...rest}
    >
      <For each={props.panes}
        children={(pane, index) =>
          <button
            class={cxx('Tab__label', { active: index() === props.active })}
            onClick={[props.onChange, index()]}
          >
            {pane.label}
          </button>
        }
      />
    </Box>
  )
}

Tab.Content = Content
Tab.Header = Header
