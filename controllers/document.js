const responses = require('../utils/responses');
const ParagraphService = require('../services/paragraph');
const {
  createErrorBody,
  createFieldError
} = require('../utils/helperFunctions');

module.exports = {
  /**
   * Gets a document as a body parameter named 'documnet'
   * and storing it as paragraphs with indexing.
   *
   * 'document' should be an array containing paragraphs
   */
  add: async (req, res, next) => {
    try {
      const { document } = req.body;

      // Error if the document is empty || not an array || array is empty || 1st element is empty
      if (
        !document ||
        !Array.isArray(document) ||
        document.length <= 0 ||
        document[0].length <= 0
      ) {
        responses.badRequest(
          res,
          createErrorBody('Document should be an array with some data.', [
            createFieldError(
              document,
              'Document should be an array with some data.',
              'document'
            )
          ])
        );
        return;
      }

      const paragraphs = await ParagraphService.storeAll(document);
      responses.ok(res, { paragraphs });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Deletes all the entries in the database
   */
  clear: async (req, res, next) => {
    try {
      await ParagraphService.deleteAll();
      responses.ok(res);
    } catch (error) {
      next(error);
    }
  },

  /**
   * Search paragraphs by a given word in the query parameter
   */
  search: async (req, res, next) => {
    try {
      const { word } = req.query;
      const paragraphs = await ParagraphService.search(word);
      responses.ok(res, { paragraphs });
    } catch (error) {
      next(error);
    }
  }
};
