import type { IAutocompleteComponent, IAutocompleteOption, IAutocompleteSelectEventData } from '@tylertech/forge/autocomplete';
import type { IDialogComponent } from '@tylertech/forge/dialog';
import { IconRegistry } from '@tylertech/forge/icon';
import type { IMenuComponent, IMenuOption, IMenuSelectEventData } from '@tylertech/forge/menu';
import { tylIconArrowDropDown, tylIconBusiness, tylIconLink, tylIconLockOutline, tylIconPersonAddAlt } from '@tylertech/tyler-icons';

IconRegistry.define([tylIconArrowDropDown, tylIconBusiness, tylIconLink, tylIconLockOutline, tylIconPersonAddAlt]);

type AccessLevel = 'owner' | 'editor' | 'viewer';
type Visibility = 'restricted' | 'organization';

interface IPerson {
  id: string;
  name?: string;
  email: string;
}

interface IMember extends IPerson {
  accessLevel: AccessLevel;
}

const CURRENT_USER_ID = 'u1';
const REMOVE_VALUE = 'remove';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MINIMUM_SEARCH_LENGTH = 2;

const ACCESS_LEVEL_LABELS: Record<AccessLevel, string> = {
  owner: 'Owner',
  editor: 'Can edit',
  viewer: 'Can view'
};
const ACCESS_LEVEL_ORDER: AccessLevel[] = ['owner', 'editor', 'viewer'];

const VISIBILITY_OPTIONS: IMenuOption<Visibility>[] = [
  {
    value: 'restricted',
    label: 'Restricted',
    secondaryLabel: 'Only people specifically added can open',
    leadingIcon: 'lock_outline',
    leadingIconType: 'component'
  },
  {
    value: 'organization',
    label: 'Anyone at Acme Corp',
    secondaryLabel: 'Anyone in the Acme Corp organization can view',
    leadingIcon: 'business',
    leadingIconType: 'component'
  }
];

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
let visibility: Visibility = 'restricted';
let newMemberAccessLevel: AccessLevel = 'editor';
let appliedMembers: IMember[] = members;
let appliedVisibility: Visibility = visibility;

const dialog = document.getElementById('share-dialog') as IDialogComponent;
const autocomplete = document.getElementById('add-member-autocomplete') as IAutocompleteComponent;
const addMemberInput = document.getElementById('add-member-input') as HTMLInputElement;
const newMemberAccessMenu = document.getElementById('new-member-access-menu') as IMenuComponent;
const newMemberAccessLabel = document.getElementById('new-member-access-label') as HTMLElement;
const memberList = document.getElementById('member-list') as HTMLElement;
const memberTemplate = document.getElementById('member-item-template') as HTMLTemplateElement;
const visibilityMenu = document.getElementById('visibility-menu') as IMenuComponent;
const visibilityIcon = document.getElementById('visibility-icon') as HTMLElement;
const visibilityLabel = document.getElementById('visibility-label') as HTMLElement;
const visibilityDescription = document.getElementById('visibility-description') as HTMLElement;
const copyLinkBtn = document.getElementById('copy-link-btn') as HTMLElement;

const accessLevelOptions = (selected: AccessLevel): IMenuOption<string>[] =>
  ACCESS_LEVEL_ORDER.map(level => ({ value: level, label: ACCESS_LEVEL_LABELS[level], selected: level === selected }));

const createAccessMenu = (member: IMember): HTMLElement => {
  const menu = document.createElement('forge-menu');
  menu.persistSelection = true;
  menu.options = [
    ...accessLevelOptions(member.accessLevel),
    { value: 'divider', label: '', divider: true },
    { value: REMOVE_VALUE, label: 'Remove user', optionClass: 'text-error' }
  ];

  const button = document.createElement('forge-button');
  button.variant = 'text';
  button.setAttribute('aria-label', `Change access for ${member.name ?? member.email}`);
  button.append(ACCESS_LEVEL_LABELS[member.accessLevel]);

  const icon = document.createElement('forge-icon');
  icon.slot = 'end';
  icon.name = 'arrow_drop_down';
  button.append(icon);
  menu.append(button);

  menu.addEventListener('forge-menu-select', ({ detail }: CustomEvent<IMenuSelectEventData<string>>) => {
    members =
      detail.value === REMOVE_VALUE
        ? members.filter(({ id }) => id !== member.id)
        : members.map(existing => (existing.id === member.id ? { ...existing, accessLevel: detail.value as AccessLevel } : existing));
    renderMembers();
  });
  return menu;
};

const createReadOnlyAccess = (member: IMember, tooltipText?: string): HTMLElement => {
  const label = document.createElement('span');
  label.className = 'text-body1 text-medium px-small';
  label.textContent = ACCESS_LEVEL_LABELS[member.accessLevel];
  if (!tooltipText) {
    return label;
  }

  label.tabIndex = 0;
  const wrapper = document.createElement('span');
  const tooltip = document.createElement('forge-tooltip');
  tooltip.textContent = tooltipText;
  wrapper.append(label, tooltip);
  return wrapper;
};

