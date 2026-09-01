import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import ReactDOM from 'react-dom';
import { ReactComponentOrElements } from '../utils.js';

export interface UseDynamicComponentResult<T extends keyof HTMLElementTagNameMap, K> {
  show: (options?: K) => HTMLElementTagNameMap[T];
  hide: () => void;
}

export interface UseDynamicComponentDelegate<T, K = any> {
  show?: (instance: T, options?: K) => void;
  hide?: (instance: T, unmountReadyCallback?: () => void) => void | Promise<void>;
}

export function useDynamicForgeComponent<T extends keyof HTMLElementTagNameMap, K = any>(
  tagName: T,
  component?: ReactComponentOrElements,
  componentProps?: any,
  delegate?: UseDynamicComponentDelegate<HTMLElementTagNameMap[T]>,
  parentElement?: HTMLElement
): UseDynamicComponentResult<T, K> {
  const [isVisible, setIsVisible] = useState(false);
  const customElementRef = useRef<HTMLElementTagNameMap[T]>();
  const parent = parentElement || document.body;

  useEffect(() => {
    if (isVisible && component && customElementRef.current) {
      if (React.isValidElement(component)) {
        ReactDOM.render(component, customElementRef.current);
      } else {
        ReactDOM.render(React.createElement(component as React.ComponentClass, componentProps), customElementRef.current);
      }
    }
  }, [component, customElementRef.current, isVisible, componentProps]);

  function show(options?: K): HTMLElementTagNameMap[T] {
    if (customElementRef.current) {
      return customElementRef.current;
    }

    customElementRef.current = document.createElement(tagName);
    ReactDOM.createPortal(customElementRef.current, parent);

    // Apply any configuration options to our Forge component instance
    if (typeof options === 'object') {
      Object.assign(customElementRef.current, options);
    }

    setIsVisible(true);

    if (delegate && delegate.show) {
      delegate.show(customElementRef.current, options);
    } else {
      parent.appendChild(customElementRef.current);
    }

    return customElementRef.current;
  }

  async function hide(): Promise<void> {
    if (!customElementRef.current || !customElementRef.current.isConnected) {
      return;
    }

    if (customElementRef.current) {
      if (delegate && delegate.hide) {
        await delegate.hide(customElementRef.current, () => {
          if (customElementRef.current) {
            ReactDOM.unmountComponentAtNode(customElementRef.current);
          }
        });
      } else {
        ReactDOM.unmountComponentAtNode(customElementRef.current);
        parent.removeChild(customElementRef.current);
      }

      customElementRef.current = undefined;
    }

    setIsVisible(false);
  }

  return { show, hide };
}
