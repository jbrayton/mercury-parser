import cheerio from 'cheerio';
import { assertClean } from 'test-helpers';
import HTML from './fixtures/html';
import { prepareForUnread } from './index';

describe('prepareForUnread($)', () => {
  it('wraps iframes with div', () => {
    const $ = cheerio.load(HTML.embeddedIframes.before);

    const result = prepareForUnread($('*').first(), $);
    assertClean(result.html(), HTML.embeddedIframes.after);
  });
});