const createMemberItem = (member: IMember, ownerCount: number): DocumentFragment => {
  const item = document.importNode(memberTemplate.content, true);
  const isCurrentUser = member.id === CURRENT_USER_ID;
  const isOnlyOwner = member.accessLevel === 'owner' && ownerCount === 1;

  (item.querySelector('[data-avatar]') as HTMLElement).setAttribute('text', member.name ?? member.email);
  (item.querySelector('[data-name]') as HTMLElement).textContent = member.name ?? member.email;
  (item.querySelector('[data-email]') as HTMLElement).textContent = member.name ? member.email : '';
  (item.querySelector('[data-you-badge]') as HTMLElement).hidden = !isCurrentUser;

  const access = item.querySelector('[data-access]') as HTMLElement;
  if (isCurrentUser) {
    access.append(createReadOnlyAccess(member));
  } else if (isOnlyOwner) {
    access.append(createReadOnlyAccess(member, 'A report must always have at least one owner'));
  } else {
    access.append(createAccessMenu(member));
  }
  return item;
};

const renderMembers = (): void => {
  const ownerCount = members.filter(({ accessLevel }) => accessLevel === 'owner').length;
  memberList.replaceChildren(...members.map(member => createMemberItem(member, ownerCount)));
};

const setNewMemberAccessLevel = (level: AccessLevel): void => {
  newMemberAccessLevel = level;
  newMemberAccessLabel.textContent = ACCESS_LEVEL_LABELS[level];
  newMemberAccessMenu.options = accessLevelOptions(level);
};

const setVisibility = (value: Visibility): void => {
  visibility = value;
  const option = VISIBILITY_OPTIONS.find(o => o.value === value) as IMenuOption<Visibility>;
  visibilityIcon.setAttribute('name', option.leadingIcon as string);
  visibilityLabel.textContent = option.label;
  visibilityDescription.textContent = option.secondaryLabel as string;
  visibilityMenu.options = VISIBILITY_OPTIONS.map(o => ({ ...o, selected: o.value === value }));
};

autocomplete.filter = (filterText: string): IAutocompleteOption<string>[] => {
  const query = filterText.trim().toLowerCase();
  if (query.length < MINIMUM_SEARCH_LENGTH) {
    return [];
  }

  const memberIds = new Set(members.map(({ id }) => id));
  const matches: IAutocompleteOption<string>[] = DIRECTORY.filter(
    ({ id, name, email }) => !memberIds.has(id) && (name?.toLowerCase().includes(query) || email.toLowerCase().includes(query))
  ).map(({ id, name, email }) => ({ value: id, label: name ?? email, secondaryLabel: email }));

  const isKnownEmail = [...DIRECTORY, ...members].some(({ email }) => email.toLowerCase() === query);
  if (EMAIL_PATTERN.test(filterText.trim()) && !isKnownEmail) {
    matches.push({ value: filterText.trim(), label: `Add ${filterText.trim()}`, secondaryLabel: 'Add by email address' });
  }
  return matches;
};

autocomplete.addEventListener('forge-autocomplete-select', ({ detail }: CustomEvent<IAutocompleteSelectEventData<string>>) => {
  const person = DIRECTORY.find(({ id }) => id === detail.value) ?? { id: detail.value, email: detail.value };
  members = [...members, { ...person, accessLevel: newMemberAccessLevel }];
  addMemberInput.value = '';
  renderMembers();
});

newMemberAccessMenu.addEventListener('forge-menu-select', ({ detail }: CustomEvent<IMenuSelectEventData<AccessLevel>>) => {
  setNewMemberAccessLevel(detail.value as AccessLevel);
});

visibilityMenu.addEventListener('forge-menu-select', ({ detail }: CustomEvent<IMenuSelectEventData<Visibility>>) => {
  setVisibility(detail.value as Visibility);
});

copyLinkBtn.addEventListener('click', async () => {
  await navigator.clipboard?.writeText(window.location.href);
});

const resetChanges = (): void => {
  members = appliedMembers;
  setVisibility(appliedVisibility);
  addMemberInput.value = '';
  renderMembers();
};

document.getElementById('open-share-dialog-btn')?.addEventListener('click', () => {
  dialog.open = true;
});

document.getElementById('close-dialog-btn')?.addEventListener('click', () => {
  dialog.open = false;
});

document.getElementById('cancel-btn')?.addEventListener('click', () => {
  dialog.open = false;
});

document.getElementById('apply-btn')?.addEventListener('click', () => {
  appliedMembers = members;
  appliedVisibility = visibility;
  dialog.open = false;
});

dialog.addEventListener('forge-dialog-close', resetChanges);

setNewMemberAccessLevel(newMemberAccessLevel);
setVisibility(visibility);
renderMembers();
