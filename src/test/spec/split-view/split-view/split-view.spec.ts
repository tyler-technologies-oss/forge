import { SplitViewComponent, SPLIT_VIEW_CONSTANTS, defineSplitViewComponent } from '@tylertech/forge/split-view';

describe('SplitViewComponent', () => {
  let componentInstance: SplitViewComponent;
  let fixtureContainer: HTMLElement;

  beforeAll(() => {
    defineSplitViewComponent();
    fixtureContainer = document.createElement('div');
    document.body.appendChild(fixtureContainer);
  });

  beforeEach(() => {    
    const element = document.createElement(SPLIT_VIEW_CONSTANTS.elementName);
    fixtureContainer.appendChild(element);
    componentInstance = document.querySelector(SPLIT_VIEW_CONSTANTS.elementName) as SplitViewComponent;
  });

  afterEach(() => {
    fixtureContainer.removeChild(componentInstance);
  });

  it('should instantiate component instance', () => {
    expect(componentInstance.shadowRoot).not.toBeNull();
  });  
});
