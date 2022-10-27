export interface IKeyboardShortcutProps {
  key: string;
  global: boolean;
  allowWhileTyping: boolean;
  preventDefault: boolean;
  capture: boolean;
  useCode: boolean;
  disabled: boolean;
}

export const argTypes = {
  key: {
    control: 'text',
    table: {
      category: 'Properties'
    }
  },
  global: {
    control: 'boolean',
    table: {
      category: 'Properties'
    }
  },
  allowWhileTyping: {
    control: 'boolean',
    table: {
      category: 'Properties'
    }
  },
  preventDefault: {
    control: 'boolean',
    table: {
      category: 'Properties'
    }
  },
  capture: {
    control: 'boolean',
    table: {
      category: 'Properties'
    }
  },
  useCode: {
    control: 'boolean',
    table: {
      category: 'Properties'
    }
  },
  disabled: {
    control: 'boolean',
    table: {
      category: 'Properties'
    }
  },
}
