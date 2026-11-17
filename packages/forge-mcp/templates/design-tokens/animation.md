# Animation Design Tokens

Animation tokens define the duration and easing of animations used throughout the design system.

| Token                                            | Value                             |
| ------------------------------------------------ | --------------------------------- |
| `--forge-animation-duration-short1`              | `50ms`                            |
| `--forge-animation-duration-short2`              | `100ms`                           |
| `--forge-animation-duration-short3`              | `150ms`                           |
| `--forge-animation-duration-short4`              | `200ms`                           |
| `--forge-animation-duration-medium1`             | `250ms`                           |
| `--forge-animation-duration-medium2`             | `300ms`                           |
| `--forge-animation-duration-medium3`             | `350ms`                           |
| `--forge-animation-duration-medium4`             | `400ms`                           |
| `--forge-animation-duration-long1`               | `450ms`                           |
| `--forge-animation-duration-long2`               | `500ms`                           |
| `--forge-animation-duration-long3`               | `550ms`                           |
| `--forge-animation-duration-long4`               | `600ms`                           |
| `--forge-animation-duration-extra-long1`         | `700ms`                           |
| `--forge-animation-duration-extra-long2`         | `800ms`                           |
| `--forge-animation-duration-extra-long3`         | `900ms`                           |
| `--forge-animation-duration-extra-long4`         | `1000ms`                          |
| `--forge-animation-easing-linear`                | `cubic-bezier(0, 0, 1, 1)`        |
| `--forge-animation-easing-standard`              | `cubic-bezier(0.23, 1, 0.32, 1)`  |
| `--forge-animation-easing-move`                  | `cubic-bezier(0.77, 0, 0.175, 1)` |
| `--forge-animation-easing-drawer`                | `cubic-bezier(0.32, 0.72, 0, 1)`  |
| `--forge-animation-easing-gentle`                | `cubic-bezier(0.25, 0.1, 0.25, 1)` |
| `--forge-animation-easing-decelerate`            | `cubic-bezier(0.23, 1, 0.32, 1)`  |
| `--forge-animation-easing-accelerate`            | `cubic-bezier(0.3, 0, 1, 1)`      |
| `--forge-animation-easing-emphasized`            | `cubic-bezier(0.2, 0, 0, 1)`      |
| `--forge-animation-easing-emphasized-accelerate` | `cubic-bezier(0.3, 0, 0.8, 0.15)` |
| `--forge-animation-easing-emphasized-decelerate` | `cubic-bezier(0.05, 0.7, 0.1, 1)` |

## Choosing an easing

- `standard`: the default, for anything entering or leaving the screen, such as popovers, dialogs and menus.
- `move`: for something that moves, resizes or rotates while it stays on screen, such as a switch handle, an open icon or an expanding panel.
- `drawer`: for drawers and sheets sliding in from an edge.
- `gentle`: for color, hover and other soft changes, and relaxed notifications such as toasts.
- `linear`: for loops and progress.

`decelerate`, `accelerate`, `emphasized`, `emphasized-accelerate` and `emphasized-decelerate` are deprecated and will be removed in the next major version. Use `standard` in place of the first four, and `drawer` in place of `emphasized-decelerate`. `accelerate` and `emphasized-accelerate` start slowly, which makes interface motion feel sluggish.