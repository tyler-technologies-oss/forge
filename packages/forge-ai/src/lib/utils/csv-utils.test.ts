import { afterEach, describe, expect, it, vi } from 'vitest';
import { buildCSVContent, downloadCSV, escapeCSVCell, sanitizeFilename } from './csv-utils.js';

describe('escapeCSVCell', () => {
  it('should return an empty string for null and undefined', () => {
    expect(escapeCSVCell(null)).toBe('');
    expect(escapeCSVCell(undefined)).toBe('');
  });

  it('should return an empty string for an empty string', () => {
    expect(escapeCSVCell('')).toBe('');
  });

  it('should stringify numbers including zero', () => {
    expect(escapeCSVCell(42)).toBe('42');
    expect(escapeCSVCell(0)).toBe('0');
  });

  it('should leave plain text untouched', () => {
    expect(escapeCSVCell('hello world')).toBe('hello world');
  });

  it('should quote values containing commas, newlines, or carriage returns', () => {
    expect(escapeCSVCell('a,b')).toBe('"a,b"');
    expect(escapeCSVCell('a\nb')).toBe('"a\nb"');
    expect(escapeCSVCell('a\rb')).toBe('"a\rb"');
  });

  it('should double embedded quotes and wrap the value in quotes', () => {
    expect(escapeCSVCell('say "hi"')).toBe('"say ""hi"""');
  });

  it.each(['=SUM(A1)', '+1', '-1', '@user', '|cmd', '\tvalue'])('should prefix an apostrophe to neutralize formula injection for %j', value => {
    expect(escapeCSVCell(value).replace(/^"|"$/g, '').startsWith("'")).toBe(true);
  });

  it('should escape dangerous spreadsheet functions that do not start with an operator', () => {
    expect(escapeCSVCell('HYPERLINK("http://x")')).toBe(`"'HYPERLINK(""http://x"")"`);
    expect(escapeCSVCell('importxml(a)')).toBe(`'importxml(a)`);
  });

  it('should quote after formula escaping when the value also contains a comma', () => {
    expect(escapeCSVCell('=A1,B1')).toBe(`"'=A1,B1"`);
  });
});

describe('buildCSVContent', () => {
  it('should join cells with commas and rows with CRLF', () => {
    expect(
      buildCSVContent(
        ['Name', 'Age'],
        [
          ['Ann', 30],
          ['Bob', 25]
        ]
      )
    ).toBe('Name,Age\r\nAnn,30\r\nBob,25');
  });

  it('should return only the header row when there are no rows', () => {
    expect(buildCSVContent(['A', 'B'], [])).toBe('A,B');
  });

  it('should escape headers and cells', () => {
    expect(buildCSVContent(['a,b'], [['=1']])).toBe(`"a,b"\r\n'=1`);
  });
});

describe('sanitizeFilename', () => {
  it('should append .csv to a valid name', () => {
    expect(sanitizeFilename('report')).toBe('report.csv');
  });

  it('should use the default fallback for blank input', () => {
    expect(sanitizeFilename('   ')).toBe('download.csv');
  });

  it('should use a custom fallback for blank input', () => {
    expect(sanitizeFilename('', 'data-table')).toBe('data-table.csv');
  });

  it('should replace unsupported characters with a single dash', () => {
    expect(sanitizeFilename('Q1 Sales / Report!!')).toBe('Q1-Sales-Report.csv');
  });

  it('should trim leading and trailing dashes and dots', () => {
    expect(sanitizeFilename('..hidden..')).toBe('hidden.csv');
    expect(sanitizeFilename('--name--')).toBe('name.csv');
  });

  it('should use the fallback when the name sanitizes to nothing', () => {
    expect(sanitizeFilename('!!!', 'export')).toBe('export.csv');
  });

  it('should keep dots, underscores, and dashes inside the name', () => {
    expect(sanitizeFilename('my_file-v1.2')).toBe('my_file-v1.2.csv');
  });
});

describe('downloadCSV', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should click a temporary link with the filename and remove it afterwards', () => {
    const createUrl = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock');
    const revokeUrl = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});
    const clicked: Array<{ download: string; href: string; connected: boolean }> = [];
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (this: HTMLAnchorElement) {
      clicked.push({ download: this.download, href: this.getAttribute('href') ?? '', connected: this.isConnected });
    });

    downloadCSV('a,b', 'out.csv');

    expect(clicked).toEqual([{ download: 'out.csv', href: 'blob:mock', connected: true }]);
    expect(document.querySelector('a[download]')).toBeNull();
    expect(revokeUrl).toHaveBeenCalledWith('blob:mock');
    const blob = createUrl.mock.calls[0][0] as Blob;
    expect(blob.type).toBe('text/csv;charset=utf-8');
  });

  it('should create a blob containing the CSV content', async () => {
    const createUrl = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock');
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});

    downloadCSV('x,y\r\n1,2', 'out.csv');

    expect(await (createUrl.mock.calls[0][0] as Blob).text()).toBe('x,y\r\n1,2');
  });
});
