import fs from 'fs';
import path from 'path';

export interface PartialRegistry {
  partials: Map<string, string>;
  load(): void;
  get(name: string): string | undefined;
  has(name: string): boolean;
  names(): string[];
}

export interface PartialRegistryOptions {
  partialsPath: string;
  extension?: string;
}

export function createPartialRegistry(options: PartialRegistryOptions): PartialRegistry {
  const { partialsPath, extension = '.hbs' } = options;
  const partials = new Map<string, string>();

  function load(): void {
    partials.clear();

    if (!fs.existsSync(partialsPath)) {
      return;
    }

    const files = fs.readdirSync(partialsPath).filter(file => file.endsWith(extension));

    for (const file of files) {
      const name = path.basename(file, extension);
      const content = fs.readFileSync(path.join(partialsPath, file), 'utf-8');
      partials.set(name, content);
    }
  }

  function get(name: string): string | undefined {
    return partials.get(name);
  }

  function has(name: string): boolean {
    return partials.has(name);
  }

  function names(): string[] {
    return Array.from(partials.keys());
  }

  return { partials, load, get, has, names };
}
