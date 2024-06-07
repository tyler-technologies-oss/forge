import { HeaderMdx, Markdown, useOf } from '@storybook/blocks';
import { Code } from '@storybook/components';
import { TagItem, getBranchName, getCustomElementType, getCustomElementsTagDeclaration, getCustomElementsTagModule, htmlEncode } from '../utils';

import styles from './CustomArgTypes.module.scss';
import GitHubLogo from './GitHubLogo';

const BASE_GITHUB_URL = `https://github.com/tyler-technologies-oss/forge/tree`;

function UsageLink({ text, href }: { text: string; href: string }) {
  return (
    <p>
      <i>
        Learn more about <a href={`./${href}`}>{text}</a>.
      </i>
    </p>
  );
}

function Section({ title, name, children, headingLevel = 'h3' }: { title: string; name: string; headingLevel?: 'h3' | 'h4'; children: React.ReactNode }) {
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

function ForgeTypeLinks({ typeText }: { typeText: string }) {
  // Encode the type text to preserve special characters such as generic type parameters
  typeText = htmlEncode(typeText);

  // Tokenize the type text, remove duplicates, and sort by length in descending order
  const tokenizedType = [...new Set(typeText.match(/\w+/g) ?? [])].sort((a, b) => b.length - a.length);

  // Loop through each token in reverse order to avoid replacing tokens that are substrings of other tokens that contain the same text
  const branchName = getBranchName();
  tokenizedType.forEach(token => {
    const matchingType = getCustomElementType(token);
    if (matchingType) {
      const { path, lineNumber } = matchingType;
      const href = `${BASE_GITHUB_URL}/${branchName}/${path}#L${lineNumber}`;
      const tokenRegExp = new RegExp(`(?<!>)${token}`, 'g'); // Negative lookbehind to avoid replacing inside existing links
      typeText = typeText.replace(tokenRegExp, `<a href=${href} target="_blank" rel="noreferrer noopener">${token}</a>`);
    }
  });

  return (
    <Code>
      <span dangerouslySetInnerHTML={{ __html: typeText }}></span>
    </Code>
  );
}

function PropsAttrsTable({ items, globalConfigProperties }: { items: TagItem[]; globalConfigProperties?: string[] }) {
  return (
    <table className={(styles as any).table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
          {!!globalConfigProperties?.length ? <th style={{ whiteSpace: 'nowrap', textAlign: 'center' }}>Global Config</th> : null}
        </tr>
      </thead>
      <tbody>
        {items?.map((item: TagItem, index) => (
          <tr key={`${item.name}-${index}`}>
            <td>
              <Code>{item.name}</Code>
            </td>
            <td>{item.type?.text ? <ForgeTypeLinks typeText={item.type.text} /> : '-'}</td>
            <td>{item.default ? <Code>{item.default}</Code> : '-'}</td>
            <td>
              <Markdown>{item.description}</Markdown>
            </td>
            {!!globalConfigProperties?.length ? <td style={{ textAlign: 'center' }}>{globalConfigProperties.includes(item.name) ? '✅' : ''}</td> : null}
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
            <td>{event.type?.text ? <ForgeTypeLinks typeText={event.type.text} /> : '-'}</td>
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
            <td>{method.parameters?.length ? <ForgeTypeLinks typeText={methodParamsToString(method.parameters)} /> : '-'}</td>
            <td>{method.return?.type?.text ? <ForgeTypeLinks typeText={method.return.type.text} /> : '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function DependenciesList({ dependencies }: { dependencies: string[] }) {
  return (
    <>
      <p>This component will automatically include the following components:</p>
      <ul>
        {dependencies.map(dependency => {
          const componentId = dependency
            .toLowerCase()
            .replace(/^forge-/gi, '')
            .replace(/[^a-z0-9]/gi, '-');
          return (
            <li key={dependency}>
              <a href={`./?path=/docs/components-${componentId}--docs`}>{`<${dependency}>`}</a>
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

function sortByName(items: TagItem[]): TagItem[] {
  return items.sort((a, b) => a.name.localeCompare(b.name));
}

function ComponentArgTypes({ tagName, headingLevel }: { tagName: string; headingLevel: 'h3' | 'h4' }) {
  const module = getCustomElementsTagModule(tagName);
  const declaration = getCustomElementsTagDeclaration(tagName);
  const properties = declaration.members?.filter(member => member.kind === 'field' && member.privacy === 'public');
  const attributes = declaration.attributes;
  const methods = declaration.members?.filter(member => member.kind === 'method' && member.privacy === 'public');
  const events = declaration.events;
  const dependencies = declaration.dependencies?.map(({ name }) => name);
  const globalConfigProperties = declaration.globalConfigProperties?.map(({ name }) => name);
  const slots =
    declaration.slots?.map(slot => {
      if (!slot.name) {
        slot.name = '(default)';
      }
      return slot;
    }) ?? [];
  const cssProperties = declaration.cssProperties;
  const cssParts = declaration.cssParts;
  const branch = getBranchName();
  const modulePath = module.path;

  return (
    <div className={(styles as any).container}>
      {modulePath ? (
        <a href={`${BASE_GITHUB_URL}/${branch}/${modulePath}`} rel="noreferrer noopener" target="_blank" className={(styles as any).codeLink}>
          <GitHubLogo />
        </a>
      ) : null}

      {!!properties?.length && (
        <Section title="Properties" name={tagName} headingLevel={headingLevel}>
          <PropsAttrsTable items={sortByName(properties)} globalConfigProperties={globalConfigProperties} />
          <UsageLink text="Properties" href="?path=/docs/getting-started-usage--docs#properties--attributes" />
          {globalConfigProperties?.length ? <UsageLink text="Global Configuration" href="?path=/docs/getting-started-global-configuration--docs" /> : null}
        </Section>
      )}

      {!!attributes?.length && (
        <Section title="Attributes" name={tagName} headingLevel={headingLevel}>
          <PropsAttrsTable items={sortByName(attributes)} />
          <UsageLink text="Attributes" href="?path=/docs/getting-started-usage--docs#properties--attributes" />
        </Section>
      )}

      {!!events?.length && (
        <Section title="Events" name={tagName} headingLevel={headingLevel}>
          <EventsTable items={sortByName(events)} />
          <UsageLink text="Events" href="?path=/docs/getting-started-usage--docs#events" />
        </Section>
      )}

      {!!slots?.length && (
        <Section title="Slots" name={tagName} headingLevel={headingLevel}>
          <NameDescriptionTable items={sortByName(slots)} />
          <UsageLink text="Slots" href="?path=/docs/getting-started-usage--docs#slots" />
        </Section>
      )}

      {!!methods?.length && (
        <Section title="Methods" name={tagName} headingLevel={headingLevel}>
          <MethodsTable items={sortByName(methods)} />
          <UsageLink text="Methods" href="?path=/docs/getting-started-usage--docs#methods" />
        </Section>
      )}

      {!!cssProperties?.length && (
        <Section title="CSS Custom Properties" name={tagName} headingLevel={headingLevel}>
          <NameDescriptionTable items={sortByName(cssProperties)} />
          <UsageLink text="CSS Custom Properties" href="?path=/docs/getting-started-usage--docs#css-custom-properties" />
        </Section>
      )}

      {!!cssParts?.length && (
        <Section title="CSS Shadow Parts" name={tagName} headingLevel={headingLevel}>
          <NameDescriptionTable items={sortByName(cssParts)} />
          <UsageLink text="CSS Shadow Parts" href="?path=/docs/getting-started-usage--docs#css-shadow-parts" />
        </Section>
      )}

      {!!dependencies?.length && (
        <Section title="Dependencies" name={tagName} headingLevel={headingLevel}>
          <DependenciesList dependencies={dependencies.sort()} />
        </Section>
      )}
    </div>
  );
}

const STORY_KIND_PATH_SEPARATOR = /\s*\/\s*/;

export const extractTitle = (title: string) => {
  const groups = title.trim().split(STORY_KIND_PATH_SEPARATOR);
  return groups?.[groups?.length - 1] || title;
};

export const titleFromTagName = (tagName: string) => {
  return tagName
    .replace(/^forge-/gi, '')
    .replace(/-/g, ' ')
    .replace(/(?:^|\s)\S/g, a => a.toUpperCase());
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

  const tagNames = [tagName, ...Object.values(subcomponents)];

  return (
    <div>
      {tagNames.map(tagName => {
        const headerId = `${tagName.toLowerCase().replace(/[^a-z0-9]/gi, '-')}-api`;
        return (
          <div key={tagName} style={{ marginBlockStart: '24px' }}>
            <HeaderMdx as="h3" id={headerId}>
              {titleFromTagName(tagName)}
            </HeaderMdx>
            <ComponentArgTypes tagName={tagName} headingLevel="h4" />
          </div>
        );
      })}
    </div>
  );
}
