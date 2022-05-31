import React, { useEffect, useRef } from 'react';
import { Story } from '@storybook/react';
import { ForgeChipField, ForgeIcon, ForgeIconButton } from '@tylertech/forge-react';
import { IChipFieldProps } from '../chip-field-args';
import { IChipFieldComponent } from '@tylertech/forge';
import { tylIconEvent, tylIconMoreVert, tylIconSend } from '@tylertech/tyler-icons/standard';
import { IconRegistry } from '@tylertech/forge';

export const DefaultTemplate: Story<IChipFieldProps> = ({
  density = 'default',
  floatLabelType = 'auto',
  shape = 'default',
  label = 'Fruits',
  invalid = false,
  required = false,
  disabled = false,
  hasPlaceholder = false,
  hasLabel = true,
  hasLeading = false,
  hasTrailing = false,
  hasHelperText = false,
  hasAddonEnd = false,
}) => {
  const chipFieldRef = useRef<IChipFieldComponent>();
  const addMember = (evt: CustomEvent) => {
    const chipField = chipFieldRef.current as IChipFieldComponent;
    const name = evt.detail;
    const newChip = document.createElement('forge-chip');
    newChip.setAttribute('slot', 'member');
    newChip.setAttribute('type', 'field');
    newChip.setAttribute('dense', '');
    newChip.addEventListener('forge-chip-delete', onChipRemoveButtonClicked);
    newChip.value = name;
    newChip.textContent = name;

    chipField.appendChild(newChip);
  };
  const removeMember = (evt: CustomEvent) => {
    evt.detail.remove();
  };
  const onChipRemoveButtonClicked = (evt: Event) => {
    if (evt.target) {
      const member = evt.target as HTMLElement;
      member.remove();
    }
  };

  useEffect(() => {
    IconRegistry.define([tylIconEvent, tylIconSend, tylIconMoreVert])
  }, []);

  return (
    <ForgeChipField
      ref={chipFieldRef}
      on-forge-chip-field-member-added={evt => addMember(evt)}
      on-forge-chip-field-member-removed={evt => removeMember(evt)}
      density={density}
      floatLabelType={floatLabelType}
      shape={shape}
      invalid={invalid}
      required={required}
      style={{width: '559px'}}>

      {hasLeading && <ForgeIcon slot="leading" name="event" />}
      {hasLabel && <label htmlFor="input-text" slot="label">{label}</label>}

      <input required={required} disabled={disabled} autoComplete={'off'} type="text" id="input-text" placeholder={hasPlaceholder ? 'Enter fruits...' : undefined} />

      {hasTrailing &&
        <ForgeIconButton slot="trailing" dense densityLevel={density === 'dense' ? 6 : 3}>
          <button type="button">
            <ForgeIcon name="send" />
          </button>
        </ForgeIconButton>}

      {hasAddonEnd &&
        <ForgeIconButton slot="addon-end" dense densityLevel={density === 'dense' ? 6 : 3}>
          <button type="button">
            <ForgeIcon name="more_vert" />
          </button>
        </ForgeIconButton>}

      {hasHelperText && <span slot="helper-text">Please enter the names of fruits</span>}
    </ForgeChipField>
  );
};
