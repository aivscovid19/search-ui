export const splitDocumentKeywords = (doc) => {
  const newDoc = Object.assign({}, doc);
  const keywords = doc.keywords || '';
  newDoc.keywords = keywords.toLowerCase().split(';').map(keyword =>
    keyword.split(',')).reduce((currnetItem, aggrregation) => [...currnetItem, ...aggrregation], []);
  return newDoc;
};
