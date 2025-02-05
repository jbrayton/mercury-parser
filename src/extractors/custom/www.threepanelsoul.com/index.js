export const WwwThreepanelsoulComExtractor = {
  domain: 'www.threepanelsoul.com',

  title: {
    selectors: ['#comictitle'],
  },

  content: {
    selectors: [['#cc-comicbody']],

    // Is there anything in the content you selected that needs transformed
    // before it's consumable content? E.g., unusual lazy loaded images
    transforms: {},

    // Is there anything that is in the result that shouldn't be?
    // The clean selectors will remove anything that matches from
    // the result
    clean: [],
  },
};
