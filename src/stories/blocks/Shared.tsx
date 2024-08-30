import { HeaderMdx, Markdown } from '@storybook/blocks';
import { Code } from '@storybook/components';
import { TagItem } from '../utils';

import styles from './CustomArgTypes.module.scss';

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
