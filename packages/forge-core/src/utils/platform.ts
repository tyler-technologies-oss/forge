/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

// Whether the current platform supports the V8 Break Iterator. The V8 check
// is necessary to detect all Blink based browsers.
const hasV8BreakIterator = typeof Intl !== 'undefined' && (Intl as any).v8BreakIterator;

/**
 * Class used to detect the current platform by comparing the userAgent strings and
 * checking browser-specific global properties.
 * @docs-private
 */
export class Platform {
  public static get isBrowser(): boolean {
    return typeof document === 'object' && !!document;
  }

  public static get isMobile(): boolean {
    return Platform.isBrowser && /Mobi/.test(navigator.userAgent);
  }

  /** Layout Engines */
  public static get EDGE(): boolean {
    return Platform.isBrowser && /(edge)/i.test(navigator.userAgent);
  }

  public static get TRIDENT(): boolean {
    return Platform.isBrowser && /(msie|trident)/i.test(navigator.userAgent);
  }

  // EdgeHTML and Trident mock Blink specific things and need to be excluded from this check.
  public static get BLINK(): boolean {
    return Platform.isBrowser && !!((window as any).chrome || hasV8BreakIterator) && !!CSS && !Platform.EDGE && !Platform.TRIDENT;
  }

  // Webkit is part of the userAgent in EdgeHTML, Blink and Trident. Therefore we need to
  // ensure that Webkit runs standalone and is not used as another engine's base.
  public static get WEBKIT(): boolean {
    return Platform.isBrowser && /AppleWebKit/i.test(navigator.userAgent) && !Platform.BLINK && !Platform.EDGE && !Platform.TRIDENT;
  }

  /** Browsers and Platform Types */
  public static get IOS(): boolean {
    return Platform.isBrowser && /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
  }

  // It's difficult to detect the plain Gecko engine, because most of the browsers identify
  // them self as Gecko-like browsers and modify the userAgent's according to that.
  // Since we only cover one explicit Firefox case, we can simply check for Firefox
  // instead of having an unstable check for Gecko.
  public static get FIREFOX(): boolean {
    return Platform.isBrowser && /(firefox|minefield)/i.test(navigator.userAgent);
  }

  // Trident on mobile adds the android platform to the userAgent to trick detections.
  public static get ANDROID(): boolean {
    return Platform.isBrowser && /android/i.test(navigator.userAgent) && !Platform.TRIDENT;
  }

  // Safari browsers will include the Safari keyword in their userAgent. Some browsers may fake
  // this and just place the Safari keyword in the userAgent. To be more safe about Safari every
  // Safari browser should also use Webkit as its layout engine.
  public SAFARI(): boolean {
    return Platform.isBrowser && /safari/i.test(navigator.userAgent) && Platform.WEBKIT;
  }
}
