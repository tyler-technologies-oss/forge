import { ARIARole, setDefaultAria } from '../core/utils/a11y-utils';
import { KeyActionController } from '../core/utils/key-action';
import { checkVisibility, task } from '../core/utils/utils';
import { FocusGroupComponent } from './focus-group';

export type FocusGroupBehavior = 'toolbar' | 'tablist' | 'radiogroup' | 'listbox' | 'menu' | 'menubar' | 'grid'; // Reserved for future - throws error if used

export type FocusGroupDirection = 'both' | 'inline' | 'block';

const BEHAVIOR_ROLE_MAP: Record<FocusGroupBehavior, ARIARole> = {
  toolbar: 'toolbar',
  tablist: 'tablist',
  radiogroup: 'radiogroup',
  listbox: 'listbox',
  menu: 'menu',
  menubar: 'menubar',
  grid: 'grid'
};

const BEHAVIOR_CHILD_ROLE_MAP: Partial<Record<FocusGroupBehavior, ARIARole>> = {
  tablist: 'tab',
  radiogroup: 'radio',
  listbox: 'option',
  menu: 'menuitem',
  menubar: 'menuitem'
  // toolbar and grid have no default child role
};

/**
 * Headless controller that implements focus group behavior for composite widgets.
 *
 * Manages keyboard navigation, roving tabindex, ARIA roles, and focus memory for groups
 * of focusable elements. Supports various behavior patterns (toolbar, tablist, radiogroup,
 * listbox, menu, menubar) with configurable navigation direction and wrapping.
 *
 * Key features:
 * - Roving tabindex management for optimal keyboard navigation
 * - Automatic ARIA role application based on behavior
 * - Focus memory restoration (with opt-out)
 * - Responsive to DOM changes (add/remove/enable/disable elements)
 * - Support for RTL and vertical writing modes
 * - Excludes editing controls from arrow key navigation
 *
 * Can be used imperatively without a web component.
 *
 * @example
 * ```ts
 * const controller = new FocusGroupController(hostElement);
 * await controller.connect();
 * controller.setBehavior('toolbar');
 * controller.setDirection('inline');
 * ```
 */
export class FocusGroupController {
  #host: FocusGroupComponent;
  #hostInternals: ElementInternals;
  #behavior?: FocusGroupBehavior;
  #direction: FocusGroupDirection = 'both';
  #wrap = false;
  #noMemory = false;

  #lastFocusedElement: HTMLElement | null = null;
  #focusableCache: HTMLElement[] | null = null;

  #mutationObserver?: MutationObserver;
  #mutationTimeout?: number;

  #focusInListener = this.#handleFocusIn.bind(this);
  #focusOutListener = this.#handleFocusOut.bind(this);

  constructor(host: FocusGroupComponent, internals: ElementInternals) {
    this.#host = host;
    this.#hostInternals = internals;
  }

  /**
   * Initializes the focus group controller.
   *
   * Sets up keyboard handlers, DOM observers, ARIA roles, and roving tabindex.
   * This method is automatically called by the component's `connectedCallback`.
   *
   * @returns A promise that resolves when initialization is complete.
   *
   * @example
   * ```ts
   * await controller.connect();
   * ```
   */
  public async connect(): Promise<void> {
    // Set up keyboard handling
    new KeyActionController(this.#host, {
      actions: [
        {
          key: ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'],
          handler: this.#handleArrowKey.bind(this),
          allowRepeat: true
        },
        {
          key: ['Home', 'End'],
          handler: this.#handleHomeEnd.bind(this)
        }
      ]
    });

    // Set up focus tracking
    this.#host.addEventListener('focusin', this.#focusInListener);
    this.#host.addEventListener('focusout', this.#focusOutListener);

    // Set up DOM change tracking (robust - catches add/remove/enable/disable/hide)
    this.#observeDOMChanges();

    // Apply ARIA roles
    this.#applyMinimumRole();
    this.#applyOrientation();

