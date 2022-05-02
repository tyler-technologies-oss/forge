import { IPaginatorComponent, PAGINATOR_CONSTANTS, IPaginatorChangeEvent, definePaginatorComponent } from '@tylertech/forge/paginator';
import { BASE_SELECT_CONSTANTS, ISelectComponent } from '@tylertech/forge/select';
import { IIconButtonComponent } from '@tylertech/forge/icon-button';
import { getShadowElement, removeElement, emitEvent } from '@tylertech/forge-core';

interface ITestContext {
  context: ITestPaginatorContext;
}

interface ITestPaginatorContext {
  paginator: IPaginatorComponent;
  root: HTMLElement;
  label: HTMLElement;
  pageSizeSelect: ISelectComponent;
  rangeLabel: HTMLElement;
  firstPageIconButton: IIconButtonComponent;
  firstPageButton: HTMLButtonElement;
  previousPageButton: HTMLButtonElement;
  nextPageButton: HTMLButtonElement;
  lastPageButton: HTMLButtonElement;
  lastPageIconButton: IIconButtonComponent;
  destroy(): void;
}

describe('PaginatorComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    definePaginatorComponent();
  });

  describe('without default attribute values', function(this: ITestContext) {
    afterEach(function(this: ITestContext) {
      this.context.destroy();
    });

    it('should be connected', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.paginator.isConnected).toBe(true);
      this.context.destroy();
    });

    it('should be instantiated with default values', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.paginator.pageIndex).toBe(PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_INDEX);
      expect(this.context.paginator.pageSize).toBe(PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_SIZE);
      expect(this.context.paginator.pageSizeOptions).toEqual(PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_SIZE_OPTIONS);
      expect(this.context.paginator.total).toBe(PAGINATOR_CONSTANTS.numbers.DEFAULT_TOTAL);
      expect(this.context.paginator.label).toBe(PAGINATOR_CONSTANTS.strings.DEFAULT_LABEL);

      const expectedRangeLabel = `${PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_INDEX + 1}-${PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_SIZE} ${PAGINATOR_CONSTANTS.strings.RANGE_SEPARATOR_LABEL} ${PAGINATOR_CONSTANTS.numbers.DEFAULT_TOTAL}`;
      expect(this.context.rangeLabel.innerText).toBe(expectedRangeLabel);
      expect(this.context.label.innerText).toBe(PAGINATOR_CONSTANTS.strings.DEFAULT_LABEL);
    });

    it('should modify total properly', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.paginator.total = 100;

      const expectedRangeLabel = `${PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_INDEX + 1}-${PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_SIZE} ${PAGINATOR_CONSTANTS.strings.RANGE_SEPARATOR_LABEL} ${this.context.paginator.total}`;
      expect(this.context.rangeLabel.innerText).toBe(expectedRangeLabel);
    });

    it('should modify page index properly', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.paginator.total = 100;
      this.context.paginator.pageIndex = 2;
      expect(this.context.rangeLabel.innerText).toBe('51-75 of 100');
    });

    it('should change page size properly', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.paginator.total = 100;
      this.context.paginator.pageSize = 50;
      expect(this.context.pageSizeSelect.value).toBe('50');
      expect(this.context.rangeLabel.innerText).toBe('1-50 of 100');
    });

    it('should have previous and next page buttons disabled by default', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.previousPageButton.hasAttribute('disabled')).toBe(true);
      expect(this.context.nextPageButton.hasAttribute('disabled')).toBe(true);
    });

    it('should not show first and last page buttons by default', function(this: ITestContext) {
      this.context = setupTestContext();
      expect(this.context.firstPageIconButton).toBeNull();
      expect(this.context.lastPageIconButton).toBeNull();
    });

    it('should have previous page button disabled when on first page', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.paginator.total = 100;
      expect(this.context.previousPageButton.hasAttribute('disabled')).toBe(true);
    });

    it('should have next page button enabled when on first page', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.paginator.total = 100;
      expect(this.context.nextPageButton.hasAttribute('disabled')).toBe(false);
    });

    it('should enable previous page button when not on first page', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.paginator.total = 100;
      this.context.paginator.pageIndex = 1;
      expect(this.context.previousPageButton.hasAttribute('disabled')).toBe(false);
    });

    it('should disable previous page button when on last page', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.paginator.total = 100;
      this.context.paginator.pageIndex = 3;
      expect(this.context.nextPageButton.hasAttribute('disabled')).toBe(true);
    });

    it('should emit change event when clicking next page button', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.paginator.total = 100;
      const callback = jasmine.createSpy('callback');
      this.context.paginator.addEventListener(PAGINATOR_CONSTANTS.events.CHANGE, callback);
      this.context.nextPageButton.click();
      expect(callback).toHaveBeenCalled();
    });

    it('should emit change event with proper parameters when clicking next page button', function(this: ITestContext, done: DoneFn) {
      this.context = setupTestContext();
      this.context.paginator.total = 100;
      this.context.paginator.addEventListener(PAGINATOR_CONSTANTS.events.CHANGE, (evt: CustomEvent) => {
        const eventDetail: IPaginatorChangeEvent = evt.detail;

        expect(eventDetail.type).toBe(PAGINATOR_CONSTANTS.strings.NEXT_PAGE, 'Expected correct next page change type');
        expect(eventDetail.pageIndex).toBe(1, 'Expected page index to be incremented by 1');
        expect(eventDetail.pageSize).toBe(PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_SIZE, 'Expected the default page size value');

        done();
      });
      this.context.nextPageButton.click();
    });

    it('should emit change event when changing page size', function(this: ITestContext) {
      this.context = setupTestContext();
      const callback = jasmine.createSpy('listener');
      this.context.paginator.addEventListener(PAGINATOR_CONSTANTS.events.CHANGE, callback);
      emitEvent(this.context.pageSizeSelect, BASE_SELECT_CONSTANTS.events.CHANGE, '5');
      expect(callback).toHaveBeenCalled();
    });

    it('should emit change event with proper parameters when clicking previous page button', function(this: ITestContext, done: DoneFn) {
      this.context = setupTestContext();
      this.context.paginator.total = 100;
      this.context.paginator.pageIndex = 1;
      this.context.paginator.addEventListener(PAGINATOR_CONSTANTS.events.CHANGE, (evt: CustomEvent) => {
        const eventDetail: IPaginatorChangeEvent = evt.detail;

        expect(eventDetail.type).toBe(PAGINATOR_CONSTANTS.strings.PREVIOUS_PAGE, 'Expected correct previous page change type');
        expect(eventDetail.pageIndex).toBe(0, 'Expected page index to be decremented by 1');
        expect(eventDetail.pageSize).toBe(PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_SIZE, 'Expected the default page size value');

        done();
      });
      this.context.previousPageButton.click();
    });

    it('should update page size label', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.paginator.label = 'Items per page';
      expect(this.context.label.innerText).toBe('Items per page');
    });

    it('should modify page size options properly', function(this: ITestContext) {
      this.context = setupTestContext();
      const newOptions = [1, 2, 3, 4, 5];
      this.context.paginator.pageSizeOptions = newOptions;
      this.context.paginator.pageSize = 3;
      expect(this.context.paginator.pageSize).toBe(3);
      expect(this.context.paginator.pageSizeOptions).toEqual(newOptions);
    });

    it('should set page size to first option if options doesn\'t contain current page size as an option', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.paginator.total = 100;
      this.context.paginator.pageIndex = 2;
      const newOptions = [1, 2, 3, 4];
      this.context.paginator.pageSizeOptions = newOptions;
      expect(this.context.paginator.pageSize).toBe(1);
    });

    it('should use default page size if options doesn\'t contain current page size as an option and no options exist', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.paginator.total = 100;
      this.context.paginator.pageIndex = 2;
      const newOptions: number[] = [];
      this.context.paginator.pageSizeOptions = newOptions;
      expect(this.context.paginator.pageSize).toBe(PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_SIZE);
    });

    it('should remove page size options if false is provided', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.paginator.pageSizeOptions = false;
      const computedStyle = getComputedStyle(this.context.pageSizeSelect);
      expect(computedStyle.display).toBe('none');
    });

    it('should remove page index attribute from host when invalid value is provided', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.paginator.pageIndex = undefined as any;
      expect(this.context.paginator.hasAttribute(PAGINATOR_CONSTANTS.attributes.PAGE_INDEX)).toBe(false);
    });

    it('should disable page size select, previous page button, and next page button when disabled', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.paginator.disabled = true;

      expect(this.context.pageSizeSelect.hasAttribute('disabled')).toBe(true);
      expect(this.context.previousPageButton.hasAttribute('disabled')).toBe(true);
      expect(this.context.nextPageButton.hasAttribute('disabled')).toBe(true);
    });

    it('should add alternative', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.paginator.alternative = true;

      expect(this.context.paginator.hasAttribute(PAGINATOR_CONSTANTS.attributes.ALTERNATIVE)).toBe(true);
      expect(this.context.root.classList.contains(PAGINATOR_CONSTANTS.classes.ALTERNATIVE)).toBe(true);
      expect(this.context.paginator.alternative).toBe(true);
    });

    it('should set alignment to space-between', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.paginator.alternative = true;
      this.context.paginator.alignment = 'space-between';

      expect(this.context.paginator.hasAttribute(PAGINATOR_CONSTANTS.attributes.ALIGNMENT)).toBe(true);
      expect(this.context.root.classList.contains(PAGINATOR_CONSTANTS.classes.ALIGNMENT_SPACE_BETWEEN)).toBe(true);
      expect(this.context.paginator.alignment).toBe('space-between');
    });

    it('should set alignment to start', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.paginator.alternative = true;
      this.context.paginator.alignment = 'start';

      expect(this.context.paginator.hasAttribute(PAGINATOR_CONSTANTS.attributes.ALIGNMENT)).toBe(true);
      expect(this.context.root.classList.contains(PAGINATOR_CONSTANTS.classes.ALIGNMENT_START)).toBe(true);
      expect(this.context.paginator.alignment).toBe('start');
    });

    it('should set alignment to end', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.paginator.alternative = true;
      this.context.paginator.alignment = 'end';

      expect(this.context.paginator.hasAttribute(PAGINATOR_CONSTANTS.attributes.ALIGNMENT)).toBe(true);
      expect(this.context.root.classList.contains(PAGINATOR_CONSTANTS.classes.ALIGNMENT_END)).toBe(true);
      expect(this.context.paginator.alignment).toBe('end');
    });

    it('should set page size when page size options is set', function(this: ITestContext) {
      this.context = setupTestContext();
      const pageSizeOptions = [10, 11, 12];
      this.context.paginator.pageSizeOptions = pageSizeOptions;
      const expectedPageSize = pageSizeOptions[0];

      expect(this.context.paginator.pageSize).toBe(expectedPageSize);
      expect(this.context.pageSizeSelect.value).toBe(String(expectedPageSize));
    });

    it('should set page index via offset property', function(this: ITestContext) {
      this.context = setupTestContext();
      const pageSizeOptions = [5, 10, 25];
      this.context.paginator.pageSizeOptions = pageSizeOptions;
      this.context.paginator.pageSize = 25;
      this.context.paginator.total = 100;

      this.context.paginator.offset = 25;
      expect(this.context.paginator.pageIndex).toBe(1);

      this.context.paginator.offset = 75;
      expect(this.context.paginator.pageIndex).toBe(3);

      this.context.paginator.setAttribute(PAGINATOR_CONSTANTS.attributes.OFFSET, '74');
      expect(this.context.paginator.pageIndex).toBe(2);

      this.context.paginator.offset = 150;
      expect(this.context.paginator.pageIndex).toBe(3);

      this.context.paginator.offset = -150;
      expect(this.context.paginator.pageIndex).toBe(0);
    });

    it('should get offset', function(this: ITestContext) {
      this.context = setupTestContext();
      const pageSizeOptions = [5, 10, 25];
      this.context.paginator.pageSizeOptions = pageSizeOptions;
      this.context.paginator.pageSize = 25;
      this.context.paginator.total = 100;
      
      expect(this.context.paginator.offset).toBe(0);

      this.context.paginator.pageIndex = 1;
      expect(this.context.paginator.offset).toBe(25);

      this.context.paginator.pageIndex = 3;
      expect(this.context.paginator.offset).toBe(75);
    });

    it('should provide offset via change event', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.paginator.total = 100;

      const callback = jasmine.createSpy('callback');
      this.context.paginator.addEventListener(PAGINATOR_CONSTANTS.events.CHANGE, callback);
      this.context.nextPageButton.click();

      const detail: IPaginatorChangeEvent = {
        type: PAGINATOR_CONSTANTS.strings.NEXT_PAGE,
        offset: 25,
        pageIndex: 1,
        pageSize: 25
      };
      expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({ detail }));
    });

    describe('with first button', function(this: ITestContext)  {
      beforeAll(function(this: ITestContext) {
        definePaginatorComponent();
      });

      afterEach(function(this: ITestContext) {
        this.context.destroy();
      })
  
      it('should have the first attribute', function(this: ITestContext) {
        this.context = setupTestContext(true);
        expect(this.context.paginator.hasAttribute('first')).toBe(true);
      });

      it('should have first page button disabled by default', async function(this: ITestContext) {
        this.context = setupTestContext(true);
        expect(this.context.firstPageButton.hasAttribute('disabled')).toBe(true);
      });

      it('should have first page button disabled when on first page', function(this: ITestContext) {
        this.context = setupTestContext(true);
        this.context.paginator.total = 100;
        expect(this.context.firstPageButton.hasAttribute('disabled')).toBe(true);
      });

      it('should enable first page button when not on first page', function(this: ITestContext)  {
        this.context = setupTestContext(true);
        this.context.paginator.total = 100;
        this.context.paginator.pageIndex = 1;
        expect(this.context.firstPageButton.hasAttribute('disabled')).toBe(false);
      });

      it('should emit change event with proper parameters when clicking first page button', function(this: ITestContext, done: DoneFn) {
        this.context = setupTestContext(true);
        this.context.paginator.total = 100;
        this.context.paginator.pageIndex = 1;
        this.context.paginator.addEventListener(PAGINATOR_CONSTANTS.events.CHANGE, (evt: CustomEvent) => {
          const eventDetail: IPaginatorChangeEvent = evt.detail;

          expect(eventDetail.type).toBe(PAGINATOR_CONSTANTS.strings.FIRST_PAGE, 'Expected correct first page change type');
          expect(eventDetail.pageIndex).toBe(0, 'Expected page index to be 0');
          expect(eventDetail.pageSize).toBe(PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_SIZE, 'Expected the default page size value');

          done();
        });
        this.context.firstPageButton.click();
      });

      it('should disable first  page button when disabled', function(this: ITestContext)  {
        this.context = setupTestContext(true);
        this.context.paginator.disabled = true;

        expect(this.context.firstPageButton.hasAttribute('disabled')).toBe(true);
      });
    });

    describe('with first last buttons', function(this: ITestContext) {

      it('should have the first-last attribute', function(this: ITestContext) {
        this.context = setupTestContext(undefined, true);
        expect(this.context.paginator.hasAttribute('first-last')).toBe(true);
      });

      it('should have first and last page buttons disabled by default', function(this: ITestContext) {
        this.context = setupTestContext(undefined, true);
        expect(this.context.firstPageButton.hasAttribute('disabled')).toBe(true);
        expect(this.context.lastPageButton.hasAttribute('disabled')).toBe(true);
      });

      it('should have first page button disabled when on first page',function(this: ITestContext) {
        this.context = setupTestContext(undefined, true);
        this.context.paginator.total = 100;
        expect(this.context.firstPageButton.hasAttribute('disabled')).toBe(true);
      });

      it('should have last page button enabled when on first page', function(this: ITestContext) {
        this.context = setupTestContext(undefined, true);
        this.context.paginator.total = 100;
        expect(this.context.lastPageButton.hasAttribute('disabled')).toBe(false);
      });

      it('should enable first page button when not on first page', function(this: ITestContext) {
        this.context = setupTestContext(undefined, true);
        this.context.paginator.total = 100;
        this.context.paginator.pageIndex = 1;
        expect(this.context.firstPageButton.hasAttribute('disabled')).toBe(false);
      });

      it('should disable last page button when on last page', function(this: ITestContext) {
        this.context = setupTestContext(undefined, true);
        this.context.paginator.total = 100;
        this.context.paginator.pageIndex = 3;
        expect(this.context.lastPageButton.hasAttribute('disabled')).toBe(true);
      });

      it('should emit change event with proper parameters when clicking last page button', function(this: ITestContext, done: DoneFn) {
        this.context = setupTestContext(undefined, true);
        this.context.paginator.total = 100;
        this.context.paginator.addEventListener(PAGINATOR_CONSTANTS.events.CHANGE, (evt: CustomEvent) => {
          const eventDetail: IPaginatorChangeEvent = evt.detail;

          const expectedPageIndex = Math.floor(this.context.paginator.total / this.context.paginator.pageSize) - 1;
          expect(eventDetail.type).toBe(PAGINATOR_CONSTANTS.strings.LAST_PAGE, 'Expected correct last page change type');
          expect(eventDetail.pageIndex).toBe(expectedPageIndex, `Expected page index to be ${expectedPageIndex}`);
          expect(eventDetail.pageSize).toBe(PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_SIZE, 'Expected the default page size value');

          done();
        });
        this.context.lastPageButton.click();
      });

      it('should emit change event with proper parameters when clicking first page button', function(this: ITestContext, done: DoneFn) {
        this.context = setupTestContext(undefined, true);
        this.context.paginator.total = 100;
        this.context.paginator.pageIndex = 1;
        this.context.paginator.addEventListener(PAGINATOR_CONSTANTS.events.CHANGE, (evt: CustomEvent) => {
          const eventDetail: IPaginatorChangeEvent = evt.detail;

          expect(eventDetail.type).toBe(PAGINATOR_CONSTANTS.strings.FIRST_PAGE, 'Expected correct first page change type');
          expect(eventDetail.pageIndex).toBe(0, 'Expected page index to be 0');
          expect(eventDetail.pageSize).toBe(PAGINATOR_CONSTANTS.numbers.DEFAULT_PAGE_SIZE, 'Expected the default page size value');

          done();
        });
        this.context.firstPageButton.click();
      });

      it('should disable first and last page buttons when disabled',  function(this: ITestContext) {
        this.context = setupTestContext(undefined, true);
        this.context.paginator.disabled = true;

        expect(this.context.firstPageButton.hasAttribute('disabled')).toBe(true);
        expect(this.context.lastPageButton.hasAttribute('disabled')).toBe(true);
      });
    });
  });
});

