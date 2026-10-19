import type { IDialogComponent, IListItemSelectEventData, IMenuComponent, IMenuOption, IMenuSelectEventData, IPopoverComponent } from '@tylertech/forge';
import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconArrowDropDown, tylIconBusiness, tylIconClose, tylIconLink, tylIconLockOutline, tylIconPersonAddAlt } from '@tylertech/tyler-icons';

IconRegistry.define([tylIconArrowDropDown, tylIconBusiness, tylIconClose, tylIconLink, tylIconLockOutline, tylIconPersonAddAlt]);

type AccessLevel = 'owner' | 'editor' | 'viewer';
type VisibilityKey = 'restricted' | 'organization';
type ToastTheme = 'success' | 'danger';

interface IPerson {
  id: string;
  name?: string;
  email: string;
}

interface IMember extends IPerson {
  accessLevel: AccessLevel;
}

interface IVisibilityOption {
  label: string;
  description: string;
  icon: string;
}

const RESOURCE_NAME = 'Quarterly report';
const RESOURCE_NOUN = 'report';
const ORGANIZATION_NAME = 'Acme Corp';

const MINIMUM_SEARCH_LENGTH = 2;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMAIL_ID_PREFIX = 'email:';
const CURRENT_USER_ID = 'u1';
const REMOVE_OPTION_VALUE = 'remove-user';
const REMOVE_OPTION_CLASS = 'text-error';

const MESSAGES = {
  memberAdded: `User has been added to the ${RESOURCE_NOUN}`,
  memberRemoved: `User has been removed from the ${RESOURCE_NOUN}`,
  accessUpdated: `The user's access to this ${RESOURCE_NOUN} has been updated`,
  visibilityUpdated: 'Visibility updated',
  linkCopied: 'Link copied to clipboard',
  inviteHint: 'Add by email address',
  onlyOwner: `A ${RESOURCE_NOUN} must always have at least one owner`
};

const ACCESS_LEVEL_LABELS: Record<AccessLevel, string> = {
  owner: 'Owner',
  editor: 'Can edit',
  viewer: 'Can view'
};

const ACCESS_LEVEL_ORDER: Record<AccessLevel, number> = { owner: 0, editor: 1, viewer: 2 };
const GRANTABLE_ACCESS_LEVELS: AccessLevel[] = ['editor', 'viewer', 'owner'];

const VISIBILITY_OPTIONS: Record<VisibilityKey, IVisibilityOption> = {
  restricted: { label: 'Restricted', description: 'Only people explicitly added can open', icon: 'lock_outline' },
  organization: { label: `Anyone at ${ORGANIZATION_NAME}`, description: `Anyone in the ${ORGANIZATION_NAME} domain can view`, icon: 'business' }
};

const DIRECTORY: IPerson[] = [
  { id: 'u1', name: 'Jordan Rivera', email: 'jordan.rivera@acme.example' },
  { id: 'u2', name: 'Priya Natarajan', email: 'priya.natarajan@acme.example' },
  { id: 'u3', name: 'Marcus Webb', email: 'marcus.webb@acme.example' },
  { id: 'u4', name: 'Elena Kowalski', email: 'elena.kowalski@acme.example' },
  { id: 'u5', name: 'Samir Haddad', email: 'samir.haddad@acme.example' },
  { id: 'u6', name: 'Tomás Herrera', email: 'tomas.herrera@acme.example' }
];

let members: IMember[] = [
  { ...DIRECTORY[0], accessLevel: 'owner' },
  { ...DIRECTORY[1], accessLevel: 'editor' },
  { ...DIRECTORY[2], accessLevel: 'viewer' }
];
let newMemberAccessLevel: AccessLevel = 'editor';
let visibility: VisibilityKey = 'restricted';

const byId = <T extends HTMLElement>(id: string): T => document.getElementById(id) as T;

