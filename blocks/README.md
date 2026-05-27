# Forge Blocks

Pre-built HTML templates demonstrating Tyler Forge component patterns. Blocks are standalone, copy-paste-ready examples showcasing common UI patterns built with Forge web components.

## Quick Start

```bash
# Start dev server
pnpm dev

# Build blocks and generate screenshots
pnpm build
```

Visit `http://localhost:5173` to browse blocks during development.

## Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start Vite dev server for local development |
| `pnpm build` | Build blocks, generate manifest, and capture screenshots |
| `pnpm generate-manifest` | Regenerate `manifest.json` from block metadata |
| `pnpm generate-screenshots` | Capture screenshots for blocks that changed |

### Screenshot Generation Options

```bash
# Regenerate all screenshots (ignore cache)
pnpm generate-screenshots --force

# Only capture specific blocks
pnpm generate-screenshots --filter "login"

# Custom viewport size
pnpm generate-screenshots --width 1920 --height 1080
```

## Folder Structure

```
blocks/
├── src/
│   ├── blocks/              # Block categories
│   │   ├── application-layout/
│   │   ├── cards/
│   │   ├── dialogs/
│   │   ├── forms/
│   │   ├── lists/
│   │   ├── patterns/
│   │   ├── tables/
│   │   └── toolbar/
│   ├── includes/            # Base HTML template
│   │   └── base.html
│   ├── partials/            # Reusable HTML snippets (.hbs)
│   └── scripts/             # Build scripts
├── forge-register.ts        # Forge component registration
├── styles.css               # Shared styles
├── theme.scss               # Forge theme configuration
└── manifest.json            # Generated block index
```

Each block lives in its own folder: `src/blocks/<category>/<block-name>/`
- `<block-name>.html` - Block source
- `<block-name>.png` - Auto-generated screenshot
- `<block-name>.ts` - Optional TypeScript for interactivity

## Creating a Block

### 1. Create the block folder and HTML file

```
src/blocks/<category>/<block-name>/<block-name>.html
```

### 2. Add required metadata

Every block must start with metadata comments:

```html
<!--
  @block Block Display Name
  @description Brief description of the UI pattern
  @tags comma, separated, searchable, tags
-->
```

### 3. Add block content

Write your HTML using Forge components. The base template (`src/includes/base.html`) automatically provides:

- Document structure (`<!doctype>`, `<html>`, `<head>`)
- Tyler fonts (Roboto)
- Forge styles and Tailwind CSS
- Forge component registration
- Ready transition handling

```html
<!--
  @block Contact Form
  @description Simple contact form with validation
  @tags form, contact, input, validation
-->
<div class="p-large max-w-md mx-auto">
  <h2 class="forge-typography--heading4 mb-medium">Contact Us</h2>
  <form>
    <forge-text-field>
      <label slot="label">Name</label>
      <input type="text" required />
    </forge-text-field>
    <!-- ... -->
  </form>
</div>
```

### 4. Optional: Add body classes

Wrap content in a `<body>` tag to apply classes:

```html
<!--
  @block Full Page Layout
  @description Layout with custom background
  @tags layout
-->
<body class="bg-surface-container">
  <!-- content -->
</body>
```

### 5. Optional: Add interactivity

Create a TypeScript file with the same name for dynamic behavior:

```typescript
// src/blocks/tables/simple/simple.ts
import type { ITableComponent, IColumnConfiguration } from '@tylertech/forge';

const table = document.getElementById('my-table') as ITableComponent;

table.columnConfigurations = [
  { property: 'name', header: 'Name' },
  { property: 'status', header: 'Status' }
];

table.data = [
  { name: 'Item 1', status: 'Active' },
  { name: 'Item 2', status: 'Pending' }
];
```

Reference the script in your HTML:

```html
<script type="module" src="./simple.ts"></script>
```

### 6. Generate screenshot

Run `pnpm build` or `pnpm generate-screenshots` to capture the block screenshot.

## Using Partials

Partials are reusable HTML snippets for common patterns.

### Create a partial

Add a `.hbs` file in `src/partials/`:

```html
<!-- src/partials/status-badge.hbs -->
<forge-badge theme="success">Active</forge-badge>
```

### Use in a block

Reference with `{{> partial-name}}` syntax:

```html
<!--
  @block User Card
  @description Card with status badge
  @tags card, user, badge
-->
<forge-card>
  <h3>John Doe</h3>
  {{> status-badge}}
</forge-card>
```

## TypeScript Guidelines

When adding TypeScript to blocks:

- Import types from `@tylertech/forge` (main package)
- Define interfaces for data structures
- Use proper Forge component interfaces (`ITableComponent`, `IPaginatorComponent`, etc.)
- Type event handlers explicitly

```typescript
import type {
  ITableComponent,
  IColumnConfiguration,
  IPaginatorComponent
} from '@tylertech/forge';

interface IUserData {
  id: string;
  name: string;
  email: string;
}

const table = document.getElementById('users-table') as ITableComponent;
const paginator = document.getElementById('paginator') as IPaginatorComponent;

const columnConfigurations: IColumnConfiguration[] = [
  { property: 'name', header: 'Name' },
  { property: 'email', header: 'Email' }
];

table.columnConfigurations = columnConfigurations;

paginator.addEventListener('forge-paginator-change', () => {
  // Handle pagination
});
```

## Block Categories

| Category | Description |
|----------|-------------|
| `application-layout` | Full application shells with app bar, drawer, content areas |
| `cards` | Card-based layouts and patterns |
| `dialogs` | Modal dialogs and confirmation patterns |
| `forms` | Form layouts, validation patterns, input groups |
| `lists` | List views, management interfaces |
| `patterns` | Reusable UI patterns and compositions |
| `tables` | Data tables with sorting, pagination, filtering |
| `toolbar` | Toolbar configurations and action bars |

## How It Works

1. **Vite plugin** (`src/scripts/vite-plugin.ts`) transforms block HTML files at build time
2. **Block compiler** wraps content with the base template, processes partials
3. **Manifest generator** extracts metadata and creates `manifest.json`
4. **Screenshot generator** uses Playwright to capture rendered blocks

The base template includes a ready transition that waits for `forge-scaffold` to initialize before showing content, ensuring screenshots capture fully-rendered components.
