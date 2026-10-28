import { IconRegistry } from "@tylertech/forge/icon";
import { tylIconArrowDropDown, tylIconBusiness, tylIconGroup, tylIconLink, tylIconLockOutline, tylIconPersonAddAlt } from "@tylertech/tyler-icons";
IconRegistry.define([tylIconArrowDropDown, tylIconBusiness, tylIconGroup, tylIconLink, tylIconLockOutline, tylIconPersonAddAlt]);
const GROUP_ID_PREFIX = "group:";
const CURRENT_USER_ID = "u1";
const REMOVE_VALUE = "remove";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MINIMUM_SEARCH_LENGTH = 2;
const ACCESS_LEVEL_LABELS = {
  owner: "Owner",
  editor: "Can edit",
  viewer: "Can view"
};
const ACCESS_LEVEL_ORDER = ["owner", "editor", "viewer"];
const GROUP_ACCESS_LEVEL_ORDER = ["editor", "viewer"];
const VISIBILITY_OPTIONS = [
  {
    value: "restricted",
    label: "Restricted",
    secondaryLabel: "Only people specifically added can open",
    leadingIcon: "lock_outline",
    leadingIconType: "component"
  },
  {
    value: "organization",
    label: "Anyone at Acme Corp",
    secondaryLabel: "Anyone in the Acme Corp organization can view",
    leadingIcon: "business",
    leadingIconType: "component"
  }
];
const DIRECTORY = [
  { id: "u1", name: "Jordan Rivera", email: "jordan.rivera@acme.example" },
  { id: "u2", name: "Priya Natarajan", email: "priya.natarajan@acme.example" },
  { id: "u3", name: "Marcus Webb", email: "marcus.webb@acme.example" },
  { id: "u4", name: "Elena Kowalski", email: "elena.kowalski@acme.example" },
  { id: "u5", name: "Samir Haddad", email: "samir.haddad@acme.example" },
  { id: "u6", name: "Tom\xE1s Herrera", email: "tomas.herrera@acme.example" }
];
const GROUPS = [
  { id: "g1", name: "Engineering", description: "Team \xB7 3 people" },
  { id: "g2", name: "Design", description: "Team \xB7 2 people" },
  { id: "g3", name: "Administrators", description: "Role \xB7 membership updates automatically" }
];
let groupMembers = [];
let members = [
  { ...DIRECTORY[0], accessLevel: "owner" },
  { ...DIRECTORY[1], accessLevel: "editor" },
  { ...DIRECTORY[2], accessLevel: "viewer" }
];
let visibility = "restricted";
let newMemberAccessLevel = "editor";
let appliedMembers = members;
let appliedGroupMembers = groupMembers;
let appliedVisibility = visibility;
const dialog = document.getElementById("share-dialog");
const autocomplete = document.getElementById("add-member-autocomplete");
const addMemberInput = document.getElementById("add-member-input");
const newMemberAccessMenu = document.getElementById("new-member-access-menu");
const newMemberAccessLabel = document.getElementById("new-member-access-label");
const memberList = document.getElementById("member-list");
const memberTemplate = document.getElementById("member-item-template");
const visibilityMenu = document.getElementById("visibility-menu");
const visibilityIcon = document.getElementById("visibility-icon");
const visibilityLabel = document.getElementById("visibility-label");
const visibilityDescription = document.getElementById("visibility-description");
const copyLinkBtn = document.getElementById("copy-link-btn");
const accessLevelOptions = (selected, levels = ACCESS_LEVEL_ORDER) => levels.map((level) => ({ value: level, label: ACCESS_LEVEL_LABELS[level], selected: level === selected }));
const createAccessMenu = (displayName, accessLevel, levels, removeLabel, onChange) => {
  const menu = document.createElement("forge-menu");
  menu.persistSelection = true;
  menu.options = [
    ...accessLevelOptions(accessLevel, levels),
    { value: "divider", label: "", divider: true },
    { value: REMOVE_VALUE, label: removeLabel, optionClass: "text-error" }
  ];
  const button = document.createElement("forge-button");
  button.variant = "text";
  button.setAttribute("aria-label", `Change access for ${displayName}`);
  button.append(ACCESS_LEVEL_LABELS[accessLevel]);
  const icon = document.createElement("forge-icon");
  icon.slot = "end";
  icon.name = "arrow_drop_down";
  button.append(icon);
  menu.append(button);
  menu.addEventListener("forge-menu-select", ({ detail }) => {
    onChange(detail.value);
    renderMembers();
  });
  return menu;
};
const createMemberAccessMenu = (member) => createAccessMenu(member.name ?? member.email, member.accessLevel, ACCESS_LEVEL_ORDER, "Remove user", (value) => {
  members = value === REMOVE_VALUE ? members.filter(({ id }) => id !== member.id) : members.map((existing) => existing.id === member.id ? { ...existing, accessLevel: value } : existing);
});
const createGroupAccessMenu = (group) => createAccessMenu(group.name, group.accessLevel, GROUP_ACCESS_LEVEL_ORDER, "Remove group", (value) => {
  groupMembers = value === REMOVE_VALUE ? groupMembers.filter(({ id }) => id !== group.id) : groupMembers.map((existing) => existing.id === group.id ? { ...existing, accessLevel: value } : existing);
});
const createReadOnlyAccess = (member, tooltipText) => {
  const label = document.createElement("span");
  label.className = "text-body1 text-medium px-small";
  label.textContent = ACCESS_LEVEL_LABELS[member.accessLevel];
  if (!tooltipText) {
    return label;
  }
  label.tabIndex = 0;
  const wrapper = document.createElement("span");
  const tooltip = document.createElement("forge-tooltip");
  tooltip.textContent = tooltipText;
  wrapper.append(label, tooltip);
  return wrapper;
};
const createMemberItem = (member, ownerCount) => {
  const item = document.importNode(memberTemplate.content, true);
  const isCurrentUser = member.id === CURRENT_USER_ID;
  const isOnlyOwner = member.accessLevel === "owner" && ownerCount === 1;
  item.querySelector("[data-avatar]").setAttribute("text", member.name ?? member.email);
  item.querySelector("[data-name]").textContent = member.name ?? member.email;
  item.querySelector("[data-email]").textContent = member.name ? member.email : "";
  item.querySelector("[data-you-badge]").hidden = !isCurrentUser;
  const access = item.querySelector("[data-access]");
  if (isCurrentUser) {
    access.append(createReadOnlyAccess(member));
  } else if (isOnlyOwner) {
    access.append(createReadOnlyAccess(member, "A report must always have at least one owner"));
  } else {
    access.append(createMemberAccessMenu(member));
  }
  return item;
};
const createGroupItem = (group) => {
  const item = document.importNode(memberTemplate.content, true);
  const avatar = item.querySelector("[data-avatar]");
  const icon = document.createElement("forge-icon");
  icon.setAttribute("name", "group");
  avatar.append(icon);
  item.querySelector("[data-name]").textContent = group.name;
  item.querySelector("[data-email]").textContent = group.description;
  item.querySelector("[data-access]").append(createGroupAccessMenu(group));
  return item;
};
const renderMembers = () => {
  const ownerCount = members.filter(({ accessLevel }) => accessLevel === "owner").length;
  const sortedGroups = [...groupMembers].sort((a, b) => a.name.localeCompare(b.name));
  memberList.replaceChildren(...members.map((member) => createMemberItem(member, ownerCount)), ...sortedGroups.map(createGroupItem));
};
const setNewMemberAccessLevel = (level) => {
  newMemberAccessLevel = level;
  newMemberAccessLabel.textContent = ACCESS_LEVEL_LABELS[level];
  newMemberAccessMenu.options = accessLevelOptions(level);
};
const setVisibility = (value) => {
  visibility = value;
  const option = VISIBILITY_OPTIONS.find((o) => o.value === value);
  visibilityIcon.setAttribute("name", option.leadingIcon);
  visibilityLabel.textContent = option.label;
  visibilityDescription.textContent = option.secondaryLabel;
  visibilityMenu.options = VISIBILITY_OPTIONS.map((o) => ({ ...o, selected: o.value === value }));
};
autocomplete.filter = (filterText) => {
  const query = filterText.trim().toLowerCase();
  if (query.length < MINIMUM_SEARCH_LENGTH) {
    return [];
  }
  const groupIds = new Set(groupMembers.map(({ id }) => id));
  const groupMatches = GROUPS.filter(({ id, name }) => !groupIds.has(id) && name.toLowerCase().includes(query)).map(
    ({ id, name, description }) => ({
      value: `${GROUP_ID_PREFIX}${id}`,
      label: name,
      secondaryLabel: description,
      leadingIcon: "group",
      leadingIconType: "component"
    })
  );
  const memberIds = new Set(members.map(({ id }) => id));
  const matches = DIRECTORY.filter(
    ({ id, name, email }) => !memberIds.has(id) && (name?.toLowerCase().includes(query) || email.toLowerCase().includes(query))
  ).map(({ id, name, email }) => ({ value: id, label: name ?? email, secondaryLabel: email }));
  const isKnownEmail = [...DIRECTORY, ...members].some(({ email }) => email.toLowerCase() === query);
  if (EMAIL_PATTERN.test(filterText.trim()) && !isKnownEmail) {
    matches.push({ value: filterText.trim(), label: `Add ${filterText.trim()}`, secondaryLabel: "Add by email address" });
  }
  return [...groupMatches, ...matches];
};
autocomplete.addEventListener("forge-autocomplete-select", ({ detail }) => {
  if (detail.value.startsWith(GROUP_ID_PREFIX)) {
    const group = GROUPS.find(({ id }) => id === detail.value.slice(GROUP_ID_PREFIX.length));
    if (group) {
      const accessLevel = newMemberAccessLevel === "viewer" ? "viewer" : "editor";
      groupMembers = [...groupMembers, { ...group, accessLevel }];
    }
    addMemberInput.value = "";
    renderMembers();
    return;
  }
  const person = DIRECTORY.find(({ id }) => id === detail.value) ?? { id: detail.value, email: detail.value };
  members = [...members, { ...person, accessLevel: newMemberAccessLevel }];
  addMemberInput.value = "";
  renderMembers();
});
newMemberAccessMenu.addEventListener("forge-menu-select", ({ detail }) => {
  setNewMemberAccessLevel(detail.value);
});
visibilityMenu.addEventListener("forge-menu-select", ({ detail }) => {
  setVisibility(detail.value);
});
copyLinkBtn.addEventListener("click", async () => {
  await navigator.clipboard?.writeText(window.location.href);
});
const resetChanges = () => {
  members = appliedMembers;
  groupMembers = appliedGroupMembers;
  setVisibility(appliedVisibility);
  addMemberInput.value = "";
  renderMembers();
};
document.getElementById("open-share-dialog-btn")?.addEventListener("click", () => {
  dialog.open = true;
});
document.getElementById("close-dialog-btn")?.addEventListener("click", () => {
  dialog.open = false;
});
document.getElementById("cancel-btn")?.addEventListener("click", () => {
  dialog.open = false;
});
document.getElementById("apply-btn")?.addEventListener("click", () => {
  appliedMembers = members;
  appliedGroupMembers = groupMembers;
  appliedVisibility = visibility;
  dialog.open = false;
});
dialog.addEventListener("forge-dialog-close", resetChanges);
setNewMemberAccessLevel(newMemberAccessLevel);
setVisibility(visibility);
renderMembers();
