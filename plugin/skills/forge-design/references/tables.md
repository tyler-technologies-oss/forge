# Table Rules

Tables are configured via JavaScript properties, not HTML attributes.

---

## Configuration

Configure a table via JavaScript properties on the element (`columnConfigurations` and `data`):

```javascript
const table = document.querySelector('forge-table');
table.columnConfigurations = [
  { property: 'name', header: 'Name' },
  { property: 'email', header: 'Email' },
  { property: 'status', header: 'Status' }
];
table.data = [
  { name: 'John Doe', email: 'john@example.com', status: 'Active' }
];
```

---

## Rules

1. **Use `forge-structured-card`** for tables with headers and pagination
2. **Place the paginator in the footer region** of structured cards
3. **Table actions belong in the card header** - Actions that directly relate to or affect the table (Add Item, Delete, Export, etc.) must be placed in the header toolbar end region (top right), **never outside the table card**
4. **Check blocks for card toolbar patterns** - When placing a table inside a card, always reference the table blocks (e.g., `blocks/tables/`) to see the correct `<forge-toolbar>` structure for the header and footer slots. Blocks demonstrate proper toolbar placement, slot usage, and the `inverted` attribute for footers.

---

## Notes

Use the MCP tools to get the latest component API details for table and structured-card components, including column configuration options and available slots.
