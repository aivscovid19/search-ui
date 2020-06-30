import axios from 'axios';

export const fetchData = async search_term => {
  const CLOUD_URL = "https://us-central1-for-web-search.cloudfunctions.net/search"
  
  const { data } = await axios.post(CLOUD_URL, { search_term, group: true });
  return data;
};

export const findDocs = ({ groups, _docs = [] }) => {
  let docs = [ ..._docs ];
  groups.forEach(g => docs = [ ...docs, ...findDocs(g) ]);
  return docs;
};
