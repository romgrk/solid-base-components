/*
 * Table.tsx
 */

import { For, Component } from 'solid-js'
import cxx from '../cxx'
import { path } from 'rambda'

interface Props {
  class?: string;
  items: Object[];
  columns?: Object[];
}

export default function Table(props: Props): Component<Props> {
  const columns = () => getColumns(props)

  return (
    <table class={cxx('Table', props.class)}>
      <thead>
        <tr>
          <For each={columns()}
            children={(column: any) =>
              <th>{column.name || column.key}</th>
            }
          />
        </tr>
      </thead>
      <tbody>
        <For each={props.items}
          children={item =>
            <tr>
              <For each={columns()}
                children={column =>
                  <td>{renderItem(item, column)}</td>
                }
              />
            </tr>
          }
        />
      </tbody>
    </table>
  )
}

function getColumns(props) {
  if (props.columns)
    return props.columns
  const item = props.items[0]
  if (!item)
    return [{ name: '(empty)', key: null }]
  const keys = Object.keys(item)
  return keys.map(key => ({
    name: key,
    key: key,
  }))
}

function renderItem(item, column) {
  const value = column.key ? path(column.key, item) : item
  return column.render ? column.render(value, item) : value
}