const shareDialog = byId<IDialogComponent & HTMLElement>('share-dialog');
const addMemberInput = byId<HTMLInputElement>('add-member-input');
const addMemberResults = byId<IPopoverComponent & HTMLElement>('add-member-results');
const addMemberResultsList = byId('add-member-results-list');
const newMemberAccessMenu = byId<IMenuComponent & HTMLElement>('new-member-access-menu');
const newMemberAccessLabel = byId('new-member-access-label');
const memberList = byId('member-list');
const visibilityTrigger = byId('visibility-trigger');
const visibilityLabel = byId('visibility-label');
const visibilityDescription = byId('visibility-description');
const visibilityIcon = byId('visibility-icon');
const visibilityOptionsList = byId('visibility-options');
const visibilityPopover = byId<IPopoverComponent & HTMLElement>('visibility-popover');
const copyLinkButton = byId('copy-link-btn');
const toast = byId<HTMLElement & { open: boolean; theme: string }>('share-toast');

const createElement = <K extends keyof HTMLElementTagNameMap>(
  tag: K,
  { text, className, slot, attributes }: { text?: string; className?: string; slot?: string; attributes?: Record<string, string> } = {},
  ...children: Node[]
): HTMLElementTagNameMap[K] => {
  const element = document.createElement(tag);
  if (text !== undefined) {
    element.textContent = text;
  }
  if (className) {
    element.className = className;
  }
  if (slot) {
    element.slot = slot;
  }
  Object.entries(attributes ?? {}).forEach(([name, value]) => element.setAttribute(name, value));
  element.append(...children);
  return element;
};

const getDisplayName = ({ name, email }: IPerson): string => name || email;

const getInitials = ({ name, email }: IPerson): string =>
  (name
    ? name
        .split(' ')
        .map(part => part[0])
        .join('')
    : email
  )
    .slice(0, 2)
    .toUpperCase();

const showToast = (message: string, theme: ToastTheme = 'success'): void => {
  toast.textContent = message;
  toast.theme = theme;
  toast.open = true;
};

const accessLevelOptions = (selected: AccessLevel): IMenuOption[] =>
  GRANTABLE_ACCESS_LEVELS.map(level => ({ value: level, label: ACCESS_LEVEL_LABELS[level], selected: level === selected }));

const renderNewMemberAccessMenu = (): void => {
  newMemberAccessMenu.options = accessLevelOptions(newMemberAccessLevel);
  newMemberAccessLabel.textContent = ACCESS_LEVEL_LABELS[newMemberAccessLevel];
};

const createPersonItem = (person: IPerson, ...primary: Node[]): HTMLElement =>
  createElement(
    'forge-list-item' as 'div',
    {},
    createElement('forge-avatar' as 'div', { slot: 'start', attributes: { text: getInitials(person) } }),
    ...primary,
    createElement('span', { slot: 'secondary-text', className: 'text-medium', text: person.name ? person.email : '' })
  );

const createReadOnlyAccess = (member: IMember, tooltipText?: string): HTMLElement[] => {
  const labelId = `access-label-${member.id}`;
  const label = createElement('span', {
    slot: 'end',
    className: 'text-body1 text-medium',
    text: ACCESS_LEVEL_LABELS[member.accessLevel],
    attributes: tooltipText ? { id: labelId, tabindex: '0' } : {}
  });
  if (!tooltipText) {
    return [label];
  }

  return [label, createElement('forge-tooltip' as 'div', { text: tooltipText, attributes: { anchor: labelId, delay: '0' } })];
};

const createAccessMenu = (member: IMember): IMenuComponent => {
  const menu = createElement(
    'forge-menu' as 'div',
    { slot: 'end' },
    createElement(
      'forge-button' as 'div',
      { attributes: { variant: 'text', 'aria-label': `Change access for ${getDisplayName(member)}` } },
      document.createTextNode(ACCESS_LEVEL_LABELS[member.accessLevel]),
      createElement('forge-icon' as 'div', { slot: 'end', attributes: { name: 'arrow_drop_down' } })
    )
  ) as unknown as IMenuComponent & HTMLElement;
  menu.options = [
    ...accessLevelOptions(member.accessLevel),
    { value: 'access-level-divider', label: '', divider: true },
    { value: REMOVE_OPTION_VALUE, label: 'Remove user', optionClass: REMOVE_OPTION_CLASS }
  ];
  menu.addEventListener('forge-menu-select', (event: Event) => {
    const { value } = (event as CustomEvent<IMenuSelectEventData<string>>).detail;
    if (value === REMOVE_OPTION_VALUE) {
      members = members.filter(({ id }) => id !== member.id);
      showToast(MESSAGES.memberRemoved);
    } else if (value !== member.accessLevel) {
      members = members.map(existing => (existing.id === member.id ? { ...existing, accessLevel: value as AccessLevel } : existing));
      showToast(MESSAGES.accessUpdated);
    }
    renderMembers();
  });
  return menu;
};

