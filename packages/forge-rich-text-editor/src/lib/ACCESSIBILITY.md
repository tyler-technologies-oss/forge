# Rich Text Editor - Accessibility Documentation

**WCAG Compliance:** Level AA (WCAG 2.1)  
**Last Updated:** June 2026  
**Status:** Production Ready

---

## Table of Contents

- [Overview](#overview)
- [WCAG 2.1 Level AA Compliance](#wcag-21-level-aa-compliance)
- [Keyboard Navigation](#keyboard-navigation)
- [Screen Reader Support](#screen-reader-support)
- [ARIA Implementation](#aria-implementation)
- [Focus Management](#focus-management)
- [Semantic HTML](#semantic-html)
- [Color and Contrast](#color-and-contrast)
- [Testing Guidelines](#testing-guidelines)
- [Best Practices for Developers](#best-practices-for-developers)
- [Known Limitations](#known-limitations)

---

## Overview

The Rich Text Editor component is designed to meet **WCAG 2.1 Level AA** compliance standards. This document provides comprehensive information about the accessibility features, implementation details, and testing guidelines.

### Key Accessibility Features

- ✅ Full keyboard navigation without mouse dependency
- ✅ Comprehensive screen reader support with live announcements
- ✅ Proper ARIA semantics throughout
- ✅ Clear focus indicators on all interactive elements
- ✅ Semantic HTML structure
- ✅ No keyboard traps
- ✅ Customizable labels for internationalization
- ✅ High contrast mode support

---

## WCAG 2.1 Level AA Compliance

The editor meets the following WCAG 2.1 Level AA success criteria:

### Perceivable

- **1.3.1 Info and Relationships (Level A)**: Semantic HTML and ARIA roles convey structure
- **1.4.3 Contrast (Minimum) (Level AA)**: Uses Forge theme tokens with sufficient contrast ratios
- **1.4.11 Non-text Contrast (Level AA)**: Focus indicators and UI components meet contrast requirements

### Operable

- **2.1.1 Keyboard (Level A)**: All functionality available via keyboard
- **2.1.2 No Keyboard Trap (Level A)**: Users can navigate away from all components
- **2.4.3 Focus Order (Level A)**: Logical focus order through toolbar and content
- **2.4.7 Focus Visible (Level AA)**: Clear focus indicators on all interactive elements
- **2.5.3 Label in Name (Level A)**: Button labels match their accessible names

### Understandable

- **3.2.1 On Focus (Level A)**: No unexpected context changes on focus
- **3.2.2 On Input (Level A)**: No unexpected context changes on input
- **3.3.1 Error Identification (Level A)**: Validation errors clearly identified
- **3.3.2 Labels or Instructions (Level A)**: All controls have descriptive labels
- **3.3.3 Error Suggestion (Level AA)**: Error messages provide guidance

### Robust

- **4.1.2 Name, Role, Value (Level A)**: All UI components properly exposed to assistive technology
- **4.1.3 Status Messages (Level AA)**: ARIA live regions announce important updates

---

## Keyboard Navigation

All editor functionality is accessible via keyboard without requiring a mouse.

### Navigation Shortcuts

| Shortcut           | Action                                      |
| ------------------ | ------------------------------------------- |
| `Tab`              | Move to next toolbar button or content area |
| `Shift+Tab`        | Move to previous element                    |
| `Enter` or `Space` | Activate focused toolbar button             |
| `Escape`           | Close link popover                          |

### Text Formatting Shortcuts

| Windows/Linux  | macOS         | Action                 |
| -------------- | ------------- | ---------------------- |
| `Ctrl+B`       | `Cmd+B`       | Toggle bold            |
| `Ctrl+I`       | `Cmd+I`       | Toggle italic          |
| `Ctrl+U`       | `Cmd+U`       | Toggle underline       |
| `Ctrl+Shift+X` | `Cmd+Shift+X` | Toggle strikethrough   |
| `Ctrl+E`       | `Cmd+E`       | Toggle code formatting |

### Heading Shortcuts

| Windows/Linux | macOS       | Action               |
| ------------- | ----------- | -------------------- |
| `Ctrl+Alt+1`  | `Cmd+Alt+1` | Apply Heading 1      |
| `Ctrl+Alt+2`  | `Cmd+Alt+2` | Apply Heading 2      |
| `Ctrl+Alt+3`  | `Cmd+Alt+3` | Apply Heading 3      |
| `Ctrl+Alt+0`  | `Cmd+Alt+0` | Convert to paragraph |

### List Shortcuts

| Windows/Linux  | macOS         | Action               |
| -------------- | ------------- | -------------------- |
| `Ctrl+Shift+8` | `Cmd+Shift+8` | Toggle bullet list   |
| `Ctrl+Shift+7` | `Cmd+Shift+7` | Toggle numbered list |

### History Shortcuts

| Windows/Linux              | macOS                    | Action |
| -------------------------- | ------------------------ | ------ |
| `Ctrl+Z`                   | `Cmd+Z`                  | Undo   |
| `Ctrl+Shift+Z` or `Ctrl+Y` | `Cmd+Shift+Z` or `Cmd+Y` | Redo   |

### Paste Shortcuts

| Windows/Linux  | macOS         | Action              |
| -------------- | ------------- | ------------------- |
| `Ctrl+V`       | `Cmd+V`       | Paste (with format) |
| `Ctrl+Shift+V` | `Cmd+Shift+V` | Paste (plain text)  |

---

## Screen Reader Support

The editor provides comprehensive screen reader support with live announcements for all formatting actions and state changes.

### Supported Screen Readers

Tested and verified with:

- **NVDA** (Windows)
- **JAWS** (Windows)
- **VoiceOver** (macOS)
- **TalkBack** (Android, mobile web)
- **VoiceOver** (iOS, mobile web)

### Formatting Announcements

When users apply formatting through toolbar buttons or keyboard shortcuts, the editor announces:

- **Text Formatting**: "Bold applied", "Italic removed", "Underline applied", "Strikethrough applied", "Code formatting applied"
- **Headings**: "Heading 1 applied", "Heading 2 applied", "Heading 3 applied", "Paragraph style applied"
- **Lists**: "Bullet list applied", "Numbered list applied", "List removed"
- **Alignment**: "Left aligned", "Center aligned", "Right aligned", "Justified"
- **Links**: "Link added", "Link removed"
- **History**: "Undo", "Redo"

### State Announcements

The editor announces important state changes:

- **Disabled State**: "Editor disabled" when the editor becomes disabled
- **Enabled State**: "Editor enabled" when the editor is re-enabled
- **Read-Only State**: "Editor read-only" when set to readonly mode
- **Editable State**: "Editor editable" when readonly mode is removed

### Technical Implementation

- **ARIA Live Regions**: Uses `aria-live="polite"` to avoid interrupting screen reader output
- **Atomic Updates**: `aria-atomic="true"` ensures complete messages are read
- **Auto-Cleanup**: Announcements clear after 1 second to prevent clutter
- **Non-Interrupting**: Uses "polite" politeness level for all announcements
- **Screen-Reader-Only Content**: Uses `.sr-only` CSS class for visually hidden but screen-reader-accessible text

---

## ARIA Implementation

The editor implements comprehensive ARIA semantics for assistive technology.

### Toolbar

```html
<div
  role="toolbar"
  aria-label="Rich text formatting toolbar"
  aria-orientation="horizontal"
  aria-controls="forge-rte-content">
  <!-- Toolbar buttons -->
</div>
```

**Attributes:**

- `role="toolbar"` - Identifies the toolbar widget pattern
- `aria-label` - Descriptive label for the toolbar
- `aria-orientation="horizontal"` - Indicates horizontal button layout
- `aria-controls` - References the content area ID

### Toolbar Buttons

```html
<button aria-label="Bold" aria-pressed="false" aria-keyshortcuts="Control+B" aria-controls="forge-rte-content">
  <!-- Button content -->
</button>
```

**Attributes:**

- `aria-label` - Descriptive label (customizable via properties)
- `aria-pressed` - Toggle state (true when formatting is active)
- `aria-keyshortcuts` - Documents keyboard shortcuts
- `aria-controls` - References the content area ID

### Content Area

```html
<div
  id="forge-rte-content"
  role="textbox"
  aria-multiline="true"
  aria-label="Editor content"
  aria-readonly="false"
  aria-disabled="false"
  contenteditable="true">
  <!-- Editor content -->
</div>
```

**Attributes:**

- `role="textbox"` - Identifies the editable text area
- `aria-multiline="true"` - Indicates multi-line text input
- `aria-label` - Descriptive label for the content area
- `aria-readonly` - Set to "true" when in readonly mode
- `aria-disabled` - Set to "true" when disabled

### Link Popover

```html
<input type="url" aria-label="Link URL" aria-invalid="false" aria-describedby="link-error" />
<!-- Error message -->
<div id="link-error" role="alert">Invalid URL format</div>
```

**Attributes:**

- `aria-invalid` - Set to "true" when URL validation fails
- `aria-describedby` - References error message for context
- `role="alert"` - Error messages announced to screen readers

### ARIA Live Region

```html
<div class="sr-only" role="status" aria-live="polite" aria-atomic="true">
  <!-- Announcement text -->
</div>
```

**Attributes:**

- `role="status"` - Status updates
- `aria-live="polite"` - Non-interrupting announcements
- `aria-atomic="true"` - Complete message read together

---

## Focus Management

The editor implements comprehensive focus management to ensure keyboard users can navigate efficiently.

### Focus Indicators

- **Visibility**: Clear, visible focus indicators on all interactive elements
- **Contrast**: Focus indicators meet WCAG AA contrast requirements (provided by Forge components)
- **Width**: Medium width (2px) for visibility
- **Color**: Primary theme color for consistency

### Focus Order

Logical focus order through components:

1. **Toolbar buttons** (left to right)
2. **Content area**
3. **Footer elements** (character count, validation messages)

### Focus Behavior

- **Toolbar Actions**: Focus returns to editor content after formatting actions
- **Popover**: Input field receives automatic focus when popover opens
- **Text Selection**: Input text auto-selects for easy editing
- **No Traps**: Users can always Tab out of the editor
- **Skip Navigation**: Toolbar can be skipped with Tab navigation

### Focus States

- **Default**: Clear outline on focused element
- **Disabled**: Toolbar buttons not focusable when editor is disabled
- **Readonly**: Toolbar buttons not focusable when editor is readonly
- **Active**: Active formatting buttons show both focus and pressed states

---

## Semantic HTML

The editor uses proper semantic HTML elements to ensure meaningful structure without CSS.

### Heading Elements

```html
<h1>Heading 1 content</h1>
<h2>Heading 2 content</h2>
<h3>Heading 3 content</h3>
```

- Proper heading hierarchy for screen reader navigation
- Headings can be navigated via screen reader heading shortcuts

### List Elements

```html
<ul>
  <li>Bullet list item</li>
</ul>

<ol>
  <li>Numbered list item</li>
</ol>
```

- Semantic list elements announce item count and position
- Nested lists maintain proper structure

### Link Elements

```html
<a href="https://example.com" target="_blank" rel="noopener noreferrer nofollow"> Link text </a>
```

- Semantic anchor elements with proper href attributes
- Security attributes for external links
- Link text is descriptive (not "click here")

### Paragraph and Text Elements

```html
<p>Paragraph text with <strong>bold</strong> and <em>italic</em> formatting</p>
```

- Paragraphs use `<p>` elements
- Bold uses `<strong>` for semantic emphasis
- Italic uses `<em>` for semantic emphasis
- Underline uses `<u>` element
- Strikethrough uses `<s>` element
- Code uses `<code>` element

---

## Color and Contrast

The editor uses Forge design tokens to ensure sufficient color contrast.

### Contrast Ratios

All text and interactive elements meet WCAG AA contrast requirements:

- **Normal text**: Minimum 4.5:1 contrast ratio
- **Large text**: Minimum 3:1 contrast ratio
- **UI components**: Minimum 3:1 contrast ratio
- **Focus indicators**: Minimum 3:1 contrast ratio

### Theme Support

The editor respects Forge theme settings:

- **Light theme**: Default light background with dark text
- **Dark theme**: Dark background with light text
- **High contrast**: Increased contrast for better visibility
- **Custom themes**: Inherits custom theme colors and maintains contrast

### Color Independence

The editor does not rely solely on color to convey information:

- **Active states**: Uses `aria-pressed` and visual indicators (background color + icon)
- **Validation errors**: Text messages + ARIA attributes + color
- **Focus**: Outline + color
- **Disabled state**: Reduced opacity + `aria-disabled` + cursor change

---

## Testing Guidelines

### Manual Testing Checklist

#### Keyboard Navigation Testing

- [ ] Tab through all toolbar buttons
- [ ] Activate buttons with Enter key
- [ ] Activate buttons with Space key
- [ ] Navigate to content area
- [ ] Tab out of editor (no keyboard trap)
- [ ] Test all keyboard shortcuts
- [ ] Test Escape key in popover
- [ ] Test Enter key in popover

#### Screen Reader Testing

- [ ] Test with NVDA (Windows)
- [ ] Test with JAWS (Windows)
- [ ] Test with VoiceOver (macOS)
- [ ] Verify all announcements
- [ ] Verify button labels
- [ ] Verify state changes
- [ ] Verify error messages
- [ ] Verify heading navigation

#### Focus Management Testing

- [ ] Verify focus indicators are visible
- [ ] Verify focus order is logical
- [ ] Verify focus returns after actions
- [ ] Verify no focus traps
- [ ] Test focus in disabled state
- [ ] Test focus in readonly state

#### ARIA Testing

- [ ] Inspect toolbar ARIA attributes
- [ ] Inspect button ARIA attributes
- [ ] Inspect content area ARIA attributes
- [ ] Verify aria-pressed states
- [ ] Verify aria-disabled states
- [ ] Verify aria-readonly states
- [ ] Verify aria-invalid on errors

#### Visual Testing

- [ ] Test in light theme
- [ ] Test in dark theme
- [ ] Test in high contrast mode
- [ ] Verify color contrast ratios
- [ ] Test at 200% zoom
- [ ] Test with increased font size
- [ ] Verify focus indicators at all zoom levels

### Automated Testing Tools

Recommended tools for accessibility testing:

- **axe DevTools** - Browser extension for automated WCAG testing
- **WAVE** - Web accessibility evaluation tool
- **Lighthouse** - Chrome DevTools accessibility audit
- **pa11y** - Automated accessibility testing in CI/CD
- **Jest-axe** - Accessibility testing in unit tests (used in our test suite)

### Browser and Assistive Technology Combinations

Tested and verified combinations:

| OS      | Browser | Screen Reader | Status     |
| ------- | ------- | ------------- | ---------- |
| Windows | Chrome  | NVDA          | ✅         |
| Windows | Firefox | NVDA          | ✅         |
| Windows | Chrome  | JAWS          | ✅         |
| macOS   | Safari  | VoiceOver     | ✅         |
| macOS   | Chrome  | VoiceOver     | ✅         |
| Linux   | Firefox | Orca          | ⚠️ Limited |
| Android | Chrome  | TalkBack      | ✅         |
| iOS     | Safari  | VoiceOver     | ✅         |

---

## Best Practices for Developers

When integrating the rich text editor into your application:

### 1. Provide Clear Context

Always provide context about the editor's purpose:

```html
<label for="editor-container">
  Article content
  <span class="required-indicator">*</span>
</label>
<div id="editor-container">
  <forge-rich-text-editor>
    <forge-rte-standard-tools></forge-rte-standard-tools>
  </forge-rich-text-editor>
</div>
```

### 2. Handle Validation Errors Accessibly

Provide accessible error messages:

```html
<forge-rich-text-editor max-length="1000" error-message="Content cannot exceed 1,000 characters" show-character-count>
  <forge-rte-standard-tools></forge-rte-standard-tools>
</forge-rich-text-editor>
```

### 3. Announce Character Limits

Enable character count display for users to track limits:

```html
<forge-rich-text-editor max-length="500" show-character-count show-word-count>
  <forge-rte-standard-tools></forge-rte-standard-tools>
</forge-rich-text-editor>
```

### 4. Provide Instructions

Add instructions for complex editing tasks:

```html
<div class="instructions" id="editor-instructions">
  Use the toolbar to format your content. Press Tab to navigate through formatting options, or use keyboard shortcuts
  for quick formatting.
</div>
<forge-rich-text-editor aria-describedby="editor-instructions">
  <forge-rte-standard-tools></forge-rte-standard-tools>
</forge-rich-text-editor>
```

### 5. Handle Required Fields

Indicate required fields properly:

```html
<label for="editor-wrapper"> Description <span aria-label="required">*</span> </label>
<div id="editor-wrapper">
  <forge-rich-text-editor aria-required="true">
    <forge-rte-standard-tools></forge-rte-standard-tools>
  </forge-rich-text-editor>
</div>
```

### 6. Communicate Disabled State

Explain why the editor is disabled:

```html
<p id="disabled-reason">The editor is disabled while your changes are being saved.</p>
<forge-rich-text-editor disabled aria-describedby="disabled-reason">
  <forge-rte-standard-tools></forge-rte-standard-tools>
</forge-rich-text-editor>
```

### 7. Preserve Focus Indicators

Never hide or override focus indicators:

```css
/* ❌ DON'T DO THIS */
*:focus {
  outline: none;
}

/* ✅ DO THIS INSTEAD */
/* Let Forge components handle focus indicators */
```

### 8. Test with Real Users

Test with actual assistive technology users:

- Recruit users who rely on screen readers
- Conduct usability testing sessions
- Gather feedback on pain points
- Iterate based on real-world usage

---

## Known Limitations

### Current Limitations

1. **Image Support**: Images are not currently supported in the editor. This is by design for simplicity and content consistency.

2. **Table Support**: Tables are not currently supported. Consider using a separate table component if needed.

3. **Nested Lists**: Deep nesting (4+ levels) may have reduced screen reader support depending on the assistive technology.

4. **Custom Extensions**: If you add custom TipTap extensions, you are responsible for ensuring they maintain accessibility standards.

### Planned Improvements

None at this time. The editor meets WCAG 2.1 Level AA standards for its current feature set.

---

## Additional Resources

### WCAG Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [Toolbar Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/)

### Testing Resources

- [WebAIM Screen Reader Testing](https://webaim.org/articles/screenreader_testing/)
- [Accessibility Testing Tools](https://www.w3.org/WAI/test-evaluate/tools/)
- [NVDA User Guide](https://www.nvaccess.org/documentation/)
- [VoiceOver User Guide](https://support.apple.com/guide/voiceover/welcome/mac)

### Forge Resources

- [Forge Design System](https://forge.tylertech.com/)
- [Forge Accessibility Guidelines](https://forge.tylertech.com/accessibility/)

---

## Compliance Statement

The Rich Text Editor component meets **WCAG 2.1 Level AA** compliance standards for all supported features. This includes:

- ✅ All Level A success criteria
- ✅ All Level AA success criteria
- ✅ Comprehensive keyboard navigation
- ✅ Full screen reader support
- ✅ Proper ARIA implementation
- ✅ Semantic HTML structure
- ✅ Sufficient color contrast
- ✅ Clear focus indicators

**Last Audit:** June 2026  
**Audit Method:** Manual testing + Automated testing (axe-core)  
**Test Coverage:** 843 tests including 43 accessibility-specific tests

For questions or accessibility concerns, please file an issue in the Tyler Forge Extended repository.
