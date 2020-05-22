export const WwwActuenvironnementComExtractor = {
  domain: 'www.actu-environnement.com',

  title: {
    selectors: [['meta[name="og:title"]', 'value']],
  },

  author: {
    selectors: ['*[itemprop="author"] *[itemprop="name"]'],
  },

  date_published: {
    selectors: [['time[itemprop="datePublished"]', 'datetime']],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: [['#SchemaOrgNewsArticle']],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [
      '.infobulle_note',
      '.infobulle_news',
      '.copyright_actuenvironnement',
      '.infobulle',
    ],
  },
};
