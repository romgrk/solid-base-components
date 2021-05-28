/*
 * Icon.tsx
 */

import { Component, splitProps } from "solid-js";
import octicons from '@primer/octicons'

interface Props {
  name: string;
  width?: number;
  info?: boolean;
  success?: boolean;
  warning?: boolean;
  danger?: boolean;
  spin?: boolean;
}

const colors = {
  info: '#0366D6',
  success: '#22863A',
  warning: '#B08800',
  danger: '#D73A49',
}

/*
 * Example: 
 *
 * <Icon name='gear' />
 * <Icon name='gear' width={40} />
 * <Icon name='info' info />
 * <Icon name='check' success />
 * <Icon name='alert' warning />
 * <Icon name='x' danger />
 */

/**
 * @param {string} props.name
 */
export default function Icon(props: Props): Component<Props> {
  const [ownProps, rest] = splitProps(props, ['name', 'info', 'success', 'warning', 'danger', 'spin'])
  const getColor = () => 
    props.info ? colors.info :
    props.success ? colors.success :
    props.warning ? colors.warning :
    props.danger ? colors.danger : undefined

  const getIcon = () => {
    const icon = octicons[ownProps.name]
    if (!icon)
      throw new Error('Invalid icon name: ' + ownProps.name)
    return icon.toSVG(rest)
  }

  const size = () => props.width || 16

  return (
    <span
      class={'Icon ' + (props.spin ? ' Icon--spin' : '')}
      style={{ color: getColor(), width: `${size()}px`, height: `${size()}px` }}
      innerHTML={getIcon()}
    />
  )
}
