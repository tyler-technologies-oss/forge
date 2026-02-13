import '$src/shared';
import '@tylertech/forge/button';
import '@tylertech/forge/card';
import '@tylertech/forge/focus-group';
import type { FocusGroupBehavior, FocusGroupComponent, FocusGroupDirection } from '@tylertech/forge/focus-group';
import '@tylertech/forge/icon';
import { IconRegistry } from '@tylertech/forge/icon';
import '@tylertech/forge/icon-button';
import type { ISelectComponent } from '@tylertech/forge/select';
import type { ISwitchComponent } from '@tylertech/forge/switch';
import {
  tylIconContentCopy,
  tylIconContentCut,
  tylIconContentPaste,
  tylIconDelete,
  tylIconFormatAlignCenter,
  tylIconFormatAlignLeft,
  tylIconFormatAlignRight,
  tylIconFormatBold,
  tylIconFormatItalic,
  tylIconFormatStrikethrough,
  tylIconFormatUnderlined,
  tylIconHome,
  tylIconPerson,
  tylIconPrint,
  tylIconRedo,
  tylIconSave,
  tylIconSearch,
  tylIconSettings,
  tylIconShare,
  tylIconUndo
} from '@tylertech/tyler-icons';
import './focus-group.scss';

IconRegistry.define([
  tylIconUndo,
  tylIconRedo,
  tylIconContentCopy,
  tylIconContentCut,
  tylIconContentPaste,
  tylIconSave,
  tylIconPrint,
  tylIconShare,
  tylIconDelete,
  tylIconFormatBold,
  tylIconFormatItalic,
  tylIconFormatUnderlined,
  tylIconFormatStrikethrough,
  tylIconFormatAlignLeft,
  tylIconFormatAlignCenter,
  tylIconFormatAlignRight,
  tylIconHome,
  tylIconSearch,
  tylIconSettings,
  tylIconPerson
]);

function getFocusGroups(): FocusGroupComponent[] {
  return Array.from(document.querySelectorAll<FocusGroupComponent>('forge-focus-group'));
}

// Log focus events for debugging
const demoContainer = document.querySelector('.focus-group-demo-container');
demoContainer?.addEventListener('focusin', (evt: FocusEvent) => {
  const target = evt.target as HTMLElement;
  if (target.closest('forge-focus-group')) {
  }
});

// Behavior control
const behaviorSelect = document.querySelector('#opt-behavior') as ISelectComponent;
behaviorSelect?.addEventListener('change', ({ detail: value }: CustomEvent<string>) => {
  const behavior = value || undefined;
  getFocusGroups().forEach(focusGroup => {
    focusGroup.behavior = behavior as FocusGroupBehavior;
  });
});

// Direction control
const directionSelect = document.querySelector('#opt-direction') as ISelectComponent;
directionSelect?.addEventListener('change', ({ detail: value }: CustomEvent<string>) => {
  const direction = value as FocusGroupDirection;
  getFocusGroups().forEach(focusGroup => {
    focusGroup.direction = direction;
  });
});

// Wrap control
const wrapSwitch = document.querySelector('#opt-wrap') as ISwitchComponent;
wrapSwitch?.addEventListener('forge-switch-change', ({ detail: checked }) => {
  getFocusGroups().forEach(focusGroup => {
    focusGroup.wrap = checked;
  });
});

// No memory control
const noMemorySwitch = document.querySelector('#opt-no-memory') as ISwitchComponent;
noMemorySwitch?.addEventListener('forge-switch-change', ({ detail: checked }) => {
  getFocusGroups().forEach(focusGroup => {
    focusGroup.noMemory = checked;
  });
});
