import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getGuidanceFile, getGuidanceRules, getGuidanceUrl, _resetGuidanceCacheForTests } from './guidance-service.js';

const textResponse = (body: string): Response => ({ ok: true, text: () => Promise.resolve(body) }) as Response;
const errorResponse = (): Response => ({ ok: false, status: 503, statusText: 'Service Unavailable' }) as Response;
const flushBackgroundRefresh = (): Promise<void> => new Promise(resolve => setTimeout(resolve, 0));

const FIVE_MINUTES_MS = 5 * 60 * 1000;

describe('guidance service', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
    _resetGuidanceCacheForTests();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should fetch guidance from the docs site by default', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue(textResponse('# Card'));

    expect(await getGuidanceFile('references/components/card.md')).toBe('# Card');
    expect(fetchSpy.mock.calls[0][0]).toBe('https://tylerforge.design/skill/forge-design/references/components/card.md');
  });

  it('should fetch from FORGE_GUIDANCE_URL when it is set', async () => {
    vi.stubEnv('FORGE_GUIDANCE_URL', 'https://preview.example.com/skill/forge-design/');
    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue(textResponse('rules'));

    await getGuidanceFile('rules.md');

    expect(getGuidanceUrl('rules.md')).toBe('https://preview.example.com/skill/forge-design/rules.md');
    expect(fetchSpy.mock.calls[0][0]).toBe('https://preview.example.com/skill/forge-design/rules.md');
  });

  it('should serve a cached copy without refetching while it is fresh', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue(textResponse('v1'));

    await getGuidanceFile('rules.md');
    expect(await getGuidanceFile('rules.md')).toBe('v1');
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it('should keep serving the last good copy and refresh it in the background once stale', async () => {
    vi.useFakeTimers({ toFake: ['Date'] });
    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValueOnce(textResponse('v1')).mockResolvedValueOnce(textResponse('v2'));

    await getGuidanceFile('rules.md');
    vi.setSystemTime(Date.now() + FIVE_MINUTES_MS + 1);

    expect(await getGuidanceFile('rules.md')).toBe('v1');
    await flushBackgroundRefresh();
    expect(await getGuidanceFile('rules.md')).toBe('v2');
    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });

  it('should keep the last good copy when a background refresh fails', async () => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.spyOn(global, 'fetch').mockResolvedValueOnce(textResponse('v1')).mockResolvedValueOnce(errorResponse());

    await getGuidanceFile('rules.md');
    vi.setSystemTime(Date.now() + FIVE_MINUTES_MS + 1);
    await getGuidanceFile('rules.md');
    await flushBackgroundRefresh();

    expect(await getGuidanceFile('rules.md')).toBe('v1');
  });

  it('should throw when a page that has no bundled copy cannot be fetched', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(errorResponse());

    await expect(getGuidanceFile('references/components/card.md')).rejects.toThrow('503');
  });

  it('should share one request between concurrent calls for the same file', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue(textResponse('rules'));

    await Promise.all([getGuidanceFile('rules.md'), getGuidanceFile('rules.md')]);

    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it('should return the parsed rules when the schema is supported', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(textResponse(JSON.stringify({ schemaVersion: 1, subpathOnlyComponents: ['forge-app-layout'] })));

    expect((await getGuidanceRules()).subpathOnlyComponents).toEqual(['forge-app-layout']);
  });
});
