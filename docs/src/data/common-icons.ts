export type CommonIconCategory =
  | 'Actions'
  | 'Communications'
  | 'Files & Documents'
  | 'Financial'
  | 'Mapping'
  | 'Navigation'
  | 'Privacy'
  | 'Search & Filter'
  | 'Status/Indicator'
  | 'System & Settings'
  | 'View/Layout';

export type CommonIconLocation = 'App bar' | 'Card/Dialog' | 'Message banner' | 'Navigation drawer' | 'Table row' | 'Toolbar';

export interface CommonIcon {
  readonly label: string;
  readonly icon: string;
  /** The icon for the opposite state of a toggle, like a favorited star. */
  readonly alternate?: { readonly icon: string; readonly state: string };
  readonly guidance: string;
  readonly categories: readonly CommonIconCategory[];
  readonly locations: readonly CommonIconLocation[];
}

export const commonIcons: readonly CommonIcon[] = [
  {
    label: 'Accept',
    icon: 'check_circle_outline',
    guidance: 'Marks a task or process as complete.',
    categories: ['Status/Indicator'],
    locations: ['Card/Dialog', 'Message banner']
  },
  {
    label: 'Add, create, new',
    icon: 'add',
    guidance: 'Adds or creates an item. Put alternate or secondary add actions in a menu.',
    categories: ['Actions'],
    locations: ['Card/Dialog', 'Toolbar']
  },
  {
    label: 'Address, location',
    icon: 'map_marker_outline',
    guidance: 'Identifies an address or location, or marks a point on a map.',
    categories: ['Mapping'],
    locations: ['Card/Dialog']
  },
  {
    label: 'Advanced search',
    icon: 'magnify_plus_outline',
    guidance: 'Opens advanced search options.',
    categories: ['Search & Filter'],
    locations: ['App bar', 'Card/Dialog', 'Toolbar']
  },
  {
    label: 'App launcher',
    icon: 'apps',
    guidance: 'Opens the app launcher, also called the nine box.',
    categories: ['Navigation'],
    locations: ['App bar']
  },
  {
    label: 'Attach, attachment',
    icon: 'attach_file',
    guidance: 'Attaches a file, or identifies an attachment.',
    categories: ['Files & Documents'],
    locations: ['Card/Dialog', 'Toolbar']
  },
  {
    label: 'Back',
    icon: 'arrow_back',
    guidance: 'Navigates back to the previous page or view.',
    categories: ['Actions', 'Navigation'],
    locations: ['Navigation drawer', 'Toolbar']
  },
  {
    label: 'Calendar',
    icon: 'calendar_outline',
    guidance: 'Opens a calendar, or identifies a date.',
    categories: ['View/Layout'],
    locations: ['Card/Dialog', 'Toolbar']
  },
  {
    label: 'Card or grid view',
    icon: 'view_grid_outline',
    guidance: 'Switches content to a card or grid view.',
    categories: ['View/Layout'],
    locations: ['Card/Dialog', 'Toolbar']
  },
  {
    label: 'Close, cancel, clear, dismiss',
    icon: 'close',
    guidance: 'Closes, cancels, clears, or dismisses the current view or content.',
    categories: ['Actions', 'Navigation'],
    locations: ['Card/Dialog']
  },
  {
    label: 'Delete, remove',
    icon: 'delete_outline',
    guidance: 'Deletes or removes an item.',
    categories: ['Actions'],
    locations: ['Card/Dialog', 'Table row', 'Toolbar']
  },
  {
    label: 'Document',
    icon: 'file_document_outline',
    guidance: 'Identifies a document.',
    categories: ['Files & Documents'],
    locations: ['Card/Dialog', 'Toolbar']
  },
  {
    label: 'Download',
    icon: 'download',
    guidance: "Downloads a file to the user's device.",
    categories: ['Actions', 'Files & Documents'],
    locations: ['Card/Dialog', 'Toolbar']
  },
  {
    label: 'Drag',
    icon: 'drag_indicator',
    guidance: 'Shows that an item can be dragged to move or reorder it.',
    categories: ['View/Layout'],
    locations: ['Card/Dialog']
  },
  {
    label: 'Duplicate',
    icon: 'content_copy',
    guidance: 'Copies or duplicates an item.',
    categories: ['Actions'],
    locations: ['Card/Dialog']
  },
  {
    label: 'Edit, update',
    icon: 'pencil_outline',
    guidance: 'Edits or updates an item.',
    categories: ['Actions'],
    locations: ['Card/Dialog', 'Table row', 'Toolbar']
  },
  {
    label: 'Email',
    icon: 'email_outline',
    guidance: 'Sends an email, or identifies an email address.',
    categories: ['Communications'],
    locations: ['Card/Dialog', 'Table row', 'Toolbar']
  },
  {
    label: 'Error',
    icon: 'alert_circle_outline',
    guidance:
      "Indicates a critical issue that needs immediate attention, like a failed action, invalid input, or a process that can't continue until the issue is resolved.",
    categories: ['Status/Indicator'],
    locations: ['Card/Dialog', 'Message banner']
  },
  {
    label: 'Export',
    icon: 'export',
    guidance: 'Exports data. Put alternate or secondary export actions in a menu.',
    categories: ['Actions', 'Files & Documents'],
    locations: ['Card/Dialog', 'Toolbar']
  },
  {
    label: 'Favorite',
    icon: 'star_outline',
    alternate: { icon: 'star', state: 'Favorited' },
    guidance: "Saves an item, like a search, URL, or action, as a favorite. Switch to the filled star once it's saved.",
    categories: ['Actions', 'Status/Indicator'],
    locations: ['Card/Dialog', 'Toolbar']
  },
  {
    label: 'Filter',
    icon: 'filter_list',
    guidance: 'Shows or hides filters.',
    categories: ['Search & Filter'],
    locations: ['Card/Dialog', 'Toolbar']
  },
  {
    label: 'Help, knowledge base',
    icon: 'help_circle_outline',
    guidance: 'Opens help tools, like documentation, guided processes, or Tyler University.',
    categories: ['System & Settings'],
    locations: ['App bar', 'Message banner']
  },
  {
    label: 'Hide left panel',
    icon: 'hide_panel_left',
    guidance: 'Collapses a panel on the left side of the page.',
    categories: ['View/Layout'],
    locations: ['Card/Dialog', 'Toolbar']
  },
  {
    label: 'Hide right panel',
    icon: 'hide_panel_right',
    guidance: 'Collapses a panel on the right side of the page.',
    categories: ['View/Layout'],
    locations: ['Card/Dialog', 'Toolbar']
  },
  {
    label: 'History',
    icon: 'history',
    guidance: 'Shows the history of an item or activity.',
    categories: ['Navigation', 'View/Layout'],
    locations: ['Card/Dialog', 'Toolbar']
  },
  {
    label: 'Import',
    icon: 'import',
    guidance: 'Imports data.',
    categories: ['Actions', 'Files & Documents'],
    locations: ['Card/Dialog', 'Toolbar']
  },
  {
    label: 'Language',
    icon: 'translate',
    guidance: 'Changes the display language, or translates content.',
    categories: ['System & Settings'],
    locations: ['App bar']
  },
  {
    label: 'List view',
    icon: 'format_list_bulleted',
    guidance: 'Switches content to a list view.',
    categories: ['View/Layout'],
    locations: ['Card/Dialog', 'Toolbar']
  },
  {
    label: 'Map',
    icon: 'map_outline',
    guidance: 'Opens a map, or identifies a map feature.',
    categories: ['View/Layout', 'Mapping'],
    locations: ['Card/Dialog', 'Toolbar']
  },
  {
    label: 'Menu',
    icon: 'menu',
    guidance: 'Opens and closes the primary navigation menu.',
    categories: ['Actions', 'Navigation'],
    locations: ['App bar']
  },
  {
    label: 'More actions',
    icon: 'arrow_down_drop_circle_outline',
    guidance: "Opens a menu of more actions where the vertical ellipsis (more_vert) can't be used.",
    categories: ['Navigation'],
    locations: ['Table row']
  },
  {
    label: 'Notes, comments',
    icon: 'comment_outline',
    guidance: 'Adds or views notes or comments.',
    categories: ['Actions'],
    locations: ['Card/Dialog', 'Table row', 'Toolbar']
  },
  {
    label: 'Notification',
    icon: 'bell_outline',
    guidance: 'Identifies notifications.',
    categories: ['Communications'],
    locations: ['Card/Dialog', 'Message banner']
  },
  {
    label: 'Open in new tab',
    icon: 'open_in_new',
    guidance: 'Opens content in a new browser tab.',
    categories: ['Actions', 'Navigation'],
    locations: ['Card/Dialog', 'Table row']
  },
  {
    label: 'Pay, payment',
    icon: 'credit_card_outline',
    guidance: 'Makes a payment, or identifies payment details.',
    categories: ['Financial'],
    locations: ['Card/Dialog']
  },
  {
    label: 'Phone',
    icon: 'phone_outline',
    guidance: 'Starts a call, or identifies a phone number.',
    categories: ['Communications'],
    locations: ['Card/Dialog', 'Table row']
  },
  {
    label: 'Print',
    icon: 'printer_outline',
    guidance: 'Prints the current page or document.',
    categories: ['Files & Documents'],
    locations: ['Card/Dialog', 'Toolbar']
  },
  {
    label: 'Refresh',
    icon: 'refresh',
    guidance: 'Reloads data or the page.',
    categories: ['Actions'],
    locations: ['Card/Dialog', 'Toolbar']
  },
  {
    label: 'Save',
    icon: 'content_save_outline',
    guidance: 'Saves changes.',
    categories: ['Actions'],
    locations: ['Card/Dialog', 'Toolbar']
  },
  {
    label: 'Saved search',
    icon: 'saved_search',
    guidance: 'Opens or applies a saved search.',
    categories: ['Search & Filter'],
    locations: ['App bar', 'Card/Dialog', 'Toolbar']
  },
  {
    label: 'Search',
    icon: 'magnify',
    guidance: 'Searches content.',
    categories: ['Search & Filter'],
    locations: ['App bar', 'Card/Dialog', 'Toolbar']
  },
  {
    label: 'Settings',
    icon: 'cog_outline',
    guidance: 'Opens settings.',
    categories: ['System & Settings'],
    locations: ['App bar', 'Navigation drawer']
  },
  {
    label: 'Show, hide, preview',
    icon: 'eye_outline',
    alternate: { icon: 'eye_off_outline', state: 'Hidden' },
    guidance: 'Shows or hides data, or previews a report, like a Genero report.',
    categories: ['Privacy', 'Files & Documents'],
    locations: ['Card/Dialog', 'Toolbar']
  },
  {
    label: 'Show left panel',
    icon: 'show_panel_left',
    guidance: 'Expands a panel on the left side of the page.',
    categories: ['View/Layout'],
    locations: ['Card/Dialog', 'Toolbar']
  },
  {
    label: 'Show right panel',
    icon: 'show_panel_right',
    guidance: 'Expands a panel on the right side of the page.',
    categories: ['View/Layout'],
    locations: ['Card/Dialog', 'Toolbar']
  },
  {
    label: 'Sort',
    icon: 'sort',
    guidance: 'Sorts content.',
    categories: ['Search & Filter'],
    locations: ['Card/Dialog']
  },
  {
    label: 'Upload',
    icon: 'upload',
    guidance: "Uploads a file from the user's device.",
    categories: ['Actions', 'Files & Documents'],
    locations: ['Card/Dialog', 'Toolbar']
  },
  {
    label: 'User profile',
    icon: 'account_circle_outline',
    guidance: 'Identifies a user account.',
    categories: ['System & Settings'],
    locations: ['Card/Dialog']
  },
  {
    label: 'Warning',
    icon: 'alert_outline',
    guidance: 'Cautions users about deadlines, thresholds, potential risks, or actions that could have unintended consequences.',
    categories: ['Status/Indicator'],
    locations: ['Card/Dialog', 'Message banner']
  }
];
