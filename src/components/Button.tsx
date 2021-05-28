/*
 * Icon.tsx
 */

import { Component, splitProps } from "solid-js";
import octicons from '@primer/octicons'

interface Props {
  width: number;
  name: string;
  info: boolean;
  success: boolean;
  warning: boolean;
  danger: boolean;
  spin: boolean;
}

/**
 * @param props.name
 */
export default function Button(props: Props): Component<Props> {
  return (
    <button />
  )
}
