/*
 * ErrorMessage.tsx
 */

import { Component } from 'solid-js'
import { Show } from 'solid-js/web'
import Alert from './Alert'
import Popover from './Popover'

interface Props {
  value?: Error,
  inline?: boolean,
}

export default function ErrorMessage(props: Props): Component<Props> {
  if (props.inline)
    return (
      <Show when={props.value}
        children={
          <Popover
            arrow
            trigger={({ ref, open ,close }) =>
              <Alert
                inline
                variant='error'
                icon='alert'
                ref={ref}
                onMouseOver={open}
                onMouseLeave={close}
              >
                {props.value.message}
              </Alert>
            }
          >
            <pre>{props.value.stack}</pre>
          </Popover>
        }
      />
    )

  return (
    <Show when={props.value}
      children={
        <Alert variant='error' icon='alert'>
          <div>{props.value.message}</div>
          <pre>{props.value.stack}</pre>
        </Alert>
      }
    />
  )
}
