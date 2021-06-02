/*
 * Table.tsx
 */

import { For, Component, JSX } from 'solid-js'
import cxx from '../cxx'
import { path } from 'rambda'

interface ColumnProps {
  key: string|number;
  label?: JSX.Element;
}

interface Props {
  class?: string;
  items: Object[];
  columns?: ColumnProps[];
}

export default function Table(props: Props): Component<Props> {
  const columns = () => getColumns(props)

  return (
    <table class={cxx('Table', props.class)}>
      <thead>
        <tr>
          <For each={columns()}
            children={(column: any) =>
              <th>{column.label || column.key}</th>
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
    return [{ label: '(empty)', key: null }]
  const keys = Object.keys(item)
  return keys.map(key => ({
    label: key,
    key: key,
  }))
}

function renderItem(item, column) {
  const value = column.key ? path(column.key, item) : item
  return column.render ? column.render(value, item) : value
}
