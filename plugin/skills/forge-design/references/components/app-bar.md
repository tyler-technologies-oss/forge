# App Bar

App bars are headers used to display branding, navigation, and actions at the top of an application.

## Overview

The app bar serves as a user's primary navigation hub, containing everything needed to navigate within the current application, access other applications, and customize their experience. It provides persistent access to essential functionality including application identity, search capabilities, notifications, help resources, and user account management across all application contexts.

The app bar maintains consistent placement and functionality across different screen sizes and device types, ensuring users always have access to core navigation and utility functions regardless of their current location within the application.

## Usage

`forge-app-bar` lays out branding and top-level actions through its `logo`, `title`, `start`, `center`, and `end` slots, plus `elevation`, `theme`, and `themeMode`. Reserve the `start` slot for navigation (typically a menu button that opens a [drawer](./drawer.md)), the `center` slot for app-wide search, and the `end` slot for a small set of purpose-built buttons: help, notifications, an app launcher, and the user's profile.

## Rules

**Do**

- Maintain consistent app bar presence across all application screens.
- Keep the menu button visible at every screen size for apps with a dismissible navigation drawer.
- Reserve center-slot search for apps that are primarily search-driven; place search near the component it searches otherwise.
- Order end-slot actions consistently: help, notifications, app launcher, then profile.

**Don't**

- Don't crowd the end slot with more actions than help, notifications, an app launcher, and profile.
- Don't duplicate primary navigation in both the app bar and a drawer — pick one place for it.
- Don't use app bar search for a filter that's local to a single component on the page.
- Don’t place links in the app bar — use appropriate navigation patterns instead.
- Don’t place item-specific actions in the app bar — keep them contextual to affected content.
- Don't put page-specific actions like Save, Edit, Delete, or Submit in the app bar — they go in the page's body header toolbar.

## Structure

Place a logo in the `logo` slot and a title in the `title` slot (or set `titleText` directly), navigation in `start`, search in `center`, and action buttons in `end`.

Example (An app bar composed from every slot at once: menu button, logo, search, and end actions.): `get_forge_blocks(blockId: "components/app-bar/full/full")`

## Theme

Set `theme` to tint the app bar, and `themeMode` to `inherit` (the default, applying that theme globally to the app bar and its children) or `scoped` (limiting it to just the app bar itself).

Example (A themed app bar, scoped so the theme doesn't leak to the rest of the page.): `get_forge_blocks(blockId: "components/app-bar/white-theme/white-theme")`

### Theming pitfalls

With the default `themeMode="inherit"`, global theme tokens cascade to every child element — including popovers and dialogs opened from the app bar, which can end up styled with the wrong colors. Switch to `themeMode="scoped"` to stop that cascade.

Scoping the theme comes with a tradeoff: elements placed directly in the app bar no longer inherit its colors automatically either. Set `theme="app-bar"` to opt a child back in — but it's only supported on `forge-button`, `forge-icon-button`, and `forge-tab-bar`. The app bar's own preset buttons (menu, help, profile, notification) already set this for you.

For any other element, reference the app bar's scoped tokens directly — `--forge-app-bar-theme-foreground` and `--forge-app-bar-theme-background-muted`:

```css
forge-app-bar forge-avatar {
  --forge-avatar-background: var(--forge-app-bar-theme-foreground);
  --forge-avatar-color: var(--forge-theme-text-high);
}
```

## Menu button

`forge-app-bar-menu-button` is a preset icon button — defaulting to a hamburger `icon` — for opening navigation from the `start` slot.

Example (A menu button in the start slot, ready to open a drawer.): `get_forge_blocks(blockId: "components/app-bar/menu-button/demo/demo")`

## Search

`forge-app-bar-search` wraps a slotted `<input>` with search styling and an icon, through `value`, `placeholder`, and `disabled`, and fires `forge-app-bar-search-input` on Enter.

Example (Search in the center slot, styled for the app bar.): `get_forge_blocks(blockId: "components/app-bar/search/demo/demo")`

## Help button

`forge-app-bar-help-button` is a preset icon button that opens a dropdown menu of `options` — help links, docs, support contacts.

Example (A help button opening a menu of options.): `get_forge_blocks(blockId: "components/app-bar/help-button/demo/demo")`

## Notification button

`forge-app-bar-notification-button` pairs a preset bell icon with a [badge](./badge.md), controlled through `showBadge`, `count`, `dot`, and `theme`.

Example (A notification button showing an unread dot.): `get_forge_blocks(blockId: "components/app-bar/notifications/demo/demo")`

## Profile button

**Deprecated**

`forge-app-bar-profile-button` is deprecated in favor of the `forge-user-profile` component. It remains available but is frozen — no new features, and possible removal in a future release. Prefer `forge-user-profile` for new work.

`forge-app-bar-profile-button` shows the signed-in user's avatar and opens a profile card with their `fullName`, `email`, and optional `signOutButton`/`profileButton` actions on click — customize the card further with `profileCardBuilder`.

Example (A profile button opening a card with the user's name and email.): `get_forge_blocks(blockId: "components/app-bar/profile/demo/demo")`

Set `profileCardBuilder` to a callback returning your own DOM to replace the card's default content entirely — useful for a list of account-related links instead of the default name/email/sign-out layout:

```js
profileButton.profileCardBuilder = () => {
  const list = document.createElement("forge-list");
  list.style.setProperty("--forge-list-padding", "0");
  list.appendChild(buildListItem("My Reports", "assignment"));
  list.appendChild(buildListItem("My Preferences", "settings"));
  return list;
};

function buildListItem(text, icon) {
  const item = document.createElement("forge-list-item");
  const iconEl = document.createElement("forge-icon");
  iconEl.slot = "leading";
  iconEl.name = icon;
  item.appendChild(iconEl);
  item.appendChild(document.createTextNode(text));
  return item;
}
```

## Accessibility

### Keyboard interaction

Every sub-component slotted into the app bar — menu button, search, help, notifications, profile — needs to be reachable and operable using only the keyboard.

### Heading hierarchy

The title slot renders as an `<h1>` by default. If you override it with your own content, use a real heading element, and keep only one `<h1>` per page — a new heading hierarchy started deliberately (inside a dialog, for example) is the one exception. The app bar itself renders as a `<header>` landmark.
