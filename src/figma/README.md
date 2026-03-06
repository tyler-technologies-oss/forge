# Figma Code Connect

For comprehensive documentation, visit: [Figma Code Connect Documentation](https://www.figma.com/developers/code-connect)

## Environment Variables

Create a .env file in the project root. Set up your environment with the following variables:

```bash
FIGMA_ACCESS_TOKEN=your_token_here
FIGMA_FILE_KEY=figma_file
```

## Using Claude Code Skill

The recommended way to set up new Code Connect mappings is using the Claude Code skill:

```
Set up Code Connect for https://www.figma.com/design/.../node-id=1234-5678
```

The skill is located at `.claude/skills/figma-code-connect.md` and automates:
- Fetching design context from Figma
- Finding the component in the codebase
- Creating the Code Connect file with proper patterns
- Updating `figma.config.json`
- Providing validation commands

## Basic Commands

### Connecting A New Component

```bash
# Generate a new file in a directory (update figma.config.json w/ alias)
npx figma connect create --outDir src/figma/primitives "frame_url"
```

### Publishing

```bash
# Validate before publishing
npx figma connect publish --dry-run

# Publish all files
npx figma connect publish

# Unpublish specific components
npx figma connect unpublish --ids "file_path"
```

## Code Connect Patterns

### Basic Component Structure

```typescript
import figma, { html } from '@figma/code-connect/html';

const sharedProps = {
  propName: figma.enum('Property Name', {
    Value1: 'attribute-value',
    Value2: undefined
  }),
  text: figma.string('Text')
};

figma.connect('<FIGMA_COMPONENT_ALIAS>', {
  props: { ...sharedProps },
  example: (props: any) => html`<forge-component ${props.propName}>
  ${props.text}
</forge-component>`
});
```

### Property Types

- **Boolean attributes**: Use `figma.enum()` with `true`/`false` mapping to attribute or `undefined`
- **Enum values**: Use `figma.enum()` with specific values
- **Text content**: Use `figma.string()`
- **Slots/icons**: Use `figma.boolean()` with conditional HTML
- **Nested children**: Use `figma.children()` with selectors

### Naming Conventions

- **File names**: `forge-[component].figma.ts` (lowercase with hyphens)
- **Config aliases**: `<FIGMA_COMPONENT_VARIANT>` (SCREAMING_SNAKE_CASE)
- **Prop names**: lowercase (e.g., `text` not `Text`)

### Example Files

- Simple: `forge-card.figma.ts`
- With slots: `forge-banner.figma.ts`
- Multiple variants: `forge-button.figma.ts`
- Nested children: `forge-list.figma.ts`
- Related components: `forge-button-toggle.figma.ts`

## Best Practices

1. **Reference Storybook**: Check `.stories.ts` files for accurate usage patterns
2. **Keep it simple**: Only map properties that exist in both Figma and code
3. **Use placeholders**: For required attributes like `value`, use descriptive placeholders
4. **Add comments**: Document each `figma.connect()` call
5. **Group related**: Keep related components in the same file
6. **Consistency**: Follow existing patterns in `src/figma/primitives/`

## Troubleshooting

- **TypeScript import errors**: The `@figma/code-connect/html` import may show type errors - this is expected
- **Missing variants**: Only map variants that exist in both design and code
- **Partial publishing**: Not available when `include` paths are in config - publish all or temporarily modify config
