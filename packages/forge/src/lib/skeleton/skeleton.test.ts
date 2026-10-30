import { html } from 'lit';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-lit';
import type { ISkeletonComponent } from './skeleton.js';

import './skeleton.js';

describe('Skeleton', () => {
  it('should initialize', async () => {
    const screen = render(html`<forge-skeleton></forge-skeleton>`);
    const el = screen.container.querySelector('forge-skeleton') as ISkeletonComponent;
    expect(el.shadowRoot).not.toBeNull();
  });

  it('should be accessible', async () => {
    const screen = render(html`<forge-skeleton></forge-skeleton>`);
    const el = screen.container.querySelector('forge-skeleton') as ISkeletonComponent;
    await expect(el).toBeAccessible();
  });

  it('should set formField property when setting form-field attribute', async () => {
    const screen = render(html`<forge-skeleton></forge-skeleton>`);
    const el = screen.container.querySelector('forge-skeleton') as ISkeletonComponent;
    expect(el.formField).toBe(false);
    el.setAttribute('form-field', '');
    expect(el.formField).toBe(true);
  });

  it('should set form-field attribute when setting formField property', async () => {
    const screen = render(html`<forge-skeleton></forge-skeleton>`);
    const el = screen.container.querySelector('forge-skeleton') as ISkeletonComponent;
    expect(el.hasAttribute('form-field')).toBe(false);
    el.formField = true;
    await el.updateComplete;
    expect(el.hasAttribute('form-field')).toBe(true);
  });

  it('should set button property when setting button attribute', async () => {
    const screen = render(html`<forge-skeleton></forge-skeleton>`);
    const el = screen.container.querySelector('forge-skeleton') as ISkeletonComponent;
    expect(el.button).toBe(false);
    el.setAttribute('button', '');
    expect(el.button).toBe(true);
  });

  it('should set button attribute when setting button property', async () => {
    const screen = render(html`<forge-skeleton></forge-skeleton>`);
    const el = screen.container.querySelector('forge-skeleton') as ISkeletonComponent;
    expect(el.hasAttribute('button')).toBe(false);
    el.button = true;
    await el.updateComplete;
    expect(el.hasAttribute('button')).toBe(true);
  });

  it('should set chip property when setting chip attribute', async () => {
    const screen = render(html`<forge-skeleton></forge-skeleton>`);
    const el = screen.container.querySelector('forge-skeleton') as ISkeletonComponent;
    expect(el.chip).toBe(false);
    el.setAttribute('chip', '');
    expect(el.chip).toBe(true);
  });

  it('should set chip attribute when setting chip property', async () => {
    const screen = render(html`<forge-skeleton></forge-skeleton>`);
    const el = screen.container.querySelector('forge-skeleton') as ISkeletonComponent;
    expect(el.hasAttribute('chip')).toBe(false);
    el.chip = true;
    await el.updateComplete;
    expect(el.hasAttribute('chip')).toBe(true);
  });

  it('should set listItem property when setting list-item attribute', async () => {
    const screen = render(html`<forge-skeleton></forge-skeleton>`);
    const el = screen.container.querySelector('forge-skeleton') as ISkeletonComponent;
    expect(el.listItem).toBe(false);
    el.setAttribute('list-item', '');
    expect(el.listItem).toBe(true);
  });

  it('should set list-item attribute when setting listItem property', async () => {
    const screen = render(html`<forge-skeleton></forge-skeleton>`);
    const el = screen.container.querySelector('forge-skeleton') as ISkeletonComponent;
    expect(el.hasAttribute('list-item')).toBe(false);
    el.listItem = true;
    await el.updateComplete;
    expect(el.hasAttribute('list-item')).toBe(true);
  });

  it('should set text property when setting text attribute', async () => {
    const screen = render(html`<forge-skeleton></forge-skeleton>`);
    const el = screen.container.querySelector('forge-skeleton') as ISkeletonComponent;
    expect(el.text).toBe(false);
    el.setAttribute('text', '');
    expect(el.text).toBe(true);
  });

  it('should set text attribute when setting text property', async () => {
    const screen = render(html`<forge-skeleton></forge-skeleton>`);
    const el = screen.container.querySelector('forge-skeleton') as ISkeletonComponent;
    expect(el.hasAttribute('text')).toBe(false);
    el.text = true;
    await el.updateComplete;
    expect(el.hasAttribute('text')).toBe(true);
  });

  it('should set avatar property when setting avatar attribute', async () => {
    const screen = render(html`<forge-skeleton></forge-skeleton>`);
    const el = screen.container.querySelector('forge-skeleton') as ISkeletonComponent;
    expect(el.avatar).toBe(false);
    el.setAttribute('avatar', '');
    expect(el.avatar).toBe(true);
  });

  it('should set avatar attribute when setting avatar property', async () => {
    const screen = render(html`<forge-skeleton></forge-skeleton>`);
    const el = screen.container.querySelector('forge-skeleton') as ISkeletonComponent;
    expect(el.hasAttribute('avatar')).toBe(false);
    el.avatar = true;
    await el.updateComplete;
    expect(el.hasAttribute('avatar')).toBe(true);
  });

  it('should set stretch property when setting stretch attribute', async () => {
    const screen = render(html`<forge-skeleton></forge-skeleton>`);
    const el = screen.container.querySelector('forge-skeleton') as ISkeletonComponent;
    expect(el.stretch).toBe(false);
    el.setAttribute('stretch', '');
    expect(el.stretch).toBe(true);
  });

  it('should set stretch attribute when setting stretch property', async () => {
    const screen = render(html`<forge-skeleton></forge-skeleton>`);
    const el = screen.container.querySelector('forge-skeleton') as ISkeletonComponent;
    expect(el.hasAttribute('stretch')).toBe(false);
    el.stretch = true;
    await el.updateComplete;
    expect(el.hasAttribute('stretch')).toBe(true);
  });

  it('should remove attribute when property is set to false', async () => {
    const screen = render(html`<forge-skeleton button></forge-skeleton>`);
    const el = screen.container.querySelector('forge-skeleton') as ISkeletonComponent;
    expect(el.hasAttribute('button')).toBe(true);
    el.button = false;
    await el.updateComplete;
    expect(el.hasAttribute('button')).toBe(false);
  });

  it('should support multiple variant attributes simultaneously', async () => {
    const screen = render(html`<forge-skeleton button avatar></forge-skeleton>`);
    const el = screen.container.querySelector('forge-skeleton') as ISkeletonComponent;
    expect(el.button).toBe(true);
    expect(el.avatar).toBe(true);
    expect(el.chip).toBe(false);
  });
});
