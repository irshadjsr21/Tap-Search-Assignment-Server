/**
 * Paragraph service manages all the operations needed in
 * app related to paragraph model
 */
const db = require('../models');
const WordService = require('./word');
const Paragraph = db.Paragraph;
const WordIndex = db.WordIndex;
const Word = db.Word;

const ParagraphService = {
  /**
   * Store a single paragraph
   */
  store: async body =>
    new Promise(async (resolve, reject) => {
      try {
        const paragraph = await Paragraph.create({ body });
        const words = paragraph.body.split(' ');
        resolve(paragraph);
        await WordService.storeAll(words, paragraph.id);
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
    }),

  /**
   * Delete all paragraphs and invokes word delete methods
   */
  deleteAll: async () =>
    new Promise(async (resolve, reject) => {
      try {
        await Paragraph.destroy({ where: {} });
        resolve();
        await WordService.deleteAll();
      } catch (error) {
        reject(error);
      }
    }),

  /**
   * Search all paragraphs with a given word
   */
  search: async word =>
    new Promise(async (resolve, reject) => {
      try {
        const paragraphs = await db.sequelize.query(
          'select Paragraphs.id, Words.word, Paragraphs.body, Paragraphs.createdAt from ' +
            'Words join WordIndices on WordIndices.wordId = Words.id ' +
            'join Paragraphs on Paragraphs.id = WordIndices.paragraphId where Words.word LIKE (:word) ' +
            'ORDER BY Paragraphs.createdAt DESC LIMIT 10',
          {
            replacements: { word },
            raw: true,
            type: db.Sequelize.QueryTypes.SELECT
          }
        );
        const idList = [];
        resolve(
          paragraphs.filter(para => {
            if (idList.includes(para.id)) return false;
            idList.push(para.id);
            return true;
          })
        );
      } catch (error) {
        reject(error);
      }
    })
};

module.exports = ParagraphService;