function setupTestContext(withFirst?: boolean, withFirstLast?: boolean): ITestPaginatorContext {
  const paginator = document.createElement(PAGINATOR_CONSTANTS.elementName) as IPaginatorComponent;
  document.body.appendChild(paginator);
  paginator.first = withFirst !== undefined ? withFirst : paginator.first;
  paginator.firstLast = withFirstLast !== undefined ? withFirstLast : paginator.firstLast;
  
  const label = getShadowElement(paginator, PAGINATOR_CONSTANTS.selectors.LABEL);
  const root = getShadowElement(paginator, PAGINATOR_CONSTANTS.selectors.ROOT);
  const pageSizeSelect = getShadowElement(paginator, PAGINATOR_CONSTANTS.selectors.PAGE_SIZE_SELECT) as ISelectComponent;
  const rangeLabel = getShadowElement(paginator, PAGINATOR_CONSTANTS.selectors.RANGE_LABEL);
  const firstPageIconButton = getShadowElement(paginator, PAGINATOR_CONSTANTS.selectors.FIRST_PAGE_ICON_BUTTON) as IIconButtonComponent;
  const previousPageButton = getShadowElement(paginator, PAGINATOR_CONSTANTS.selectors.PREVIOUS_PAGE_BUTTON) as HTMLButtonElement;
  const nextPageButton = getShadowElement(paginator, PAGINATOR_CONSTANTS.selectors.NEXT_PAGE_BUTTON) as HTMLButtonElement;
  const lastPageIconButton = getShadowElement(paginator, PAGINATOR_CONSTANTS.selectors.LAST_PAGE_ICON_BUTTON) as IIconButtonComponent;
  const firstPageButton = getShadowElement(paginator, PAGINATOR_CONSTANTS.selectors.FIRST_PAGE_BUTTON) as HTMLButtonElement;
  const lastPageButton = getShadowElement(paginator, PAGINATOR_CONSTANTS.selectors.LAST_PAGE_BUTTON) as HTMLButtonElement;

  return {
    paginator,
    label,
    root,
    pageSizeSelect,
    rangeLabel,
    firstPageIconButton,
    previousPageButton,
    nextPageButton,
    lastPageIconButton,
    firstPageButton,
    lastPageButton,
    destroy: () => removeElement(paginator)
  };
}
