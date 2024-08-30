import { Source, useOf } from '@storybook/blocks';
import { getCustomElementsTagDeclaration, TagItem } from '../utils';
import { NameDescriptionTable, Section, UsageLink } from './Shared';

function CssFilePath({ name, path }: { name: string; path?: string }) {
  if (!path) {
    return null;
  }

  const codeSnippet = `@use '${path}';`;
  return (
    <>
      <p>To use the CSS-only {name} component, include the following CSS file in your project:</p>
      <Source code={codeSnippet} dark={false} />
    </>
  );
}

function CssClassTable({ items }: { items?: TagItem[] }) {
  if (!items) {
    return null;
  }

  return (
    <Section title="CSS Classes" name="css-classes">
      <NameDescriptionTable items={items} />
    </Section>
  );
}

export default function CssOnlyInformation({ name }: { name: string }) {
  const resolvedOf = useOf('story', ['story']);
  const tagName = resolvedOf.story.component as string;

  if (!tagName || typeof tagName !== 'string') {
    return null;
  }

  const declaration = getCustomElementsTagDeclaration(tagName);
  const cssFilePath = declaration.cssFilePath?.name.replace(/^\\/, '');
  const cssClasses = declaration.cssClasses;

  if (!cssClasses) {
    return null;
  }

  return (
    <>
      <CssFilePath name={name} path={cssFilePath} />
      <UsageLink text="CSS-Only Components" href="?path=/docs/getting-started-css-only-components--docs" />
      <CssClassTable items={cssClasses} />
    </>
  );
}
