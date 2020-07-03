import axios from 'axios';

export const fetchData = async search_term => {
  // const CLOUD_URL = "https://us-central1-for-web-search.cloudfunctions.net/search"
  const CLOUD_URL = "http://localhost:54475/rerank"
  const { data } = await axios.post(CLOUD_URL,
    {
      search_term,
      group: false,
      index: "dev-*",
      size: 5
    });
  return data;
};

export const findDocs = ({ groups, _docs = [] }) => {
  let docs = [..._docs];
  //groups.forEach(g => docs = [...docs, ...findDocs(g)]);
  return docs;
};
