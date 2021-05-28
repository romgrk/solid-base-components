/*
 * Popover.tsx
 */


import { Component, createSignal, onCleanup } from 'solid-js'
import { Portal } from 'solid-js/web'
import { createPopper } from '@popperjs/core'
import cxx from '../cxx'

type Placement = 
  'top' |
  'top-start' |
  'top-end' |
  'bottom' |
  'bottom-start' |
  'bottom-end' |
  'right' |
  'right-start' |
  'right-end' |
  'left' |
  'left-start' |
  'left-end'

type TriggerFunc = (o: {
  ref: (node: HTMLElement) => void,
  open: () => void,
  close: () => void,
  toggle: () => void,
}) => void;

interface Props {
  trigger: TriggerFunc;
  closeOnClick?: boolean;
  arrow?: boolean;
  placement?: Placement;
  children?: any;
}

/**
 * @param {boolean} props.arrow
 * @param {Function} props.trigger
 * @param {boolean} [props.closeOnClick=true]
 * @param {string} [props.placement='bottom-start']
 * @param {Node} props.children
 */
export default function Popover(props: Props): Component<Props> {
  let triggerNode: HTMLElement
  let arrowNode: HTMLElement

  const mount = createMounHooks()
  const popper = createPopperHooks()
  const [isOpen, setOpen] = createSignal(false)
  const placement = () => props.placement ?? 'bottom-start'
  const closeOnClick = () => props.closeOnClick ?? true
  const popperOptions = () => getPopperOptions(placement(), arrowNode, isOpen, console.log)

  const attach = () => {
    if (mount.node()) return
    mount.attach()
    popper.attach(triggerNode, mount.node(), popperOptions())
    if (closeOnClick())
      document.documentElement.addEventListener('click', onDocumentClick)
  }

  onCleanup(() => {
    mount.detach()
    popper.detach()
    if (closeOnClick())
      document.documentElement.removeEventListener('click', onDocumentClick)
  })

  const ref = node => triggerNode = node
  const open = () => (attach(), setOpen(true))
  const close = () => setOpen(false)
  const toggle = () => isOpen() ? close() : open()

  const onDocumentClick = ev => {
    if (!isOpen())
      return
    if (!(triggerNode.contains(ev.target) || mount.node().contains(ev.target)))
      close()
  }

  const popoverClass = () => cxx('Popover', { open: isOpen() })
  const arrowClass = () => cxx('Popover__arrow', [getInversePlacement(placement())])

  return (
    <>
      {props.trigger({ ref, open, close, toggle })}
      <Show when={mount.node()}>
        <Portal mount={mount.node()}>
          <div class={popoverClass()}>
            {props.arrow &&
              <div class={arrowClass()} ref={arrowNode} />
            }
            <div class='Popover__content'>
              {props.children}
            </div>
          </div>
        </Portal>
      </Show>
    </>
  )
}

function getPopperOptions(placement, arrowNode, isOpen, onUpdate) {
  const hasArrow = Boolean(arrowNode)
  return {
    placement: placement,
    modifiers: [
      {
        name: 'arrow',
        enabled: hasArrow,
        options: {
          element: arrowNode,
          padding: 15,
        },
      },
      {
        /* Offset from the trigger */
        name: 'offset',
        options: {
          offset: [0, hasArrow ? 10 : 0],
        },
      },
      {
        /* Avoids touching the edge of the window */
        name: 'preventOverflow',
        options: {
          altAxis: true,
          padding: 10,
        },
      },
      {
        /* Custom modifier */
        name: 'eventListeners',
        enabled: isOpen(),
      },
      {
        /* Custom modifier */
        name: 'updateComponentState',
        enabled: true,
        phase: 'write',
        fn: onUpdate,
      },
    ],
  }
}

function createMounHooks() {
  const [mountNode, setMountNode] = createSignal(null)

  const mount = {
    node: mountNode,
    attach: () => {
      if (mountNode()) return
      const node = document.createElement('div')
      node.className = 'Popover__mountNode'
      document.body.append(node)
      setMountNode(node)
    },
    detach: () => {
      if (mountNode())
        document.body.removeChild(mountNode())
    },
  }

  return mount
}

function createPopperHooks() {
  const popper = {
    instance: null,
    attach: (triggerNode, popoverNode, options) => {
      popper.instance = createPopper(
        triggerNode,
        popoverNode,
        options,
      )
    },
    detach: () => {
      if (popper.instance) {
        popper.instance.destroy()
        popper.instance = null
      }
    },
  }

  return popper
}

function getInversePlacement(p) {
  if (p.startsWith('top')) return 'bottom'
  if (p.startsWith('bottom')) return 'top'
  if (p.startsWith('left')) return 'right'
  if (p.startsWith('right')) return 'left'
  return 'top'
}

