import assert from 'assert';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

const fs = require('fs');

describe('WwwAstronewsComExtractor', () => {
  it('https://www.astronews.com/news/artikel/2020/05/2005-020.shtml', async () => {
    const html = fs.readFileSync(
      './fixtures/www.astronews.com/1590245949827.html'
    );
    const uri = 'https://www.astronews.com/news/artikel/2020/05/2005-020.shtml';

    const extractor = getExtractor(uri);
    assert.equal(extractor.domain, URL.parse(uri).hostname);

    const {
      title,
      author,
      date_published,
      dek,
      lead_image_url,
      content,
    } = await Mercury.parse(uri, { html, fallback: false });

    assert.equal(title, 'ALMA: Große Scheibengalaxien wuchsen schnell');
    assert.equal(author, null);
    assert.equal(date_published, null);
    assert.equal(dek, null);
    assert.equal(
      lead_image_url,
      'http://www.astronews.com/news/bilder/2020/2005-020b.jpg'
    );

    const $ = cheerio.load(content || '');

    const first13 = excerptContent(
      $('*')
        .first()
        .text(),
      13
    );
    assert.equal(
      first13,
      'Lange Zeit war man davon ausgegangen, dass Scheibengalaxien wie unsere Milchstraße ihre große'
    );
    assert.equal($('figure').length, 1);
    assert.equal($('img').length, 1);
    assert.equal($('img[width]').length, 1);
    assert.equal($('img[height]').length, 1);
    assert.equal(
      $('img[src="https://www.astronews.com/news/bilder/2020/2005-020.jpg"]')
        .length,
      1
    );
  });

  it('https://www.astronews.com/frag/antworten/5/frage5181.html', async () => {
    const html = fs.readFileSync(
      './fixtures/www.astronews.com/1590250105327.html'
    );
    const uri = 'https://www.astronews.com/frag/antworten/5/frage5181.html';

    const extractor = getExtractor(uri);
    assert.equal(extractor.domain, URL.parse(uri).hostname);

    const {
      title,
      author,
      date_published,
      dek,
      lead_image_url,
      content,
    } = await Mercury.parse(uri, { html, fallback: false });

    assert.equal(title, 'Welche Tierarten waren schon im All?');
    assert.equal(author, null);
    assert.equal(date_published, null);
    assert.equal(dek, null);
    assert.equal(lead_image_url, null);

    const $ = cheerio.load(content || '');

    const first13 = excerptContent(
      $('*')
        .first()
        .text(),
      13
    );
    assert.equal(
      first13,
      'Tiere waren die ersten - wenn auch unfreiwilligen - Raumfahrer und machten die'
    );
    assert.equal($('img').length, 0);
  });
});
