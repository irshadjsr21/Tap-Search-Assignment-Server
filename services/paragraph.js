/**
 * Paragraph service manages all the operations needed in
 * app related to paragraph model
 */
const db = require('../models');
const Paragraph = db.Paragraph;

const ParagraphService = {
  /**
   * Store a single paragraph
   */
  store: async body =>
    new Promise(async (resolve, reject) => {
      try {
        const paragraph = await Paragraph.create({ body });
        resolve(paragraph);
      } catch (error) {
        reject(error);
      }
    }),

  /**
   * Store multiple paragraphs
   */
  storeAll: async paragraphs =>
    new Promise(async (resolve, reject) => {
      try {
        const storedParagraphs = [];
        for (const paragraph of paragraphs) {
          storedParagraphs.push(await ParagraphService.store(paragraph));
        }
        resolve(storedParagraphs);
      } catch (error) {
        reject(error);
      }
    })
};

module.exports = ParagraphService;
