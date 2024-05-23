import { Markdown, Subheading, useOf } from '@storybook/blocks';
import { Code } from '@storybook/components';
import { TagItem, getCustomElementsTagDeclaration } from '../utils';

import styles from './CustomArgTypes.module.scss';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className={(styles as any).section}>
      <Subheading>{title}</Subheading>
      {children}
    </section>
  );
}

function PropsAttrsTable({ items }: { items: TagItem[] }) {
  return (
    <table className={(styles as any).table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {items?.map((item: TagItem) => (
          <tr key={item.name}>
            <td>
              <Code>{item.name}</Code>
            </td>
            <td>
              {item.type?.text ? <Code>{item.type.text}</Code> : '-'}
            </td>
            <td>
              {item.default ? <Code>{item.default}</Code> : '-'}
            </td>
            <td>
              <Markdown>{item.description}</Markdown>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function NameDescriptionTable({ items }: { items: TagItem[] }) {
  return (
    <table className={(styles as any).table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {items?.map((property: any) => (
          <tr key={property.name}>
            <td>
              <Code>{property.name}</Code>
            </td>
            <td>
              <Markdown>{property.description}</Markdown>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function EventsTable({ items }: { items: TagItem[] }) {
  return (
    <table className={(styles as any).table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        {items?.map((event: any) => (
          <tr key={event.name}>
            <td>
              <Code>{event.name}</Code>
            </td>
            <td>
              <Markdown>{event.description}</Markdown>
            </td>
            <td>
              {event.type?.text ? <Code>{event.type.text}</Code> : '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function MethodsTable({ items }: { items: TagItem[] }) {
  return (
    <table className={(styles as any).table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Parameters</th>
          <th>Return Type</th>
        </tr>
      </thead>
      <tbody>
        {items?.map((method: any) => (
          <tr key={method.name}>
            <td>
              <Code>{`${method.name}()`}</Code>
            </td>
            <td>
              <Markdown>{method.description}</Markdown>
            </td>
            <td>
              {method.parameters?.length ? <Code>{methodParamsToString(method.parameters)}</Code> : '-'}
            </td>
            <td>
              {method.return?.type?.text ? <Code>{method.return.type.text}</Code> : '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function methodParamsToString(params: any[]) {
  return params.map(param => `${param.name}: ${param.type.text}`).join(', ');
}

export default function CustomArgTypes() {
  const resolvedOf = useOf('story', ['story']);
  const tagName = resolvedOf.story.component as string;

  if (!tagName || typeof tagName !== 'string') {
    return null;
  }

  const declaration = getCustomElementsTagDeclaration(tagName);
  const properties = declaration.members?.filter(member => member.kind === 'field' && member.privacy === 'public');
  const attributes = declaration.attributes;
  const methods = declaration.members?.filter(member => member.kind === 'method' && member.privacy === 'public');
  const events = declaration.events;
  const slots = declaration.slots?.map(slot => {
    if (!slot.name) {
      slot.name = '(default)';
    }
    return slot;
  }) ?? [];
  const cssProperties = declaration.cssProperties;
  const cssParts = declaration.cssParts;

  return (
    <div>
      {!!properties?.length && 
        <Section title="Properties">
          <PropsAttrsTable items={properties} />
        </Section>}
      
      {!!attributes?.length &&
        <Section title="Attributes">
          <PropsAttrsTable items={attributes} />
        </Section>}

      {!!events?.length &&
        <Section title="Events">
          <EventsTable items={events} />
        </Section>}
      
      {!!slots?.length &&
        <Section title="Slots">
          <NameDescriptionTable items={slots} />
        </Section>}

      {!!methods?.length &&
        <Section title="Methods">
          <MethodsTable items={methods} />
        </Section>}
      
      {!!cssProperties?.length &&
        <Section title="CSS Custom Properties">
          <NameDescriptionTable items={cssProperties} />
        </Section>}
      
      {!!cssParts?.length &&
        <Section title="CSS Parts">
          <NameDescriptionTable items={cssParts} />
        </Section>}
    </div>
  );
}