const createMemberItem = (member: IMember, ownerCount: number): HTMLElement => {
  const isCurrentUser = member.id === CURRENT_USER_ID;
  const isOnlyOwner = ownerCount === 1 && member.accessLevel === 'owner';
  const badge = createElement('forge-badge' as 'div', {
    className: 'inline-flex align-middle ml-xsmall',
    text: 'you',
    attributes: { theme: 'info-secondary' }
  });
  const item = createPersonItem(member, document.createTextNode(getDisplayName(member)), ...(isCurrentUser ? [badge] : []));

  if (isCurrentUser) {
    item.append(...createReadOnlyAccess(member));
  } else if (isOnlyOwner) {
    item.append(...createReadOnlyAccess(member, MESSAGES.onlyOwner));
  } else {
    item.append(createAccessMenu(member));
  }
  return item;
};

const renderMembers = (): void => {
  const sorted = [...members].sort((a, b) => ACCESS_LEVEL_ORDER[a.accessLevel] - ACCESS_LEVEL_ORDER[b.accessLevel]);
  const ownerCount = sorted.filter(({ accessLevel }) => accessLevel === 'owner').length;
  memberList.replaceChildren(...sorted.map(member => createMemberItem(member, ownerCount)));
};

const setSearchResultsOpen = (open: boolean): void => {
  addMemberResults.open = open;
  addMemberInput.setAttribute('aria-expanded', String(open));
};

const createResultItem = (person: IPerson): HTMLElement => {
  const item = createPersonItem(person, createElement('button', { text: getDisplayName(person), attributes: { type: 'button' } }));
  return Object.assign(item, { value: person.id });
};

const createInviteItem = (email: string): HTMLElement =>
  Object.assign(
    createElement(
      'forge-list-item' as 'div',
      {},
      createElement('forge-avatar' as 'div', { slot: 'start' }, createElement('forge-icon' as 'div', { attributes: { name: 'person_add_alt' } })),
      createElement('button', { text: `Add ${email}`, attributes: { type: 'button' } }),
      createElement('span', { slot: 'secondary-text', className: 'text-medium', text: MESSAGES.inviteHint })
    ),
    { value: `${EMAIL_ID_PREFIX}${email}` }
  );

const renderSearchResults = (): void => {
  const rawQuery = addMemberInput.value.trim();
  const query = rawQuery.toLowerCase();
  if (query.length < MINIMUM_SEARCH_LENGTH) {
    setSearchResultsOpen(false);
    return;
  }

  const memberIds = new Set(members.map(({ id }) => id));
  const matches = DIRECTORY.filter(
    person => !memberIds.has(person.id) && (person.name?.toLowerCase().includes(query) || person.email.toLowerCase().includes(query))
  );
  const isKnownEmail = [...DIRECTORY, ...members].some(({ email }) => email.toLowerCase() === query);
  const canInvite = EMAIL_PATTERN.test(rawQuery) && !isKnownEmail;

  const items = matches.map(createResultItem);
  if (canInvite) {
    items.push(createInviteItem(rawQuery));
  }
  if (!items.length) {
    items.push(createElement('forge-list-item' as 'div', { text: 'No users found', attributes: { noninteractive: '' } }));
  }

  addMemberResultsList.replaceChildren(...items);
  setSearchResultsOpen(true);
};

const resolvePerson = (personId: string): IPerson | undefined =>
  personId.startsWith(EMAIL_ID_PREFIX) ? { id: personId, email: personId.slice(EMAIL_ID_PREFIX.length) } : DIRECTORY.find(({ id }) => id === personId);

