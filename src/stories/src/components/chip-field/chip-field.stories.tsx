import { Meta, Story } from '@storybook/react';
import { argTypes, IChipFieldProps } from './chip-field-args';
import React, { useEffect, useRef, useState, MutableRefObject } from 'react';
import { ForgeChipField, ForgeIcon, ForgeIconButton, ForgeAutocomplete, ForgeChip } from '@tylertech/forge-react';
import { tylIconEvent, tylIconMoreVert, tylIconSend } from '@tylertech/tyler-icons/standard';
import { IconRegistry, AutocompleteFilterCallback, IAutocompleteSelectEventData, IChipComponent, IOption, IChipFieldComponent } from '@tylertech/forge';

const MDX = require('./chip-field.mdx').default;

export default {
  title: 'Components/Chip Field',
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default: Story<IChipFieldProps> = ({
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
  setValueOnBlur = false
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
      setValueOnBlur={setValueOnBlur}
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
Default.argTypes = argTypes;
Default.args = {
  density: 'default',
  floatLabelType: 'auto',
  shape: 'default',
  label: 'Fruits',
  invalid: false,
  required: false,
  disabled: false,
  hasPlaceholder: false,
  hasLabel: true,
  hasLeading: false,
  hasTrailing: false,
  hasHelperText: false,
  hasAddonEnd: false,
  setValueOnBlur: false
} as IChipFieldProps;

export const WithAutocomplete: Story<{}> = () => {
  const inputRef = useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  function memberRemoved(evt: CustomEvent<IChipComponent>): void {
    removeValue(evt.detail.value);
  }

  function removeValue(value: string): void {
    setSelectedOptions(selectedOptions.filter(v => v !== value));
  }

  const onFilter: AutocompleteFilterCallback = filterText => {
    const availableStates = STATES.filter(state => !selectedOptions.some(value => value === state.value));
    return availableStates.filter(opt => opt.label.toLowerCase().includes(filterText.toLowerCase()));
  };

  const onAutocompleteSelect = ({ detail: { value } }: CustomEvent<IAutocompleteSelectEventData>) => {
    const isSelected = selectedOptions.some(v => v === value);
    if (!isSelected) {
      setSelectedOptions([...selectedOptions, value]);
      inputRef.current!.value = '';
    }
  };

  function getOptionByValue(value: string): IOption | undefined {
    return STATES.find(s => s.value === value);
  }

  return (
    <ForgeAutocomplete mode="stateless" filter={onFilter} on-forge-autocomplete-select={onAutocompleteSelect}>
      <ForgeChipField on-forge-chip-field-member-removed={memberRemoved}>
        {selectedOptions.map(value => {
          const option = getOptionByValue(value);
          return (
            <ForgeChip key={value} slot="member" type="field" dense on-forge-chip-delete={() => removeValue(value)} value={value}>
              {option?.label}
            </ForgeChip>
          );
        })}
        <label slot="label" htmlFor="chip-field-input">Favorite states</label>
        <input ref={inputRef} autoComplete="off" type="text" id="chip-field-input" />
        <div slot="helper-text">Select your favorite states</div>
      </ForgeChipField>
    </ForgeAutocomplete>
  );
};
WithAutocomplete.parameters = {
  controls: { disable: true }
};

const STATES: IOption[] = [
  { label: 'Alabama', value: 'AL' },
  { label: 'Alaska', value: 'AK' },
  { label: 'Arizona', value: 'AZ' },
  { label: 'Arkansas', value: 'AR' },
  { label: 'California', value: 'CA' },
  { label: 'Colorado', value: 'CO' },
  { label: 'Connecticut', value: 'CT' },
  { label: 'Delaware', value: 'DE' },
  { label: 'Florida', value: 'FL' },
  { label: 'Georgia', value: 'GA' },
  { label: 'Hawaii', value: 'HI' },
  { label: 'Idaho', value: 'ID' },
  { label: 'Illinois', value: 'IL' },
  { label: 'Indiana', value: 'IN' },
  { label: 'Iowa', value: 'IA' },
  { label: 'Kansas', value: 'KS' },
  { label: 'Kentucky', value: 'KY' },
  { label: 'Louisiana', value: 'LA' },
  { label: 'Maine', value: 'ME' },
  { label: 'Maryland', value: 'MD' },
  { label: 'Massachusetts', value: 'MA' },
  { label: 'Michigan', value: 'MI' },
  { label: 'Minnesota', value: 'MN' },
  { label: 'Mississippi', value: 'MS' },
  { label: 'Missouri', value: 'MO' },
  { label: 'Montana', value: 'MT' },
  { label: 'Nebraska', value: 'NE' },
  { label: 'Nevada', value: 'NV' },
  { label: 'New Hampshire', value: 'NH' },
  { label: 'New Jersey', value: 'NJ' },
  { label: 'New Mexico', value: 'NM' },
  { label: 'New York', value: 'NY' },
  { label: 'North Carolina', value: 'NC' },
  { label: 'North Dakota', value: 'ND' },
  { label: 'Ohio', value: 'OH' },
  { label: 'Oklahoma', value: 'OK' },
  { label: 'Oregon', value: 'OR' },
  { label: 'Pennsylvania', value: 'PA' },
  { label: 'Rhode Island', value: 'RI' },
  { label: 'South Carolina', value: 'SC' },
  { label: 'South Dakota', value: 'SD' },
  { label: 'Tennessee', value: 'TN' },
  { label: 'Texas', value: 'TX' },
  { label: 'Utah', value: 'UT' },
  { label: 'Vermont', value: 'VT' },
  { label: 'Virginia', value: 'VA' },
  { label: 'Washington', value: 'WA' },
  { label: 'West Virginia', value: 'WV' },
  { label: 'Wisconsin', value: 'WI' },
  { label: 'Wyoming', value: 'WY' }
];
