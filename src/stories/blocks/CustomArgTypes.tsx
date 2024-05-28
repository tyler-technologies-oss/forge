import { HeaderMdx, Markdown, useOf } from '@storybook/blocks';
import { Code } from '@storybook/components';
import { TagItem, getCustomElementsTagDeclaration } from '../utils';

import styles from './CustomArgTypes.module.scss';

function UsageLink({ text, href }: { text: string; href: string }) {
  return (
    <p>
      <i>Learn more about <a href={`/${href}`}>{text}</a>.</i>
    </p>
  );
}

function Section({ title, name, hrefText, href, children, headingLevel = 'h3' }: { title: string; name: string; headingLevel?: 'h3' | 'h4'; hrefText?: string; href?: string; children: React.ReactNode }) {
  const headingId = headingLevel === 'h3' ? title : `${name}-${title}`
  const tagID = headingId.toLowerCase().replace(/[^a-z0-9]/gi, '-');
  return (
    <section className={(styles as any).section}>
      <HeaderMdx as={headingLevel} id={tagID}>{title}</HeaderMdx>
      {children}
      {href && hrefText ? <UsageLink text={hrefText} href={href} /> : null}
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

const TEXT_NAMES = ['(default)'];
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
        {items?.map(property => (
          <tr key={property.name}>
            <td>
              {!TEXT_NAMES.includes(property.name) ? <Code>{property.name}</Code> : <i>{property.name}</i>}
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

function DependenciesList({ dependencies }: { dependencies: string[] }) {
  return (
    <>
      <p>This component will automatically include the following components.</p>
      <ul>
        {dependencies.map(dependency => {
          const componentId = dependency.toLowerCase().replace(/^forge-/gi, '').replace(/[^a-z0-9]/gi, '-');
          return (
            <li key={dependency}>
              <a href={`/?path=/docs/components-${componentId}--docs`}>{`<${dependency}>`}</a>
            </li>
          );
        })}
      </ul>
    </>
  );
}

function methodParamsToString(params: any[]) {
  return params.map(param => `${param.name}: ${param.type.text}`).join(', ');
}

function ComponentArgTypes({ tagName, headingLevel }: { tagName: string; headingLevel: 'h3' | 'h4' }) {
  const declaration = getCustomElementsTagDeclaration(tagName);
  const properties = declaration.members?.filter(member => member.kind === 'field' && member.privacy === 'public');
  const attributes = declaration.attributes;
  const methods = declaration.members?.filter(member => member.kind === 'method' && member.privacy === 'public');
  const events = declaration.events;
  const dependencies = declaration.dependencies;
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
        <Section title="Properties" name={tagName} headingLevel={headingLevel} hrefText="Properties" href="?path=/docs/getting-started-usage--docs#properties--attributes">
          <PropsAttrsTable items={properties} />
        </Section>}
      
      {!!attributes?.length &&
        <Section title="Attributes" name={tagName} headingLevel={headingLevel} hrefText="Attributes" href="?path=/docs/getting-started-usage--docs#properties--attributes">
          <PropsAttrsTable items={attributes} />
        </Section>}

      {!!events?.length &&
        <Section title="Events" name={tagName} headingLevel={headingLevel} hrefText="Events" href="?path=/docs/getting-started-usage--docs#events">
          <EventsTable items={events} />
        </Section>}
      
      {!!slots?.length &&
        <Section title="Slots" name={tagName} headingLevel={headingLevel} hrefText="Slots" href="?path=/docs/getting-started-usage--docs#slots">
          <NameDescriptionTable items={slots} />
        </Section>}

      {!!methods?.length &&
        <Section title="Methods" name={tagName} headingLevel={headingLevel} hrefText="Methods" href="?path=/docs/getting-started-usage--docs#methods">
          <MethodsTable items={methods} />
        </Section>}
      
      {!!cssProperties?.length &&
        <Section title="CSS Custom Properties" name={tagName} headingLevel={headingLevel} hrefText="CSS Custom Properties" href="?path=/docs/getting-started-usage--docs#css-custom-properties">
          <NameDescriptionTable items={cssProperties} />
        </Section>}
      
      {!!cssParts?.length &&
        <Section title="CSS Shadow Parts" name={tagName} headingLevel={headingLevel} hrefText="CSS Shadow Parts" href="?path=/docs/getting-started-usage--docs#css-shadow-parts">
          <NameDescriptionTable items={cssParts} />
        </Section>}

      {!!dependencies?.length &&
        <Section title="Dependencies" name={tagName} headingLevel={headingLevel}>
          <DependenciesList dependencies={dependencies} />
        </Section>}
    </div>
  );
}

const STORY_KIND_PATH_SEPARATOR = /\s*\/\s*/;

export const extractTitle = (title: string) => {
  const groups = title.trim().split(STORY_KIND_PATH_SEPARATOR);
  return groups?.[groups?.length - 1] || title;
};

export default function CustomArgTypes() {
  const resolvedOf = useOf('story', ['story']);
  const tagName = resolvedOf.story.component as string;

  if (!tagName || typeof tagName !== 'string') {
    return null;
  }

  const subcomponents = resolvedOf.story.subcomponents as Record<string, string>;
  const hasSubcomponents = Boolean(subcomponents) && Object.keys(subcomponents).length > 0;

  if (!hasSubcomponents) {
    return <ComponentArgTypes tagName={tagName} headingLevel="h3" />;
  }

  const mainComponentName = extractTitle(resolvedOf.story.title);
  const tabs = {
    [mainComponentName]: tagName,
    ...subcomponents
  };
  return (
    <div>
      {Object.entries(tabs).map(([name, tagName], index) => {
        const tagID = mainComponentName.toLowerCase().replace(/[^a-z0-9]/gi, '-');
        return (
          <div key={index}>
            <HeaderMdx as="h3" id={tagID}>{name}</HeaderMdx>
            <ComponentArgTypes tagName={tagName} headingLevel="h4" />
          </div>
        );
      })}
    </div>
  );
}
