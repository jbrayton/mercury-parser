import assert from 'assert';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

const fs = require('fs');

describe('ConsomacFrExtractor', () => {
  it('https://consomac.fr/news-12324-iphone-se-apple-store-ferme-precommandes-a-14h.html', async () => {
    const html = fs.readFileSync('./fixtures/consomac.fr/1590193297211.html');
    const uri =
      'https://consomac.fr/news-12324-iphone-se-apple-store-ferme-precommandes-a-14h.html';

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

    assert.equal(title, 'iPhone SE : Apple Store fermé, précommandes à 14h');
    assert.equal(author, null);
    assert.equal(date_published, null);
    assert.equal(dek, null);
    assert.equal(
      lead_image_url,
      'https://consomac.fr/images/news/store-ferme-precommandes-iphone-se-illu.jpg'
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
      "C'est ce vendredi à 14h que les précommandes de l'iPhone SE, présenté par"
    );
    assert.equal($('img').length, 1);
  });
});
