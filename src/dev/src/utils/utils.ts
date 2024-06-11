import { ToastComponent } from '@tylertech/forge/toast';

export function showToast(message: string): void {
  ToastComponent.present({ message });
}

export function randomTimeout(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function setCookie(name: string, value: string, expDays = 365): void {
  const d = new Date();
  d.setTime(d.getTime() + (expDays * 24 * 60 * 60 * 1000));
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
}

export function getCookie(name: string): string {
  const identifier = `${name}=`;
  const cookies = document.cookie.split(';');
  for(let cookie of cookies) {
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(identifier) === 0) {
      return cookie.substring(identifier.length, cookie.length);
    }
  }
  return '';
}
