export const WwwAstronewsComExtractor = {
  domain: 'www.astronews.com',

  title: {
    selectors: ['title'],
  },

  lead_image_url: {
    selectors: [['meta[name="og:image"]', 'value']],
  },

  content: {
    selectors: ['.ht_artikel', 'td[width="570"]'],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {
      '.ht_artikel table': $node => {
        $node.find('.metadaten_C').remove();
        const img = $node.find('img');
        const caption = $node.find('.bu');
        caption.find('img').remove();

        if (img.length === 1 && caption.length === 1) {
          const captionHTML = caption.html();
          $node.replaceWith(
            `<figure>${img}<figcaption>${captionHTML}</figure>`
          );
        } else {
          $node.remove();
        }
      },
    },

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [
      '.navigation',
      'p:has(.header)',
      '#social_screen',
      'table:has(img[src*="_images"])',
      '.metadaten_C',
      '.bu br',
      'a:not(a[href])',
      '.rubrik',
      'td[width="570"] table',
      '.linie_grau',
    ],
  },
};
