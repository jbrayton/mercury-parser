import assert from 'assert';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

const fs = require('fs');

describe('WwwActuenvironnementComExtractor', () => {
  it('https://www.actu-environnement.com/ae/news/taxonomie-verte-conseil-europeen-adoption-reglement-35345.php4#xtor=RSS-6', async () => {
    const html = fs.readFileSync(
      './fixtures/www.actu-environnement.com/1590187430580.html'
    );
    const uri =
      'https://www.actu-environnement.com/ae/news/taxonomie-verte-conseil-europeen-adoption-reglement-35345.php4#xtor=RSS-6';

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

    assert.equal(
      title,
      'Taxonomie verte : le Conseil européen adopte sa position sur le projet de règlement'
    );
    assert.equal(author, null);
    assert.equal(date_published, '2020-04-17T04:00:00.000Z');
    assert.equal(dek, null);
    assert.equal(
      lead_image_url,
      'https://www.actu-environnement.com/images/illustrations/breve/35345_large.jpg'
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
      'Le Conseil européen a adopté, le 15 avril en première lecture, sa position'
    );
    assert.equal($('img').length, 1);
  });

  it('https://www.actu-environnement.com/ae/news/temperatures-forets-tropicales-reservoir-carbone-35515.php4', async () => {
    const html = fs.readFileSync(
      './fixtures/www.actu-environnement.com/1590189154325.html'
    );
    const uri =
      'https://www.actu-environnement.com/ae/news/temperatures-forets-tropicales-reservoir-carbone-35515.php4';

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

    assert.equal(
      title,
      'Le rôle de réservoir de carbone des forêts tropicales menacé au-dessus de 32°C'
    );
    assert.equal(author, 'Dorothée Laperche');
    assert.equal(date_published, '2020-05-22T04:00:00.000Z');
    assert.equal(dek, null);
    assert.equal(
      lead_image_url,
      'https://www.actu-environnement.com/images/illustrations/breve/35515_large.jpg'
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
      "Si les forêts tropicales continuent aujourd'hui de jouer un réservoir de carbone, malgré"
    );
    assert.equal($('img').length, 1);
  });
});
