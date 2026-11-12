import { compile } from 'sass';
import { describe, expect, it } from 'vitest';

const compileStylesheet = path => compile(path, { loadPaths: ['node_modules'] }).css;
const light = compileStylesheet('src/lib/forge-radix.scss');
const dark = compileStylesheet('src/lib/forge-radix-dark.scss');
const defaultTheme = compileStylesheet('src/lib/forge.scss');

const getRule = (stylesheet, selector) => {
  const start = stylesheet.indexOf(`${selector} {`);
  return start === -1 ? '' : stylesheet.slice(start, stylesheet.indexOf('}', start));
};

describe('forge-radix stylesheets', () => {
  it('should set the radix theme tokens on the root element', () => {
    expect(light).toContain(':root {');
    expect(light).toContain('--forge-theme-control-bg:');
    expect(light).toContain('--forge-theme-primary-container-maximum:');
  });

  it('should set the radix typography values that differ from the default typography', () => {
    for (const stylesheet of [light, dark]) {
      expect(stylesheet).toContain('--forge-typography-heading1-font-weight: 600;');
      expect(stylesheet).toContain('--forge-typography-heading1-letter-spacing: 0em;');
      expect(stylesheet).toContain('--forge-typography-code1-font-family: var(--forge-typography-font-family-mono, "Cascadia Code", ui-monospace, monospace);');
    }
  });

  it('should not set typography values that match the default typography', () => {
    expect(light).not.toContain('--forge-typography-body1-font-weight:');
    expect(light).not.toContain('--forge-typography-heading1-font-family:');
  });

  it('should set component tokens for the radix theme', () => {
    expect(light).toContain('--forge-button-tonal-background: var(--forge-theme-secondary-container);');
    expect(light).toContain('--forge-field-background: var(--forge-theme-control-bg);');
  });

  it('should use dark values in the dark stylesheet', () => {
    expect(dark).not.toBe(light);
    expect(dark).toContain('--forge-theme-control-bg:');
    expect(dark).toContain('--forge-theme-brand: oklch(25.21% 0.0058 271.18deg);');
    expect(light).toContain('--forge-theme-brand: #283593;');
  });

  it('should scope surface overrides to elements with low specificity', () => {
    expect(light).toContain(':where(forge-card) {');
    expect(light).toContain(':where(forge-modal-drawer) {');
    expect(dark).toContain(':where(forge-popover) {');
  });

  it('should declare component tokens on both the root and the component elements', () => {
    expect(light).toMatch(/:root \{[^}]*--forge-toolbar-divider-color:/);
    expect(light).toMatch(/:where\(forge-toolbar\) \{[^}]*--forge-toolbar-divider-color:/);
  });

  it('should make toolbars inside cards, dialogs, and popovers transparent', () => {
    for (const stylesheet of [light, dark]) {
      expect(getRule(stylesheet, ':where(forge-card, forge-dialog, forge-popover)')).toContain('--forge-toolbar-background: transparent;');
    }
  });

  it('should set the toolbar background on the root only so containers can make it transparent', () => {
    for (const stylesheet of [light, dark]) {
      expect(getRule(stylesheet, ':root')).toContain('--forge-toolbar-background: var(--forge-theme-surface-elevated);');
      expect(getRule(stylesheet, ':where(forge-toolbar)')).not.toContain('--forge-toolbar-background');
      expect(stylesheet).not.toContain('--forge-toolbar-backdrop-filter');
    }
  });

  it('should use the translucent elevated surface for the card background', () => {
    expect(getRule(light, ':root')).toContain('--forge-card-background: var(--forge-theme-surface-elevated-translucent);');
  });

  it('should not set the card background on the card element so ancestors can override it', () => {
    expect(light).not.toMatch(/:where\(forge-card\) \{[^}]*--forge-card-background:/);
  });

  it('should set the default field outline tokens', () => {
    expect(light).toContain('--forge-field-default-outline-color: var(--forge-theme-outline);');
    expect(light).toContain('--forge-field-default-outline-color-hover: var(--forge-theme-outline-medium);');
  });

  it('should set the button text, link, and outlined colors for the default theme', () => {
    for (const stylesheet of [light, dark]) {
      expect(stylesheet).toContain('--forge-button-text-color: var(--forge-theme-on-primary-container-minimum);');
      expect(stylesheet).toContain('--forge-button-link-color: var(--forge-theme-on-primary-container-minimum);');
      expect(stylesheet).toContain('--forge-button-outlined-background: var(--forge-theme-primary-container-minimum);');
      expect(stylesheet).toContain('--forge-button-outlined-color: var(--forge-theme-on-primary-container-minimum);');
      expect(stylesheet).toContain('--forge-button-outlined-border-color: var(--forge-theme-border-primary-default);');
    }
  });

  it('should set the button colors for each button theme', () => {
    for (const stylesheet of [light, dark]) {
      for (const theme of ['secondary', 'tertiary', 'success', 'error', 'warning', 'info']) {
        const rule = getRule(stylesheet, `:where(forge-button[theme=${theme}])`);
        expect(rule).toContain(`--forge-button-text-color: var(--forge-theme-on-${theme}-container-minimum);`);
        expect(rule).toContain(`--forge-button-link-color: var(--forge-theme-on-${theme}-container-minimum);`);
        expect(rule).toContain(`--forge-button-outlined-background: var(--forge-theme-${theme}-container-minimum);`);
        expect(rule).toContain(`--forge-button-outlined-color: var(--forge-theme-on-${theme}-container-minimum);`);
        expect(rule).toContain(`--forge-button-outlined-border-color: var(--forge-theme-border-${theme}-default);`);
      }
    }
  });

  it('should keep outlined app bar buttons transparent', () => {
    expect(getRule(light, ':where(forge-button[theme=app-bar])')).toContain('--forge-button-outlined-background: transparent;');
  });

  it('should set the focus indicator color from the theme for interactive components', () => {
    for (const stylesheet of [light, dark]) {
      expect(stylesheet).toMatch(/:root \{[^}]*--forge-focus-indicator-color: var\(--forge-theme-focus-indicator\);/);
      expect(stylesheet).toContain('--forge-button-area-focus-indicator-color: var(--forge-theme-focus-indicator);');
      expect(stylesheet).toContain('--forge-button-toggle-focus-indicator-color: var(--forge-theme-focus-indicator);');
      expect(stylesheet).toContain('--forge-icon-button-focus-indicator-color: var(--forge-theme-focus-indicator);');
      expect(stylesheet).toContain('--forge-skip-link-focus-indicator-color: var(--forge-theme-focus-indicator);');
    }
  });

  it('should not override the focus indicator color on focus indicator elements', () => {
    expect(light).not.toMatch(/:where\(forge-focus-indicator\)/);
  });

  it('should set the button toggle group outline color', () => {
    expect(light).toContain('--forge-button-toggle-group-outline-color: var(--forge-theme-outline);');
  });

  it('should set the icon button toggle and outlined colors', () => {
    for (const stylesheet of [light, dark]) {
      expect(stylesheet).toContain('--forge-icon-button-filled-toggle-icon-color: var(--forge-theme-on-primary-container-minimum);');
      expect(stylesheet).toContain('--forge-icon-button-outlined-border-color: var(--forge-theme-border-neutral-default);');
      expect(stylesheet).toContain('--forge-icon-button-toggle-on-icon-color: var(--forge-theme-on-primary-container);');
      const rule = getRule(stylesheet, ':where(forge-icon-button[theme=error])');
      expect(rule).toContain('--forge-icon-button-toggle-on-icon-color: var(--forge-theme-on-error-container);');
      expect(rule).toContain('--forge-icon-button-tonal-toggle-on-icon-color: var(--forge-theme-on-error-container);');
      expect(rule).toContain('--forge-icon-button-outlined-border-color: var(--forge-theme-border-error-default);');
    }
  });

  it('should set the chip colors for the default theme and invalid state', () => {
    for (const stylesheet of [light, dark]) {
      expect(stylesheet).toContain('--forge-chip-color: var(--forge-theme-on-primary-container-minimum);');
      expect(stylesheet).toContain('--forge-chip-focus-indicator-color: var(--forge-theme-focus-indicator);');
      expect(stylesheet).toContain('--forge-chip-border-color: var(--forge-theme-outline-low);');
      expect(stylesheet).toContain('--forge-chip-selected-background: var(--forge-theme-primary-container);');
      expect(stylesheet).toContain('--forge-chip-selected-color: var(--forge-theme-on-primary-container);');
      expect(stylesheet).toContain('--forge-chip-invalid-color: var(--forge-theme-on-error-container-minimum);');
      expect(stylesheet).toContain('--forge-chip-invalid-selected-background: var(--forge-theme-error-container);');
      expect(stylesheet).toContain('--forge-chip-invalid-selected-color: var(--forge-theme-on-error-container);');
    }
  });

  it('should set the chip colors for each chip theme except field chips', () => {
    for (const stylesheet of [light, dark]) {
      for (const theme of ['secondary', 'tertiary', 'success', 'warning', 'error', 'info']) {
        const rule = getRule(stylesheet, `:where(forge-chip[theme=${theme}]:not([type=field]))`);
        expect(rule).toContain(`--forge-chip-color: var(--forge-theme-on-${theme}-container-minimum);`);
        const selectedRule = getRule(stylesheet, `:where(forge-chip[theme=${theme}][selected]:not([type=field]))`);
        expect(selectedRule).toContain(`--forge-chip-background: var(--forge-theme-${theme}-container);`);
        expect(selectedRule).toContain(`--forge-chip-color: var(--forge-theme-on-${theme}-container);`);
      }
    }
  });

  it('should set the surface and border colors of overlays and dividers', () => {
    for (const stylesheet of [light, dark]) {
      expect(getRule(stylesheet, ':where(forge-dialog)')).toContain('--forge-dialog-background: var(--forge-theme-surface-elevated);');
      expect(getRule(stylesheet, ':where(forge-popover)')).toContain('--forge-popover-border-color: var(--forge-theme-outline-low);');
      expect(getRule(stylesheet, ':where(forge-divider)')).toContain('--forge-divider-color: var(--forge-theme-outline-low);');
      expect(getRule(stylesheet, ':where(forge-kbd)')).toContain('--forge-kbd-border-color: var(--forge-theme-outline-low);');
      expect(getRule(stylesheet, ':where(forge-tooltip)')).toContain('--forge-tooltip-border-color: var(--forge-theme-outline-low);');
      expect(getRule(stylesheet, ':where(forge-toolbar)')).toContain('--forge-toolbar-divider-color: var(--forge-theme-outline-low);');
      expect(getRule(stylesheet, ':where(forge-drawer)')).toContain('--forge-drawer-border-color: var(--forge-theme-outline-low);');
    }
  });

  it('should set the toast action color in both themes', () => {
    for (const stylesheet of [light, dark]) {
      expect(stylesheet).toContain('--forge-toast-action-color: var(--forge-theme-on-surface-inverse-secondary);');
    }
  });

  it('should not override the switch off handle color and should use the subtle field chip border in dark', () => {
    for (const stylesheet of [light, dark]) {
      expect(stylesheet).not.toContain('--forge-switch-handle-off-color');
    }
    expect(dark).toContain('--forge-chip-field-border-color: var(--forge-theme-outline-low');
  });

  it('should set the tonal field background', () => {
    for (const stylesheet of [light, dark]) {
      expect(getRule(stylesheet, ':where(forge-field, forge-text-field, forge-select, forge-chip-field)')).toContain(
        '--forge-field-tonal-background: var(--forge-theme-control-bg-tonal);'
      );
    }
  });

  it('should set the selected color of list items and options', () => {
    for (const stylesheet of [light, dark]) {
      expect(getRule(stylesheet, ':where(forge-list-item)')).toContain('--forge-list-item-selected-color: var(--forge-theme-on-primary-container-minimum);');
      expect(getRule(stylesheet, ':where(forge-option)')).toContain('--forge-option-selected-color: var(--forge-theme-on-primary-container-minimum);');
    }
  });

  it('should set navigation divider and line colors', () => {
    for (const stylesheet of [light, dark]) {
      expect(getRule(stylesheet, ':where(forge-tab-bar)')).toContain('--forge-tab-bar-divider-color: var(--forge-theme-outline-low);');
      expect(getRule(stylesheet, ':where(forge-tab-bar)')).toContain('--forge-tab-bar-overflow-divider-color: var(--forge-theme-outline-low);');
      expect(getRule(stylesheet, ':where(forge-tree-item)')).toContain('--forge-tree-item-indent-line-color: var(--forge-theme-outline-low);');
      expect(getRule(stylesheet, ':where(forge-timeline-break)')).toContain('--forge-timeline-break-color: var(--forge-theme-outline-low);');
      expect(getRule(stylesheet, ':where(forge-timeline-item)')).toContain('--forge-timeline-item-line-color: var(--forge-theme-outline-low);');
      expect(getRule(stylesheet, ':where(forge-step)')).toContain('--forge-step-line-color: var(--forge-theme-outline-low);');
    }
  });

  it('should resolve the active tab and indicator colors on each tab so app bar tab bars use the app bar colors', () => {
    expect(getRule(light, ':where(forge-tab)')).toContain('--forge-tab-active-color: var(--forge-theme-text-high);');
    expect(getRule(light, ':root')).not.toContain('--forge-tab-active-color');
    expect(getRule(light, ':where(forge-tab)')).toContain('--forge-tab-indicator-color: var(--forge-theme-on-primary-container-minimum);');
  });

  it('should resolve the primary text color from the foreground inside an app bar', () => {
    for (const stylesheet of [light, dark]) {
      expect(getRule(stylesheet, ':where(forge-app-bar, forge-app-bar > *, .forge-app-bar)')).toContain(
        '--forge-theme-on-primary-container-minimum: var(--forge-theme-primary);'
      );
    }
  });

  it('should make the calendar menu transparent so it matches the surface behind it', () => {
    for (const stylesheet of [light, dark]) {
      expect(getRule(stylesheet, ':root')).toContain('--forge-calendar-menu-background: transparent;');
    }
    expect(defaultTheme).not.toContain('--forge-calendar-menu-background: transparent');
  });

  it('should set the border colors of tables, split view handles, scrollable dialogs, and calendar menus', () => {
    for (const stylesheet of [light, dark]) {
      expect(getRule(stylesheet, ':where(forge-table)')).toContain('--forge-table-theme-border-color: var(--forge-theme-outline-low);');
      expect(getRule(stylesheet, ':where(forge-split-view-panel)')).toContain('--forge-split-view-handle-color: var(--forge-theme-outline-low);');
      expect(getRule(stylesheet, ':where(forge-calendar-menu)')).toContain('--forge-calendar-menu-border-color: var(--forge-theme-outline-low);');
      expect(getRule(stylesheet, ':root')).toContain('--forge-dialog-scrollable-border-color: var(--forge-theme-outline-low);');
    }
  });

  it('should set the calendar today color and the popup event stroke', () => {
    for (const stylesheet of [light, dark]) {
      expect(getRule(stylesheet, ':where(forge-calendar)')).toContain('--forge-calendar-theme-today-color: var(--forge-theme-on-primary-container-minimum);');
      expect(getRule(stylesheet, ':where(forge-calendar[forge-popover-context=true])')).toContain(
        '--forge-calendar-event-stroke-color: var(--forge-theme-surface-elevated);'
      );
    }
  });

  it('should only change the count card outline for the secondary info state', () => {
    for (const stylesheet of [light, dark]) {
      expect(getRule(stylesheet, ':where(forge-count-card:state(info-secondary))')).toContain('--forge-card-outline-color: var(--forge-theme-outline-low);');
      expect(stylesheet).not.toContain(':where(forge-count-card) {');
    }
  });

  it('should not re-point theme tokens on container elements', () => {
    for (const element of ['forge-table', 'forge-split-view-panel', 'forge-calendar', 'forge-calendar-menu', 'forge-count-card']) {
      expect(light).not.toMatch(new RegExp(`:where\\(${element}[^)]*\\) \\{[^}]*\\n\\s*--forge-theme-[a-z-]+:`));
    }
  });

  it('should set the icon color for each icon theme and leave the neutral themes alone', () => {
    for (const stylesheet of [light, dark]) {
      for (const theme of ['primary', 'secondary', 'tertiary', 'success', 'error', 'warning']) {
        expect(getRule(stylesheet, `:where(forge-icon[theme=${theme}])`)).toContain(`--forge-icon-color: var(--forge-theme-on-${theme}-container-minimum);`);
      }
      expect(stylesheet).not.toContain(':where(forge-icon[theme=text-medium])');
      expect(stylesheet).not.toContain(':where(forge-icon[theme=info])');
    }
  });

  it('should keep the app bar outline colors for CSS-only fields inside an app bar', () => {
    for (const stylesheet of [light, dark]) {
      expect(getRule(stylesheet, ':where(.forge-field)')).toContain('--forge-field-default-outline-color:');
      expect(getRule(stylesheet, ':where(:is(forge-app-bar, .forge-app-bar) .forge-field)')).toContain(
        '--forge-field-default-outline-color: var(--forge-theme-outline-low'
      );
    }
  });

  it('should set the dark app bar edge as a hairline only in the dark theme', () => {
    expect(dark).toMatch(/--forge-app-bar-elevation: inset 0 -1px 0 var\(--forge-theme-outline-low[,)]/);
    expect(light).not.toContain('--forge-app-bar-elevation');
  });

  it('should set the color picker edge and thumb styling', () => {
    for (const stylesheet of [light, dark]) {
      expect(stylesheet).toContain('--forge-color-picker-preview-ring-shadow: inset 0 0 0 1px var(--forge-theme-outline);');
      expect(stylesheet).toContain('--forge-color-picker-gradient-thumb-size: 12px;');
      expect(stylesheet).toContain('--forge-color-picker-input-focus-color: var(--forge-theme-focus-indicator);');
    }
    expect(defaultTheme).not.toContain('--forge-color-picker-');
  });

  it('should set the readonly field colors', () => {
    for (const stylesheet of [light, dark]) {
      expect(stylesheet).toContain('--forge-field-readonly-background: var(--forge-theme-surface-transparent);');
      expect(stylesheet).toContain('--forge-field-readonly-outline-color: var(--forge-theme-outline-low);');
      expect(getRule(stylesheet, ':where(forge-field, forge-text-field, forge-select, forge-chip-field)')).toContain('--forge-field-readonly-outline-color:');
    }
    expect(defaultTheme).not.toContain('--forge-field-readonly-');
  });

  it('should set the raised card outline', () => {
    for (const stylesheet of [light, dark]) {
      const rule = getRule(stylesheet, ':where(forge-card)');
      expect(rule).toContain('--forge-card-raised-outline-width: var(--forge-border-thin');
      expect(rule).toContain('--forge-card-raised-outline-color: var(--forge-theme-surface-elevated-ring);');
    }
  });

  it('should draw the popover edge as a ring instead of a border', () => {
    for (const stylesheet of [light, dark]) {
      const rule = getRule(stylesheet, ':where(forge-popover)');
      expect(rule).toContain('--forge-popover-ring-width: var(--forge-border-thin');
      expect(rule).toContain('--forge-popover-ring-color: var(--forge-theme-surface-elevated-ring);');
      expect(rule).toContain('--forge-popover-arrow-border-width: 0px;');
      expect(stylesheet).not.toContain('--forge-popover-border-width:');
    }
    expect(defaultTheme).not.toContain('--forge-popover-ring-color:');
  });

  it('should draw the dialog edge as a ring through the elevation tokens', () => {
    for (const stylesheet of [light, dark]) {
      const rule = getRule(stylesheet, ':where(forge-dialog)');
      expect(rule).toMatch(/--forge-dialog-elevation: 0 0 0 var\(--forge-border-thin[^)]*\) var\(--forge-theme-surface-elevated-ring\), 0px 11px 15px -7px/);
      expect(rule).toMatch(
        /--forge-dialog-nonmodal-elevation: 0 0 0 var\(--forge-border-thin[^)]*\) var\(--forge-theme-surface-elevated-ring\), 0px 2px 4px -1px/
      );
    }
  });

  it('should draw the modal drawer edge as a ring without a border', () => {
    for (const stylesheet of [light, dark]) {
      const rule = getRule(stylesheet, ':where(forge-modal-drawer)');
      expect(rule).toMatch(
        /--forge-modal-drawer-elevation: 0 0 0 var\(--forge-border-thin[^)]*\) var\(--forge-theme-surface-elevated-ring\), 0px 11px 15px -7px/
      );
      expect(rule).toContain('--forge-drawer-border-width: 0;');
      expect(getRule(stylesheet, ':root')).not.toContain('--forge-drawer-border-width');
    }
  });

  it('should set the stepper label colors', () => {
    for (const stylesheet of [light, dark]) {
      expect(getRule(stylesheet, ':where(forge-step)')).toContain('--forge-step-selected-label-color: var(--forge-theme-on-primary-container-minimum);');
      expect(getRule(stylesheet, ':where(forge-step)')).toContain('--forge-step-error-label-color: var(--forge-theme-text-critical);');
      expect(getRule(stylesheet, ':root')).toContain('--forge-step-error-label-color: var(--forge-theme-text-critical);');
    }
  });

  it('should set the toast focus indicator color from the toast text color', () => {
    for (const stylesheet of [light, dark]) {
      expect(getRule(stylesheet, ':where(forge-toast)')).toContain('--forge-toast-focus-indicator-color: var(--forge-theme-on-surface-inverse);');
      for (const theme of ['primary', 'secondary', 'tertiary', 'success', 'warning', 'error', 'info']) {
        expect(getRule(stylesheet, `:where(forge-toast[theme=${theme}])`)).toContain(`--forge-toast-focus-indicator-color: var(--forge-theme-on-${theme});`);
      }
    }
  });

  it('should set the outlined icon button icon color without affecting toggled on or disabled buttons', () => {
    for (const stylesheet of [light, dark]) {
      const guard = ':not([disabled], :state(toggle):state(pressed))';
      expect(getRule(stylesheet, `:where(forge-icon-button[variant=outlined]${guard})`)).toContain(
        '--forge-icon-button-icon-color: var(--forge-theme-text-medium);'
      );
      for (const theme of ['primary', 'secondary', 'tertiary', 'success', 'error', 'warning', 'info']) {
        expect(getRule(stylesheet, `:where(forge-icon-button[variant=outlined][theme=${theme}]${guard})`)).toContain(
          `--forge-icon-button-icon-color: var(--forge-theme-on-${theme}-container-minimum);`
        );
      }
      expect(getRule(stylesheet, ':root')).not.toContain('--forge-icon-button-icon-color');
    }
  });

  it('should map legacy and semantic badge themes without touching strong badges', () => {
    const notStrong = ':not([strong], :state(strong))';
    for (const stylesheet of [light, dark]) {
      expect(getRule(stylesheet, `:where(forge-badge${notStrong}, .forge-badge)`)).toContain(
        '--forge-badge-background: var(--forge-theme-bg-neutral-default);'
      );
      expect(getRule(stylesheet, `:where(forge-badge${notStrong}, .forge-badge)`)).toContain('--forge-badge-color: var(--forge-theme-text-medium);');
      const themed = {
        ':is([theme=info], [theme=info-primary])': 'info',
        '[theme=success]': 'success',
        '[theme=warning]': 'warning',
        ':is([theme=error], [theme=critical], [theme=danger])': 'error'
      };
      for (const [selector, role] of Object.entries(themed)) {
        const rule = getRule(stylesheet, `:where(forge-badge${notStrong}${selector})`);
        expect(rule).toContain(`--forge-badge-background: var(--forge-theme-bg-${role}-default);`);
        expect(rule).toContain(`--forge-badge-color: var(--forge-theme-on-${role}-container-low);`);
      }
      expect(getRule(stylesheet, ':where(forge-badge)')).toContain('--forge-badge-font-weight: var(--forge-typography-badge-font-weight);');
      expect(getRule(stylesheet, ':root')).not.toContain('--forge-badge-background');
    }
  });

  it('should map the badge outlined variant and the strong role colors', () => {
    const notStrong = ':not([strong], :state(strong))';
    for (const stylesheet of [light, dark]) {
      const neutral = getRule(stylesheet, `:where(forge-badge${notStrong}, .forge-badge)`);
      expect(neutral).toContain('--forge-badge-outlined-background: var(--forge-theme-bg-neutral-subtle);');
      expect(neutral).toContain('--forge-badge-outlined-border-color: var(--forge-theme-border-neutral-subtle);');
      expect(getRule(stylesheet, ':where(forge-badge:is([strong], :state(strong))[theme=success])')).toContain(
        '--forge-badge-background: var(--forge-color-green-solid);'
      );
    }
    expect(defaultTheme).not.toContain('--forge-color-green-solid');
  });

  it('should set the banner geometry and the outlined variant colors', () => {
    for (const stylesheet of [light, dark]) {
      const banner = getRule(stylesheet, ':where(forge-banner, .forge-banner)');
      expect(banner).toContain('--forge-banner-min-height: 56px;');
      expect(banner).toContain('--forge-banner-outlined-background: var(--forge-theme-bg-info-subtle);');
      expect(getRule(stylesheet, ':where(forge-inline-message, .forge-inline-message)')).toContain(
        '--forge-inline-message-outlined-border-color: var(--forge-theme-border-info-subtle);'
      );
    }
    expect(defaultTheme).not.toContain('--forge-banner-min-height: 56px');
  });

  it('should map legacy and semantic banner and inline message themes', () => {
    const neutral = ':is([theme=default], [theme=primary], [theme=secondary], [theme=tertiary], [theme=info-secondary])';
    const roles = { '[theme=success]': 'success', '[theme=warning]': 'warning', ':is([theme=error], [theme=critical], [theme=danger])': 'error' };
    for (const stylesheet of [light, dark]) {
      expect(getRule(stylesheet, ':where(forge-banner, .forge-banner)')).toContain('--forge-banner-background: var(--forge-theme-bg-info-default);');
      expect(getRule(stylesheet, `:where(forge-banner${neutral})`)).toContain('--forge-banner-background: var(--forge-theme-bg-neutral-default);');
      expect(getRule(stylesheet, `:where(forge-banner${neutral})`)).toContain('--forge-banner-icon-color: var(--forge-theme-text-medium);');
      expect(getRule(stylesheet, ':where(forge-inline-message, .forge-inline-message)')).toContain(
        '--forge-inline-message-border-color: var(--forge-theme-border-info-default);'
      );
      expect(getRule(stylesheet, `:where(forge-inline-message${neutral})`)).toContain(
        '--forge-inline-message-border-color: var(--forge-theme-border-neutral-default);'
      );
      for (const [selector, role] of Object.entries(roles)) {
        const banner = getRule(stylesheet, `:where(forge-banner${selector})`);
        expect(banner).toContain(`--forge-banner-background: var(--forge-theme-bg-${role}-default);`);
        expect(banner).toContain(`--forge-banner-color: var(--forge-theme-on-${role}-container-low);`);
        expect(banner).toContain(`--forge-banner-icon-color: var(--forge-theme-on-${role}-container-low);`);
        const message = getRule(stylesheet, `:where(forge-inline-message${selector})`);
        expect(message).toContain(`--forge-inline-message-background: var(--forge-theme-bg-${role}-default);`);
        expect(message).toContain(`--forge-inline-message-border-color: var(--forge-theme-border-${role}-default);`);
        expect(message).toContain(`--forge-inline-message-icon-color: var(--forge-theme-on-${role}-container-low);`);
      }
      expect(getRule(stylesheet, ':root')).not.toContain('--forge-banner-');
      expect(getRule(stylesheet, ':root')).not.toContain('--forge-inline-message-');
    }
  });

  it('should set the themed icon button icon colors for the icon, filled, and raised variants', () => {
    for (const stylesheet of [light, dark]) {
      for (const theme of ['primary', 'secondary', 'tertiary']) {
        expect(getRule(stylesheet, `:where(forge-icon-button[variant=icon][theme=${theme}]:not(:state(toggle)))`)).toContain(
          '--forge-icon-button-icon-color: var(--forge-theme-text-high);'
        );
      }
      for (const theme of ['success', 'error', 'warning', 'info']) {
        expect(getRule(stylesheet, `:where(forge-icon-button[variant=icon][theme=${theme}]:not(:state(toggle)))`)).toContain(
          `--forge-icon-button-icon-color: var(--forge-theme-on-${theme}-container-minimum);`
        );
      }
      expect(stylesheet).toContain(':where(forge-icon-button[variant=filled][theme=success]:not(:state(toggle))),');
      const rule = getRule(stylesheet, ':where(forge-icon-button[variant=raised][theme=success]:not(:state(toggle)))');
      expect(rule).toContain('--forge-icon-button-icon-color: var(--forge-theme-on-success-container);');
      expect(rule).toContain('--forge-icon-button-background-color: var(--forge-theme-success-container);');
      expect(stylesheet).not.toContain('forge-icon-button[variant=filled][theme=primary]');
    }
  });

  it('should tint the chip border and keep the tint off field chips', () => {
    for (const stylesheet of [light, dark]) {
      const rule = getRule(stylesheet, ':where(forge-chip, .forge-chip)');
      expect(rule).toContain('--forge-chip-border-tint: var(--forge-theme-primary-container-low);');
      expect(rule).toContain('--forge-chip-invalid-border-tint: var(--forge-theme-error-container-low);');
      expect(getRule(stylesheet, ':where(forge-chip[type=field])')).toContain('--forge-chip-border-tint: transparent;');
      expect(getRule(stylesheet, ':root')).not.toContain('--forge-chip-border-tint');
      for (const theme of ['secondary', 'tertiary', 'success', 'warning', 'error', 'info']) {
        expect(getRule(stylesheet, `:where(forge-chip[theme=${theme}])`)).toContain(`--forge-chip-border-tint: var(--forge-theme-${theme}-container-low);`);
      }
    }
  });

  it('should not emit global keyframes', () => {
    expect(light).not.toContain('@keyframes');
  });

  it('should provide the dark overrides without relying on the default dark stylesheet', () => {
    expect(dark).not.toContain('--forge-popover-border-width:');
    expect(dark).toContain('--forge-toast-action-color:');
    expect(dark).not.toContain('--forge-tooltip-background:');
    expect(dark).not.toContain('--forge-tooltip-border-width:');
  });

  it('should not change the default theme', () => {
    expect(defaultTheme).not.toContain('--forge-theme-control-bg');
    expect(defaultTheme).not.toContain('--forge-theme-secondary-container-highest');
  });
});
