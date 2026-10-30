import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const CWD = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(CWD, '../../');

/**
 * Get the absolute path to a template file in the project's templates directory
 * @param templatePath The path to the template file
 * @returns The absolute path to the template file
 */
export function getTemplatePath(templatePath: string): string {
  return join(PROJECT_ROOT, 'templates', templatePath);
}
