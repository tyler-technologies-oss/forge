import {
  CEMComponentDeclaration,
  SyncResourceHandler,
} from '../../types/index.js';

export class ComponentsBriefResource
  implements SyncResourceHandler<CEMComponentDeclaration[]>
{
  public get(components: CEMComponentDeclaration[]): string {
    if (components.length === 0) {
      return 'No components available.';
    }

    const lines = components
      .map(component => {
        const description =
          component.summary ||
          component.description ||
          'No description available';
        const shortDesc =
          description.length > 80
            ? description.substring(0, 77) + '...'
            : description;
        return `${component.tagName} - ${shortDesc}`;
      })
      .sort();

    return `# Tyler Forge Components\n\n${lines.join('\n')}`;
  }
}
