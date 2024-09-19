import { HeaderMdx, Markdown } from '@storybook/blocks';
import { Code } from '@storybook/components';
import { TagItem } from '../utils';

import styles from './CustomArgTypes.module.scss';

export function Checkmark({ alt, color }: { alt?: string; color?: string }) {
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="m423.23-394.15-92.92-92.93q-8.31-8.3-20.89-8.5-12.57-.19-21.27 8.5-8.69 8.7-8.69 21.08 0 12.38 8.69 21.08l109.77 109.77q10.85 10.84 25.31 10.84 14.46 0 25.31-10.84l222.54-222.54q8.3-8.31 8.5-20.89.19-12.57-8.5-21.27-8.7-8.69-21.08-8.69-12.38 0-21.08 8.69l-205.69 205.7ZM480.07-100q-78.84 0-148.21-29.92t-120.68-81.21q-51.31-51.29-81.25-120.63Q100-401.1 100-479.93q0-78.84 29.92-148.21t81.21-120.68q51.29-51.31 120.63-81.25Q401.1-860 479.93-860q78.84 0 148.21 29.92t120.68 81.21q51.31 51.29 81.25 120.63Q860-558.9 860-480.07q0 78.84-29.92 148.21t-81.21 120.68q-51.29 51.31-120.63 81.25Q558.9-100 480.07-100Z"/></svg>';
  const svgStyle = color ? ({ '--_icon-color': color } as React.CSSProperties) : {};
  return <span style={svgStyle} role={alt ? 'img' : undefined} aria-label={alt ?? undefined} dangerouslySetInnerHTML={{ __html: svg }} />;
}

export function Xmark({ alt, color }: { alt?: string; color?: string }) {
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="m480-437.85 122.92 122.93q8.31 8.3 20.89 8.5 12.57.19 21.27-8.5 8.69-8.7 8.69-21.08 0-12.38-8.69-21.08L522.15-480l122.93-122.92q8.3-8.31 8.5-20.89.19-12.57-8.5-21.27-8.7-8.69-21.08-8.69-12.38 0-21.08 8.69L480-522.15 357.08-645.08q-8.31-8.3-20.89-8.5-12.57-.19-21.27 8.5-8.69 8.7-8.69 21.08 0 12.38 8.69 21.08L437.85-480 314.92-357.08q-8.3 8.31-8.5 20.89-.19 12.57 8.5 21.27 8.7 8.69 21.08 8.69 12.38 0 21.08-8.69L480-437.85Zm.07 337.85q-78.84 0-148.21-29.92t-120.68-81.21q-51.31-51.29-81.25-120.63Q100-401.1 100-479.93q0-78.84 29.92-148.21t81.21-120.68q51.29-51.31 120.63-81.25Q401.1-860 479.93-860q78.84 0 148.21 29.92t120.68 81.21q51.31 51.29 81.25 120.63Q860-558.9 860-480.07q0 78.84-29.92 148.21t-81.21 120.68q-51.29 51.31-120.63 81.25Q558.9-100 480.07-100Z"/></svg>';
  const svgStyle = color ? ({ '--_icon-color': color } as React.CSSProperties) : {};
  return <span style={svgStyle} role={alt ? 'img' : undefined} aria-label={alt ?? undefined} dangerouslySetInnerHTML={{ __html: svg }} />;
}

export function UsageLink({ text, href }: { text: string; href: string }) {
  return (
    <p>
      <i>
        Learn more about <a href={`./${href}`}>{text}</a>.
      </i>
    </p>
  );
}

export function Section({
  title,
  name,
  children,
  headingLevel = 'h3'
}: {
  title: string;
  name: string;
  headingLevel?: 'h3' | 'h4';
  children: React.ReactNode;
}) {
  const headingId = headingLevel === 'h3' ? title : `${name}-${title}`;
  const tagID = headingId.toLowerCase().replace(/[^a-z0-9]/gi, '-');
  return (
    <section className={(styles as any).section}>
      <HeaderMdx as={headingLevel} id={tagID}>
        {title}
      </HeaderMdx>
      {children}
    </section>
  );
}

const TEXT_NAMES = ['(default)'];
export function NameDescriptionTable({ items }: { items: TagItem[] }) {
  return (
    <table className={(styles as any).table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {items?.map((property, index) => (
          <tr key={`${property.name}-${index}`}>
            <td>{!TEXT_NAMES.includes(property.name) ? <Code>{property.name}</Code> : <i>{property.name}</i>}</td>
            <td>
              <Markdown>{property.description}</Markdown>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
