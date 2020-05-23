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
    defaultCleaner: false,
    selectors: [['#SchemaOrgNewsArticle']],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
      '*[itemprop="image"]': 'figure',
      '*[itemprop="image"] .copyright-legend': 'figcaption',
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [
      '.infobulle_note',
      '.infobulle_news',
      '.copyright_actuenvironnement',
      '.infobulle',
      '#toolbar_informations',
      '*[itemprop="image"] .copyright-legend a',
      '.toolbar',
      '.video_theme',
      '.print_date',
      '.encart_citation_right',
    ],
  },
};