const addMember = (personId: string): void => {
  const person = resolvePerson(personId);
  if (!person) {
    return;
  }

  members = [...members, { ...person, accessLevel: newMemberAccessLevel }];
  addMemberInput.value = '';
  setSearchResultsOpen(false);
  renderMembers();
  showToast(MESSAGES.memberAdded);
};

const createVisibilityOption = (key: VisibilityKey, { label, description, icon }: IVisibilityOption): HTMLElement => {
  const item = createElement(
    'forge-list-item' as 'div',
    {},
    createElement('forge-avatar' as 'div', { slot: 'start' }, createElement('forge-icon' as 'div', { attributes: { name: icon } })),
    createElement('button', { text: label, attributes: { type: 'button' } }),
    createElement('span', { slot: 'secondary-text', className: 'text-medium', text: description })
  );
  return Object.assign(item, { value: key });
};

const setVisibility = (next: VisibilityKey): void => {
  visibility = next;
  const { label, description, icon } = VISIBILITY_OPTIONS[next];
  visibilityLabel.textContent = label;
  visibilityDescription.textContent = description;
  visibilityIcon.setAttribute('name', icon);
};

const initializeLabels = (): void => {
  byId('share-dialog-title').textContent = `Share "${RESOURCE_NAME}"`;
  byId('share-dialog-subtitle').textContent = `Manage who has access to this ${RESOURCE_NOUN}`;
  visibilityTrigger.setAttribute('aria-label', `Change who can access this ${RESOURCE_NOUN}`);
};

const copyLink = async (): Promise<void> => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    showToast(MESSAGES.linkCopied);
  } catch (error) {
    showToast(`Failed to copy link: ${error instanceof Error ? error.message : String(error)}`, 'danger');
  }
};

byId('open-share-dialog-btn').addEventListener('click', () => (shareDialog.open = true));
byId('close-share-dialog-btn').addEventListener('click', () => (shareDialog.open = false));
byId('done-share-dialog-btn').addEventListener('click', () => (shareDialog.open = false));
shareDialog.addEventListener('forge-dialog-close', () => (shareDialog.open = false));

addMemberInput.addEventListener('input', renderSearchResults);
addMemberInput.addEventListener('keydown', ({ key }) => {
  if (key === 'Escape' && addMemberResults.open) {
    setSearchResultsOpen(false);
  }
});
addMemberInput.addEventListener('blur', ({ relatedTarget }) => {
  if (!(relatedTarget instanceof Node) || !addMemberResults.contains(relatedTarget)) {
    setSearchResultsOpen(false);
  }
});
addMemberResultsList.addEventListener('forge-list-item-select', (event: Event) => {
  addMember((event as CustomEvent<IListItemSelectEventData<string>>).detail.value);
});
newMemberAccessMenu.addEventListener('forge-menu-select', (event: Event) => {
  newMemberAccessLevel = (event as CustomEvent<IMenuSelectEventData<AccessLevel>>).detail.value!;
  renderNewMemberAccessMenu();
});

visibilityTrigger.addEventListener('click', () => (visibilityPopover.open = !visibilityPopover.open));
visibilityOptionsList.addEventListener('forge-list-item-select', (event: Event) => {
  const key = (event as CustomEvent<IListItemSelectEventData<VisibilityKey>>).detail.value;
  visibilityPopover.open = false;
  if (key !== visibility) {
    setVisibility(key);
    showToast(MESSAGES.visibilityUpdated);
  }
});

if (typeof navigator !== 'undefined' && Boolean(navigator.clipboard?.writeText)) {
  copyLinkButton.addEventListener('click', copyLink);
} else {
  copyLinkButton.hidden = true;
}

initializeLabels();
visibilityOptionsList.replaceChildren(
  ...(Object.entries(VISIBILITY_OPTIONS) as [VisibilityKey, IVisibilityOption][]).map(([key, option]) => createVisibilityOption(key, option))
);
renderNewMemberAccessMenu();
renderMembers();
setVisibility(visibility);
