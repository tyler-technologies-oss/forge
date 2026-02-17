import { Source, useOf } from '@storybook/addon-docs/blocks';
import { getCustomElementsTagDeclaration, TagItem } from '../utils';
import { NameDescriptionTable, Section, UsageLink } from './Shared';
import { css } from 'lit';

function friendlyNameFromTagName(tagName: string) {
  return tagName
    .toLowerCase()
    .replace(/^forge-/g, '')
    .replace(/-/g, ' ');
}

function cssFilePathFromTagName(tagName: string) {
  const extractedName = tagName.replace(/^forge-/g, '');
  return `${extractedName}/forge-${extractedName}.css`;
}

function CssFilePath({ name, path }: { name: string; path: string }) {
  const codeSnippet = `@use '@tylertech/forge/dist/${path}';`;
  return (
    <>
      <p>To use the CSS-only {name} component, include the following CSS file in your project:</p>
      <Source code={codeSnippet} dark={false} />
    </>
  );
}

function CssClassTable({ items }: { items: TagItem[] }) {
  return (
    <Section title="CSS Classes" name="css-classes">
      <NameDescriptionTable items={items} />
    </Section>
  );
}

export default function CssOnlyInformation() {
  const resolvedOf = useOf('story', ['story']);
  const tagName = resolvedOf.story.component as string;

  if (!tagName || typeof tagName !== 'string') {
    return null;
  }

  const declaration = getCustomElementsTagDeclaration(tagName);
  const cssFilePath = declaration.cssFilePath?.name ?? cssFilePathFromTagName(tagName);
  const cssClasses = declaration.cssClasses ?? [];

  const subcomponents = (resolvedOf.story.subcomponents as Record<string, string>) ?? {};
  if (Object.keys(subcomponents).length) {
    Object.values(subcomponents).forEach(subTagName => {
      const subDeclaration = getCustomElementsTagDeclaration(subTagName);
      if (subDeclaration?.cssClasses?.length) {
        cssClasses.push(...subDeclaration.cssClasses);
      }
    });
  }

  return (
    <>
      <CssFilePath name={friendlyNameFromTagName(tagName)} path={cssFilePath} />
      <UsageLink text="CSS-Only Components" href="?path=/docs/getting-started-css-only-components--docs" />
      {cssClasses.length ? <CssClassTable items={cssClasses} /> : null}
    </>
  );
}
