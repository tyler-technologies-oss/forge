import React, { ForwardRefExoticComponent, PropsWithRef } from 'react';
import reactifyWc from 'reactify-wc';

export type ReactComponentOrElements = HTMLCollection | React.ComponentClass<any, any> | React.FC<any> | JSX.Element;

export interface IElementProxyOptions {
  forceProperty?: string[];
  forceAttribute?: string[];
  forceEvent?: string[];
}

export type ElementProxyProps<T> = Partial<Omit<T, 'children'>> | { style?: Partial<CSSStyleDeclaration> } | { [key: string]: any };
export type ElementProxy<T> = ForwardRefExoticComponent<PropsWithRef<ElementProxyProps<T>> & { children?: React.ReactNode } & React.RefAttributes<unknown>>;

/**
 * Creates a React component proxy (wrapper) around an HTML element or custom element).
 * @param name The name of the HTML element to create.
 * @param options
 * @returns
 */
export function createElementProxy<T extends keyof HTMLElementTagNameMap, K extends HTMLElementTagNameMap[T]>(
  name: T,
  options?: IElementProxyOptions
): ElementProxy<K> {
  return reactifyWc<K>(name, options) as any;
}
