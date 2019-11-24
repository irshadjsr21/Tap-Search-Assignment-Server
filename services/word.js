/**
 * Paragraph service manages all the operations needed in
 * app related to paragraph model
 */
const db = require('../models');
const Word = db.Word;
const WordIndex = db.WordIndex;

const WordService = {
  /**
   * Store a single word
   */
  store: async (word, paragraphId, transaction) =>
    new Promise(async (resolve, reject) => {
      try {
        // Removing special characters
        const formattedWord = word.replace(
          /[`~!^&*()_|+=?;:'",.<>\{\}\[\]\\\/]/gi,
          ''
        );
        if (!formattedWord) {
          resolve(null);
          return;
        }

        const createdWords = await Word.findOrCreate({
          where: { word: formattedWord.toLowerCase() },
          transaction
        });
        if (createdWords.length <= 0) {
          resolve(null);
          return;
        }

        const createdWord = createdWords[0];
        await WordIndex.create(
          {
            wordId: createdWord.dataValues.id,
            paragraphId
          },
          { transaction }
        );
        resolve(createdWord);
      } catch (error) {
        reject(error);
      }
    }),

  /**
   * Store multiple words
   */
  storeAll: async (words, paragraphId, transaction) =>
    new Promise(async (resolve, reject) => {
      try {
        const storedWords = [];
        for (const word of words) {
          storedWords.push(
            await WordService.store(word, paragraphId, transaction)
          );
        }
        resolve(storedWords);
      } catch (error) {
        reject(error);
      }
    }),

  /**
   * Delete all words and word index
   */
  deleteAll: async () =>
    new Promise(async (resolve, reject) => {
      try {
        await Word.destroy({ where: {} });
        await WordIndex.destroy({ where: {} });
      } catch (error) {
        reject(error);
      }
    })
};

module.exports = WordService;
