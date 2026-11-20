# User Profile

The user profile shows a sign-in button when signed out, or an avatar that opens a popover with the user's details, links, and sign-out action when signed in.

## Overview

The user profile displays a user's authentication state in an application. Signed out, it shows a sign-in button. Signed in, it shows the user's avatar, which opens a popover with their name, email, profile links, an optional theme toggle, and a sign-out action. It's typically placed at the end of an [app bar](./app-bar.md).

## Usage

`forge-user-profile` is signed in when `full-name` is set and signed out when it's empty. Set `full-name`, `email`, and `image-url` for the signed-in state; the avatar falls back to the user's initials when there's no image. Add `forge-profile-link` elements in the `link` slot for navigation like settings or account pages, each wrapping an `<a>` and an optional `icon`. Set `theme-toggle` to let users choose a light, dark, or system theme, and call `setTheme()` to change it from code. Handle `forge-user-profile-sign-in` and `forge-user-profile-sign-out` to run your authentication logic, and use the `sign-in-button-text`, `sign-out-button-text`, and `theme-toggle-*` slots to customize or localize text. Use `open` to control the popover. It's meant for the app bar's `end` slot; for other account menus, build one with a [menu](./menu.md) or [popover](./popover.md).

## Rules

**Do**

- Place it in the `end` slot of the app bar.
- Set `full-name` only when a user is signed in, and clear it on sign out.
- Handle `forge-user-profile-sign-in` and `forge-user-profile-sign-out` to update your authentication state.
- Wrap each link in a `forge-profile-link` in the `link` slot.
- Set `button-label` to describe the avatar button for the current user.

**Don't**

- Don't implement sign-in or sign-out inside the component; it only dispatches events.
- Don't add actions to the `link` slot that aren't navigation, like destructive commands.
- Don't use it outside an app bar without checking that its app bar styling works in that context.

## Basic usage

A user profile in an app bar with profile links and a theme toggle.

Example (A signed-in user profile in an app bar, with profile links, a theme toggle, and a sign out button in its popover.): `get_forge_blocks(blockId: "components/user-profile/demo/demo")`

## Accessibility

### Labeling

The signed-in avatar button is icon-only, so it gets its accessible name from `button-label`, which defaults to "Open user profile". Set it to something specific for your app, and localize it. The theme toggle's button group is named by `theme-toggle-aria-label`, which defaults to "Select a theme".

Give each link in a `forge-profile-link` descriptive text in its `<a>`. Icons in the `icon` slot are decorative.

### Keyboard interaction

The avatar button, or the sign-in button when signed out, is a standard button. When the popover is open, its contents follow the tab order.

| Key           | Action                                                                                   |
| ------------- | ---------------------------------------------------------------------------------------- |
| Tab           | Moves focus to the sign-in or avatar button, then through the popover content when open. |
| Enter / Space | Activates the focused button: signs in, opens or closes the popover, or signs out.       |
| Escape        | Closes the open popover.                                                                 |

### Screen reader behavior

The popover is anchored to the avatar button and shows the user's full name and email as text, so they are read as the user moves through its content. Links are read as regular links from their slotted `<a>` elements.

The component only dispatches `forge-user-profile-sign-in` and `forge-user-profile-sign-out`. After handling them, move focus somewhere sensible and update the page, for example by showing the signed-out state, so users aren't left without context.
