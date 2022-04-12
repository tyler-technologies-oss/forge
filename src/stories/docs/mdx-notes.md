# MDX Notes

## Deprecated

As of Forge version 2.0 we are no longer referencing stories in MDX, instead we use the Story Templates directly like a react component. Referencing stories causes issues with the usage of mdx like scrolling to the referenced story in the page because the id is in the url. Also state is shared with the story from the canvas which isn't ideal when controls are toggled on the canvas side. See our mdx files for examples of our current usage and only use this document as a reference to our history with storybook.

## Adding Stories

To use a `<Story/>` element in `<component>.mdx` we reference a story from  `<component>.stories.tsx` by its generated id. The id is the same as the route generated in storybook.
```html

<PageSection>

  <LiveDemo codeHtml={badgeDefaultHtml()}>

    <Story id="components-badge--default"/>

  </LiveDeom>

</PageSection>
```

The way that the `id` is generated is currently based on two things.

The `title` and `named export` of the story
```tsx
export default {
  title: 'Components/Badge', // id prefix "components-badge--"
} as Meta;

export const Default = DefaultTemplate.bind({});
// id suffix "default"
// story id becomes "components-badge--default"

export const RecipeIconButton = IconButtonRecipeTemplate.bind({});
// id suffix "recipe-icon-button"
// story id becomes "components-badge--recipe-icon-button"
```

## Linking to Other Stories

Considering a story with ID `component-badge--default`, this redirects to the **Docs tab** of the story:

```md
[Go to specific documentation page](?path=/docs/component-badge--default)
```

This redirects to the **Canvas** tab of the story:

```md
[Go to specific story canvas](?path=/story/component-badge--default)
```

You can also use anchors to target a specific section of a page:

```md
[Go to the slots of the documentation page](?path=/docs/component-badge--defaultd#slots)
```

## Formatting

In order to use `@tylertech/forge-docs-core` components you will need to add a space above and below the content of a component to allow the markdown parse to operate properly.

```html
<PropertyDef name="dot" type="boolean" defaultValue="false">
  <!------ Space ------>
  Sets the badge to a smaller height/width when no text content is to be displayed. Default is `false`.
  <!------ Space ------>
</PropertyDef>
```

## Theming

Storybook has an undocumented feature for adding `MDXComponents` to their `MDXProvider` this is prefered as it gives us the best control over theming and styling with MDX.

we currently add to the `MDXProvider` at the global level, see `src/stories/StorybookMdxProvider.tsx`
```js
//.storybook/preview.js
import { StorybookMdxComponents } from './StorybookMdxProvider.tsx';
export const parameters = {
  docs: {
    components: {...StorybookMdxComponents},
  }
}
```

Storybook has narrow scope of [custom theming](https://github.com/storybookjs/storybook/blob/next/addons/docs/docs/theming.md) by design. In the rare case that `MDXComponents` does not give us what we need, they do provide css classes for overriding at our own risk.

```css
.sbdocs.sbdocs-content {
  max-width: 1440px;
}
```
