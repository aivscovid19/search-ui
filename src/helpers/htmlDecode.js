import he from 'he';

const decodeDocumentFields = (document) => {
  for (let field in document) {
    if (document.hasOwnProperty(field) && typeof document[field] === 'string') {
      document[field] = he.decode(document[field]);
    }
  }
  return document;
}

/**
 * Decodes unicode character in every field in document which is string.
 * @param {Array<Object>} docList An array of search documents
 * @return {Array<Object>}
 */
export const decodeUnicodeFields = (docList) => docList.map(decodeDocumentFields);
