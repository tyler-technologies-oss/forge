import { promises as fs } from 'fs';
import { getTemplatePath } from '../../utils/path-utils.js';

/**
 * Read a static markdown template file's content.
 *
 * @param templateFilePath - The file path of the template file to read, relative to templates/
 * @returns Promise resolving to the template file content as a string
 * @throws Error if the template file cannot be read
 */
export async function readTemplateResource(
  templateFilePath: string,
): Promise<string> {
  const templatePath = getTemplatePath(templateFilePath);
  return await fs.readFile(templatePath, 'utf-8');
}
