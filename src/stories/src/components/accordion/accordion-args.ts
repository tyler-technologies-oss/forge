export interface IAccordionProps {
  panelSelector: string;
}

export const argTypes = {
  panelSelector: {
    control: 'text',
    description: '',
    table: {
      category: 'Properties',
    },
  },
};
