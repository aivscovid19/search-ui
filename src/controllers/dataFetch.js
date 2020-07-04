import axios from 'axios';

export const fetchData = async (search_term, size = 50) => {
  // const CLOUD_URL = "https://us-central1-for-web-search.cloudfunctions.net/search"
  const CLOUD_URL = "http://104.197.206.184:5000/rerank"
  const { data } = await axios.post(CLOUD_URL,
    {
      search_term,
      group: false,
      index: "cord19",
      size: size,
    });
  return data;
};

export const findDocs = ({ groups, _docs = [] }) => {
  let docs = [..._docs];
  //groups.forEach(g => docs = [...docs, ...findDocs(g)]);
  return docs;
};