    // Initialize focusable elements and roving tabindex
    await this.#syncFocusables();
  }

  /**
   * Cleans up the focus group controller.
   *
   * Removes event listeners, disconnects observers, and clears state.
   * This method is automatically called by the component's `disconnectedCallback`.
   *
   * @example
   * ```ts
   * controller.disconnect();
   * ```
   */
  public disconnect(): void {
    this.#host.removeEventListener('focusin', this.#focusInListener);
    this.#host.removeEventListener('focusout', this.#focusOutListener);
    this.#mutationObserver?.disconnect();
    clearTimeout(this.#mutationTimeout);
    this.#lastFocusedElement = null;
    this.#focusableCache = null;
  }

  /**
   * Sets the behavior pattern for the focus group.
   *
   * The behavior determines the ARIA role, orientation, and interaction pattern
   * for the group. Automatically applies appropriate ARIA roles to the container
   * and child elements based on the selected behavior.
   *
   * @param value - The behavior pattern ('toolbar', 'tablist', 'radiogroup',
   *                'listbox', 'menu', 'menubar'). Use `undefined` to clear.
   * @throws {Error} If 'grid' behavior is used (not yet implemented).
   *
   * @example
   * ```ts
   * controller.setBehavior('toolbar');
   * controller.setBehavior('tablist');
   * controller.setBehavior(undefined); // Clear behavior
   * ```
   */
  public setBehavior(value: FocusGroupBehavior | undefined): void {
    // Throw error if grid is used
    if (value === 'grid') {
      throw new Error(
        'Focus Group: Grid behavior (2D navigation) is not yet implemented. ' +
          'Use a linear behavior like "toolbar", "tablist", "radiogroup", "listbox", "menu", or "menubar".'
      );
    }

    this.#behavior = value;
    this.#applyMinimumRole();
    this.#applyOrientation();
    this.#applyChildRoles();
  }

  /**
   * Sets the direction constraint for keyboard navigation.
   *
   * Controls which arrow keys are active for navigation:
   * - 'both': All arrow keys work (default)
   * - 'inline': Only horizontal arrows (left/right, respects RTL)
   * - 'block': Only vertical arrows (up/down)
   *
   * Also updates the `aria-orientation` attribute for applicable behaviors.
   *
   * @param value - The navigation direction ('both', 'inline', 'block').
   *
   * @example
   * ```ts
   * controller.setDirection('inline');  // Horizontal navigation only
   * controller.setDirection('block');   // Vertical navigation only
   * controller.setDirection('both');    // All directions
   * ```
   */
  public setDirection(value: FocusGroupDirection): void {
    this.#direction = value;
    this.#applyOrientation();
  }

  /**
   * Sets whether keyboard navigation wraps at boundaries.
   *
   * When enabled, navigating past the last item moves to the first item,
   * and navigating before the first item moves to the last item.
   * When disabled, navigation stops at boundaries.
   *
   * @param value - `true` to enable wrapping, `false` to disable.
   *
   * @example
   * ```ts
   * controller.setWrap(true);  // Enable wrapping
   * controller.setWrap(false); // Disable wrapping
   * ```
   */
  public setWrap(value: boolean): void {
    this.#wrap = value;
  }

  /**
   * Disables focus memory restoration.
   *
   * When enabled (`true`), the controller will not remember the last focused
   * element when focus leaves the group. Each time focus enters the group,
   * the first element (or element with `focusgroupstart`) will be made tabbable
   * instead of restoring the previously focused element.
   *
   * Note: This setting only affects focus memory across focus/blur cycles.
   * The roving tabindex pattern continues to work normally during active
   * keyboard navigation within the group.
   *
   * Clearing this memory when enabled ensures clean state transitions.
   *
   * @param value - `true` to disable memory, `false` to enable memory.
   *
   * @example
   * ```ts
   * controller.setNoMemory(true);  // Disable focus memory
   * controller.setNoMemory(false); // Enable focus memory (default)
   * ```
   */
  public setNoMemory(value: boolean): void {
    if (value) {
      this.#lastFocusedElement = null; // Clear memory when disabled
    }
    this.#noMemory = value;
  }

  // ============================================================================
  // DOM Observation & Synchronization
  // ============================================================================

  #observeDOMChanges(): void {
    this.#mutationObserver = new MutationObserver(() => {
      clearTimeout(this.#mutationTimeout);
      this.#mutationTimeout = window.setTimeout(() => {
        this.#handleDOMChange();
      }, 50);
    });

    this.#mutationObserver.observe(this.#host, {
      childList: true, // Catch add/remove
      subtree: true, // Catch nested changes
      attributes: true, // Catch attribute changes
      attributeFilter: [
        'tabindex', // Focusability change
        'disabled', // Disabled state change
        'aria-disabled', // Disabled state change
        'hidden', // Visibility change
        'aria-hidden', // Visibility change
        'data-focus-group-exclude' // Opt-out change
      ]
    });
  }

  async #handleDOMChange(): Promise<void> {
    await this.#syncFocusables();
  }

  async #syncFocusables(): Promise<void> {
    await task(); // Wait for any pending DOM updates to settle

    // Find focusable children and compare to the cache. If different, invalidate cache and reapply roles/tabindex.
    const currentFocusables = this.#buildFocusableList();
    const isSame =
      this.#focusableCache &&
      currentFocusables.length === this.#focusableCache.length &&
      currentFocusables.every((el, index) => el === this.#focusableCache?.[index]);

    if (isSame) {
      return;
    }

    if (this.#lastFocusedElement && !currentFocusables.includes(this.#lastFocusedElement)) {
      this.#lastFocusedElement = null;
    }

    this.#focusableCache = currentFocusables;
    this.#initializeTabindex();
    this.#applyChildRoles();
  }

  // ============================================================================
  // Focusable Element Detection & Traversal
  // ============================================================================

  #getFocusableChildren(): HTMLElement[] {
    if (this.#focusableCache) {
      return this.#focusableCache;
    }

    this.#focusableCache = this.#buildFocusableList();
    return this.#focusableCache;
  }

  #buildFocusableList(): HTMLElement[] {
    const focusables: HTMLElement[] = [];
    this.#traverseForFocusables(this.#host, focusables);
    return focusables;
  }

  #traverseForFocusables(root: Element | ShadowRoot, focusables: HTMLElement[]): void {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (n: Node) => {
        const el = n as HTMLElement;

        // Skip opted-out elements
        if (el.hasAttribute('data-focus-group-exclude')) {
          return NodeFilter.FILTER_REJECT;
        }

        // Skip nested focus groups
        if (el.tagName === 'FORGE-FOCUS-GROUP' && el !== this.#host) {
          return NodeFilter.FILTER_REJECT;
        }

        // Accept if focusable
        if (this.#isFocusable(el)) {
          return NodeFilter.FILTER_ACCEPT;
        }

        return NodeFilter.FILTER_SKIP;
      }
    });

    let node = walker.nextNode();
    while (node) {
      const el = node as HTMLElement;
      focusables.push(el);

      // Traverse into shadow roots
      if (el.shadowRoot) {
        this.#traverseForFocusables(el.shadowRoot, focusables);
      }

      node = walker.nextNode();
    }
  }

  #isFocusable(el: HTMLElement): boolean {
    // Check tabindex
    const hasTabIndex = el.hasAttribute('tabindex');

    // Check disabled
    if (el.hasAttribute('disabled') || el.getAttribute('aria-disabled') === 'true') {
      return false;
    }

    // Check hidden
    if (el.hasAttribute('hidden') || el.getAttribute('aria-hidden') === 'true') {
      return false;
    }

    // Check visibility using Forge utility
    if (!checkVisibility(el)) {
      return false;
    }

    // Focusable elements
    const focusableTags = ['BUTTON', 'A', 'INPUT', 'SELECT', 'TEXTAREA'];
    const isFocusableTag = focusableTags.includes(el.tagName);

    return isFocusableTag || hasTabIndex;
  }

  // ============================================================================
  // Roving Tabindex Management
  // ============================================================================

  #updateRovingTabindex(activeElement: HTMLElement): void {
    // ALWAYS update roving tabindex regardless of memory setting
    // The noMemory flag only affects memory restoration, not the roving tabindex pattern
    this.#focusableCache?.forEach(el => {
      if (el === activeElement) {
        this.#setTabindexIfChanged(el, 0); // Make tabbable
      } else {
        this.#setTabindexIfChanged(el, -1, true); // Remove from tab order
      }
    });
  }

  #setTabindexIfChanged(el: HTMLElement, newTabIndex: number, preserveOriginal = false): void {
    if (el.tabIndex === newTabIndex) {
      return;
    }

    el.tabIndex = newTabIndex;

    // Preserve original tabindex > 0
    if (preserveOriginal && el.tabIndex > 0 && !el.hasAttribute('data-fg-original-tabindex')) {
      el.setAttribute('data-fg-original-tabindex', String(el.tabIndex));
    }
  }

  #initializeTabindex(): void {
    if (!this.#focusableCache?.length) {
      return;
    }

    let targetElement: HTMLElement | null = null;

    // Priority 1: Restore memory (if enabled and exists)
    if (!this.#noMemory && this.#lastFocusedElement) {
      if (this.#focusableCache.includes(this.#lastFocusedElement)) {
        targetElement = this.#lastFocusedElement;
      }
    }

    // Priority 2: Element with focusgroupstart attribute
    if (!targetElement) {
      targetElement = this.#focusableCache.find(el => el.hasAttribute('focusgroupstart')) || null;
    }

    // Priority 3: First focusable element
    if (!targetElement) {
      targetElement = this.#focusableCache[0];
    }

    this.#updateRovingTabindex(targetElement);
  }

  // ============================================================================
  // Keyboard Navigation
  // ============================================================================

  #handleArrowKey(evt: KeyboardEvent): void {
    const { key } = evt;
    const target = evt.target as HTMLElement;

    // Skip if target is an editing control (let it handle its own arrows)
    if (this.#isEditingControl(target)) {
      return; // Don't prevent default
    }

    // Filter based on direction constraint
    if (this.#direction === 'inline' && ['ArrowUp', 'ArrowDown'].includes(key)) {
      return;
    }
    if (this.#direction === 'block' && ['ArrowLeft', 'ArrowRight'].includes(key)) {
      return;
    }

    // Resolve logical direction (respects RTL and writing-mode)
    const isForward = this.#resolveLogicalDirection(key);

    // Navigate
    evt.preventDefault();
    this.#navigate(isForward ? 1 : -1);
  }

  #resolveLogicalDirection(key: string): boolean {
    const computedStyle = getComputedStyle(this.#host);
    const writingMode = computedStyle.writingMode;
    const isRTL = computedStyle.direction === 'rtl';

    // Vertical writing modes
    if (writingMode.includes('vertical')) {
      if (key === 'ArrowDown') {
        return true;
      }
      if (key === 'ArrowUp') {
        return false;
      }
      if (key === 'ArrowRight') {
        return !isRTL;
      }
      if (key === 'ArrowLeft') {
        return isRTL;
      }
    }

    // Horizontal (default)
    if (key === 'ArrowRight') {
      return !isRTL;
    }
    if (key === 'ArrowLeft') {
      return isRTL;
    }
    if (key === 'ArrowDown') {
      return true;
    }
    if (key === 'ArrowUp') {
      return false;
    }

    return true;
  }

  #navigate(delta: 1 | -1): void {
    const focusables = this.#getFocusableChildren();
    const currentIndex = focusables.findIndex(el => el === document.activeElement);

    if (currentIndex === -1) {
      // No focus, focus first element
      if (focusables.length > 0) {
        this.#focusElement(focusables[0]);
      }
      return;
    }

    let nextIndex = currentIndex + delta;

    if (this.#wrap) {
      // Wrap around
      if (nextIndex < 0) {
        nextIndex = focusables.length - 1;
      }
      if (nextIndex >= focusables.length) {
        nextIndex = 0;
      }
    } else {
      // Clamp to boundaries
      nextIndex = Math.max(0, Math.min(focusables.length - 1, nextIndex));

      // If we're at a boundary and can't move, just return
      if (nextIndex === currentIndex) {
        return;
      }
    }

    this.#focusElement(focusables[nextIndex]);
  }

  #handleHomeEnd(evt: KeyboardEvent): void {
    const focusables = this.#getFocusableChildren();
    if (!focusables.length) {
      return;
    }

    const targetIndex = evt.key === 'Home' ? 0 : focusables.length - 1;
    evt.preventDefault();
    this.#focusElement(focusables[targetIndex]);
  }

  #focusElement(el: HTMLElement): void {
    el.focus({ preventScroll: false });
    this.#updateRovingTabindex(el);

    // Update memory (unless disabled)
    if (!this.#noMemory) {
      this.#lastFocusedElement = el;
    }
  }

  #isEditingControl(el: HTMLElement): boolean {
    // Native editing elements
    const editingTags = ['INPUT', 'TEXTAREA', 'SELECT'];
    if (editingTags.includes(el.tagName)) {
      // Except for buttons and checkboxes/radios
      const type = (el as HTMLInputElement).type;
      if (['button', 'submit', 'reset', 'checkbox', 'radio'].includes(type)) {
        return false;
      }
      return true;
    }

    // Contenteditable
    if (el.isContentEditable) {
      return true;
    }

    // ARIA editing roles
    const editingRoles = ['textbox', 'searchbox', 'combobox'];
    const role = el.getAttribute('role');
    return editingRoles.includes(role || '');
  }

  // ============================================================================
  // Focus Management
  // ============================================================================

  #handleFocusIn(evt: FocusEvent): void {
    const target = evt.target as HTMLElement;
    const focusables = this.#getFocusableChildren();

    if (focusables.includes(target)) {
      if (!this.#noMemory) {
        this.#lastFocusedElement = target;
      }
      this.#updateRovingTabindex(target);
    }
  }

  #handleFocusOut(_evt: FocusEvent): void {
    // Memory persists until explicitly cleared
  }

  // ============================================================================
  // ARIA Roles & Attributes
  // ============================================================================

  #applyMinimumRole(): void {
    if (!this.#behavior || this.#host.hasAttribute('role')) {
      return;
    }

    const role = BEHAVIOR_ROLE_MAP[this.#behavior];
    setDefaultAria(this.#host, this.#hostInternals, { role });
  }

  #applyOrientation(): void {
    const supportsOrientation = ['tablist', 'toolbar', 'menubar', 'listbox'].includes(this.#behavior || '');

    if (supportsOrientation && !this.#host.hasAttribute('aria-orientation')) {
      const orientation = this.#direction === 'inline' ? 'horizontal' : this.#direction === 'block' ? 'vertical' : 'horizontal';

      setDefaultAria(this.#host, this.#hostInternals, { ariaOrientation: orientation });
    }
  }

  #applyChildRoles(): void {
    if (!this.#behavior) {
      return;
    }

    const childRole = BEHAVIOR_CHILD_ROLE_MAP[this.#behavior];
    if (!childRole) {
      return; // No inference for toolbar/grid
    }

    this.#focusableCache?.forEach(el => {
      // Skip elements with explicit roles
      if (el.hasAttribute('role')) {
        return;
      }

      // Skip elements with meaningful semantic HTML roles
      const implicitRole = this.#getImplicitRole(el);
      if (implicitRole) {
        return;
      }

      // Apply inferred role and mark it
      el.setAttribute('role', childRole);
      el.setAttribute('data-fg-inferred-role', 'true');
    });
  }

  #getImplicitRole(el: HTMLElement): string | null {
    const semanticRoles: Record<string, string> = {
      BUTTON: 'button',
      A: 'link',
      INPUT: 'textbox'
    };
    return semanticRoles[el.tagName] || null;
  }
}
