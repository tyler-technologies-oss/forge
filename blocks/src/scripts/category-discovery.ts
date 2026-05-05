import fs from 'fs';
import path from 'path';

export interface Category {
  name: string;
  path: string;
}

export function discoverCategories(blocksPath: string): Category[] {
  if (!fs.existsSync(blocksPath)) {
    return [];
  }

  const entries = fs.readdirSync(blocksPath, { withFileTypes: true });

  return entries
    .filter(entry => entry.isDirectory())
    .map(entry => ({
      name: entry.name,
      path: path.join(blocksPath, entry.name)
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function formatCategoryName(name: string): string {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
