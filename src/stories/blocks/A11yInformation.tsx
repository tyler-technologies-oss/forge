import { useOf } from '@storybook/blocks';
import { Code } from '@storybook/components';
import { getCustomElementsTagDeclaration, TagItem } from '../utils';
import { Checkmark, Section, UsageLink, Xmark } from './Shared';

import styles from './CustomArgTypes.module.scss';

function RoleLink({ role }: { role: string }) {
  const href = `https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/${role.toLowerCase()}_role`;
  return (
    <a className={(styles as any).cardLink} href={href} target="_blank" rel="noreferrer noopener">
      Learn about this role
    </a>
  );
}

function AriaAttributeLink({ attribute }: { attribute: string }) {
  const href = `https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/${attribute.toLowerCase()}`;
  const anchor = `<a href=${href} target="_blank" rel="noreferrer noopener">${attribute}</a>`;
  return (
    <Code>
      <span dangerouslySetInnerHTML={{ __html: anchor }} />
    </Code>
  );
}

function AriaAttrsTable({ items }: { items: TagItem[] }) {
  return (
    <Section title="ARIA Attributes" name="aria-attributes">
      <p>Unless stated otherwise, all ARIA attributes are managed by the component. In the majority of cases there's no need to set these manually.</p>
      <table className={(styles as any).table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {items?.map((item: TagItem, index) => (
            <tr key={`${item.name}-${index}`}>
              <td>
                <AriaAttributeLink attribute={item.name} />
              </td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>
  );
}

function KeyboardShortcutsTable({ items }: { items: TagItem[] }) {
  const keyboardShortcuts: { name: string; keys: string[]; description: string }[] = items.map(item => {
    const splitKeys = item.name.split('+');
    splitKeys.map(key => key.trim().toLowerCase());
    return {
      name: item.name,
      keys: splitKeys,
      description: item.description
    };
  });
  return (
    <Section title="Keyboard Shortcuts" name="keyboard-shortcuts">
      <table className={(styles as any).table}>
        <thead>
          <tr>
            <th>Key</th>
            <th>Effect</th>
          </tr>
        </thead>
        <tbody>
          {keyboardShortcuts.map((keyboardShortcut, index) => (
            <tr key={`${keyboardShortcut.name}-${index}`}>
              <td>
                {keyboardShortcut.keys.map((key, index) => (
                  <>
                    <span className={(styles as any).key}>{key}</span>
                    {index < keyboardShortcut.keys.length - 1 ? ' + ' : null}
                  </>
                ))}
              </td>
              <td>{keyboardShortcut.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>
  );
}

function A11yCard({ children, title, icon, theme }: { children: React.ReactNode; title?: string; icon: React.ReactNode; theme?: string }) {
  const backgroundColor = theme ? `var(--forge-theme-${theme}-container-low)` : 'var(--forge-theme-surface-container-low)';
  const borderColor = theme ? `var(--forge-theme-${theme}-container)` : 'var(--forge-theme-outline)';
  const textColor = theme ? `var(--forge-theme-on-${theme}-container-low)` : 'var(--forge-theme-on-surface-container-low)';
  const cardStyles = {
    background: backgroundColor,
    borderColor: borderColor,
    color: textColor,
    '--_icon-color': textColor
  } as React.CSSProperties;

  return (
    <>
      <div className={(styles as any).card} style={cardStyles}>
        <span className={(styles as any).cardIcon}>{icon}</span>
        <div>
          {title ? <div className={(styles as any).cardTitle}>{title}</div> : null}
          <div className={(styles as any).cardValue}>{children}</div>
        </div>
      </div>
    </>
  );
}

export default function A11yInformation({ children }: { children: React.ReactNode }) {
  const resolvedOf = useOf('story', ['story']);
  const tagName = resolvedOf.story.component as string;

  if (!tagName || typeof tagName !== 'string') {
    return null;
  }

  const declaration = getCustomElementsTagDeclaration(tagName);
  const role = declaration.role?.name ?? 'presentation';
  const focusable = !!declaration.focusable;
  const formAssociated = !!declaration.formAssociated;
  const ariaAttributes = declaration.aria ?? [];
  const keyboardShortcuts = declaration.keyControls ?? [];
  const roleSvg = (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
      <path d="M480-720q-33 0-56.5-23.5T400-800q0-33 23.5-56.5T480-880q33 0 56.5 23.5T560-800q0 33-23.5 56.5T480-720ZM360-120v-480q-49-4-99-11t-98-18q-17-4-27.5-19t-5.5-32q5-17 21-25t34-4q70 15 145.5 22t149.5 7q74 0 149.5-7T775-709q18-4 34 4t21 25q5 17-5.5 32T797-629q-48 11-98 18t-99 11v480q0 17-11.5 28.5T560-80q-17 0-28.5-11.5T520-120v-200h-80v200q0 17-11.5 28.5T400-80q-17 0-28.5-11.5T360-120Z" />
    </svg>
  );

  return (
    <>
      <div className={(styles as any).cardContainer}>
        <A11yCard title="Role" icon={roleSvg} theme="info">
          <div>{role}</div>
          <RoleLink role={role} />
        </A11yCard>
        <A11yCard icon={focusable ? <Checkmark /> : <Xmark />} theme={focusable ? 'success' : undefined}>
          {(focusable ? 'F' : 'Not f') + 'ocusable'}
        </A11yCard>
        <A11yCard icon={formAssociated ? <Checkmark /> : <Xmark />} theme={formAssociated ? 'success' : undefined}>
          {(formAssociated ? 'F' : 'Not f') + 'orm associated'}
        </A11yCard>
      </div>
      {children}
      {ariaAttributes.length ? <AriaAttrsTable items={ariaAttributes} /> : null}
      {keyboardShortcuts.length ? <KeyboardShortcutsTable items={keyboardShortcuts} /> : null}
      <UsageLink text="Accessibility" href="?path=/docs/getting-started-accessibility--docs" />
    </>
  );
}
