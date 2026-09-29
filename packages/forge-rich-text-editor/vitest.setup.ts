import { afterEach } from 'vitest';
import { cleanup } from 'vitest-browser-lit';
import { userEvent } from 'vitest/browser';

afterEach(() => {
  cleanup();
  userEvent.cleanup();
  document.body.innerHTML = '';
});
