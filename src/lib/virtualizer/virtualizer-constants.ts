import { createContext } from '@lit/context';
import { VirtualItem as TanStackVirtualItem, Virtualizer } from '@tanstack/virtual-core';
import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}virtualizer`;

const events = {
  CHANGE: 'change'
};

export const VIRTUALIZER_CONSTANTS = {
  elementName,
  events
};

export const VIRTUALIZER_CONTEXT = createContext<IVirtualizerContext>(elementName);

export type VirtualizerDirection = 'horizontal' | 'vertical';
export type VirtualItemKey = string | number | bigint;
export type EstimateSizeCallback = (index: number) => number;
export type GetItemKeyCallback = (index: number) => VirtualItemKey;
export type VirtualItemBuilder = (item: VirtualItem) => Element;

export interface VirtualItem extends Omit<TanStackVirtualItem, 'key'> {
  key: VirtualItemKey;
}

export interface IVirtualizerContext {
  virtualizer: Virtualizer<Element, Element>;
  direction: VirtualizerDirection;
  dynamic: boolean;
}
