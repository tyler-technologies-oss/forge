import {
  CEMComponentDeclaration,
  AsyncResourceHandler,
} from '../../types/index.js';
import { getTemplateEngine } from '../../services/handlebars-template-engine.js';
import { buildComponentTemplateContext } from '../../services/component-template-context.js';

export class ComponentSummaryResource
  implements AsyncResourceHandler<CEMComponentDeclaration>
{
  private _templateEngine = getTemplateEngine();

  public async get(component: CEMComponentDeclaration): Promise<string> {
    const context = buildComponentTemplateContext(component);
    return await this._templateEngine.render(
      'components/component-summary.md',
      context,
    );
  }
}
