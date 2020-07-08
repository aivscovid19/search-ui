import axios from 'axios';

export const fetchDeepSearch = async ({ query, email, name, type }) => {
  const CLOUD_URL = "https://us-central1-for-web-search.cloudfunctions.net/job-organizer";
  const { data } = await axios.post(CLOUD_URL, { query, email, name, type });
  return data;
};

export const fetchData = async search_term => {
  const CLOUD_URL = "https://us-central1-for-web-search.cloudfunctions.net/search";
  const { data } = await axios.post(CLOUD_URL, { search_term, group: true });
  return data;
};

export const findDocs = ({ groups = [], _docs = [] }) => {
  let docs = [ ..._docs ];
  groups.forEach(g => docs = [ ...docs, ...findDocs(g) ]);
  return docs;
};
